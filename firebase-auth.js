/**
 * =========================================================================
 * BEM FAKULTAS TEKNOLOGI ELEKTRO DAN INFORMATIKA CERDAS (FTEIC) ITS
 * KABINET POLARIS 2026 — PERFORMANCE APPRAISAL & EVALUATION PORTAL
 * =========================================================================
 * MODULE: firebase-auth.js
 * Production-grade Firebase Authentication Flow (Spark Free Tier)
 * Dual Flow: Google Sign-In & Email/Password with Password Reset via Email.
 * 
 * GUARDRAILS:
 * - Public visitors can freely view landing page, statistics, 3D Canvas pie chart,
 *   department overviews, and awards.
 * - Only individual performance appraisal reports require authenticated functionary identity.
 * - Zero-build Vanilla ES Module loaded via Firebase v10 Modular SDK CDN.
 */

// =========================================================================
// 1. FIREBASE CONFIGURATION (BEM FTEIC ITS 2026 — KABINET POLARIS)
// =========================================================================
// Masukkan kredensial proyek Firebase Anda di sini.
// Didapatkan dari: Firebase Console -> Project Settings -> General -> Your Apps -> Web App.
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Deteksi apakah konfigurasi Firebase telah diisi dengan kunci nyata
const isConfigured = Boolean(
  firebaseConfig.apiKey &&
  !firebaseConfig.apiKey.startsWith("YOUR_") &&
  firebaseConfig.projectId &&
  !firebaseConfig.projectId.startsWith("YOUR_")
);

// Firebase SDK Handles
let firebaseApp = null;
let firebaseAuth = null;
let googleAuthProvider = null;

// Import Firebase SDK v10 Modular via CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

// Inisialisasi Firebase jika konfigurasi valid
if (isConfigured) {
  try {
    firebaseApp = initializeApp(firebaseConfig);
    firebaseAuth = getAuth(firebaseApp);
    googleAuthProvider = new GoogleAuthProvider();
    googleAuthProvider.setCustomParameters({ prompt: "select_account" });
    console.info("[BPSAuth] Firebase Authentication v10 initialized successfully.");
  } catch (err) {
    console.error("[BPSAuth] Failed to initialize Firebase:", err);
  }
} else {
  console.info(
    "%c[BPSAuth] Firebase API Key belum dikonfigurasi. Berjalan dalam Graceful Demo Mode untuk pratinjau antarmuka fungsionaris.",
    "background: #1D536B; color: #fff; padding: 4px 8px; border-radius: 4px; font-weight: bold;"
  );
}

// =========================================================================
// 2. WHITELIST DIRECTORY & IDENTITY RESOLUTION
// =========================================================================

/**
 * Memuat direktori fungsionaris dari global BPS_FUNCTIONARY_DIRECTORY atau file JSON
 */
function getDirectory() {
  if (typeof window !== "undefined" && window.BPS_FUNCTIONARY_DIRECTORY) {
    return window.BPS_FUNCTIONARY_DIRECTORY;
  }
  return {
    admins: [
      "admin.bps@bemfteic.its.ac.id",
      "personalia.polaris@gmail.com",
      "bps.bemfteic2026@gmail.com",
      "troxxu@gmail.com",
      "ilmanafif@gmail.com"
    ],
    functionaries: []
  };
}

/**
 * Mencari fungsionaris berdasarkan email (normalisasi lowercase & trimmed).
 * Mendukung NRP-based ITS student email, personal Gmail, dan admin override list.
 */
