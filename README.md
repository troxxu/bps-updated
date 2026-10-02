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

## ⚙️ Konfigurasi Data & Spreadsheet Personal

Seluruh database fungsionaris berada pada array `staffList` di file [`app.js`](file:///c:/Users/thilm/.gemini/antigravity-ide/scratch/bem-fteic-evaluasi/app.js). Untuk memperbarui tautan Google Sheets atau PIN personal:

```javascript
{
  "id": "staf-001",
  "nama": "Hasan",
  "role": "Kepala Departemen Dalam Negeri",
  "roleCategory": "Pimpinan",
  "departemenBEM": "DAGRI",
  "departemenBEMFull": "Dalam Negeri",
  "nrp": "5027231073",
  "asalDepartemen": "Teknologi Informasi",
  "pin": "PecintaKopi",
  "foto": "assets/foto-staf/staf-001.jpg",
  "sheetUrl": "https://docs.google.com/spreadsheets/d/1bCxdPG1rLqV7Il2ALjLsSvSnl8x-QNt7RstkudCPG1E/edit?usp=sharing"
}
```

---

## 🛡️ Hak Cipta & Pengembang

Dikembangkan dengan penuh dedikasi oleh **Biro Personalia & Biro Keorganisasian**, Badan Pengembangan Strategis, **BEM Fakultas Teknologi Elektro dan Informatika Cerdas (FTEIC)**, Institut Teknologi Sepuluh Nopember Surabaya.  
*Kabinet Polaris 2026 — Sinergis, Transparan, dan Mengapresiasi.*
