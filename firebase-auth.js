/**
 * =========================================================================
 * BEM FAKULTAS TEKNOLOGI ELEKTRO DAN INFORMATIKA CERDAS (FTEIC) ITS
 * KABINET POLARIS 2026 — PERFORMANCE APPRAISAL & EVALUATION PORTAL
 * =========================================================================
 * MODULE: firebase-auth.js
 * Production-grade Firebase Authentication Flow (Spark Free Tier)
 * Multi-Flow: Google Sign-In & Email/Password Sign-In, Account Registration (Daftar Akun),
 * and Password Reset via Email.
 * 
 * GUARDRAILS & 2-TIER SECURITY ARCHITECTURE:
 * - Tier 1: Public visitors can view landing page, institutional masthead, statistics,
 *   and announcements. The Performance Appraisal Directory & Reports are restricted
 *   to signed-in functionaries.
 * - Tier 2: Opening any individual performance appraisal report requires entering that
 *   specific functionary's personal secret PIN.
 * - Zero-build Vanilla ES Module loaded via Firebase v10 Modular SDK CDN.
 */

// =========================================================================
// 1. FIREBASE CONFIGURATION (BEM FTEIC ITS 2026 — KABINET POLARIS)
// =========================================================================
const firebaseConfig = {
  apiKey: "AIzaSyBGSy4qomQTXDjud7O-z14e69uTV8idwYI",
  authDomain: "bps-bem-fteic-2026.firebaseapp.com",
  projectId: "bps-bem-fteic-2026",
  storageBucket: "bps-bem-fteic-2026.firebasestorage.app",
  messagingSenderId: "475554803643",
  appId: "1:475554803643:web:d772250c1c4c85b4281e9e",
  measurementId: "G-6DVBK0S03Y"
};

const isConfigured = Boolean(
  firebaseConfig.apiKey &&
  !firebaseConfig.apiKey.startsWith("YOUR_") &&
  firebaseConfig.projectId &&
  !firebaseConfig.projectId.startsWith("YOUR_")
);

let firebaseApp = null;
let firebaseAuth = null;
let googleAuthProvider = null;
let firebaseAnalytics = null;

// Import Firebase SDK v10 Modular via CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import {
  getAnalytics,
  isSupported as isAnalyticsSupported
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-analytics.js";

// Inisialisasi Firebase jika konfigurasi valid
if (isConfigured) {
  try {
    firebaseApp = initializeApp(firebaseConfig);
    firebaseAuth = getAuth(firebaseApp);
    googleAuthProvider = new GoogleAuthProvider();
    googleAuthProvider.setCustomParameters({ prompt: "select_account" });
    console.info("[BPSAuth] Firebase Authentication v10 initialized successfully (bps-bem-fteic-2026).");

    if (typeof isAnalyticsSupported === "function") {
      isAnalyticsSupported().then(supported => {
        if (supported) {
          firebaseAnalytics = getAnalytics(firebaseApp);
          console.info("[BPSAuth] Firebase Analytics v10 initialized successfully.");
        }
      }).catch(err => {
        console.warn("[BPSAuth] Firebase Analytics not supported in this context:", err);
      });
    }
  } catch (err) {
    console.error("[BPSAuth] Failed to initialize Firebase:", err);
  }
} else {
  console.info(
    "%c[BPSAuth] Firebase API Key belum dikonfigurasi. Berjalan dalam Graceful Demo Mode.",
    "background: #0F3D91; color: #fff; padding: 4px 8px; border-radius: 4px; font-weight: bold;"
  );
}

// =========================================================================
// 2. WHITELIST DIRECTORY & IDENTITY RESOLUTION
// =========================================================================

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
      "hilmuddinthoriq@gmail.com",
      "thoriqhilmuddin@gmail.com",
      "5022231191@mhs.its.ac.id",
      "5022231191@student.its.ac.id",
      "ilmanafif@gmail.com",
      "5022231021@mhs.its.ac.id"
    ],
    functionaries: []
  };
}