function findFunctionaryByEmail(rawEmail) {
  if (!rawEmail) return { functionary: null, isAdmin: false, isWhitelisted: false };
  const email = rawEmail.trim().toLowerCase();
  const dir = getDirectory();

  // 1. Periksa Admin List Override
  const isAdmin = dir.admins.some(a => a.toLowerCase() === email);

  // 2. Periksa Custom Local Linked Emails
  let customLinks = {};
  try {
    const stored = localStorage.getItem("bps_custom_email_links");
    if (stored) customLinks = JSON.parse(stored);
  } catch (e) {
    customLinks = {};
  }
  const linkedId = customLinks[email];

  // 3. Cari di Daftar 97 Fungsionaris
  let matchedFunc = null;

  for (const f of dir.functionaries) {
    // Cocokkan ID dari custom link
    if (linkedId && f.id === linkedId) {
      matchedFunc = f;
      break;
    }
    // Cocokkan Primary Email
    if (f.email && f.email.toLowerCase() === email) {
      matchedFunc = f;
      break;
    }
    // Cocokkan Alternative Emails
    if (Array.isArray(f.altEmails) && f.altEmails.some(ae => ae.toLowerCase() === email)) {
      matchedFunc = f;
      break;
    }
    // Cocokkan NRP domain email ITS
    if (f.nrp && (
      email === `${f.nrp}@mhs.its.ac.id` ||
      email === `${f.nrp}@student.its.ac.id` ||
      email === `${f.nrp}@its.ac.id`
    )) {
      matchedFunc = f;
      break;
    }
  }

  // Jika fungsionaris tidak ditemukan di JSON tetapi ada di staffList global
  if (!matchedFunc && typeof window !== "undefined" && Array.isArray(window.staffList)) {
    for (const s of window.staffList) {
      if (s.nrp && (
        email === `${s.nrp}@mhs.its.ac.id` ||
        email === `${s.nrp}@student.its.ac.id` ||
        email === `${s.nrp}@its.ac.id`
      )) {
        matchedFunc = s;
        break;
      }
    }
  }

  const isWhitelisted = Boolean(matchedFunc || isAdmin);
  return {
    functionary: matchedFunc,
    isAdmin,
    isWhitelisted,
    email
  };
}

/**
 * Mencari fungsionaris berdasarkan ID (misal: "staf-001", "bph-001")
 */
function findFunctionaryById(staffId) {
  if (!staffId) return null;
  const dir = getDirectory();
  const inDir = dir.functionaries.find(f => f.id === staffId);
  if (inDir) return inDir;

  if (typeof window !== "undefined" && Array.isArray(window.staffList)) {
    return window.staffList.find(s => s.id === staffId) || null;
  }
  return null;
}

// =========================================================================
// 3. AUTH STATE & EVENT DISPATCHER
// =========================================================================

let currentAuthUser = null;
let currentFunctionaryData = null;
let isCurrentUserAdmin = false;
let currentTargetStaff = null;
const authListeners = new Set();
let isAuthInitialized = false;

// Muat state sesi dari sessionStorage jika ada
try {
  const cachedSession = sessionStorage.getItem("bps_auth_session");
  if (cachedSession) {
    const parsed = JSON.parse(cachedSession);
    currentAuthUser = parsed.user || null;
    currentFunctionaryData = parsed.functionary || null;
    isCurrentUserAdmin = Boolean(parsed.isAdmin);
  }
} catch (e) {
  console.warn("[BPSAuth] Failed to restore session cache:", e);
}

function notifyAuthListeners() {
  authListeners.forEach(listener => {
    try {
      listener(currentAuthUser, currentFunctionaryData, isCurrentUserAdmin);
    } catch (e) {
      console.error("[BPSAuth] Error in auth state listener:", e);
    }
  });
  updateNavAuthUI();
}

function persistSession(user, func, admin) {
  currentAuthUser = user;
  currentFunctionaryData = func;
  isCurrentUserAdmin = admin;
  try {
    sessionStorage.setItem("bps_auth_session", JSON.stringify({
      user: user ? { uid: user.uid, email: user.email, displayName: user.displayName, photoURL: user.photoURL } : null,
      functionary: func,
      isAdmin: admin
    }));
  } catch (e) {
    console.warn("[BPSAuth] Failed to persist session to sessionStorage:", e);
  }
  notifyAuthListeners();
}

function clearSession() {
  currentAuthUser = null;
  currentFunctionaryData = null;
  isCurrentUserAdmin = false;
  try {
    sessionStorage.removeItem("bps_auth_session");
  } catch (e) {
    // Ignore
  }
  notifyAuthListeners();
}

// Inisialisasi Firebase Auth Listener jika dikonfigurasi
if (isConfigured && firebaseAuth) {
  onAuthStateChanged(firebaseAuth, async (user) => {
    if (user && user.email) {
      const email = user.email.toLowerCase().trim();
      const resolution = findFunctionaryByEmail(email);

      if (resolution.isWhitelisted) {
        persistSession(user, resolution.functionary, resolution.isAdmin);
      } else {
        // Bukan fungsionaris terdaftar: Sign out langsung
        await signOut(firebaseAuth);
        clearSession();
        console.warn(`[BPSAuth] Email ${email} ditolak (bukan fungsionaris terdaftar).`);
      }
    } else {
      clearSession();
    }
    isAuthInitialized = true;
  });
} else {
  // Demo Mode: tandai siap
  isAuthInitialized = true;
}

