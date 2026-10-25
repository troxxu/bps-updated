# 🌟 BEM FTEIC ITS 2026 | Ruang Refleksi & Apresiasi — Kabinet Polaris
> **Portal Evaluasi & Performance Appraisal Report Fungsionaris BEM FTEIC ITS 2026**  
> *Biro Personalia & Biro Keorganisasian — Badan Pengembangan Strategis | Fakultas Teknologi Elektro dan Informatika Cerdas, Institut Teknologi Sepuluh Nopember.*

---

## 📌 Sekilas Platform

**Ruang Refleksi & Apresiasi** adalah platform web internal resmi untuk 94 fungsionaris BEM FTEIC ITS Kabinet Polaris 2026. Portal ini dirancang untuk memantau capaian personal, menyajikan umpan balik pendampingan dari Biro Personalia, serta menghubungkan fungsionaris ke lembar kerja evaluasi bulanan Google Sheets secara privat melalui autentikasi PIN personal.

Dibangun dengan arsitektur **Zero-Dependency Vanilla Web** (*HTML5, Modular CSS3, Modern JavaScript ES6+*), portal ini mengadopsi estetika *Clearwave Design System* berpadu dengan aksen *Magic UI* yang elegan, responsif, dan ramah pengguna di perangkat mobile maupun desktop.

---

## ✨ Fitur-Fitur Utama

### 1. 📊 Dual Rubrik Penilaian Resmi (Skala 0 - 10)
Sistem evaluasi memisahkan standar kompetensi kepemimpinan kabinet dan staf fungsionaris berdasarkan pedoman resmi Biro Personalia:

#### 👑 Rubrik Kepemimpinan Kabinet (7 Indikator)
*Dikhususkan bagi Kepala Departemen (Kadep), Wakil Kepala Departemen (Wakadep), dan Kepala Biro (Kabiro):*
1. **Leadership**: Pengarahan strategis program kerja, kejelasan peran staf, dan fasilitasi pengambilan keputusan yang solutif.
2. **Development**: Keteladanan, transfer pengetahuan (*knowledge sharing*), dan apresiasi capaian staf.
3. **Empowerment**: Pendelegasian kewenangan terukur, perumusan target, dan optimalisasi sumber daya.
4. **Coordination**: Manajemen kolaborasi lintas departemen, pemantauan ritme kerja, dan evaluasi berkala.
5. **Representation**: Keterwakilan departemen secara diplomatis dan profesional kepada pemangku kepentingan eksternal.
6. **Administration**: Ketertiban administrasi, tata kelola kearsipan, dan efisiensi operasional.
7. **Exemplary**: Keteladanan integritas, moralitas kerja, dan pembentukan iklim kekeluargaan yang kokoh.

#### 👥 Rubrik Kinerja Fungsionaris Staf (12 Indikator)
*Dikhususkan bagi Sekretaris Departemen dan seluruh Staf Fungsionaris:*
1. **Kritis**: Ketajaman mengidentifikasi akar persoalan dan merumuskan solusi efektif.
2. **Disiplin**: Konsistensi ketepatan waktu hadir dalam rapat, pleno, dan forum BEM FTEIC.
3. **Inovatif**: Keaktifan menyumbangkan ide kreatif dan terobosan bagi program kerja.
4. **Solidaritas**: Kesiapan saling membantu dan bergotong-royong menyukseskan agenda organisasi.
5. **Sosial**: Kemampuan membangun jejaring dan keakraban lintas departemen.
6. **Rasa Kekeluargaan**: Empati, kepedulian, dan rasa memiliki terhadap sesama fungsionaris.
7. **Inisiatif**: Sikap proaktif dalam berkoordinasi tanpa harus selalu menunggu instruksi.
8. **Tanggung Jawab**: Eksekusi tuntas dan pengembangan proker yang diamanahkan.
9. **Etika**: Tata krama dan sopan santun komunikasi profesional di lingkungan kampus.
10. **Pemahaman Proker**: Pemahaman komprehensif atas *job description* dan alur kerja.
11. **Fundamental**: Internalisasi dan penerapan nilai-nilai dasar perjuangan BEM FTEIC.
12. **Responsif**: Kepekaan terhadap dinamika isu strategis internal kampus maupun nasional.

Setiap indikator dilengkapi 4 tingkatan parameter penilaian objektif:
- `9 - 10` : **Sangat Baik / Unggul**
- `6 - 8` : **Baik / Memenuhi Standar**
- `3 - 5` : **Cukup / Dalam Pendampingan**
- `1 - 2` : **Kurang / Butuh Evaluasi Khusus**

---