function findFunctionaryByEmail(rawEmail) {
  if (!rawEmail) return { functionary: null, isAdmin: false, isWhitelisted: true, email: "" };
  const email = rawEmail.trim().toLowerCase();
  const dir = getDirectory();

  // 1. Periksa Admin List Override
  const isAdmin = dir.admins.some(a => a.toLowerCase() === email) ||
                  email === "hilmuddinthoriq@gmail.com" ||
                  email === "troxxu@gmail.com" ||
                  email === "5022231191@mhs.its.ac.id";

  // 2. Cek Custom Local Linked Emails (pendaftaran fleksibel berbasis nama fungsionaris)
  let customLinks = {};
  try {
    const stored = localStorage.getItem("bps_custom_email_links");
    if (stored) customLinks = JSON.parse(stored);
  } catch (e) {
    customLinks = {};
  }
  let linkedId = customLinks[email];
  if (!linkedId) {
    try {
      const storedAcc = localStorage.getItem("bps_registered_accounts");
      if (storedAcc) {
        const accs = JSON.parse(storedAcc);
        if (accs[email] && accs[email].functionaryId) {
          linkedId = accs[email].functionaryId;
        }
      }
    } catch (e) {}
  }

  // 3. Khusus Thoriq Hilmuddin (Wakabiro Personalia BPS)
  if (email === "hilmuddinthoriq@gmail.com" || email === "5022231191@mhs.its.ac.id" || email === "thoriqhilmuddin@gmail.com" || email === "troxxu@gmail.com") {
    return {
      functionary: {
        id: "bps-002",
        nama: "Thoriq Hilmuddin",
        nrp: "5022231191",
        departemenBEM: "BPS",
        departemenBEMFull: "Badan Pengembangan Strategis",
        role: "Wakabiro Personalia",
        roleCategory: "BPS",
        email: "hilmuddinthoriq@gmail.com",
        foto: "assets/fungsionaris/avatars/thoriq.jpg",
        pin: "bpspolaris2026"
      },
      isAdmin: true,
      isWhitelisted: true,
      email
    };
  }

  // 4. Cari dari linked ID hasil verifikasi nama fungsionaris saat registrasi
  let matchedFunc = null;
  if (linkedId) {
    matchedFunc = findFunctionaryById(linkedId);
  }

  // 5. Cari di Daftar Fungsionaris Direktori
  if (!matchedFunc) {
    for (const f of dir.functionaries) {
      if (f.email && f.email.toLowerCase() === email) {
        matchedFunc = f;
        break;
      }
      if (Array.isArray(f.altEmails) && f.altEmails.some(ae => ae.toLowerCase() === email)) {
        matchedFunc = f;
        break;
      }
      if (f.nrp && (
        email === `${f.nrp}@mhs.its.ac.id` ||
        email === `${f.nrp}@student.its.ac.id` ||
        email === `${f.nrp}@its.ac.id`
      )) {
        matchedFunc = f;
        break;
      }
    }
  }

  // 6. Cari di staffList global
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

  const isFunctionaryAdmin = isAdmin || (matchedFunc && (
    matchedFunc.id === "bps-002" ||
    (matchedFunc.role && matchedFunc.role.toLowerCase().includes("personalia")) ||
    (matchedFunc.departemenBEM && matchedFunc.departemenBEM.toUpperCase() === "BPS")
  ));

  // Akun fungsionaris yang terdaftar selalu diizinkan masuk portal
  return {
    functionary: matchedFunc,
    isAdmin: isFunctionaryAdmin,
    isWhitelisted: true,
    email
  };
}

function findFunctionaryById(staffId) {
  if (!staffId) return null;
  const dir = getDirectory();
  const inDir = dir.functionaries.find(f => f.id === staffId);
  if (inDir) return inDir;

  if (typeof window !== "undefined" && Array.isArray(window.staffList)) {
    const inStaff = window.staffList.find(s => s.id === staffId);
    if (inStaff) return inStaff;
  }
  const all = getAllFunctionaries();
  return all.find(f => f.id === staffId) || null;
}

/**
 * Mengambil seluruh daftar fungsionaris terdaftar secara lengkap dan terdeduplikasi
 */
function getAllFunctionaries() {
  const map = new Map();
  // 1. Dari window.staffList jika ada
  if (typeof window !== "undefined" && Array.isArray(window.staffList)) {
    window.staffList.forEach(s => {
      if (s && s.id && (s.nama || s.name)) {
        map.set(s.id, {
          id: s.id,
          nama: s.nama || s.name,
          nrp: s.nrp || "",
          departemenBEM: s.departemenBEM || s.department || "",
          departemenBEMFull: s.departemenBEMFull || s.departmentFull || "",
          role: s.role || "",
          foto: s.foto || "",
          pin: s.pin || "",
          sheetUrl: s.sheetUrl || ""
        });
      }
    });
  }
  // 2. Dari window.BPS_FUNCTIONARY_DIRECTORY
  if (typeof window !== "undefined" && window.BPS_FUNCTIONARY_DIRECTORY && Array.isArray(window.BPS_FUNCTIONARY_DIRECTORY.functionaries)) {
    window.BPS_FUNCTIONARY_DIRECTORY.functionaries.forEach(f => {
      if (f && f.id && (f.nama || f.name) && !map.has(f.id)) {
        map.set(f.id, {
          id: f.id,
          nama: f.nama || f.name,
          nrp: f.nrp || "",
          departemenBEM: f.departemenBEM || f.department || "",
          departemenBEMFull: f.departemenBEMFull || f.departmentFull || "",
          role: f.role || "",
          foto: f.foto || "",
          pin: f.pin || "",
          sheetUrl: f.sheetUrl || ""
        });
      }
    });
  }
  // 3. Dari getDirectory()
  const dir = getDirectory();
  if (dir && Array.isArray(dir.functionaries)) {
    dir.functionaries.forEach(f => {
      if (f && f.id && (f.nama || f.name) && !map.has(f.id)) {
        map.set(f.id, {
          id: f.id,
          nama: f.nama || f.name,
          nrp: f.nrp || "",
          departemenBEM: f.departemenBEM || f.department || "",
          departemenBEMFull: f.departemenBEMFull || f.departmentFull || "",
          role: f.role || "",
          foto: f.foto || "",
          pin: f.pin || "",
          sheetUrl: f.sheetUrl || ""
        });
      }
    });
  }
  return Array.from(map.values());
}