// =========================================================================
// 4. AUTHENTICATION ACTIONS (GOOGLE, EMAIL/PASSWORD, RESET PASSWORD)
// =========================================================================

/**
 * Format pesan error Firebase ke dalam Bahasa Indonesia yang ramah pengguna
 */
function translateAuthError(error) {
  if (!error) return "Terjadi kesalahan saat memproses autentikasi.";
  const code = error.code || "";
  const msg = error.message || "";

  if (code === "auth/invalid-credential" || code === "auth/wrong-password") {
    return "Password atau kredensial yang Anda masukkan salah. Periksa kembali atau gunakan tombol 'Lupa Password'.";
  }
  if (code === "auth/user-not-found") {
    return "Akun dengan email ini belum terdaftar di Firebase. Gunakan tombol 'Aktivasi / Buat Password Baru' di bawah.";
  }
  if (code === "auth/popup-closed-by-user") {
    return "Jendela Google Sign-In ditutup sebelum verifikasi selesai. Silakan klik tombol 'Lanjutkan dengan Google' kembali.";
  }
  if (code === "auth/popup-blocked") {
    return "Pop-up login Google diblokir oleh browser. Harap izinkan pop-up untuk situs ini lalu coba lagi.";
  }
  if (code === "auth/invalid-email") {
    return "Format alamat email tidak valid. Pastikan penulisan alamat email fungsionaris sudah benar.";
  }
  if (code === "auth/email-already-in-use") {
    return "Email ini sudah memiliki akun terdaftar. Silakan masukkan password Anda pada formulir di bawah atau klik 'Lupa Password'.";
  }
  if (code === "auth/weak-password") {
    return "Password terlalu singkat. Buat password minimal 6 karakter.";
  }
  if (code === "auth/too-many-requests") {
    return "Terlalu banyak percobaan gagal. Akses sementara ditangguhkan demi keamanan. Tunggu beberapa saat atau reset password.";
  }
  if (code === "auth/network-request-failed") {
    return "Gagal terhubung ke server Firebase. Periksa koneksi internet Anda.";
  }
  if (msg.includes("belum terdaftar sebagai Fungsionaris")) {
    return msg;
  }
  return msg || "Gagal memproses autentikasi. Silakan periksa kredensial Anda.";
}

/**
 * FLOW A — Sign in with Google (One-click Popup)
 */
async function signInWithGoogle() {
  if (isConfigured && firebaseAuth && googleAuthProvider) {
    try {
      const result = await signInWithPopup(firebaseAuth, googleAuthProvider);
      const email = result.user.email ? result.user.email.toLowerCase().trim() : "";
      const resolution = findFunctionaryByEmail(email);

      if (!resolution.isWhitelisted) {
        await signOut(firebaseAuth);
        clearSession();
        const unauthMsg = `Email ${email} belum terdaftar sebagai Fungsionaris BEM FTEIC ITS 2026. Hubungi Biro Personalia jika ini adalah kesalahan.`;
        throw new Error(unauthMsg);
      }

      persistSession(result.user, resolution.functionary, resolution.isAdmin);
      return {
        success: true,
        user: result.user,
        functionary: resolution.functionary,
        isAdmin: resolution.isAdmin
      };
    } catch (err) {
      throw new Error(translateAuthError(err));
    }
  } else {
    // GRACEFUL DEMO / SIMULATION MODE
    console.info("[BPSAuth] Menjalankan simulasi Google Sign-In (Demo Mode)...");
    let target = currentTargetStaff;
    if (!target) {
      const dir = getDirectory();
      target = dir.functionaries[3] || {
        id: "staf-001",
        nama: "Hasan",
        nrp: "5027231073",
        departemenBEM: "DAGRI",
        role: "Kepala Departemen Dalam Negeri",
        email: "5027231073@mhs.its.ac.id"
      };
    }

    const mockUser = {
      uid: "mock-google-" + target.id,
      email: target.email,
      displayName: target.nama,
      photoURL: target.foto || `https://ui-avatars.com/api/?name=${encodeURIComponent(target.nama)}&background=1D536B&color=fff&size=200&bold=true`,
      isDemo: true
    };

    persistSession(mockUser, target, false);
    return {
      success: true,
      user: mockUser,
      functionary: target,
      isAdmin: false,
      isDemo: true
    };
  }
}