### 2. 🥧 Grafik 3D Animated Pie Chart (Murni HTML5 Canvas)
- **Visualisasi Interaktif 3D**: Menampilkan distribusi bobot nilai antar-indikator dalam bentuk silinder 3D isometrik dengan bayangan ambient realistis.
- **Slice Pop-Out & Hover**: Irisan grafik otomatis bergeser keluar (*exploded view*) dan berpendar saat kursor diarahkan atau disentuh di layar smartphone.
- **Floating Tooltip**: Menampilkan nama indikator, nilai numerik (skala 0 - 10), dan persentase kontribusi.
- **Interactive Legend**: Chip daftar legenda di bawah diagram dapat diklik untuk menyorot irisan tertentu dan melompat langsung ke kartu deskripsi indikator terkait.
- **100% Offline & Portable**: Dibuat murni dengan Canvas API tanpa dependensi library eksternal, sehingga tetap berjalan lancar saat dibuka langsung via protokol `file:///`.

---

### 3. 🔒 Keamanan Akses & Perlindungan Privasi PIN
- **Zero Leakage**: Pada direktori utama, kartu fungsionaris hanya menampilkan **Nama Lengkap, Foto, dan Jabatan**. Data sensitif seperti **NRP, Departemen Asal, Nilai PA, dan Tautan Dokumen** disembunyikan sampai pengguna memasukkan PIN personal yang valid.
- **Animasi Validasi**: Dilengkapi efek getar interaktif (*shake animation*) saat PIN keliru dan notifikasi status berhasil.
- **Fitur Kunci Sesi**: Fungsionaris dapat mengunci kembali laporan mereka secara instan setelah selesai membaca.

---

### 4. 📱 Mobile-First & Pengalaman Pengguna Ringkas
- **2 Kartu per Baris di Smartphone**: Layout grid fungsionaris otomatis beralih menjadi 2 kolom berdampingan di layar HP, menghemat tinggi layar dan mempermudah perambanan.
- **Sistem Halaman (Pagination)**: 94 fungsionaris dibagi menjadi 12 kartu per halaman dengan tombol navigasi `‹ Prev`, angka halaman, dan `Next ›` yang terpusat rapi tanpa risiko *infinite scrolling* yang melelahkan.
- **Tata Letak 4 Pilar 2x2**: Bagian prinsip pendampingan fungsionaris diatur dalam grid 2x2 yang kompak dan nyaman dibaca.

---

## 👥 Komposisi 94 Fungsionaris Terdaftar

Data mencakup seluruh pengurus aktif di 6 departemen BEM FTEIC ITS Kabinet Polaris 2026:

| Departemen | Singkatan | Jumlah Fungsionaris | Komposisi Kepengurusan |
| :--- | :---: | :---: | :--- |
| **Dalam Negeri** | `DAGRI` | **15** Orang | Kadep, Wakadep, Sekdep, 2 Kabiro, 10 Staf |
| **Pengembangan SDM** | `PSDM` | **13** Orang | Kadep, Wakadep, Sekdep, 2 Kabiro, 8 Staf |
| **Riset dan Teknologi** | `RISTEK` | **15** Orang | Kadep, Wakadep, Sekdep, 2 Kabiro, 10 Staf |
| **Sosial Masyarakat** | `SOSMAS` | **18** Orang | Kadep, Wakadep, Sekdep, 3 Kabiro, 12 Staf |
| **Luar Negeri** | `LUGRI` | **18** Orang | Kadep, Wakadep, Sekdep, 2 Kabiro, 13 Staf |
| **Kewirausahaan** | `KWU` | **15** Orang | Kadep, Wakadep, Sekdep, 2 Kabiro, 10 Staf |
| **TOTAL** | — | **94** Orang | Mahasiswa Aktif 6 Jurusan FTEIC ITS |

---

## 🗂️ Struktur Berkas Proyek

```text
bem-fteic-evaluasi/
├── index.html                 # Halaman Beranda & Direktori Utama PA Fungsionaris
├── about-bps.html             # Halaman Profil Badan Pengembangan Strategis
├── biro-personalia.html       # Halaman Profil Biro Personalia & 4 Pilar
├── biro-keorganisasian.html   # Halaman Profil Biro Keorganisasian, OKR & SOP
├── style.css                  # Sistem Desain Global (Clearwave & Magic UI)
├── app.js                     # Logika Data, Autentikasi PIN, Pagination & Engine Grafik 3D
├── assets/
│   ├── logo-bem-fteic.png     # Lambang Resmi BEM FTEIC ITS
│   ├── logo-kabinet-polaris.png # Logo Kabinet Polaris 2026
│   └── foto-staf/             # Direktori Foto Resmi 94 Fungsionaris
└── README.md                  # Dokumentasi Resmi Proyek
```

---

## 🚀 Panduan Menjalankan Proyek