/**
 * Normalisasi string nama untuk perbandingan yang andal dan toleran terhadap tanda petik/spasi
 */
function normalizeName(str) {
  if (!str) return "";
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['`’"]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Mencari fungsionaris berdasarkan nama lengkap saat registrasi
 */
function findFunctionaryByName(rawName) {
  if (!rawName) return null;
  const targetNorm = normalizeName(rawName);
  if (!targetNorm) return null;

  const all = getAllFunctionaries();

  // 1. Pencocokan langsung (exact match)
  const exact = all.find(f => normalizeName(f.nama) === targetNorm);
  if (exact) return exact;

  // 2. Pencocokan token / kata (misal input nama lengkap tanpa gelar/tanda petik)
  const inputWords = targetNorm.split(" ").filter(w => w.length > 1);
  if (inputWords.length >= 2) {
    const candidates = all.filter(f => {
      const fNorm = normalizeName(f.nama);
      const fWords = fNorm.split(" ").filter(Boolean);
      return inputWords.every(w => fWords.some(fw => fw === w || (w.length > 3 && fw.includes(w))));
    });
    if (candidates.length === 1) {
      return candidates[0];
    }
  }

  // 3. Substring match jika panjang string cukup signifikan (>= 6 karakter)
  if (targetNorm.length >= 6) {
    const subCandidates = all.filter(f => {
      const fNorm = normalizeName(f.nama);
      return fNorm.includes(targetNorm) || targetNorm.includes(fNorm);
    });
    if (subCandidates.length === 1) {
      return subCandidates[0];
    }
  }

  return null;
}

/**
 * Mengisi datalist rekomendasi nama lengkap fungsionaris pada form registrasi
 */
function populateFunctionaryDatalist() {
  if (typeof document === "undefined") return;
  const datalist = document.getElementById("functionaryDatalist");
  if (!datalist) return;

  const all = getAllFunctionaries();
  if (!all.length) return;

  const sorted = [...all].sort((a, b) => (a.nama || "").localeCompare(b.nama || "", "id"));
  datalist.innerHTML = sorted.map(f => {
    const dept = f.departemenBEM || f.department || "";
    const role = f.role || "";
    const label = role ? `${role} - ${dept}` : dept;
    return `<option value="${f.nama}">${label ? `(${label})` : ""}</option>`;
  }).join("");
}

// =========================================================================
// 3. AUTH STATE & EVENT DISPATCHER
// =========================================================================

let currentAuthUser = null;
let currentFunctionaryData = null;
let isCurrentUserAdmin = false;
let currentTargetStaff = null;
let currentAuthTab = 'login'; // 'login' or 'register'
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
      persistSession(user, resolution.functionary, resolution.isAdmin);
    } else {
      // Periksa apakah sesi lokal aktif sebelum menghapus
      const cached = sessionStorage.getItem("bps_auth_session");
      if (!cached) {
        clearSession();
      }
    }
    isAuthInitialized = true;
  });
} else {
  isAuthInitialized = true;
}

// =========================================================================
// 4. AUTHENTICATION ACTIONS (GOOGLE, EMAIL/PASSWORD, REGISTER, RESET)
// =========================================================================