/**
 * FLOW B1 — Sign in with Email and Password
 */
async function signInWithEmail(emailInput, passwordInput) {
  if (!emailInput || !passwordInput) {
    throw new Error("Mohon masukkan alamat email dan password Anda.");
  }

  const email = emailInput.trim().toLowerCase();
  const resolution = findFunctionaryByEmail(email);

  if (!resolution.isWhitelisted) {
    throw new Error(`Email ${email} belum terdaftar sebagai Fungsionaris BEM FTEIC ITS 2026. Hubungi Biro Personalia jika ini adalah kesalahan.`);
  }

  if (isConfigured && firebaseAuth) {
    try {
      const result = await signInWithEmailAndPassword(firebaseAuth, email, passwordInput);
      persistSession(result.user, resolution.functionary, resolution.isAdmin);
      return {
        success: true,
        user: result.user,
        functionary: resolution.functionary,
        isAdmin: resolution.isAdmin
      };
    } catch (err) {
      throw new Error(translateAuthError(err));
    }
  } else {
    // GRACEFUL DEMO MODE
    console.info("[BPSAuth] Menjalankan simulasi Email Sign-In (Demo Mode)...");
    const mockUser = {
      uid: "mock-email-" + (resolution.functionary ? resolution.functionary.id : "admin"),
      email: email,
      displayName: resolution.functionary ? resolution.functionary.nama : "Admin Biro Personalia",
      photoURL: resolution.functionary ? resolution.functionary.foto : null,
      isDemo: true
    };

    persistSession(mockUser, resolution.functionary, resolution.isAdmin);
    return {
      success: true,
      user: mockUser,
      functionary: resolution.functionary,
      isAdmin: resolution.isAdmin,
      isDemo: true
    };
  }
}

/**
 * FLOW B2 — Reset Password via Personal Email Link
 */
async function resetPasswordViaEmail(emailInput) {
  if (!emailInput) {
    throw new Error("Mohon masukkan alamat email terdaftar Anda untuk menerima link reset.");
  }

  const email = emailInput.trim().toLowerCase();
  const resolution = findFunctionaryByEmail(email);

  if (!resolution.isWhitelisted) {
    throw new Error(`Email ${email} belum terdaftar sebagai Fungsionaris BEM FTEIC ITS 2026. Hubungi Biro Personalia jika ini adalah kesalahan.`);
  }

  if (isConfigured && firebaseAuth) {
    try {
      await sendPasswordResetEmail(firebaseAuth, email);
      return {
        success: true,
        message: `Link reset password resmi telah dikirim ke alamat ${email}. Silakan periksa kotak masuk (inbox) atau folder spam email Anda.`
      };
    } catch (err) {
      throw new Error(translateAuthError(err));
    }
  } else {
    // DEMO MODE SIMULATION
    return {
      success: true,
      message: `[Mode Simulasi Demo] Link reset password berhasil disimulasikan untuk ${email}. Pada produksi Firebase, tautan resmi akan terkirim langsung ke email Anda.`
    };
  }
}

/**
 * FLOW B3 — Claim / First-time Account Password Setup
 */
async function claimOrRegisterEmail(emailInput, passwordInput) {
  if (!emailInput || !passwordInput) {
    throw new Error("Mohon lengkapi alamat email dan password yang ingin Anda buat.");
  }

  if (passwordInput.length < 6) {
    throw new Error("Password minimal terdiri dari 6 karakter demi keamanan akun Anda.");
  }

  const email = emailInput.trim().toLowerCase();
  const resolution = findFunctionaryByEmail(email);

  if (!resolution.isWhitelisted) {
    throw new Error(`Email ${email} belum terdaftar sebagai Fungsionaris BEM FTEIC ITS 2026. Hubungi Biro Personalia jika ini adalah kesalahan.`);
  }

  if (isConfigured && firebaseAuth) {
    try {
      const result = await createUserWithEmailAndPassword(firebaseAuth, email, passwordInput);
      persistSession(result.user, resolution.functionary, resolution.isAdmin);
      return {
        success: true,
        user: result.user,
        functionary: resolution.functionary,
        isAdmin: resolution.isAdmin,
        isNew: true
      };
    } catch (err) {
      throw new Error(translateAuthError(err));
    }
  } else {
    // DEMO MODE SIMULATION
    const mockUser = {
      uid: "mock-register-" + (resolution.functionary ? resolution.functionary.id : "user"),
      email: email,
      displayName: resolution.functionary ? resolution.functionary.nama : "Fungsionaris",
      photoURL: resolution.functionary ? resolution.functionary.foto : null,
      isDemo: true
    };
    persistSession(mockUser, resolution.functionary, resolution.isAdmin);
    return {
      success: true,
      user: mockUser,
      functionary: resolution.functionary,
      isAdmin: resolution.isAdmin,
      isNew: true,
      isDemo: true
    };
  }
}