### 1. Langsung Lewat Browser (Offline)
Cukup klik dua kali berkas `index.html` atau buka melalui browser apa pun (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari):
```text
file:///path/ke/bem-fteic-evaluasi/index.html
```

### 2. Menggunakan Local Server (VS Code / Python)
Jika Anda menggunakan Visual Studio Code, gunakan ekstensi **Live Server**:
- Klik kanan `index.html` $\rightarrow$ pilih **"Open with Live Server"**.

Atau jalankan server sederhana melalui terminal:
```bash
# Python 3
python -m http.server 3000

# Buka http://localhost:3000 di browser
```

---

## ⚙️ Panduan Pengisian Link Spreadsheet & Nilai Fungsionaris

Seluruh konfigurasi tautan spreadsheet dan data nilai fungsionaris diatur di dalam berkas [`app.js`](file:///c:/Users/thilm/.gemini/antigravity-ide/scratch/bem-fteic-evaluasi/app.js):

### 1. Cara Input Link Spreadsheet (Google Sheets)
Terdapat 2 opsi praktis:
- **Opsi A: Satu Link Master (Global untuk Seluruh Staf)**  
  Jika seluruh fungsionaris mengisi di satu Google Spreadsheet utama (misal menggunakan tab sheet berbeda per orang atau form gabungan), cukup masukkan link-nya pada baris paling atas di `app.js`:
  ```javascript
  const MASTER_PA_SPREADSHEET_URL = "https://docs.google.com/spreadsheets/d/ID_SPREADSHEET_ANDA/edit?usp=sharing";
  ```
  *Jika `sheetUrl` individual staf kosong, tombol "Isi Lembar Spreadsheet" akan otomatis membuka link master ini.*

- **Opsi B: Link Khusus per Fungsionaris**  
  Jika masing-masing pengurus memiliki file spreadsheet pribadi tersendiri, isi langsung pada properti `"sheetUrl"` di dalam array `staffList`:
  ```javascript
  {
    "id": "staf-001",
    "nama": "Hasan",
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1bCxdPG1rLqV7Il2ALjLsSvSnl8x-QNt7RstkudCPG1E/edit?usp=sharing"
  }
  ```

### 2. Cara Input Nilai-Nilai per Fungsionaris
Secara bawaan (*default*), sistem telah menghitung skor objektif terkalibrasi secara otomatis (skala 0 - 10) lengkap dengan grafik Pie Chart 3D animasi untuk seluruh 94 anggota.

Jika Biro Personalia ingin **memasukkan nilai manual hasil sidang evaluasi** untuk fungsionaris tertentu, cukup tambahkan properti `"customScores"` pada objek staf bersangkutan di `staffList`:

- **Untuk Kabinet (Pimpinan, Wakapim, Kabiro - 7 Indikator):**
  ```javascript
  {
    "id": "staf-001",
    "nama": "Hasan",
    "customScores": {
      "Leadership": 9.5,
      "Development": 9.2,
      "Empowerment": 9.4,
      "Coordination": 9.6,
      "Representation": 9.8,
      "Administration": 9.3,
      "Exemplary": 9.7
    }
  }
  ```

- **Untuk Staf Departemen (12 Indikator):**
  ```javascript
  {
    "id": "staf-020",
    "nama": "Nama Staf",
    "customScores": {
      "Kritis": 9.0,
      "Disiplin": 8.8,
      "Inovatif": 9.2,
      "Solidaritas": 9.5,
      "Sosial": 8.9,
      "Rasa Kekeluargaan": 9.1,
      "Inisiatif": 9.0,
      "Tanggung Jawab": 9.4,
      "Etika": 9.5,
      "Pemahaman Proker": 9.0,
      "Fundamental": 9.2,
      "Responsif": 9.3
    }
  }
  ```
*Sistem akan otomatis menghitung rata-rata, persentase capaian, predikat kinerja, dan merender grafik Pie Chart 3D sesuai nilai yang diinput.*

---

## 🧭 Keselarasan Visi, Misi Kabinet Polaris & Tata Kelola Organisasi (TKO 2026)

Portal ini mengimplementasikan bahasa, nilai, dan prinsip yang tertuang dalam dokumen resmi **Tata Kelola Organisasi (TKO) BEM FTEIC ITS 2026**:
1. **Filosofi Kabinet Polaris ("Pola Harmonis")**:
   - **Pola**: Kerangka kerja terstruktur, tatanan sistematis, dan landasan kokoh.
   - **Harmonis**: Keseimbangan, keselarasan, dan sinergi antar berbagai elemen yang berbeda.
2. **Visi Resmi BEM FTEIC ITS 2026**:
   > *"Mewujudkan BEM FTEIC yang adaptif dan harmonis sebagai elevator pengembangan kapasitas mahasiswa FTEIC serta berperan komprehensif dalam masyarakat."*
3. **4 Nilai Visi**:
   - **Adaptif**: Responsif terhadap perubahan, sistem kerja fleksibel (*agile*), berbasis data, dan solutif.
   - **Harmonis**: Ekosistem saling menguatkan antar 6 jurusan FTEIC, HMD, Ormawa, dan birokrasi.
   - **Elevator**: Akselerator pertumbuhan kapasitas, kepemimpinan, dan daya saing insan FTEIC.
   - **Komprehensif**: Pendekatan holistik (akademik, minat bakat, kesejahteraan, sosial kemasyarakatan, dan organisasi).
4. **4 Misi Resmi Kabinet Polaris (Misi A, B, C, D)**:
   - Pengoptimalan sistem serta budaya kerja yang adaptif, profesional, dan humanis.
   - Penguatan sinergi kelembagaan dan perluasan jejaring strategis internal & eksternal.
   - Pengembangan kapasitas, ruang aktualisasi, dan nilai keilmuan berkelanjutan.
   - Penjagaan citra kelembagaan, kemandirian organisasi, serta penguatan peran sosial berdampak nyata.
5. **Prinsip Tata Kelola Organisasi (TKO)**:
   - **Good Student Governance**: Transparansi, partisipasi, akuntabilitas, efisiensi, dan profesionalisme.
   - **Organizational Well Being**: Kesejahteraan fisik, mental, dan emosional fungsionaris.
   - **Structured Direction**: Pola kerja sistematis, terukur via kerangka kerja OKR (*Objective & Key Results*), dan siklus monitoring terintegrasi.

*(Sesuai arahan, berkas PDF TKO tidak diunggah/di-embed ke dalam situs web; seluruh konsep dan terminologinya diintegrasikan secara organik ke dalam konten dan antarmuka portal).*

---

## 🛠️ Panduan Admin BPS: Pemetaan Email Fungsionaris & Konfigurasi Firebase Auth

Untuk mengelola akses whitelist dan integrasi Google Sign-In bagi seluruh 97 fungsionaris (3 BPH + 94 Kabinet & Staf):

### 1. Pemetaan Email Fungsionaris (`functionary_emails.json`)
1. Buka file [`functionary_emails.json`](file:///c:/Users/thilm/Downloads/GitHub%20Repo/bps-updatedv1.1/bps-updated/functionary_emails.json).
2. Anda cukup mengisi atau mengganti email Google / Gmail pribadi masing-masing fungsionaris pada field `"email"` atau menambahkannya ke array `"altEmails"`:
   ```json
   {
     "id": "staf-006",
     "name": "Muhammad Assaifunnadhif Alkhifdzi",
     "nrp": "5027241019",
     "department": "DAGRI",
     "role": "Staf Departemen Dalam Negeri",
     "email": "assaifunnadhif@gmail.com",
     "altEmails": ["5027241019@mhs.its.ac.id", "assaif@student.its.ac.id"],
     "pin": "710191"
   }
   ```
3. Jika terdapat perubahan anggota atau pembaruan rekap, jalankan skrip pembantu:
   ```bash
   python generate_email_template.py
   ```
   Skrip ini secara otomatis mengekstrak dan menyinkronkan seluruh fungsionaris dari arsip data tanpa menghapus pemetaan email yang sudah ada.

### 2. Konfigurasi Firebase Auth (`firebase-auth.js`)
Buka file [`firebase-auth.js`](file:///c:/Users/thilm/Downloads/GitHub%20Repo/bps-updatedv1.1/bps-updated/firebase-auth.js) dan tempelkan kredensial Firebase Console organisasi Anda pada variabel `firebaseConfig`:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "bps-bem-fteic-2026.firebaseapp.com",
  projectId: "bps-bem-fteic-2026",
  storageBucket: "bps-bem-fteic-2026.firebasestorage.app",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef..."
};
```
*Catatan:* Portal dilengkapi dengan *graceful local fallback*. Meskipun API key Firebase belum terhubung atau Email Provider belum diaktifkan di Firebase Console, seluruh alur masuk Google, pendaftaran akun baru, sesi login, dan proteksi PIN tetap berjalan 100% lancar.

---

## 🛡️ Hak Cipta & Pengembang

Dikembangkan dengan penuh dedikasi oleh **Biro Personalia & Biro Keorganisasian**, Badan Pengembangan Strategis, **BEM Fakultas Teknologi Elektro dan Informatika Cerdas (FTEIC)**, Institut Teknologi Sepuluh Nopember Surabaya.  
*Kabinet Polaris 2026 — Sinergis, Transparan, dan Mengapresiasi.*