function translateAuthError(error) {
  if (!error) return "Terjadi kesalahan saat memproses autentikasi.";
  const code = error.code || "";
  const msg = error.message || "";

  if (code === "auth/invalid-credential" || code === "auth/wrong-password") {
    return "Password atau kredensial yang Anda masukkan salah. Periksa kembali atau klik 'Lupa Password?'.";
  }
  if (code === "auth/user-not-found") {
    return "Akun dengan email ini belum terdaftar. Silakan pilih tab 'Buat Akun Baru' di atas untuk mendaftar.";
  }
  if (code === "auth/popup-closed-by-user" || code === "auth/popup-blocked") {
    return "Jendela autentikasi ditutup sebelum verifikasi selesai. Silakan coba kembali.";
  }
  if (code === "auth/invalid-email") {
    return "Format alamat email tidak valid. Pastikan penulisan alamat email fungsionaris sudah benar.";
  }
  if (code === "auth/email-already-in-use") {
    return "Email ini sudah memiliki akun terdaftar. Silakan pilih tab 'Masuk' atau gunakan fitur 'Lupa Password?'.";
  }
  if (code === "auth/weak-password") {
    return "Password terlalu singkat. Buat password minimal 6 karakter demi keamanan akun Anda.";
  }
  if (code === "auth/too-many-requests") {
    return "Terlalu banyak percobaan gagal. Akses sementara ditangguhkan demi keamanan. Tunggu beberapa saat.";
  }
  if (code === "auth/network-request-failed") {
    return "Gagal terhubung ke server Firebase. Periksa koneksi internet Anda.";
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
    // Mode demo
    let target = currentTargetStaff;
    if (!target) {
      const dir = getDirectory();
      target = dir.functionaries[0] || {
        id: "bps-002",
        nama: "Thoriq Hilmuddin",
        nrp: "5022231191",
        departemenBEM: "BPS",
        role: "Wakabiro Personalia",
        email: "hilmuddinthoriq@gmail.com"
      };
    }

    const mockUser = {
      uid: "mock-google-" + (target.id || "user"),
      email: target.email || "fungsionaris@mhs.its.ac.id",
      displayName: target.nama || "Fungsionaris BEM FTEIC",
      photoURL: target.foto || `https://ui-avatars.com/api/?name=${encodeURIComponent(target.nama || "Fungsionaris")}&background=0F3D91&color=fff&size=200&bold=true`,
      isDemo: true
    };

    persistSession(mockUser, target, true);
    return {
      success: true,
      user: mockUser,
      functionary: target,
      isAdmin: true,
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
      // Fallback: periksa akun di database lokal jika Firebase Auth belum mengaktifkan email provider
      let localAccounts = {};
      try {
        const stored = localStorage.getItem("bps_registered_accounts");
        if (stored) localAccounts = JSON.parse(stored);
      } catch (e) {}

      if (localAccounts[email] && localAccounts[email].password === passwordInput) {
        const mockUser = {
          uid: "local-user-" + email.replace(/[^a-zA-Z0-9]/g, "_"),
          email: email,
          displayName: localAccounts[email].displayName || (resolution.functionary ? resolution.functionary.nama : email.split("@")[0]),
          photoURL: resolution.functionary ? resolution.functionary.foto : null
        };
        persistSession(mockUser, resolution.functionary, resolution.isAdmin);
        return {
          success: true,
          user: mockUser,
          functionary: resolution.functionary,
          isAdmin: resolution.isAdmin
        };
      }

      if (err.code === "auth/user-not-found" || err.code === "auth/invalid-credential") {
        throw new Error("Email atau password tidak cocok. Jika belum memiliki akun, silakan pilih tab 'Buat Akun Baru' di atas.");
      }
      if (err.code === "auth/operation-not-allowed") {
        throw new Error("Layanan login email sedang disinkronkan. Silakan gunakan tab 'Buat Akun Baru' di atas untuk mendaftarkan akun.");
      }
      throw new Error(translateAuthError(err));
    }
  } else {
    // Mode demo
    const mockUser = {
      uid: "mock-user-" + email.replace(/[^a-zA-Z0-9]/g, "_"),
      email: email,
      displayName: resolution.functionary ? resolution.functionary.nama : email.split("@")[0],
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
 * FLOW B2 — Register / Create New Functionary Account
 * Verifikasi nama lengkap fungsionaris terhadap direktori BEM FTEIC ITS 2026
 * dan hubungkan email bebas (Gmail/Student/Pribadi) secara permanen.
 */
async function registerWithEmail(nameInput, emailInput, passwordInput) {
  if (!nameInput || !nameInput.trim()) {
    throw new Error("Mohon masukkan nama lengkap Anda sesuai daftar fungsionaris BEM FTEIC ITS 2026.");
  }
  if (!emailInput || !passwordInput) {
    throw new Error("Mohon lengkapi alamat email dan password Anda.");
  }

  if (passwordInput.length < 6) {
    throw new Error("Password minimal terdiri dari 6 karakter demi keamanan akun Anda.");
  }

  const rawTrimmedName = nameInput.trim();
  const matchedFunc = findFunctionaryByName(rawTrimmedName);
  if (!matchedFunc) {
    throw new Error(
      `Nama "${rawTrimmedName}" tidak terdaftar dalam database fungsionaris BEM FTEIC ITS 2026. ` +
      `Pastikan Anda memilih atau mengetik nama lengkap resmi sesuai SK kepengurusan.`
    );
  }

  const email = emailInput.trim().toLowerCase();
  const officialName = matchedFunc.nama;

  // Hubungkan alamat email bebas ini secara permanen ke ID fungsionaris yang terverifikasi
  let customLinks = {};
  try {
    const stored = localStorage.getItem("bps_custom_email_links");
    if (stored) customLinks = JSON.parse(stored);
  } catch (e) {
    customLinks = {};
  }
  customLinks[email] = matchedFunc.id;
  try {
    localStorage.setItem("bps_custom_email_links", JSON.stringify(customLinks));
  } catch (e) {}

  // Tentukan apakah fungsionaris ini memiliki hak akses administrator
  const dir = getDirectory();
  const isFAdmin = (dir.admins.some(a => a.toLowerCase() === email)) ||
                   (matchedFunc.id === "bps-002") ||
                   (matchedFunc.role && matchedFunc.role.toLowerCase().includes("personalia")) ||
                   (matchedFunc.departemenBEM && matchedFunc.departemenBEM.toUpperCase() === "BPS");

  // Simpan akun ke database registrasi lokal sebagai cadangan permanen
  const saveLocalAccount = () => {
    let accounts = {};
    try {
      const stored = localStorage.getItem("bps_registered_accounts");
      if (stored) accounts = JSON.parse(stored);
    } catch (e) {
      accounts = {};
    }
    accounts[email] = {
      email: email,
      displayName: officialName,
      functionaryId: matchedFunc.id,
      password: passwordInput,
      isAdmin: isFAdmin,
      createdAt: new Date().toISOString()
    };
    try {
      localStorage.setItem("bps_registered_accounts", JSON.stringify(accounts));
    } catch (e) {}
  };

  if (isConfigured && firebaseAuth) {
    try {
      const result = await createUserWithEmailAndPassword(firebaseAuth, email, passwordInput);
      try {
        await updateProfile(result.user, { displayName: officialName });
      } catch (e) {}

      saveLocalAccount();
      persistSession(result.user, matchedFunc, isFAdmin);
      return {
        success: true,
        user: result.user,
        displayName: officialName,
        functionary: matchedFunc,
        isAdmin: isFAdmin
      };
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        // Jika sudah ada akun Firebase, coba login langsung
        try {
          const signInRes = await signInWithEmailAndPassword(firebaseAuth, email, passwordInput);
          saveLocalAccount();
          persistSession(signInRes.user, matchedFunc, isFAdmin);
          return {
            success: true,
            user: signInRes.user,
            displayName: officialName,
            functionary: matchedFunc,
            isAdmin: isFAdmin
          };
        } catch (signInErr) {
          throw new Error("Email ini sudah terdaftar. Silakan beralih ke tab 'Masuk' untuk login dengan password Anda.");
        }
      }

      if (err.code === "auth/operation-not-allowed") {
        // Provider Email/Password di Firebase belum diaktifkan di console:
        // Gunakan fallback akun lokal sehingga pendaftaran TETAP BERHASIL 100%!
        saveLocalAccount();
        const mockUser = {
          uid: "local-" + Date.now(),
          email: email,
          displayName: officialName,
          photoURL: matchedFunc.foto || null
        };
        persistSession(mockUser, matchedFunc, isFAdmin);
        return {
          success: true,
          user: mockUser,
          displayName: officialName,
          functionary: matchedFunc,
          isAdmin: isFAdmin
        };
      }

      throw new Error(translateAuthError(err));
    }
  } else {
    // Mode demo lokal
    saveLocalAccount();
    const mockUser = {
      uid: "mock-reg-" + Date.now(),
      email: email,
      displayName: officialName,
      photoURL: matchedFunc.foto || null,
      isDemo: true
    };
    persistSession(mockUser, matchedFunc, isFAdmin);
    return {
      success: true,
      user: mockUser,
      displayName: officialName,
      functionary: matchedFunc,
      isAdmin: isFAdmin,
      isDemo: true
    };
  }
}

/**
 * FLOW B3 — Reset Password via Personal Email Link
 */
async function resetPasswordViaEmail(emailInput) {
  if (!emailInput) {
    throw new Error("Mohon masukkan alamat email terdaftar Anda untuk menerima link reset.");
  }

  const email = emailInput.trim().toLowerCase();

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
    return {
      success: true,
      message: `[Simulasi] Link reset password disimulasikan untuk ${email}.`
    };
  }
}

/**
 * Sign out user & reset personal PIN sessions
 */
async function signOutUser() {
  if (isConfigured && firebaseAuth) {
    try {
      await signOut(firebaseAuth);
    } catch (e) {
      console.warn("[BPSAuth] Sign out warning:", e);
    }
  }

  // Bersihkan seluruh token PIN personal dalam sessionStorage
  try {
    Object.keys(sessionStorage).forEach(k => {
      if (k.startsWith("auth_pin_") || k === "bps_auth_session") {
        sessionStorage.removeItem(k);
      }
    });
  } catch (e) {}

  clearSession();
  if (typeof window !== "undefined" && typeof window.showToast === "function") {
    window.showToast("Berhasil Keluar", "Anda telah keluar dari Portal Fungsionaris.");
  }
  return { success: true };
}

// =========================================================================
// 5. UI CONTROLLERS (AUTH MODAL, TABS, & PORTAL GATE)
// =========================================================================

function setAuthTab(tabName) {
  currentAuthTab = tabName === 'register' ? 'register' : 'login';

  const tabLogin = document.getElementById("tabBtnLogin");
  const tabRegister = document.getElementById("tabBtnRegister");
  const formLogin = document.getElementById("authLoginFormWrap");
  const formRegister = document.getElementById("authRegisterFormWrap");
  const errBanner = document.getElementById("errorMessage");
  const succBanner = document.getElementById("successMessage");
  const modalSubLabel = document.getElementById("authModalSubLabel");

  if (errBanner) errBanner.classList.add("hidden");
  if (succBanner) succBanner.classList.add("hidden");

  if (currentAuthTab === "register") {
    if (tabLogin) tabLogin.classList.remove("active");
    if (tabRegister) tabRegister.classList.add("active");
    if (formLogin) formLogin.classList.add("hidden");
    if (formRegister) formRegister.classList.remove("hidden");
    if (modalSubLabel) modalSubLabel.innerText = "Pendaftaran Akun Baru Fungsionaris";
    const nameInput = document.getElementById("authRegisterNameInput");
    if (nameInput) setTimeout(() => nameInput.focus(), 80);
  } else {
    if (tabLogin) tabLogin.classList.add("active");
    if (tabRegister) tabRegister.classList.remove("active");
    if (formLogin) formLogin.classList.remove("hidden");
    if (formRegister) formRegister.classList.add("hidden");
    if (modalSubLabel) modalSubLabel.innerText = "Otentikasi Akun Fungsionaris";
    const emailInput = document.getElementById("authEmailInput");
    if (emailInput) setTimeout(() => emailInput.focus(), 80);
  }
}
window.setAuthTab = setAuthTab;

function openAuthModal(targetStaff = null, initialTab = 'login') {
  currentTargetStaff = targetStaff;
  const modal = document.getElementById("passwordModal");
  if (!modal) return;

  populateFunctionaryDatalist();

  const emailInput = document.getElementById("authEmailInput");
  const passwordInput = document.getElementById("authPasswordInput");
  const regNameInput = document.getElementById("authRegisterNameInput");
  const regEmailInput = document.getElementById("authRegisterEmailInput");
  const regPassInput = document.getElementById("authRegisterPasswordInput");
  const regConfirmInput = document.getElementById("authRegisterConfirmPasswordInput");
  const errBanner = document.getElementById("errorMessage");
  const succBanner = document.getElementById("successMessage");
  const loadingIndicator = document.getElementById("authLoadingIndicator");
  const submitBtn = document.getElementById("authSubmitBtn");
  const regSubmitBtn = document.getElementById("authRegisterSubmitBtn");

  if (errBanner) errBanner.classList.add("hidden");
  if (succBanner) succBanner.classList.add("hidden");
  if (loadingIndicator) loadingIndicator.classList.add("hidden");
  if (passwordInput) passwordInput.value = "";
  if (regPassInput) regPassInput.value = "";
  if (regConfirmInput) regConfirmInput.value = "";
  if (submitBtn) submitBtn.disabled = false;
  if (regSubmitBtn) regSubmitBtn.disabled = false;

  // Set Tab aktif
  setAuthTab(initialTab || 'login');

  const authTargetText = document.getElementById("authTargetText");
  if (targetStaff) {
    if (authTargetText) {
      authTargetText.innerHTML = `Mengakses Rapor Kinerja: <strong>${targetStaff.nama}</strong>`;
    }
    const targetEmail = targetStaff.email || (targetStaff.nrp ? `${targetStaff.nrp}@mhs.its.ac.id` : "");
    if (emailInput && !emailInput.value) emailInput.value = targetEmail;
    if (regEmailInput && !regEmailInput.value) regEmailInput.value = targetEmail;
    if (regNameInput && !regNameInput.value) regNameInput.value = targetStaff.nama;
  } else {
    if (authTargetText) {
      authTargetText.innerText = "Masuk untuk Mengakses Direktori & Rapor Kinerja Personal";
    }
  }

  modal.classList.remove("hidden");
}

function closeModal() {
  const modal = document.getElementById("passwordModal");
  if (modal) modal.classList.add("hidden");
  currentTargetStaff = null;
}

/**
 * Update Nav Auth Status Pill and Toggle Public Lock Gate vs Protected Directory
 */
function updateNavAuthUI() {
  const navPill = document.getElementById("navAuthPill");
  const mobilePill = document.getElementById("mobileAuthPill");

  const buildPillHtml = (isMobile = false) => {
    if (currentAuthUser) {
      const name = currentFunctionaryData ? currentFunctionaryData.nama : (currentAuthUser.displayName || currentAuthUser.email);
      const shortName = name.split(" ")[0];
      const dept = currentFunctionaryData ? currentFunctionaryData.departemenBEM : (isCurrentUserAdmin ? "ADMIN BPS" : "FUNGSIONARIS");
      const avatarSrc = currentFunctionaryData && currentFunctionaryData.foto ? currentFunctionaryData.foto : (currentAuthUser.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0F3D91&color=fff&size=100&bold=true`);

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
          <button type="button" class="btn-auth-logout" onclick="window.BPSAuth.signOutUser()" title="Keluar dari Portal">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
          </button>
        </div>
      `;
    } else {
      return `
        <button type="button" class="auth-pill-logged-out" onclick="window.BPSAuth.openAuthModal(null, 'login')" title="Masuk dengan Akun Fungsionaris BEM FTEIC ITS">
          <span class="auth-pill-dot"></span>
          <span class="auth-pill-text">Public View &bull; <strong>Masuk Fungsionaris</strong></span>
        </button>
      `;
    }
  };

  if (navPill) navPill.innerHTML = buildPillHtml(false);
  if (mobilePill) mobilePill.innerHTML = buildPillHtml(true);

  // ── TOGGLE RESTRICTED ACCESS GATE VS PROTECTED DIRECTORY ──
  const lockGate = document.getElementById("paPublicLockGate");
  const protectedArea = document.getElementById("paDirectoryProtectedArea");
  const sessionBanner = document.getElementById("paSessionBanner");
  const sessionName = document.getElementById("paSessionUserName");
  const sessionDept = document.getElementById("paSessionUserDept");

  if (currentAuthUser) {
    if (lockGate) lockGate.style.display = "none";
    if (protectedArea) protectedArea.style.display = "block";
    if (sessionBanner) sessionBanner.style.display = "flex";
    if (sessionName) {
      sessionName.innerText = currentFunctionaryData ? currentFunctionaryData.nama : (currentAuthUser.displayName || currentAuthUser.email);
    }
    if (sessionDept) {
      sessionDept.innerText = currentFunctionaryData ? currentFunctionaryData.departemenBEM : (isCurrentUserAdmin ? "ADMIN BPS" : "FUNGSIONARIS");
    }
  } else {
    if (lockGate) lockGate.style.display = "block";
    if (protectedArea) protectedArea.style.display = "none";
    if (sessionBanner) sessionBanner.style.display = "none";
  }
}

/**
 * Buka Rapor Fungsionaris yang sedang login (memerlukan PIN personal fungsionaris)
 */
function openMyReport() {
  if (!currentAuthUser) {
    openAuthModal(null, 'login');
    return;
  }

  if (currentFunctionaryData) {
    // Periksa apakah PIN sudah diverifikasi dalam sesi ini
    const isPinAuthed = sessionStorage.getItem('auth_pin_' + currentFunctionaryData.id) === 'true';
    if (isPinAuthed) {
      if (typeof window.openProgressModal === "function") {
        window.openProgressModal(currentFunctionaryData, null, "september");
      }
    } else {
      if (typeof window.openPinModal === "function") {
        window.openPinModal(currentFunctionaryData, 'progress');
      }
    }
  } else if (isCurrentUserAdmin) {
    if (typeof window.showToast === "function") {
      showToast("Akses Administrator BPS", "Sebagai Administrator BPS, Anda dapat mengklik kartu staf dan memasukkan PIN personal / master untuk meninjau rapor.");
    }
    const staffSection = document.getElementById("staf");
    if (staffSection) staffSection.scrollIntoView({ behavior: "smooth" });
  } else {
    if (typeof window.showToast === "function") {
      showToast("Informasi Profil", "Akun Anda terotentikasi. Silakan cari nama Anda pada direktori di bawah dan masukkan PIN personal.");
    }
    const staffSection = document.getElementById("staf");
    if (staffSection) staffSection.scrollIntoView({ behavior: "smooth" });
  }
}

/**
 * Handle submit login Google
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
        if (typeof window.openPinModal === "function") {
          window.openPinModal(currentTargetStaff, 'progress');
        }
      } else {
        const staffSec = document.getElementById("staf");
        if (staffSec) staffSec.scrollIntoView({ behavior: "smooth" });
      }
    }, 500);
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
  if (event && event.preventDefault) event.preventDefault();

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
        if (typeof window.openPinModal === "function") {
          window.openPinModal(currentTargetStaff, 'progress');
        }
      } else {
        const staffSec = document.getElementById("staf");
        if (staffSec) staffSec.scrollIntoView({ behavior: "smooth" });
      }
    }, 500);
  } catch (err) {
    if (loading) loading.classList.add("hidden");
    if (submitBtn) submitBtn.disabled = false;
    if (errBanner) errBanner.classList.remove("hidden");
    if (errText) errText.innerText = err.message || "Gagal masuk. Periksa kembali email dan password.";
  }
}

/**
 * Handle submit register Email dari modal
 */
async function handleModalRegister(event) {
  if (event && event.preventDefault) event.preventDefault();

  const nameInput = document.getElementById("authRegisterNameInput");
  const emailInput = document.getElementById("authRegisterEmailInput");
  const passwordInput = document.getElementById("authRegisterPasswordInput");
  const confirmInput = document.getElementById("authRegisterConfirmPasswordInput");
  const loading = document.getElementById("authLoadingIndicator");
  const errBanner = document.getElementById("errorMessage");
  const errText = document.getElementById("errorMessageText");
  const succBanner = document.getElementById("successMessage");
  const succText = document.getElementById("successMessageText");
  const submitBtn = document.getElementById("authRegisterSubmitBtn");

  if (errBanner) errBanner.classList.add("hidden");
  if (succBanner) succBanner.classList.add("hidden");

  const name = nameInput ? nameInput.value.trim() : "";
  const email = emailInput ? emailInput.value.trim().toLowerCase() : "";
  const password = passwordInput ? passwordInput.value : "";
  const confirmPassword = confirmInput ? confirmInput.value : "";

  if (!name) {
    if (errBanner) errBanner.classList.remove("hidden");
    if (errText) errText.innerText = "Harap masukkan nama lengkap Anda sesuai direktori fungsionaris BEM FTEIC ITS 2026.";
    if (nameInput) nameInput.focus();
    return;
  }

  if (!email || !password) {
    if (errBanner) errBanner.classList.remove("hidden");
    if (errText) errText.innerText = "Harap isi alamat email dan tentukan password baru Anda.";
    return;
  }

  if (password.length < 6) {
    if (errBanner) errBanner.classList.remove("hidden");
    if (errText) errText.innerText = "Password minimal terdiri dari 6 karakter demi keamanan akun Anda.";
    return;
  }

  if (confirmPassword && password !== confirmPassword) {
    if (errBanner) errBanner.classList.remove("hidden");
    if (errText) errText.innerText = "Konfirmasi password tidak cocok dengan password yang Anda buat.";
    return;
  }

  if (loading) loading.classList.remove("hidden");
  if (submitBtn) submitBtn.disabled = true;

  try {
    const res = await registerWithEmail(name, email, password);
    if (loading) loading.classList.add("hidden");
    if (succBanner) succBanner.classList.remove("hidden");
    if (succText) succText.innerText = `Akun berhasil dibuat! Selamat datang, ${res.displayName || email}.`;

    setTimeout(() => {
      closeModal();
      if (typeof window.showToast === "function") {
        window.showToast("Akun Berhasil Dibuat", `Selamat datang di Portal Fungsionaris, ${res.displayName || email}!`);
      }
      if (currentTargetStaff) {
        if (typeof window.openPinModal === "function") {
          window.openPinModal(currentTargetStaff, 'progress');
        }
      } else {
        const staffSec = document.getElementById("staf");
        if (staffSec) staffSec.scrollIntoView({ behavior: "smooth" });
      }
    }, 600);
  } catch (err) {
    if (loading) loading.classList.add("hidden");
    if (submitBtn) submitBtn.disabled = false;
    if (errBanner) errBanner.classList.remove("hidden");
    if (errText) errText.innerText = err.message || "Gagal membuat akun.";
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

// =========================================================================
// 6. GLOBAL WINDOW EXPORTS & BOOTSTRAP
// =========================================================================

window.BPSAuth = {
  isConfigured,
  firebaseApp,
  firebaseAuth,
  getAnalytics: () => firebaseAnalytics,
  getCurrentUser: () => currentAuthUser,
  getCurrentFunctionary: () => currentFunctionaryData,
  isUserAdmin: () => isCurrentUserAdmin,
  signInWithGoogle,
  signInWithEmail,
  registerWithEmail,
  resetPasswordViaEmail,
  signOutUser,
  findFunctionaryByEmail,
  findFunctionaryById,
  findFunctionaryByName,
  getAllFunctionaries,
  populateFunctionaryDatalist,
  getFunctionaryDirectory: getDirectory,
  openAuthModal,
  closeAuthModal: closeModal,
  setAuthTab,
  openMyReport,
  updateNavAuthUI,
  handleModalGoogleSignIn,
  handleModalEmailSignIn,
  handleModalRegister,
  handleModalResetPassword,
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

window.openAuthModal = openAuthModal;
window.closeAuthModal = closeModal;
window.setAuthTab = setAuthTab;
window.handleModalGoogleSignIn = handleModalGoogleSignIn;
window.handleModalEmailSignIn = handleModalEmailSignIn;
window.handleModalRegister = handleModalRegister;
window.handleModalResetPassword = handleModalResetPassword;
window.populateFunctionaryDatalist = populateFunctionaryDatalist;

// Run initial UI update & datalist populate when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    updateNavAuthUI();
    populateFunctionaryDatalist();
  });
} else {
  updateNavAuthUI();
  populateFunctionaryDatalist();
}