/**
 * Sign out user
 */
async function signOutUser() {
  if (isConfigured && firebaseAuth) {
    try {
      await signOut(firebaseAuth);
    } catch (e) {
      console.warn("[BPSAuth] Sign out warning:", e);
    }
  }
  clearSession();
  if (typeof window !== "undefined" && typeof window.showToast === "function") {
    window.showToast("Berhasil Keluar", "Anda telah keluar dari Portal Fungsionaris.");
  }
  return { success: true };
}

// =========================================================================
// 5. UI CONTROLLERS (AUTH MODAL & NAV STATUS PILL)
// =========================================================================

/**
 * Buka modal autentikasi fungsionaris
 */
function openAuthModal(targetStaff = null) {
  currentTargetStaff = targetStaff;
  const modal = document.getElementById("passwordModal");
  if (!modal) return;

  // Elemen-elemen formulir
  const modalContainer = document.getElementById("modalContainer");
  const modalName = document.getElementById("modalName");
  const modalRole = document.getElementById("modalRole");
  const modalAvatar = document.getElementById("modalAvatar");
  const modalBiroTag = document.getElementById("modalBiroTag");
  const modalNrpTag = document.getElementById("modalNrpTag");
  const authTargetText = document.getElementById("authTargetText");

  const emailInput = document.getElementById("authEmailInput");
  const passwordInput = document.getElementById("authPasswordInput");
  const errBanner = document.getElementById("errorMessage");
  const errText = document.getElementById("errorMessageText");
  const succBanner = document.getElementById("successMessage");
  const succText = document.getElementById("successMessageText");
  const loadingIndicator = document.getElementById("authLoadingIndicator");
  const submitBtn = document.getElementById("authSubmitBtn");

  // Reset alert & inputs
  if (errBanner) errBanner.classList.add("hidden");
  if (succBanner) succBanner.classList.add("hidden");
  if (loadingIndicator) loadingIndicator.classList.add("hidden");
  if (passwordInput) passwordInput.value = "";
  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.innerText = "Masuk dengan Email";
  }

  // Tampilkan target profil jika diklik dari kartu staf spesifik
  if (targetStaff) {
    if (modalName) modalName.innerText = targetStaff.nama;
    if (modalRole) modalRole.innerText = targetStaff.role;
    if (modalNrpTag) modalNrpTag.innerText = `NRP: ${targetStaff.nrp || "-"}`;
    if (modalAvatar) {
      modalAvatar.src = targetStaff.foto;
      modalAvatar.onerror = function () {
        this.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(targetStaff.nama)}&background=1D536B&color=fff&size=200&bold=true`;
      };
    }
    if (modalBiroTag) {
      modalBiroTag.innerText = targetStaff.departemenBEMFull || targetStaff.departemenBEM;
      modalBiroTag.className = "modal-biro-tag";
    }
    if (authTargetText) {
      authTargetText.innerHTML = `Mengakses Rapor Kinerja: <strong>${targetStaff.nama}</strong>`;
    }
    if (emailInput && !emailInput.value) {
      emailInput.value = targetStaff.email || (targetStaff.nrp ? `${targetStaff.nrp}@mhs.its.ac.id` : "");
    }
  } else {
    // Mode login umum dari navbar
    if (modalName) modalName.innerText = "Portal Fungsionaris";
    if (modalRole) modalRole.innerText = "BEM FTEIC ITS Kabinet Polaris 2026";
    if (modalNrpTag) modalNrpTag.innerText = "Otentikasi Akun";
    if (modalAvatar) modalAvatar.src = "assets/logo-bem-fteic.png";
    if (modalBiroTag) {
      modalBiroTag.innerText = "Badan Pengembangan Strategis";
      modalBiroTag.className = "modal-biro-tag";
    }
    if (authTargetText) {
      authTargetText.innerText = "Masuk untuk Mengakses Rapor Kinerja Personal";
    }
  }

  // Periksa apakah demo mode aktif dan tampilkan badge peringatan jika perlu
  const demoBadge = document.getElementById("authDemoNotice");
  if (demoBadge) {
    demoBadge.style.display = isConfigured ? "none" : "flex";
  }

  modal.classList.remove("hidden");
  setTimeout(() => {
    if (emailInput && !emailInput.value) emailInput.focus();
    else if (passwordInput) passwordInput.focus();
  }, 100);
}

/**
 * Tutup modal autentikasi fungsionaris
 */
function closeModal() {
  const modal = document.getElementById("passwordModal");
  if (modal) modal.classList.add("hidden");
  currentTargetStaff = null;
}

/**
 * Update UI Nav Auth Status Pill (Desktop Nav & Mobile Menu)
 */
function updateNavAuthUI() {
  const navPill = document.getElementById("navAuthPill");
  const mobilePill = document.getElementById("mobileAuthPill");

  const buildPillHtml = (isMobile = false) => {
    if (currentAuthUser) {
      const name = currentFunctionaryData ? currentFunctionaryData.nama : (currentAuthUser.displayName || currentAuthUser.email);
      const shortName = name.split(" ")[0];
      const dept = currentFunctionaryData ? currentFunctionaryData.departemenBEM : (isCurrentUserAdmin ? "ADMIN BPS" : "FUNGSIONARIS");
      const avatarSrc = currentFunctionaryData && currentFunctionaryData.foto ? currentFunctionaryData.foto : (currentAuthUser.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=1D536B&color=fff&size=100&bold=true`);

      return `
        <div class="auth-pill-logged-in" title="Masuk sebagai ${name} (${dept})">
          <div class="auth-pill-user-btn" onclick="window.BPSAuth.openMyReport()">
            <img src="${avatarSrc}" alt="${name}" class="auth-pill-avatar" onerror="this.src='assets/logo-bem-fteic.png'" />
            <div class="auth-pill-text-wrap">
              <span class="auth-pill-user-name">${isMobile ? name : shortName}</span>
              <span class="auth-pill-dept-badge">${dept}</span>
            </div>
          </div>
          <button type="button" class="btn-auth-my-report" onclick="window.BPSAuth.openMyReport()" title="Buka Rapor Kinerja Saya">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
            <span>Rapor Saya</span>
          </button>
          <button type="button" class="btn-auth-logout" onclick="window.BPSAuth.signOutUser()" title="Keluar">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
          </button>
        </div>
      `;
    } else {
      return `
        <button type="button" class="auth-pill-logged-out" onclick="window.BPSAuth.openAuthModal(null)" title="Masuk dengan Akun Fungsionaris BEM FTEIC ITS">
          <span class="auth-pill-dot"></span>
          <span class="auth-pill-text">Public View &bull; <strong>Masuk Fungsionaris</strong></span>
        </button>
      `;
    }
  };

  if (navPill) navPill.innerHTML = buildPillHtml(false);
  if (mobilePill) mobilePill.innerHTML = buildPillHtml(true);
}

/**
 * Membuka rapor fungsionaris yang sedang login langsung tanpa PIN
 */
function openMyReport() {
  if (!currentAuthUser) {
    openAuthModal(null);
    return;
  }

  if (currentFunctionaryData) {
    // Fungsionaris spesifik: buka modal rapor langsung
    if (typeof window.openProgressModal === "function") {
      window.openProgressModal(currentFunctionaryData, null, "september");
    }
  } else if (isCurrentUserAdmin) {
    // Admin: beri notifikasi dan scroll ke daftar fungsionaris
    if (typeof window.showToast === "function") {
      window.showToast("Akses Administrator BPS", "Sebagai Administrator BPS, Anda dapat mengklik kartu siapa saja untuk melihat laporan evaluasi lengkap.");
    }
    const staffSection = document.getElementById("staf");
    if (staffSection) staffSection.scrollIntoView({ behavior: "smooth" });
  } else {
    if (typeof window.showToast === "function") {
      window.showToast("Informasi Profil", "Akun Anda terotentikasi, namun belum dikaitkan dengan profil fungsionaris tertentu. Hubungi Biro Personalia.");
    }
  }
}

/**
 * Handle submit login Google dari modal
 */
async function handleModalGoogleSignIn() {
  const loading = document.getElementById("authLoadingIndicator");
  const errBanner = document.getElementById("errorMessage");
  const errText = document.getElementById("errorMessageText");
  const succBanner = document.getElementById("successMessage");
  const succText = document.getElementById("successMessageText");

  if (errBanner) errBanner.classList.add("hidden");
  if (succBanner) succBanner.classList.add("hidden");
  if (loading) loading.classList.remove("hidden");

  try {
    const res = await signInWithGoogle();
    if (loading) loading.classList.add("hidden");
    if (succBanner) succBanner.classList.remove("hidden");
    if (succText) succText.innerText = `Berhasil masuk sebagai ${res.functionary ? res.functionary.nama : (res.user.displayName || res.user.email)}!`;

    setTimeout(() => {
      closeModal();
      if (currentTargetStaff) {
        if (typeof window.openProgressModal === "function") {
          window.openProgressModal(currentTargetStaff, null, "september");
        }
      } else if (res.functionary) {
        if (typeof window.openProgressModal === "function") {
          window.openProgressModal(res.functionary, null, "september");
        }
      }
    }, 600);
  } catch (err) {
    if (loading) loading.classList.add("hidden");
    if (errBanner) errBanner.classList.remove("hidden");
    if (errText) errText.innerText = err.message || "Gagal masuk dengan Google.";
  }
}

/**
 * Handle submit login Email dari modal
 */
async function handleModalEmailSignIn(event) {
  if (event) event.preventDefault();

  const emailInput = document.getElementById("authEmailInput");
  const passwordInput = document.getElementById("authPasswordInput");
  const loading = document.getElementById("authLoadingIndicator");
  const errBanner = document.getElementById("errorMessage");
  const errText = document.getElementById("errorMessageText");
  const succBanner = document.getElementById("successMessage");
  const succText = document.getElementById("successMessageText");
  const submitBtn = document.getElementById("authSubmitBtn");

  if (errBanner) errBanner.classList.add("hidden");
  if (succBanner) succBanner.classList.add("hidden");

  const email = emailInput ? emailInput.value : "";
  const password = passwordInput ? passwordInput.value : "";

  if (!email || !password) {
    if (errBanner) errBanner.classList.remove("hidden");
    if (errText) errText.innerText = "Harap isi alamat email dan password Anda.";
    return;
  }

  if (loading) loading.classList.remove("hidden");
  if (submitBtn) submitBtn.disabled = true;

  try {
    const res = await signInWithEmail(email, password);
    if (loading) loading.classList.add("hidden");
    if (succBanner) succBanner.classList.remove("hidden");
    if (succText) succText.innerText = `Berhasil masuk! Selamat datang, ${res.functionary ? res.functionary.nama : res.user.email}.`;

    setTimeout(() => {
      closeModal();
      if (currentTargetStaff) {
        if (typeof window.openProgressModal === "function") {
          window.openProgressModal(currentTargetStaff, null, "september");
        }
      } else if (res.functionary) {
        if (typeof window.openProgressModal === "function") {
          window.openProgressModal(res.functionary, null, "september");
        }
      }
    }, 600);
  } catch (err) {
    if (loading) loading.classList.add("hidden");
    if (submitBtn) submitBtn.disabled = false;
    if (errBanner) errBanner.classList.remove("hidden");
    if (errText) errText.innerText = err.message || "Gagal masuk. Periksa kembali email dan password.";
  }
}

/**
 * Handle klik lupa password / reset via email
 */
async function handleModalResetPassword() {
  const emailInput = document.getElementById("authEmailInput");
  const errBanner = document.getElementById("errorMessage");
  const errText = document.getElementById("errorMessageText");
  const succBanner = document.getElementById("successMessage");
  const succText = document.getElementById("successMessageText");
  const loading = document.getElementById("authLoadingIndicator");

  if (errBanner) errBanner.classList.add("hidden");
  if (succBanner) succBanner.classList.add("hidden");

  const email = emailInput ? emailInput.value.trim() : "";
  if (!email) {
    if (errBanner) errBanner.classList.remove("hidden");
    if (errText) errText.innerText = "Masukkan alamat email Anda terlebih dahulu pada kotak input di atas.";
    if (emailInput) emailInput.focus();
    return;
  }

  if (loading) loading.classList.remove("hidden");

  try {
    const res = await resetPasswordViaEmail(email);
    if (loading) loading.classList.add("hidden");
    if (succBanner) succBanner.classList.remove("hidden");
    if (succText) succText.innerText = res.message;
  } catch (err) {
    if (loading) loading.classList.add("hidden");
    if (errBanner) errBanner.classList.remove("hidden");
    if (errText) errText.innerText = err.message;
  }
}

/**
 * Handle klik buat / klaim akun pertama kali
 */
async function handleModalClaimAccount() {
  const emailInput = document.getElementById("authEmailInput");
  const passwordInput = document.getElementById("authPasswordInput");
  const errBanner = document.getElementById("errorMessage");
  const errText = document.getElementById("errorMessageText");
  const succBanner = document.getElementById("successMessage");
  const succText = document.getElementById("successMessageText");
  const loading = document.getElementById("authLoadingIndicator");

  if (errBanner) errBanner.classList.add("hidden");
  if (succBanner) succBanner.classList.add("hidden");

  const email = emailInput ? emailInput.value.trim() : "";
  const password = passwordInput ? passwordInput.value : "";

  if (!email || !password) {
    if (errBanner) errBanner.classList.remove("hidden");
    if (errText) errText.innerText = "Harap masukkan email terdaftar dan tentukan password baru yang ingin Anda gunakan (min. 6 karakter).";
    return;
  }

  if (loading) loading.classList.remove("hidden");

  try {
    const res = await claimOrRegisterEmail(email, password);
    if (loading) loading.classList.add("hidden");
    if (succBanner) succBanner.classList.remove("hidden");
    if (succText) succText.innerText = `Akun berhasil diaktivasi! Selamat datang, ${res.functionary ? res.functionary.nama : email}.`;

    setTimeout(() => {
      closeModal();
      if (currentTargetStaff) {
        if (typeof window.openProgressModal === "function") {
          window.openProgressModal(currentTargetStaff, null, "september");
        }
      } else if (res.functionary) {
        if (typeof window.openProgressModal === "function") {
          window.openProgressModal(res.functionary, null, "september");
        }
      }
    }, 600);
  } catch (err) {
    if (loading) loading.classList.add("hidden");
    if (errBanner) errBanner.classList.remove("hidden");
    if (errText) errText.innerText = err.message;
  }
}

// =========================================================================
// 6. GLOBAL WINDOW EXPORTS & BOOTSTRAP
// =========================================================================

window.BPSAuth = {
  isConfigured,
  firebaseApp,
  firebaseAuth,
  getCurrentUser: () => currentAuthUser,
  getCurrentFunctionary: () => currentFunctionaryData,
  isUserAdmin: () => isCurrentUserAdmin,
  signInWithGoogle,
  signInWithEmail,
  resetPasswordViaEmail,
  claimOrRegisterEmail,
  signOutUser,
  findFunctionaryByEmail,
  findFunctionaryById,
  getFunctionaryDirectory: getDirectory,
  openAuthModal,
  closeAuthModal: closeModal,
  openMyReport,
  updateNavAuthUI,
  handleModalGoogleSignIn,
  handleModalEmailSignIn,
  handleModalResetPassword,
  handleModalClaimAccount,
  onAuthStateChanged: (callback) => {
    if (typeof callback === "function") {
      authListeners.add(callback);
      if (isAuthInitialized) {
        callback(currentAuthUser, currentFunctionaryData, isCurrentUserAdmin);
      }
    }
  },
  onAuthReady: (callback) => {
    if (typeof callback === "function") {
      if (isAuthInitialized) callback();
      else {
        const check = setInterval(() => {
          if (isAuthInitialized) {
            clearInterval(check);
            callback();
          }
        }, 50);
      }
    }
  }
};

// Aliases for HTML inline events
window.openAuthModal = openAuthModal;
window.closeAuthModal = closeModal;
window.handleModalGoogleSignIn = handleModalGoogleSignIn;
window.handleModalEmailSignIn = handleModalEmailSignIn;
window.handleModalResetPassword = handleModalResetPassword;
window.handleModalClaimAccount = handleModalClaimAccount;

// Run initial UI update when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", updateNavAuthUI);
} else {
  updateNavAuthUI();
}
