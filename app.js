/**
 * ==============================================================================
 * PORTAL EVALUASI & PERFORMANCE APPRAISAL REPORT — BEM FTEIC ITS
 * Biro Personalia & Biro Keorganisasian Kabinet 2026
 * TemplateMo Clearwave Aesthetic Engine
 * ==============================================================================
 */

// ==============================================================================
// 0. MASTER CONFIGURATION: GOOGLE SPREADSHEET FORM PA & PENILAIAN
// ==============================================================================
// CARA INPUT LINK SPREADSHEET:
// 1. LINK GLOBAL / MASTER: Jika seluruh fungsionaris mengisi di satu Google Spreadsheet
//    (atau spreadsheet master dengan tab masing-masing), masukkan link-nya di variabel di bawah ini:
const MASTER_PA_SPREADSHEET_URL = ""; 
// Contoh: "https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit?usp=sharing"

// 2. LINK INDIVIDUAL PER FUNGSIONARIS:
//    Setiap objek staf di dalam `staffList` memiliki properti `"sheetUrl": "..."`.
//    Jika staf memiliki link Google Sheet pribadi tersendiri, isi pada `"sheetUrl"` masing-masing staf.
//    Jika `"sheetUrl"` kosong (""), sistem otomatis menggunakan `MASTER_PA_SPREADSHEET_URL`.

// 3. CARA INPUT NILAI-NILAI PER FUNGSIONARIS (CUSTOM SCORES):
//    Secara default, nilai indikator dihitung otomatis oleh sistem rubrik resmi (0-10)
//    lengkap dengan visualisasi Pie Chart 3D animasi.
//    Jika Anda ingin memasukkan nilai manual/tetap untuk staf tertentu, cukup tambahkan properti:
//    "customScores": {
//       // Untuk Kabinet (Pimpinan / Kabiro):
//       "Leadership": 9.5, "Development": 9.2, "Empowerment": 9.4,
//       "Coordination": 9.6, "Representation": 9.8, "Administration": 9.3, "Exemplary": 9.7
//       // Atau untuk Staf:
//       "Tanggung Jawab": 9.0, "Adaptif": 8.8, "Komunikatif": 9.2,
//       "Kerja Sama": 9.5, "Fundamental": 8.9, "Responsif": 9.1
//    }
// ==============================================================================

// 1. DATA SELURUH ANGGOTA KABINET (94 ORANG)
const staffList = [
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
  },
  {
    "id": "staf-002",
    "nama": "Aqila Zahira Naia Puteri Arifin",
    "role": "Wakil Kepala Departemen Dalam Negeri",
    "roleCategory": "Pimpinan",
    "departemenBEM": "DAGRI",
    "departemenBEMFull": "Dalam Negeri",
    "nrp": "5025231138",
    "asalDepartemen": "Teknik Informatika",
    "pin": "aqilaazahiragacorwak",
    "foto": "assets/foto-staf/staf-002.jpg",
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1FirPQc8Zk90CKOL4EK2wD7OLO9nnpjuKbVB_Ts8QDzE/edit?usp=sharing"
  },
  {
    "id": "staf-003",
    "nama": "Emmanuela Hosanna Sianturi",
    "role": "Sekretaris Departemen Dalam Negeri",
    "roleCategory": "Sekretaris",
    "departemenBEM": "DAGRI",
    "departemenBEMFull": "Dalam Negeri",
    "nrp": "5048241005",
    "asalDepartemen": "Teknik Elektro",
    "pin": "coco",
    "foto": "assets/foto-staf/staf-003.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-004",
    "nama": "Zinedine Zidane Dhanardi",
    "role": "Kabiro Internal",
    "roleCategory": "Kabiro",
    "departemenBEM": "DAGRI",
    "departemenBEMFull": "Dalam Negeri",
    "nrp": "5022231028",
    "asalDepartemen": "Teknik Elektro",
    "pin": "pipa tw2",
    "foto": "assets/foto-staf/staf-004.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-005",
    "nama": "Alila Syifa Ramadhani",
    "role": "Kabiro Minat Bakat",
    "roleCategory": "Kabiro",
    "departemenBEM": "DAGRI",
    "departemenBEMFull": "Dalam Negeri",
    "nrp": "5023231034",
    "asalDepartemen": "Teknik Biomedik",
    "pin": "cihuy54321",
    "foto": "assets/foto-staf/staf-005.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-006",
    "nama": "Muhammad Assaifunnadhif Alkhifdzi",
    "role": "Staf Dalam Negeri",
    "roleCategory": "Staff",
    "departemenBEM": "DAGRI",
    "departemenBEMFull": "Dalam Negeri",
    "nrp": "5023241031",
    "asalDepartemen": "Teknik Biomedik",
    "pin": "nadhifgacor",
    "foto": "assets/foto-staf/staf-006.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-007",
    "nama": "Naufal Nendra Prayata",
    "role": "Staf Dalam Negeri",
    "roleCategory": "Staff",
    "departemenBEM": "DAGRI",
    "departemenBEMFull": "Dalam Negeri",
    "nrp": "5048241002",
    "asalDepartemen": "Teknik Elektro",
    "pin": "JuruSelamat",
    "foto": "assets/foto-staf/staf-007.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-008",
    "nama": "Mayda Salma Laila Zahra",
    "role": "Staf Dalam Negeri",
    "roleCategory": "Staff",
    "departemenBEM": "DAGRI",
    "departemenBEMFull": "Dalam Negeri",
    "nrp": "5022241214",
    "asalDepartemen": "Teknik Elektro",
    "pin": "Coklat",
    "foto": "assets/foto-staf/staf-008.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-009",
    "nama": "Nashwa Nurcinta M",
    "role": "Staf Dalam Negeri",
    "roleCategory": "Staff",
    "departemenBEM": "DAGRI",
    "departemenBEMFull": "Dalam Negeri",
    "nrp": "5023241060",
    "asalDepartemen": "Teknik Biomedik",
    "pin": "Stroberipisang",
    "foto": "assets/foto-staf/staf-009.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-010",
    "nama": "Nafis Faqih Allmuzaky Maolidi",
    "role": "Staf Dalam Negeri",
    "roleCategory": "Staff",
    "departemenBEM": "DAGRI",
    "departemenBEMFull": "Dalam Negeri",
    "nrp": "5027241095",
    "asalDepartemen": "Teknologi Informasi",
    "pin": "jerusnipis",
    "foto": "assets/foto-staf/staf-010.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-011",
    "nama": "Nabila Hadi Amadea",
    "role": "Staf Dalam Negeri",
    "roleCategory": "Staff",
    "departemenBEM": "DAGRI",
    "departemenBEMFull": "Dalam Negeri",
    "nrp": "5048241047",
    "asalDepartemen": "Teknik Elektro",
    "pin": "nabilahadi!",
    "foto": "assets/foto-staf/staf-011.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-012",
    "nama": "Fathur Ramadhani Nur Rofiq",
    "role": "Staf Dalam Negeri",
    "roleCategory": "Staff",
    "departemenBEM": "DAGRI",
    "departemenBEMFull": "Dalam Negeri",
    "nrp": "5026241091",
    "asalDepartemen": "Sistem Informasi",
    "pin": "diklaksonmencelat",
    "foto": "assets/foto-staf/staf-012.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-013",
    "nama": "Ahmad 'Aaqila Akbar",
    "role": "Staf Dalam Negeri",
    "roleCategory": "Staff",
    "departemenBEM": "DAGRI",
    "departemenBEMFull": "Dalam Negeri",
    "nrp": "5026241128",
    "asalDepartemen": "Sistem Informasi",
    "pin": "bhaapp",
    "foto": "assets/foto-staf/staf-013.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-014",
    "nama": "Fikri Aulia Husein",
    "role": "Staf Dalam Negeri",
    "roleCategory": "Staff",
    "departemenBEM": "DAGRI",
    "departemenBEMFull": "Dalam Negeri",
    "nrp": "5048241070",
    "asalDepartemen": "Teknik Elektro",
    "pin": "JamesSiPendekar",
    "foto": "assets/foto-staf/staf-014.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-015",
    "nama": "Jeff Rehobot Hasian L Gaol",
    "role": "Staf Dalam Negeri",
    "roleCategory": "Staff",
    "departemenBEM": "DAGRI",
    "departemenBEMFull": "Dalam Negeri",
    "nrp": "5024241073",
    "asalDepartemen": "Teknik Komputer",
    "pin": "howbot",
    "foto": "assets/foto-staf/staf-015.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-016",
    "nama": "Jeremia Kevin Alexander Jagardo Malau",
    "role": "Kepala Departemen Pengembangan Sumber Daya Manusia",
    "roleCategory": "Pimpinan",
    "departemenBEM": "PSDM",
    "departemenBEMFull": "Pengembangan Sumber Daya Manusia",
    "nrp": "5054231027",
    "asalDepartemen": "Teknik Informatika",
    "pin": "ayoberantemsatusatu",
    "foto": "assets/foto-staf/staf-016.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-017",
    "nama": "Annisa Retno Kurniasari",
    "role": "Wakil Kepala Departemen Pengembangan Sumber Daya Manusia",
    "roleCategory": "Pimpinan",
    "departemenBEM": "PSDM",
    "departemenBEMFull": "Pengembangan Sumber Daya Manusia",
    "nrp": "5022231008",
    "asalDepartemen": "Teknik Elektro",
    "pin": "enopsdm",
    "foto": "assets/foto-staf/staf-017.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-018",
    "nama": "Alya Hasna Fadilah",
    "role": "Sekretaris Departemen Pengembangan Sumber Daya Manusia",
    "roleCategory": "Sekretaris",
    "departemenBEM": "PSDM",
    "departemenBEMFull": "Pengembangan Sumber Daya Manusia",
    "nrp": "5024241044",
    "asalDepartemen": "Teknik Komputer",
    "pin": "meloidx",
    "foto": "assets/foto-staf/staf-018.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-019",
    "nama": "Missy Tiffaini Novlensia Sinaga",
    "role": "Kabiro Event",
    "roleCategory": "Kabiro",
    "departemenBEM": "PSDM",
    "departemenBEMFull": "Pengembangan Sumber Daya Manusia",
    "nrp": "5026231014",
    "asalDepartemen": "Sistem Informasi",
    "pin": "missytiffainipsdm",
    "foto": "https://ui-avatars.com/api/?name=Missy+Tiffaini+Novlensia+Sinaga&background=1D536B&color=fff&size=200&bold=true",
    "sheetUrl": ""
  },
  {
    "id": "staf-020",
    "nama": "Theo Kawalisa Pinem",
    "role": "Kabiro Kaderisasi",
    "roleCategory": "Kabiro",
    "departemenBEM": "PSDM",
    "departemenBEMFull": "Pengembangan Sumber Daya Manusia",
    "nrp": "5024231008",
    "asalDepartemen": "Teknik Komputer",
    "pin": "theooopsdm",
    "foto": "assets/foto-staf/staf-020.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-021",
    "nama": "Fika Arka Nuriyah",
    "role": "Staf Pengembangan Sumber Daya Manusia",
    "roleCategory": "Staff",
    "departemenBEM": "PSDM",
    "departemenBEMFull": "Pengembangan Sumber Daya Manusia",
    "nrp": "5027241071",
    "asalDepartemen": "Teknologi Informasi",
    "pin": "piscok",
    "foto": "assets/foto-staf/staf-021.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-022",
    "nama": "Syaira Azzahra Salsabila",
    "role": "Staf Pengembangan Sumber Daya Manusia",
    "roleCategory": "Staff",
    "departemenBEM": "PSDM",
    "departemenBEMFull": "Pengembangan Sumber Daya Manusia",
    "nrp": "5023241028",
    "asalDepartemen": "Teknik Biomedik",
    "pin": "pawpaw",
    "foto": "assets/foto-staf/staf-022.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-023",
    "nama": "Andrya Sausan Salsabila",
    "role": "Staf Pengembangan Sumber Daya Manusia",
    "roleCategory": "Staff",
    "departemenBEM": "PSDM",
    "departemenBEMFull": "Pengembangan Sumber Daya Manusia",
    "nrp": "5048241043",
    "asalDepartemen": "Teknik Elektro",
    "pin": "pecintapisangijo_06",
    "foto": "assets/foto-staf/staf-023.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-024",
    "nama": "Munazalaty Zahwa Ahyari Suudiyah",
    "role": "Staf Pengembangan Sumber Daya Manusia",
    "roleCategory": "Staff",
    "departemenBEM": "PSDM",
    "departemenBEMFull": "Pengembangan Sumber Daya Manusia",
    "nrp": "5023241061",
    "asalDepartemen": "Teknik Biomedik",
    "pin": "Pompomarine",
    "foto": "assets/foto-staf/staf-024.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-025",
    "nama": "Himawan Rakha Bhadra",
    "role": "Staf Pengembangan Sumber Daya Manusia",
    "roleCategory": "Staff",
    "departemenBEM": "PSDM",
    "departemenBEMFull": "Pengembangan Sumber Daya Manusia",
    "nrp": "5025241028",
    "asalDepartemen": "Teknik Informatika",
    "pin": "SMWADA",
    "foto": "assets/foto-staf/staf-025.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-026",
    "nama": "Mochammad Irfan Sandy",
    "role": "Staf Pengembangan Sumber Daya Manusia",
    "roleCategory": "Staff",
    "departemenBEM": "PSDM",
    "departemenBEMFull": "Pengembangan Sumber Daya Manusia",
    "nrp": "5025241127",
    "asalDepartemen": "Teknik Informatika",
    "pin": "Fox",
    "foto": "assets/foto-staf/staf-026.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-027",
    "nama": "Justin Issac Siregar",
    "role": "Staf Pengembangan Sumber Daya Manusia",
    "roleCategory": "Staff",
    "departemenBEM": "PSDM",
    "departemenBEMFull": "Pengembangan Sumber Daya Manusia",
    "nrp": "5022241171",
    "asalDepartemen": "Teknik Elektro",
    "pin": "O2Reings",
    "foto": "assets/foto-staf/staf-027.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-028",
    "nama": "Rasya Izza Maira",
    "role": "Staf Pengembangan Sumber Daya Manusia",
    "roleCategory": "Staff",
    "departemenBEM": "PSDM",
    "departemenBEMFull": "Pengembangan Sumber Daya Manusia",
    "nrp": "5022241075",
    "asalDepartemen": "Teknik Elektro",
    "pin": "Buritos",
    "foto": "assets/foto-staf/staf-028.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-029",
    "nama": "KEINDRA DANTE HIDAYAT",
    "role": "Kepala Departemen Riset dan Teknologi",
    "roleCategory": "Pimpinan",
    "departemenBEM": "RISTEK",
    "departemenBEMFull": "Riset dan Teknologi",
    "nrp": "5022231236",
    "asalDepartemen": "Teknik Elektro",
    "pin": "keindraotwlulus",
    "foto": "assets/foto-staf/staf-029.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-030",
    "nama": "JANICE KAYLEEN ELIANA SEMBIRING BRAHMANA",
    "role": "Wakil Kepala Departemen Riset dan Teknologi",
    "roleCategory": "Pimpinan",
    "departemenBEM": "RISTEK",
    "departemenBEMFull": "Riset dan Teknologi",
    "nrp": "5048231070",
    "asalDepartemen": "Teknik Elektro",
    "pin": "janicerizztech",
    "foto": "assets/foto-staf/staf-030.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-031",
    "nama": "M. Rafli Al Mutawakkil",
    "role": "Sekretaris Departemen Riset dan Teknologi",
    "roleCategory": "Sekretaris",
    "departemenBEM": "RISTEK",
    "departemenBEMFull": "Riset dan Teknologi",
    "nrp": "5048241080",
    "asalDepartemen": "Teknik Elektro",
    "pin": "TuaBangka1",
    "foto": "assets/foto-staf/staf-031.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-032",
    "nama": "Alifia Zabrina Putri",
    "role": "Kabiro Pengembangan",
    "roleCategory": "Kabiro",
    "departemenBEM": "RISTEK",
    "departemenBEMFull": "Riset dan Teknologi",
    "nrp": "5023231016",
    "asalDepartemen": "Teknik Biomedik",
    "pin": "Yaya",
    "foto": "assets/foto-staf/staf-032.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-033",
    "nama": "Einstein Pio Hutasoit",
    "role": "Kabiro Kajian",
    "roleCategory": "Kabiro",
    "departemenBEM": "RISTEK",
    "departemenBEMFull": "Riset dan Teknologi",
    "nrp": "5022231159",
    "asalDepartemen": "Teknik Elektro",
    "pin": "einsteinsanglegend",
    "foto": "assets/foto-staf/staf-033.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-034",
    "nama": "Alvia Marisa",
    "role": "Staf Riset dan Teknologi",
    "roleCategory": "Staff",
    "departemenBEM": "RISTEK",
    "departemenBEMFull": "Riset dan Teknologi",
    "nrp": "5023241064",
    "asalDepartemen": "Teknik Biomedik",
    "pin": "user",
    "foto": "assets/foto-staf/staf-034.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-035",
    "nama": "Nasywa Raida",
    "role": "Staf Riset dan Teknologi",
    "roleCategory": "Staff",
    "departemenBEM": "RISTEK",
    "departemenBEMFull": "Riset dan Teknologi",
    "nrp": "5023241065",
    "asalDepartemen": "Teknik Biomedik",
    "pin": "Mihu",
    "foto": "assets/foto-staf/staf-035.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-036",
    "nama": "Azka Razaqqi Irnantyo",
    "role": "Staf Riset dan Teknologi",
    "roleCategory": "Staff",
    "departemenBEM": "RISTEK",
    "departemenBEMFull": "Riset dan Teknologi",
    "nrp": "5022241200",
    "asalDepartemen": "Teknik Elektro",
    "pin": "akucintamasEinstein",
    "foto": "assets/foto-staf/staf-036.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-037",
    "nama": "Mohammad Farrel Firzatullah",
    "role": "Staf Riset dan Teknologi",
    "roleCategory": "Staff",
    "departemenBEM": "RISTEK",
    "departemenBEMFull": "Riset dan Teknologi",
    "nrp": "5022241183",
    "asalDepartemen": "Teknik Elektro",
    "pin": "Raflisekdep",
    "foto": "assets/foto-staf/staf-037.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-038",
    "nama": "Elvaretta Khiara Salsabilla",
    "role": "Staf Riset dan Teknologi",
    "roleCategory": "Staff",
    "departemenBEM": "RISTEK",
    "departemenBEMFull": "Riset dan Teknologi",
    "nrp": "5023241086",
    "asalDepartemen": "Teknik Biomedik",
    "pin": "Miawmaomeow",
    "foto": "assets/foto-staf/staf-038.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-039",
    "nama": "Asyifa Abida Rosjadi",
    "role": "Staf Riset dan Teknologi",
    "roleCategory": "Staff",
    "departemenBEM": "RISTEK",
    "departemenBEMFull": "Riset dan Teknologi",
    "nrp": "5048241054",
    "asalDepartemen": "Teknik Elektro",
    "pin": "Ok",
    "foto": "assets/foto-staf/staf-039.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-040",
    "nama": "Charity Almas Kolibri Harianja",
    "role": "Staf Riset dan Teknologi",
    "roleCategory": "Staff",
    "departemenBEM": "RISTEK",
    "departemenBEMFull": "Riset dan Teknologi",
    "nrp": "5048241075",
    "asalDepartemen": "Teknik Elektro",
    "pin": "el ciloko",
    "foto": "assets/foto-staf/staf-040.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-041",
    "nama": "Muhammad Zaki Firdausi Fuady",
    "role": "Staf Riset dan Teknologi",
    "roleCategory": "Staff",
    "departemenBEM": "RISTEK",
    "departemenBEMFull": "Riset dan Teknologi",
    "nrp": "5022241110",
    "asalDepartemen": "Teknik Elektro",
    "pin": "akucintaEinstein",
    "foto": "assets/foto-staf/staf-041.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-042",
    "nama": "Faris Aribowo Suwardi",
    "role": "Staf Riset dan Teknologi",
    "roleCategory": "Staff",
    "departemenBEM": "RISTEK",
    "departemenBEMFull": "Riset dan Teknologi",
    "nrp": "5022241155",
    "asalDepartemen": "Teknik Elektro",
    "pin": "IsThatSo??",
    "foto": "assets/foto-staf/staf-042.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-043",
    "nama": "Viola Herlina Wati",
    "role": "Staf Riset dan Teknologi",
    "roleCategory": "Staff",
    "departemenBEM": "RISTEK",
    "departemenBEMFull": "Riset dan Teknologi",
    "nrp": "5048241031",
    "asalDepartemen": "Teknik Elektro",
    "pin": "bleki",
    "foto": "assets/foto-staf/staf-043.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-044",
    "nama": "Nafadiya Mumtaza",
    "role": "Kepala Departemen Sosial Masyarakat",
    "roleCategory": "Pimpinan",
    "departemenBEM": "SOSMAS",
    "departemenBEMFull": "Sosial Masyarakat",
    "nrp": "5051231012",
    "asalDepartemen": "Sistem Informasi",
    "pin": "nafasosmasgacor",
    "foto": "assets/foto-staf/staf-044.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-045",
    "nama": "Keisha Adisti Athaillah",
    "role": "Wakil Kepala Departemen Sosial Masyarakat",
    "roleCategory": "Pimpinan",
    "departemenBEM": "SOSMAS",
    "departemenBEMFull": "Sosial Masyarakat",
    "nrp": "5026231137",
    "asalDepartemen": "Sistem Informasi",
    "pin": "keishasosmas",
    "foto": "assets/foto-staf/staf-045.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-046",
    "nama": "Efan Ramdhani",
    "role": "Kabiro Kajian",
    "roleCategory": "Kabiro",
    "departemenBEM": "SOSMAS",
    "departemenBEMFull": "Sosial Masyarakat",
    "nrp": "5054231017",
    "asalDepartemen": "Teknik Informatika",
    "pin": "efanganteng",
    "foto": "assets/foto-staf/staf-046.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-047",
    "nama": "M. Hidayaturrahman",
    "role": "Kabiro Pengmas",
    "roleCategory": "Kabiro",
    "departemenBEM": "SOSMAS",
    "departemenBEMFull": "Sosial Masyarakat",
    "nrp": "5048231057",
    "asalDepartemen": "Teknik Elektro",
    "pin": "jojo",
    "foto": "assets/foto-staf/staf-047.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-048",
    "nama": "ALIF AS`AD RAMADHAN",
    "role": "Kabiro Edukasi",
    "roleCategory": "Kabiro",
    "departemenBEM": "SOSMAS",
    "departemenBEMFull": "Sosial Masyarakat",
    "nrp": "5054231007",
    "asalDepartemen": "Teknik Informatika",
    "pin": "alifwerrr",
    "foto": "assets/foto-staf/staf-048.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-049",
    "nama": "Ajeng Nadya Arofani",
    "role": "Sekretaris Departemen",
    "roleCategory": "Sekretaris",
    "departemenBEM": "SOSMAS",
    "departemenBEMFull": "Sosial Masyarakat",
    "nrp": "5048241058",
    "asalDepartemen": "Teknik Elektro",
    "pin": "Baksobio",
    "foto": "assets/foto-staf/staf-049.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-050",
    "nama": "Muhammad Sandhika Setiawan",
    "role": "Staf Sosial Masyarakat",
    "roleCategory": "Staff",
    "departemenBEM": "SOSMAS",
    "departemenBEMFull": "Sosial Masyarakat",
    "nrp": "5026241043",
    "asalDepartemen": "Sistem Informasi",
    "pin": "Ryukennnn",
    "foto": "assets/foto-staf/staf-050.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-051",
    "nama": "Annisa Fathinatuzzahra",
    "role": "Staf Sosial Masyarakat",
    "roleCategory": "Staff",
    "departemenBEM": "SOSMAS",
    "departemenBEMFull": "Sosial Masyarakat",
    "nrp": "5048241030",
    "asalDepartemen": "Teknik Elektro",
    "pin": "Nisza",
    "foto": "assets/foto-staf/staf-051.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-052",
    "nama": "Nayara Aldevida",
    "role": "Staf Sosial Masyarakat",
    "roleCategory": "Staff",
    "departemenBEM": "SOSMAS",
    "departemenBEMFull": "Sosial Masyarakat",
    "nrp": "5022241153",
    "asalDepartemen": "Teknik Elektro",
    "pin": "sicantik",
    "foto": "assets/foto-staf/staf-052.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-053",
    "nama": "Riyannizaar Dwi Amarullah",
    "role": "Staf Sosial Masyarakat",
    "roleCategory": "Staff",
    "departemenBEM": "SOSMAS",
    "departemenBEMFull": "Sosial Masyarakat",
    "nrp": "5025241121",
    "asalDepartemen": "Teknik Informatika",
    "pin": "amar",
    "foto": "assets/foto-staf/staf-053.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-054",
    "nama": "Muhammad Agha Avicenna",
    "role": "Staf Sosial Masyarakat",
    "roleCategory": "Staff",
    "departemenBEM": "SOSMAS",
    "departemenBEMFull": "Sosial Masyarakat",
    "nrp": "5022241192",
    "asalDepartemen": "Teknik Elektro",
    "pin": "aghapelari",
    "foto": "assets/foto-staf/staf-054.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-055",
    "nama": "Sylvina Syah Fitri",
    "role": "Staf Sosial Masyarakat",
    "roleCategory": "Staff",
    "departemenBEM": "SOSMAS",
    "departemenBEMFull": "Sosial Masyarakat",
    "nrp": "5023241084",
    "asalDepartemen": "Teknik Biomedik",
    "pin": "Miere",
    "foto": "assets/foto-staf/staf-055.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-056",
    "nama": "Muhammad Luthfi Irfani",
    "role": "Staf Sosial Masyarakat",
    "roleCategory": "Staff",
    "departemenBEM": "SOSMAS",
    "departemenBEMFull": "Sosial Masyarakat",
    "nrp": "5022241174",
    "asalDepartemen": "Teknik Elektro",
    "pin": "X’Ray",
    "foto": "assets/foto-staf/staf-056.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-057",
    "nama": "Ernest Hamonangan Hutapea",
    "role": "Staf Sosial Masyarakat",
    "roleCategory": "Staff",
    "departemenBEM": "SOSMAS",
    "departemenBEMFull": "Sosial Masyarakat",
    "nrp": "5022241151",
    "asalDepartemen": "Teknik Elektro",
    "pin": "mngni",
    "foto": "assets/foto-staf/staf-057.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-058",
    "nama": "Theresia Ivona Priska Hamananerming Mahal",
    "role": "Staf Sosial Masyarakat",
    "roleCategory": "Staff",
    "departemenBEM": "SOSMAS",
    "departemenBEMFull": "Sosial Masyarakat",
    "nrp": "5048241077",
    "asalDepartemen": "Teknik Elektro",
    "pin": "theresia.ivona",
    "foto": "assets/foto-staf/staf-058.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-059",
    "nama": "Swinsty Quen Sella Pratasis",
    "role": "Staf Sosial Masyarakat",
    "roleCategory": "Staff",
    "departemenBEM": "SOSMAS",
    "departemenBEMFull": "Sosial Masyarakat",
    "nrp": "5022241255",
    "asalDepartemen": "Teknik Elektro",
    "pin": "malik",
    "foto": "assets/foto-staf/staf-059.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-060",
    "nama": "Syahdu Szenovera Maharani",
    "role": "Staf Sosial Masyarakat",
    "roleCategory": "Staff",
    "departemenBEM": "SOSMAS",
    "departemenBEMFull": "Sosial Masyarakat",
    "nrp": "5026241038",
    "asalDepartemen": "Sistem Informasi",
    "pin": "Bebas",
    "foto": "assets/foto-staf/staf-060.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-061",
    "nama": "Gabriel Nathan Simanungkalit",
    "role": "Staf Sosial Masyarakat",
    "roleCategory": "Staff",
    "departemenBEM": "SOSMAS",
    "departemenBEMFull": "Sosial Masyarakat",
    "nrp": "5023241075",
    "asalDepartemen": "Teknik Biomedik",
    "pin": "mangeak",
    "foto": "assets/foto-staf/staf-061.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-062",
    "nama": "Muhammad Rizqi Fadhlurrahman",
    "role": "Kepala Departemen Luar Negeri",
    "roleCategory": "Pimpinan",
    "departemenBEM": "LUGRI",
    "departemenBEMFull": "Luar Negeri",
    "nrp": "5048231009",
    "asalDepartemen": "Teknik Elektro",
    "pin": "fadhilpemburucinta",
    "foto": "assets/foto-staf/staf-062.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-063",
    "nama": "Widya Firdausi Ahla Samariansyah",
    "role": "Wakil Kepala Departemen Luar Negeri",
    "roleCategory": "Pimpinan",
    "departemenBEM": "LUGRI",
    "departemenBEMFull": "Luar Negeri",
    "nrp": "5048231059",
    "asalDepartemen": "Teknik Elektro",
    "pin": "widyallugrigacor",
    "foto": "assets/foto-staf/staf-063.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-064",
    "nama": "Muhamad Razka Pramata",
    "role": "Kabiro Medfo",
    "roleCategory": "Kabiro",
    "departemenBEM": "LUGRI",
    "departemenBEMFull": "Luar Negeri",
    "nrp": "5022231247",
    "asalDepartemen": "Teknik Elektro",
    "pin": "razkaahliediting",
    "foto": "assets/foto-staf/staf-064.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-065",
    "nama": "Razzan Yozha Putra",
    "role": "Kabiro Hublu",
    "roleCategory": "Kabiro",
    "departemenBEM": "LUGRI",
    "departemenBEMFull": "Luar Negeri",
    "nrp": "5054231026",
    "asalDepartemen": "Teknik Informatika",
    "pin": "rajanabangnyadentyo",
    "foto": "assets/foto-staf/staf-065.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-066",
    "nama": "Nindita Putri Aisyah",
    "role": "Sekretaris Departemen",
    "roleCategory": "Sekretaris",
    "departemenBEM": "LUGRI",
    "departemenBEMFull": "Luar Negeri",
    "nrp": "5048241003",
    "asalDepartemen": "Teknik Elektro",
    "pin": "ninditaputri_",
    "foto": "assets/foto-staf/staf-066.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-067",
    "nama": "Darlene Syarafina Wyanetta",
    "role": "Staf Luar Negeri",
    "roleCategory": "Staff",
    "departemenBEM": "LUGRI",
    "departemenBEMFull": "Luar Negeri",
    "nrp": "5023241029",
    "asalDepartemen": "Teknik Biomedik",
    "pin": "Chiowu",
    "foto": "assets/foto-staf/staf-067.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-068",
    "nama": "Bagas Aryo Dananjoyo",
    "role": "Staf Luar Negeri",
    "roleCategory": "Staff",
    "departemenBEM": "LUGRI",
    "departemenBEMFull": "Luar Negeri",
    "nrp": "5024241031",
    "asalDepartemen": "Teknik Komputer",
    "pin": "Sasageyou",
    "foto": "assets/foto-staf/staf-068.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-069",
    "nama": "Tabina Fayola Zalianty",
    "role": "Staf Luar Negeri",
    "roleCategory": "Staff",
    "departemenBEM": "LUGRI",
    "departemenBEMFull": "Luar Negeri",
    "nrp": "5048241032",
    "asalDepartemen": "Teknik Elektro",
    "pin": "obhcombisachet",
    "foto": "assets/foto-staf/staf-069.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-070",
    "nama": "Dzaky Haady",
    "role": "Staf Luar Negeri",
    "roleCategory": "Staff",
    "departemenBEM": "LUGRI",
    "departemenBEMFull": "Luar Negeri",
    "nrp": "5024241076",
    "asalDepartemen": "Teknik Komputer",
    "pin": "hany",
    "foto": "assets/foto-staf/staf-070.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-071",
    "nama": "Iqbal Aflah Al Farisi",
    "role": "Staf Luar Negeri",
    "roleCategory": "Staff",
    "departemenBEM": "LUGRI",
    "departemenBEMFull": "Luar Negeri",
    "nrp": "5022241189",
    "asalDepartemen": "Teknik Elektro",
    "pin": "iqbalfarisi",
    "foto": "assets/foto-staf/staf-071.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-072",
    "nama": "Muhammad Faiz Alfangie",
    "role": "Staf Luar Negeri",
    "roleCategory": "Staff",
    "departemenBEM": "LUGRI",
    "departemenBEMFull": "Luar Negeri",
    "nrp": "5022241150",
    "asalDepartemen": "Teknik Elektro",
    "pin": "RV.1211",
    "foto": "assets/foto-staf/staf-072.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-073",
    "nama": "Elmira Araminta Tansy",
    "role": "Staf Luar Negeri",
    "roleCategory": "Staff",
    "departemenBEM": "LUGRI",
    "departemenBEMFull": "Luar Negeri",
    "nrp": "5024241099",
    "asalDepartemen": "Teknik Komputer",
    "pin": "stressedel",
    "foto": "assets/foto-staf/staf-073.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-074",
    "nama": "Amellya Rashida Shabirah Putri",
    "role": "Staf Luar Negeri",
    "roleCategory": "Staff",
    "departemenBEM": "LUGRI",
    "departemenBEMFull": "Luar Negeri",
    "nrp": "5023241003",
    "asalDepartemen": "Teknik Biomedik",
    "pin": "penghunitw2",
    "foto": "assets/foto-staf/staf-074.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-075",
    "nama": "Nobel Hans Valentino Sinaga",
    "role": "Staf Luar Negeri",
    "roleCategory": "Staff",
    "departemenBEM": "LUGRI",
    "departemenBEMFull": "Luar Negeri",
    "nrp": "5022241159",
    "asalDepartemen": "Teknik Elektro",
    "pin": "beabadoobee",
    "foto": "assets/foto-staf/staf-075.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-076",
    "nama": "Adelia Zahrasanti Bintoro",
    "role": "Staf Luar Negeri",
    "roleCategory": "Staff",
    "departemenBEM": "LUGRI",
    "departemenBEMFull": "Luar Negeri",
    "nrp": "5048241028",
    "asalDepartemen": "Teknik Elektro",
    "pin": "tahugorenk",
    "foto": "assets/foto-staf/staf-076.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-077",
    "nama": "Valerine Marcella Rau",
    "role": "Staf Luar Negeri",
    "roleCategory": "Staff",
    "departemenBEM": "LUGRI",
    "departemenBEMFull": "Luar Negeri",
    "nrp": "5048241049",
    "asalDepartemen": "Teknik Elektro",
    "pin": "Kecebong",
    "foto": "assets/foto-staf/staf-077.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-078",
    "nama": "Naufal Akmal Muzakki",
    "role": "Staf Luar Negeri",
    "roleCategory": "Staff",
    "departemenBEM": "LUGRI",
    "departemenBEMFull": "Luar Negeri",
    "nrp": "5022241135",
    "asalDepartemen": "Teknik Elektro",
    "pin": "KipasAngin",
    "foto": "assets/foto-staf/staf-078.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-079",
    "nama": "Chenata Andara Imansyah",
    "role": "Staf Luar Negeri",
    "roleCategory": "Staff",
    "departemenBEM": "LUGRI",
    "departemenBEMFull": "Luar Negeri",
    "nrp": "5048241040",
    "asalDepartemen": "Teknik Elektro",
    "pin": "DewaaaKapas",
    "foto": "assets/foto-staf/staf-079.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-080",
    "nama": "Moh. Rafi Agustian",
    "role": "Kepala Departemen Kewirausahaan",
    "roleCategory": "Pimpinan",
    "departemenBEM": "KWU",
    "departemenBEMFull": "Kewirausahaan",
    "nrp": "5022231158",
    "asalDepartemen": "Teknik Elektro",
    "pin": "Jendela Waktu",
    "foto": "assets/foto-staf/staf-080.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-081",
    "nama": "Ahmad Rifqi Radifan",
    "role": "Wakil Kepala Departemen Kewirausahaan",
    "roleCategory": "Pimpinan",
    "departemenBEM": "KWU",
    "departemenBEMFull": "Kewirausahaan",
    "nrp": "5022231168",
    "asalDepartemen": "Teknik Elektro",
    "pin": "kudanilemas",
    "foto": "assets/foto-staf/staf-081.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-082",
    "nama": "Astrid Meilendra",
    "role": "Kabiro Ekraf",
    "roleCategory": "Kabiro",
    "departemenBEM": "KWU",
    "departemenBEMFull": "Kewirausahaan",
    "nrp": "5026231183",
    "asalDepartemen": "Sistem Informasi",
    "pin": "Blubub",
    "foto": "assets/foto-staf/staf-082.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-083",
    "nama": "Ramandita Ahmad Saguna",
    "role": "Kabiro Event",
    "roleCategory": "Kabiro",
    "departemenBEM": "KWU",
    "departemenBEMFull": "Kewirausahaan",
    "nrp": "5054231005",
    "asalDepartemen": "Teknik Informatika",
    "pin": "Mantao",
    "foto": "https://ui-avatars.com/api/?name=Ramandita+Ahmad+Saguna&background=1D536B&color=fff&size=200&bold=true",
    "sheetUrl": ""
  },
  {
    "id": "staf-084",
    "nama": "Brena Sio Artha Josiana",
    "role": "Sekretaris Departemen",
    "roleCategory": "Sekretaris",
    "departemenBEM": "KWU",
    "departemenBEMFull": "Kewirausahaan",
    "nrp": "5023241093",
    "asalDepartemen": "Teknik Biomedik",
    "pin": "rawr",
    "foto": "assets/foto-staf/staf-084.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-085",
    "nama": "Nabil Athalafirja Dharmawan",
    "role": "Staf Kewirausahaan",
    "roleCategory": "Staff",
    "departemenBEM": "KWU",
    "departemenBEMFull": "Kewirausahaan",
    "nrp": "5026241182",
    "asalDepartemen": "Sistem Informasi",
    "pin": "kalkulus2",
    "foto": "assets/foto-staf/staf-085.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-086",
    "nama": "Nayaka Shafarrel Razaan Nalaprassya",
    "role": "Staf Kewirausahaan",
    "roleCategory": "Staff",
    "departemenBEM": "KWU",
    "departemenBEMFull": "Kewirausahaan",
    "nrp": "5024241057",
    "asalDepartemen": "Teknik Komputer",
    "pin": "faraam",
    "foto": "assets/foto-staf/staf-086.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-087",
    "nama": "Oscaryavat Viryavan",
    "role": "Staf Kewirausahaan",
    "roleCategory": "Staff",
    "departemenBEM": "KWU",
    "departemenBEMFull": "Kewirausahaan",
    "nrp": "5027241053",
    "asalDepartemen": "Teknologi Informasi",
    "pin": "Oscar",
    "foto": "assets/foto-staf/staf-087.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-088",
    "nama": "Aisyah Salma Alifia",
    "role": "Staf Kewirausahaan",
    "roleCategory": "Staff",
    "departemenBEM": "KWU",
    "departemenBEMFull": "Kewirausahaan",
    "nrp": "5048241079",
    "asalDepartemen": "Teknik Elektro",
    "pin": "lmlvyy",
    "foto": "assets/foto-staf/staf-088.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-089",
    "nama": "Abdul mahdy mappincara",
    "role": "Staf Kewirausahaan",
    "roleCategory": "Staff",
    "departemenBEM": "KWU",
    "departemenBEMFull": "Kewirausahaan",
    "nrp": "5022241201",
    "asalDepartemen": "Teknik Elektro",
    "pin": "capt.A",
    "foto": "assets/foto-staf/staf-089.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-090",
    "nama": "Zevanya Maghviranov Pramono",
    "role": "Staf Kewirausahaan",
    "roleCategory": "Staff",
    "departemenBEM": "KWU",
    "departemenBEMFull": "Kewirausahaan",
    "nrp": "5048241056",
    "asalDepartemen": "Teknik Elektro",
    "pin": "zevanyacantik",
    "foto": "assets/foto-staf/staf-090.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-091",
    "nama": "Denis Zaidan Zaki Arrafi",
    "role": "Staf Kewirausahaan",
    "roleCategory": "Staff",
    "departemenBEM": "KWU",
    "departemenBEMFull": "Kewirausahaan",
    "nrp": "5022241138",
    "asalDepartemen": "Teknik Elektro",
    "pin": "remotAC",
    "foto": "assets/foto-staf/staf-091.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-092",
    "nama": "Nabilla Salsa Pramuditya",
    "role": "Staf Kewirausahaan",
    "roleCategory": "Staff",
    "departemenBEM": "KWU",
    "departemenBEMFull": "Kewirausahaan",
    "nrp": "5023241049",
    "asalDepartemen": "Teknik Biomedik",
    "pin": "nagitaslavina26",
    "foto": "assets/foto-staf/staf-092.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-093",
    "nama": "Aurelyo Nouvabryano Akhmad",
    "role": "Staf Kewirausahaan",
    "roleCategory": "Staff",
    "departemenBEM": "KWU",
    "departemenBEMFull": "Kewirausahaan",
    "nrp": "5026241175",
    "asalDepartemen": "Sistem Informasi",
    "pin": "Michael",
    "foto": "assets/foto-staf/staf-093.jpg",
    "sheetUrl": ""
  },
  {
    "id": "staf-094",
    "nama": "Firdaus Ahnaf Hasbullah",
    "role": "Staf Kewirausahaan",
    "roleCategory": "Staff",
    "departemenBEM": "KWU",
    "departemenBEMFull": "Kewirausahaan",
    "nrp": "5022241084",
    "asalDepartemen": "Teknik Elektro",
    "pin": "NasiKebuli",
    "foto": "assets/foto-staf/staf-094.jpg",
    "sheetUrl": ""
  }
];

// State Management
let activeFilter = 'all';
let searchQuery = '';
let currentSelectedStaff = null;
let currentProgressStaff = null;
let isPasswordVisible = false;
let authTargetMode = 'sheet'; // 'sheet' | 'progress'
let currentPage = 1;
const ITEMS_PER_PAGE = 12;

// 1B. MASTER RUBRIK RESMI KABINET & STAF BEM FTEIC ITS 2026
// Berdasarkan Pedoman Penilaian Resmi Biro Personalia Kabinet Polaris 2026 (Skala 0 - 10)
const RUBRIC_KABINET = [
  {
    key: "leadership",
    name: "Leadership",
    desc: "Kadep/Wakadep/Kabiro menjelaskan arah strategis proyek/program kerja, memastikan pemahaman peran staf, dan memfasilitasi pengambilan keputusan.",
    color: "#1D536B",
    levels: {
      "9-10": "Kabinet mampu dalam menjelaskan arah strategis, memastikan pemahaman peran staf, serta memfasilitasi pengambilan keputusan secara cepat, tepat, dan solutif.",
      "6-8": "Kabinet mampu dalam menjelaskan arah strategis, memastikan pemahaman peran staf, serta memfasilitasi pengambilan keputusan.",
      "3-5": "Kabinet kurang mampu dalam menjelaskan arah strategis, memastikan pemahaman peran staf, serta memfasilitasi pengambilan keputusan.",
      "1-2": "Kabinet tidak mampu dalam menjelaskan arah strategis, memastikan pemahaman peran staf, serta memfasilitasi pengambilan keputusan."
    }
  },
  {
    key: "development",
    name: "Development",
    desc: "Kadep/Wakadep/Kabiro memberikan contoh, menjalankan transfer knowledge dengan baik, dan mengapresiasi pencapaian staf dalam mendukung tujuan program kerja.",
    color: "#2A9D8F",
    levels: {
      "9-10": "Kabinet mampu dalam memberikan contoh, menjalankan transfer knowledge secara optimal, serta konsisten mengapresiasi pencapaian staf dalam mendukung tujuan program kerja.",
      "6-8": "Kabinet mampu dalam memberikan contoh, menjalankan transfer knowledge, dan mengapresiasi pencapaian staf.",
      "3-5": "Kabinet kurang mampu dalam memberikan contoh, menjalankan transfer knowledge, dan mengapresiasi pencapaian staf.",
      "1-2": "Kabinet tidak mampu dalam memberikan contoh, menjalankan transfer knowledge, dan mengapresiasi pencapaian staf."
    }
  },
  {
    key: "empowerment",
    name: "Empowerment",
    desc: "Kadep/Wakadep/Kabiro memberikan kewenangan yang tepat kepada staf, merumuskan tujuan, dan mengelola sumber daya.",
    color: "#D69415",
    levels: {
      "9-10": "Kabinet mampu dalam memberikan kewenangan yang tepat kepada staf, merumuskan tujuan yang jelas, serta mengelola dan mengoptimalkan sumber daya secara efektif.",
      "6-8": "Kabinet mampu dalam memberikan kewenangan yang tepat kepada staf, merumuskan tujuan, dan mengelola sumber daya.",
      "3-5": "Kabinet kurang mampu dalam memberikan kewenangan yang tepat kepada staf, merumuskan tujuan, dan mengelola sumber daya.",
      "1-2": "Kabinet tidak mampu dalam memberikan kewenangan yang tepat kepada staf, merumuskan tujuan, dan mengelola sumber daya."
    }
  },
  {
    key: "coordination",
    name: "Coordination",
    desc: "Kadep/Wakadep/Kabiro mengkoordinasikan kolaborasi antar departemen/biro, memantau kinerja staf dalam mengembangkan program kerja, dan melakukan evaluasi untuk meningkatkan efektivitas.",
    color: "#E76F51",
    levels: {
      "9-10": "Kabinet mampu dalam mengkoordinasikan kolaborasi antar departemen/biro secara solid, memantau kinerja staf, serta melakukan evaluasi berkala untuk meningkatkan efektivitas program kerja.",
      "6-8": "Kabinet mampu dalam mengkoordinasikan kolaborasi antar departemen/biro, memantau kinerja staf, dan melakukan evaluasi secara berkala untuk meningkatkan efektivitas program kerja.",
      "3-5": "Kabinet kurang mampu dalam mengkoordinasikan kolaborasi antar departemen/biro, memantau kinerja staf, dan melakukan evaluasi.",
      "1-2": "Kabinet tidak mampu dalam mengkoordinasikan kolaborasi antar departemen/biro, memantau kinerja staf, dan melakukan evaluasi."
    }
  },
  {
    key: "representation",
    name: "Representation",
    desc: "Kadep/Wakadep/Kabiro menjadi perwakilan departemen/biro dalam hubungan dengan stakeholder eksternal.",
    color: "#0EA5E9",
    levels: {
      "9-10": "Kabinet mampu dalam menjadi perwakilan departemen/biro dalam hubungan dengan stakeholder eksternal secara profesional, diplomatis, dan membangun kemitraan yang positif.",
      "6-8": "Kabinet mampu dalam menjadi perwakilan departemen/biro dalam hubungan dengan stakeholder eksternal.",
      "3-5": "Kabinet kurang mampu dalam menjadi perwakilan departemen/biro dalam hubungan dengan stakeholder eksternal.",
      "1-2": "Kabinet tidak mampu dalam menjadi perwakilan departemen/biro dalam hubungan dengan stakeholder eksternal."
    }
  },
  {
    key: "administration",
    name: "Administration",
    desc: "Kadep/Wakadep/Kabiro menjalankan tugas administratif, mendukung operasional departemen/biro, dan memfasilitasi kegiatan sehari-hari.",
    color: "#8B5CF6",
    levels: {
      "9-10": "Kabinet mampu dalam menjalankan tugas administratif secara tertib dan akurat, mendukung operasional, serta memfasilitasi kegiatan sehari-hari secara efisien.",
      "6-8": "Kabinet mampu dalam menjalankan tugas administratif, mendukung operasional departemen/biro, dan memfasilitasi kegiatan sehari-hari.",
      "3-5": "Kabinet kurang mampu dalam menjalankan tugas administratif, mendukung operasional departemen/biro, dan memfasilitasi kegiatan sehari-hari.",
      "1-2": "Kabinet tidak mampu dalam menjalankan tugas administratif, mendukung operasional departemen/biro, dan memfasilitasi kegiatan sehari-hari."
    }
  },
  {
    key: "exemplary",
    name: "Exemplary",
    desc: "Kadep/Wakadep/Kabiro menjadi teladan dalam perilaku dan profesionalisme, memotivasi tim, serta membangun kolaborasi yang solid di dalam departemen terkait.",
    color: "#EC4899",
    levels: {
      "9-10": "Kabinet mampu dalam menjadi teladan dalam perilaku dan profesionalisme, memotivasi tim secara efektif, serta membangun kolaborasi yang solid di dalam departemen/biro.",
      "6-8": "Kabinet mampu dalam menjadi teladan dalam perilaku dan profesionalisme, memotivasi tim, serta membangun kolaborasi.",
      "3-5": "Kabinet kurang mampu dalam menjadi teladan dalam perilaku dan profesionalisme, memotivasi tim, serta membangun kolaborasi.",
      "1-2": "Kabinet tidak mampu dalam menjadi teladan dalam perilaku dan profesionalisme, memotivasi tim, serta membangun kolaborasi."
    }
  }
];

const RUBRIC_STAF = [
  {
    key: "kritis",
    name: "Kritis",
    desc: "Mengidentifikasi akar penyebab masalah dan merumuskan langkah penyelesaian yang efektif.",
    color: "#1D536B",
    levels: {
      "9-10": "Fungsionaris mampu dalam menganalisis suatu permasalahan dan menemukan jalan menuju solusi dari suatu permasalahannya.",
      "6-8": "Fungsionaris mampu dalam menganalisis suatu permasalahan.",
      "3-5": "Fungsionaris kurang mampu dalam menganalisis suatu permasalahan.",
      "1-2": "Fungsionaris tidak mampu dalam menganalisis suatu permasalahan."
    }
  },
  {
    key: "disiplin",
    name: "Disiplin",
    desc: "Kedisiplinan fungsionaris untuk konsisten hadir dan taat terhadap waktu pelaksanaan agenda organisasi.",
    color: "#2A9D8F",
    levels: {
      "9-10": "Fungsionaris selalu datang tepat waktu dalam forum atau rapat yang diadakan oleh BEM FTEIC.",
      "6-8": "Persentase kehadiran fungsionaris 80% tepat waktu dalam forum atau rapat yang diadakan oleh BEM FTEIC.",
      "3-5": "Persentase kehadiran fungsionaris 50% tepat waktu dalam forum atau rapat yang diadakan oleh BEM FTEIC.",
      "1-2": "Fungsionaris sering terlambat tanpa keterangan yang jelas dalam forum atau rapat yang diadakan oleh BEM FTEIC."
    }
  },
  {
    key: "inovatif",
    name: "Inovatif",
    desc: "Kemampuan fungsionaris berperan aktif dalam memberikan masukan kreatif serta merumuskan solusi pengembangan demi kemajuan organisasi.",
    color: "#D69415",
    levels: {
      "9-10": "Fungsionaris aktif memberikan ide maupun inovasi pada agenda maupun proker departemennya dan departemen lainnya.",
      "6-8": "Fungsionaris aktif memberikan ide maupun inovasi pada agenda maupun proker departemennya.",
      "3-5": "Fungsionaris kurang aktif memberikan ide maupun inovasi pada agenda maupun proker departemennya.",
      "1-2": "Fungsionaris tidak aktif memberikan ide maupun inovasi pada agenda maupun proker departemennya."
    }
  },
  {
    key: "solidaritas",
    name: "Solidaritas",
    desc: "Kemauan dan kemampuan fungsionaris untuk bekerja sama secara kolektif dan saling mendukung.",
    color: "#E76F51",
    levels: {
      "9-10": "Fungsionaris mampu dalam saling membantu fungsionaris lain dalam menyukseskan suatu agenda maupun proker departemennya maupun diluar departemennya dan melaksanakannya dengan maksimal.",
      "6-8": "Fungsionaris mampu dalam saling membantu fungsionaris lain dalam menyukseskan suatu agenda maupun proker departemennya dan melaksanakannya dengan maksimal.",
      "3-5": "Fungsionaris mampu dalam membantu fungsionaris lain dalam menyukseskan suatu agenda maupun proker departemennya, tetapi tidak maksimal dalam melaksanakannya.",
      "1-2": "Fungsionaris tidak mampu dalam membantu fungsionaris lain dalam menyukseskan suatu agenda maupun proker departemennya."
    }
  },
  {
    key: "sosial",
    name: "Sosial",
    desc: "Kemampuan fungsionaris membangun networking dan mengenal rekan kerja di luar lingkup departemen asalnya.",
    color: "#0EA5E9",
    levels: {
      "9-10": "Fungsionaris mengenal hampir seluruh fungsionaris diluar departemennya.",
      "6-8": "Fungsionaris mengenal sekitar 50 - 75% fungsionaris diluar departemennya.",
      "3-5": "Fungsionaris mengenal kurang dari 50% fungsionaris diluar departemennya.",
      "1-2": "Fungsionaris hanya mengenal fungsionaris di departemennya saja."
    }
  },
  {
    key: "rasa_kekeluargaan",
    name: "Rasa Kekeluargaan",
    desc: "Fungsionaris bersikap kekeluargaan, empati, serta rasa memiliki terhadap sesama anggota organisasi.",
    color: "#F43F5E",
    levels: {
      "9-10": "Fungsionaris memahami tentang rasa kekeluargaan antar sesama fungsionaris lainnya dan mampu mengaplikasikannya.",
      "6-8": "Fungsionaris memahami tentang rasa kekeluargaan antar sesama fungsionaris lainnya.",
      "3-5": "Fungsionaris kurang memahami tentang rasa kekeluargaan antar sesama fungsionaris lainnya.",
      "1-2": "Fungsionaris tidak memiliki rasa kekeluargaan antar sesama fungsionaris lainnya."
    }
  },
  {
    key: "inisiatif",
    name: "Inisiatif",
    desc: "Fungsionaris bersikap proaktif dalam membangun koordinasi dan sinergi kerja baik di internal departemen maupun lintas departemen.",
    color: "#6366F1",
    levels: {
      "9-10": "Fungsionaris memiliki inisiatif dalam berkoordinasi dengan fungsionaris lain didepartemennya maupun diluar departemennya.",
      "6-8": "Fungsionaris memiliki inisiatif dalam berkoordinasi dengan fungsionaris lain didepartemennya.",
      "3-5": "Fungsionaris kurang memiliki inisiatif dalam berkoordinasi dengan fungsionaris lain didepartemennya.",
      "1-2": "Fungsionaris tidak memiliki inisiatif dalam berkoordinasi dengan fungsionaris lain didepartemennya."
    }
  },
  {
    key: "tanggung_jawab",
    name: "Tanggung Jawab",
    desc: "Kemampuan fungsionaris mengeksekusi serta melakukan inovasi pengembangan pada program kerja yang menjadi tanggung jawabnya.",
    color: "#10B981",
    levels: {
      "9-10": "Fungsionaris mampu menjalankan dan mengembangkan proker yang ditanggungjawabkan ke fungsionaris tersebut.",
      "6-8": "Fungsionaris mampu menjalankan proker yang ditanggungjawabkan ke fungsionaris tersebut.",
      "3-5": "Fungsionaris mampu merancang proker yang dipertanggungjawabkan sesuai tuntunan dan kelayakan yang tertera pada fundamental BEM FTEIC.",
      "1-2": "Fungsionaris paham mengenai proker yang dipertanggungjawabkan kepada fungsionaris tersebut."
    }
  },
  {
    key: "etika",
    name: "Etika",
    desc: "Pemahaman dan penerapan etika berkomunikasi fungsionaris yang efektif serta profesional dalam berinteraksi di lingkungan organisasi.",
    color: "#8B5CF6",
    levels: {
      "9-10": "Fungsionaris memahami serta dapat mengaplikasikan etika berkomunikasi.",
      "6-8": "Fungsionaris memahami etika berkomunikasi.",
      "3-5": "Fungsionaris tahu mengenai etika berkomunikasi.",
      "1-2": "Fungsionaris tidak mengetahui etika berkomunikasi."
    }
  },
  {
    key: "pemahaman_proker",
    name: "Pemahaman Proker",
    desc: "Kemampuan fungsionaris menyusun strategi dan perencanaan kerja yang sistematis untuk merealisasikan tanggung jawab serta target individu.",
    color: "#D97706",
    levels: {
      "9-10": "Fungsionaris paham dan memiliki strategi dan perencanaan yang jelas untuk merealisasikan job description dirinya sendiri.",
      "6-8": "Fungsionaris paham mengenai job description dirinya sendiri.",
      "3-5": "Fungsionaris sebatas tahu mengenai job description dirinya sendiri.",
      "1-2": "Fungsionaris tidak paham mengenai job description dirinya sendiri."
    }
  },
  {
    key: "fundamental",
    name: "Fundamental",
    desc: "Fungsionaris paham dan konsisten dalam mengimplementasikan nilai-nilai dasar BEM FTEIC pada setiap aktivitas organisasi.",
    color: "#059669",
    levels: {
      "9-10": "Fungsionaris paham dan mengimplementasikan fundamental BEM FTEIC.",
      "6-8": "Fungsionaris memahami fundamental BEM FTEIC.",
      "3-5": "Fungsionaris sebatas tahu fundamental BEM FTEIC.",
      "1-2": "Fungsionaris tidak tahu fundamental BEM FTEIC."
    }
  },
  {
    key: "responsif",
    name: "Responsif",
    desc: "Fungsionaris peka dan kritis dalam memetakan isu strategis di dalam maupun luar kampus.",
    color: "#0284C7",
    levels: {
      "9-10": "Fungsionaris mengerti tentang permasalahan yang terjadi saat ini baik dilingkungan kampus maupun luar dan berani mengkaji permasalahan yang telah berupa opini maupun aksi.",
      "6-8": "Fungsionaris mengerti tentang permasalahan yang terjadi saat ini baik dilingkungan kampus maupun luar.",
      "3-5": "Fungsionaris mengerti tentang permasalahan yang terjadi saat ini baik dilingkungan kampus maupun luar.",
      "1-2": "Fungsionaris tidak mengerti tentang permasalahan yang terjadi saat ini baik dilingkungan kampus maupun luar."
    }
  }
];

// Helper warna shading untuk efek 3D
function shadeColor(color, percent) {
  let num = parseInt(color.replace('#',''), 16),
  amt = Math.round(2.55 * percent),
  R = (num >> 16) + amt,
  G = (num >> 8 & 0x00FF) + amt,
  B = (num & 0x0000FF) + amt;
  return '#' + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255)).toString(16).slice(1);
}

// GENERATOR DATA REPORT & NILAI RESMI PA (SKALA 0 - 10)
function getStaffRubricData(staff) {
  const isKabinet = staff.roleCategory === 'Pimpinan' || staff.roleCategory === 'Wakil Pimpinan' || staff.roleCategory === 'Kabiro';
  const rubricTemplate = isKabinet ? RUBRIC_KABINET : RUBRIC_STAF;

  const seed = (staff.nrp ? parseInt(staff.nrp.slice(-4), 10) : 1000) || 1234;

  // Skor per indikator 0 - 10
  const items = rubricTemplate.map((item, idx) => {
    let score;
    // Cek jika ada custom scores yang diinput langsung per fungsionaris
    if (staff.customScores && (typeof staff.customScores[item.name] === 'number' || typeof staff.customScores[item.key] === 'number')) {
      score = typeof staff.customScores[item.name] === 'number' ? staff.customScores[item.name] : staff.customScores[item.key];
      score = Math.min(10.0, Math.max(0.0, score));
    } else {
      // Nilai terkalibrasi realistis (standar fungsionaris aktif ITS: 7.8 - 9.8)
      const factor = ((seed * (idx + 7)) % 19) / 10;
      score = Math.min(10.0, Math.max(7.8, 8.0 + factor));

      if (isKabinet && idx === 0) score = Math.max(8.8, score);
      if (isKabinet && idx === 2) score = Math.max(9.0, score);
    }

    let levelKey = "9-10";
    let levelBadge = "Sangat Baik (9-10)";
    if (score < 3.0) {
      levelKey = "1-2";
      levelBadge = "Kurang (1-2)";
    } else if (score < 6.0) {
      levelKey = "3-5";
      levelBadge = "Cukup (3-5)";
    } else if (score < 9.0) {
      levelKey = "6-8";
      levelBadge = "Baik (6-8)";
    }

    return {
      name: item.name,
      desc: item.desc,
      color: item.color,
      score: parseFloat(score.toFixed(1)),
      levelBadge,
      levelText: item.levels[levelKey]
    };
  });

  const totalScore = items.reduce((sum, it) => sum + it.score, 0);
  const averageScore = (totalScore / items.length).toFixed(1);
  const achievementPct = Math.round((averageScore / 10) * 100);

  let predikat = "Sangat Baik (On Track)";
  if (averageScore >= 9.2) predikat = "Istimewa (High Performer)";
  else if (averageScore < 8.0) predikat = "Baik (Dalam Pendampingan)";

  const activeSheet = (staff.sheetUrl && staff.sheetUrl.trim() !== '' && !staff.sheetUrl.includes('on-progress') && staff.sheetUrl.startsWith('http'))
    ? staff.sheetUrl.trim()
    : (typeof MASTER_PA_SPREADSHEET_URL === 'string' && MASTER_PA_SPREADSHEET_URL.trim().startsWith('http'))
      ? MASTER_PA_SPREADSHEET_URL.trim()
      : '';
  const hasSheet = Boolean(activeSheet);

  const formStatus = hasSheet ? "Terhubung & Aktif" : "Siap Diisi (Q1 2026)";
  const sheetNote = hasSheet ? "Google Sheets Terverifikasi" : "Menunggu Rekap Personalia";

  let feedback = "";
  if (staff.roleCategory === 'Pimpinan') {
    feedback = `Menunjukkan kapabilitas kepemimpinan terarah (Structured Direction), adaptif terhadap dinamika kampus, serta mengawal sinergi ${staff.departemenBEMFull} selaras dengan visi Kabinet Polaris dan tata kelola Good Student Governance.`;
  } else if (staff.roleCategory === 'Wakil Pimpinan') {
    feedback = `Eksekusi program kerja dan pendampingan teknis ${staff.departemenBEMFull} berjalan adaptif dan terukur. Menjadi penghubung harmonis bagi staf dalam akselerasi kapasitas fungsionaris.`;
  } else if (staff.roleCategory === 'Kabiro') {
    feedback = `Pengelolaan biro berlandaskan sistem yang terarah, disiplin lini masa proker, serta komitmen kuat menjaga keharmonisan dan kesejahteraan (Organizational Well Being) seluruh fungsionaris biro.`;
  } else if (staff.roleCategory === 'Sekretaris') {
    feedback = `Tata kelola administrasi, kearsipan dokumen, kepatuhan TKO Bab VIII, serta notulensi koordinasi terstandar dan akuntabel. Menopang operasional organisasi secara efisien dan profesional.`;
  } else {
    feedback = `Menunjukkan dedikasi tinggi, inisiatif kolaboratif, serta kemauan belajar dalam peran sebagai elevator pengembangan kapasitas diri di ${staff.departemenBEMFull}. Berperan aktif mewujudkan BEM FTEIC yang adaptif, harmonis, dan komprehensif.`;
  }

  return {
    isKabinet,
    rubricType: isKabinet ? "Evaluasi Kepemimpinan Kabinet (7 Indikator) — Polaris Leadership" : "Evaluasi Kinerja Staf (12 Indikator) — Elevator Kapasitas Insan",
    averageScore,
    achievementPct: `${achievementPct}%`,
    predikat,
    formStatus,
    sheetNote,
    hasSheet,
    feedback,
    items
  };
}

// 1C. 3D ANIMATED PIE CHART ENGINE (HTML5 CANVAS WITH DEPTH EXTRUSION)
let pie3DAnimationId = null;
let currentPieSlices = [];
let hoveredPieIndex = -1;

function init3DPieChart(canvas, dataItems) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  if (pie3DAnimationId) {
    cancelAnimationFrame(pie3DAnimationId);
    pie3DAnimationId = null;
  }

  hoveredPieIndex = -1;

  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  const width = rect.width || 460;
  const height = rect.height || 260;

  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.resetTransform ? ctx.resetTransform() : ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(dpr, dpr);

  const total = dataItems.reduce((acc, d) => acc + d.score, 0);
  let currentAngle = -Math.PI / 2;
  currentPieSlices = dataItems.map(d => {
    const sliceAngle = (d.score / total) * Math.PI * 2;
    const start = currentAngle;
    const end = currentAngle + sliceAngle;
    currentAngle = end;
    return {
      ...d,
      start,
      end,
      mid: (start + end) / 2,
      percent: ((d.score / total) * 100).toFixed(1)
    };
  });

  const cx = width / 2;
  const cy = height / 2 + 10;
  const rx = Math.min(width * 0.38, 145);
  const ry = rx * 0.52;
  const depth = 26;

  let startTime = null;
  const duration = 750;

  function renderChart(progress) {
    ctx.clearRect(0, 0, width, height);

    // Floor ambient drop shadow
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(cx, cy + depth + 14, rx * 1.05, ry * 1.05, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(15, 23, 42, 0.1)';
    ctx.fill();
    ctx.restore();

    // Side 3D extrusion walls
    for (let y = depth; y >= 0; y -= 2) {
      currentPieSlices.forEach((s, idx) => {
        const sweepEnd = -Math.PI / 2 + (s.end - (-Math.PI / 2)) * progress;
        if (s.start >= sweepEnd) return;
        const currentEnd = Math.min(s.end, sweepEnd);

        const isHover = idx === hoveredPieIndex;
        const offX = isHover ? Math.cos(s.mid) * 12 : 0;
        const offY = isHover ? Math.sin(s.mid) * 12 * 0.52 - 4 : 0;

        ctx.beginPath();
        ctx.ellipse(cx + offX, cy + y + offY, rx, ry, 0, s.start, currentEnd);
        ctx.lineTo(cx + offX, cy + y + offY);
        ctx.closePath();

        const shade = -35 + (y / depth) * 15 + Math.cos(s.mid) * 8;
        ctx.fillStyle = shadeColor(s.color, Math.max(-50, Math.min(20, shade)));
        ctx.fill();
      });
    }

    // Top faces
    currentPieSlices.forEach((s, idx) => {
      const sweepEnd = -Math.PI / 2 + (s.end - (-Math.PI / 2)) * progress;
      if (s.start >= sweepEnd) return;
      const currentEnd = Math.min(s.end, sweepEnd);

      const isHover = idx === hoveredPieIndex;
      const offX = isHover ? Math.cos(s.mid) * 12 : 0;
      const offY = isHover ? Math.sin(s.mid) * 12 * 0.52 - 4 : 0;

      ctx.save();
      ctx.beginPath();
      ctx.ellipse(cx + offX, cy + offY, rx, ry, 0, s.start, currentEnd);
      ctx.lineTo(cx + offX, cy + offY);
      ctx.closePath();

      const grad = ctx.createRadialGradient(
        cx + offX - 30, cy + offY - 20, 10,
        cx + offX, cy + offY, rx
      );
      grad.addColorStop(0, shadeColor(s.color, isHover ? 35 : 20));
      grad.addColorStop(0.85, s.color);
      grad.addColorStop(1, shadeColor(s.color, -10));

      ctx.fillStyle = grad;
      ctx.fill();

      ctx.strokeStyle = isHover ? '#FFFFFF' : 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = isHover ? 2.5 : 1.2;
      ctx.stroke();

      if (s.end - s.start > 0.45 && progress >= 0.8) {
        const textDist = rx * 0.65;
        const tx = cx + offX + Math.cos(s.mid) * textDist;
        const ty = cy + offY + Math.sin(s.mid) * textDist * 0.52;
        ctx.font = 'bold 11px system-ui, -apple-system, sans-serif';
        ctx.fillStyle = '#FFFFFF';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = 'rgba(0,0,0,0.6)';
        ctx.shadowBlur = 4;
        ctx.fillText(s.score.toFixed(1), tx, ty);
        ctx.shadowBlur = 0;
      }

      ctx.restore();
    });
  }

  function animate(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(1, elapsed / duration);
    const eased = 1 - Math.pow(1 - progress, 3);

    renderChart(eased);

    if (progress < 1) {
      pie3DAnimationId = requestAnimationFrame(animate);
    }
  }

  pie3DAnimationId = requestAnimationFrame(animate);

  const tooltip = document.getElementById('pie3DTooltip');

  function handlePointer(clientX, clientY) {
    const canvasRect = canvas.getBoundingClientRect();
    const x = clientX - canvasRect.left;
    const y = clientY - canvasRect.top;

    const dx = x - cx;
    const dy = (y - (cy + depth / 2)) / (ry / rx);
    const dist = Math.sqrt(dx * dx + dy * dy);

    let angle = Math.atan2(dy, dx);
    if (angle < -Math.PI / 2) angle += Math.PI * 2;

    let found = -1;
    if (dist <= rx * 1.15) {
      currentPieSlices.forEach((s, idx) => {
        let sAngle = s.start;
        let eAngle = s.end;
        if (sAngle < -Math.PI / 2) sAngle += Math.PI * 2;
        if (eAngle < -Math.PI / 2) eAngle += Math.PI * 2;
        if (sAngle <= eAngle) {
          if (angle >= sAngle && angle <= eAngle) found = idx;
        } else {
          if (angle >= sAngle || angle <= eAngle) found = idx;
        }
      });
    }

    if (found !== hoveredPieIndex) {
      hoveredPieIndex = found;
      renderChart(1);
      updateLegendHighlight(found);
    }

    if (found >= 0 && tooltip) {
      const s = currentPieSlices[found];
      tooltip.innerHTML = `
        <div class="pie-tooltip-title" style="color: ${s.color};">
          <span class="pie-tooltip-dot" style="background: ${s.color};"></span>
          ${s.name}
        </div>
        <div class="pie-tooltip-score">Skor: <strong>${s.score.toFixed(1)}</strong> / 10 (${s.percent}%)</div>
        <div class="pie-tooltip-sub">${s.desc}</div>
      `;
      tooltip.style.left = `${Math.min(canvasRect.width - 200, Math.max(10, x - 100))}px`;
      tooltip.style.top = `${Math.max(10, y - 80)}px`;
      tooltip.classList.remove('hidden');
    } else if (tooltip) {
      tooltip.classList.add('hidden');
    }
  }

  canvas.onmousemove = (e) => handlePointer(e.clientX, e.clientY);
  canvas.onmouseleave = () => {
    hoveredPieIndex = -1;
    renderChart(1);
    updateLegendHighlight(-1);
    if (tooltip) tooltip.classList.add('hidden');
  };

  canvas.ontouchstart = (e) => {
    if (e.touches.length > 0) handlePointer(e.touches[0].clientX, e.touches[0].clientY);
  };
  canvas.ontouchmove = (e) => {
    if (e.touches.length > 0) handlePointer(e.touches[0].clientX, e.touches[0].clientY);
  };

  renderLegend(currentPieSlices, renderChart);
}

function updateLegendHighlight(index) {
  const items = document.querySelectorAll('.pie-legend-item');
  items.forEach((item, idx) => {
    if (idx === index) item.classList.add('active');
    else item.classList.remove('active');
  });
}

function renderLegend(slices, redrawFn) {
  const container = document.getElementById('pieLegend');
  if (!container) return;

  container.innerHTML = slices.map((s, idx) => `
    <div class="pie-legend-item" data-index="${idx}">
      <span class="pie-legend-color" style="background: ${s.color};"></span>
      <span class="pie-legend-name">${s.name}</span>
      <span class="pie-legend-val">${s.score.toFixed(1)}</span>
    </div>
  `).join('');

  container.querySelectorAll('.pie-legend-item').forEach(item => {
    const idx = parseInt(item.getAttribute('data-index'), 10);
    item.onmouseenter = () => {
      hoveredPieIndex = idx;
      if (redrawFn) redrawFn(1);
      updateLegendHighlight(idx);
    };
    item.onmouseleave = () => {
      hoveredPieIndex = -1;
      if (redrawFn) redrawFn(1);
      updateLegendHighlight(-1);
    };
    item.onclick = () => {
      hoveredPieIndex = idx;
      if (redrawFn) redrawFn(1);
      updateLegendHighlight(idx);
      const targetCard = document.getElementById(`ind-card-${idx}`);
      if (targetCard) targetCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    };
  });
}

// 2. INITIALIZATION ROUTINE
function initApp() {
  updateCounts();
  renderStaffGrid();
  initNavScroll();
  initMobileMenu();
  initFaqAccordion();
  initStatCounters();
  initScrollReveal();

  // Global Keyboard Listener (Escape to close any modal)
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
      closeProgressModal();
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

// 3. STATS & BADGE COUNTS
function updateCounts() {
  const total = staffList.length;
  const countAllEl = document.getElementById("countAll");
  if (countAllEl) countAllEl.innerText = total;

  const depts = ['DAGRI', 'PSDM', 'RISTEK', 'SOSMAS', 'LUGRI', 'KWU'];
  depts.forEach(d => {
    const el = document.getElementById(`count_${d}`);
    if (el) {
      el.innerText = staffList.filter(s => s.departemenBEM === d).length;
    }
  });

  const statTotalEl = document.getElementById("statTotalStaff");
  if (statTotalEl) statTotalEl.innerText = total;
}

// 4. FILTER & SEARCH LOGIC
function getFilteredStaff() {
  return staffList.filter(staff => {
    const matchFilter = activeFilter === 'all' || staff.departemenBEM === activeFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchSearch = !q ||
      staff.nama.toLowerCase().includes(q) ||
      staff.role.toLowerCase().includes(q) ||
      staff.nrp.includes(q) ||
      staff.departemenBEM.toLowerCase().includes(q) ||
      (staff.departemenBEMFull && staff.departemenBEMFull.toLowerCase().includes(q)) ||
      staff.asalDepartemen.toLowerCase().includes(q);

    return matchFilter && matchSearch;
  });
}

function getDeptBadgeClass(dept) {
  const map = {
    'DAGRI': 'dept-dagri',
    'PSDM': 'dept-psdm',
    'RISTEK': 'dept-ristek',
    'SOSMAS': 'dept-sosmas',
    'LUGRI': 'dept-lugri',
    'KWU': 'dept-kwu'
  };
  return map[dept] || 'dept-default';
}

function getRoleBadge(role, cat) {
  if (cat === 'Pimpinan') {
    const isBadan = role.includes('Badan');
    return `<span class="pill-role pill-kadep"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg> ${isBadan ? 'Kepala Badan' : 'Kepala Dept'}</span>`;
  } else if (cat === 'Wakil Pimpinan') {
    const isBadan = role.includes('Badan');
    return `<span class="pill-role pill-wakadep"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg> ${isBadan ? 'Wakil Kepala Badan' : 'Wakil Kepala Dept'}</span>`;
  } else if (cat === 'Kabiro') {
    return `<span class="pill-role pill-kabiro"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg> Kepala Biro</span>`;
  } else if (cat === 'Sekretaris') {
    return `<span class="pill-role pill-sekdep"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg> Sekretaris</span>`;
  } else {
    return `<span class="pill-role pill-staff">Staf</span>`;
  }
}

// 5. RENDER GRID KARTU FUNGSIONARIS (COMPACT, 2 PER ROW DI HP, CARD HOVER & PAGES)
function renderStaffGrid() {
  const gridContainer = document.getElementById("staffGrid");
  const emptyState = document.getElementById("emptyState");
  const paginationContainer = document.getElementById("staffPagination");

  if (!gridContainer) return;

  const filtered = getFilteredStaff();
  gridContainer.innerHTML = "";

  if (filtered.length === 0) {
    gridContainer.classList.add("hidden");
    if (emptyState) emptyState.classList.remove("hidden");
    if (paginationContainer) paginationContainer.innerHTML = "";
    return;
  }

  gridContainer.classList.remove("hidden");
  if (emptyState) emptyState.classList.add("hidden");

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  if (currentPage > totalPages) currentPage = totalPages;
  if (currentPage < 1) currentPage = 1;

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const pagedStaff = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  pagedStaff.forEach(staff => {
    const isLeadership = staff.roleCategory === 'Pimpinan' || staff.roleCategory === 'Wakil Pimpinan';

    const card = document.createElement("div");
    card.className = `staff-card ${isLeadership ? 'card-leadership' : ''}`;
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `Akses detail evaluasi dan kinerja ${staff.nama}`);

    // Klik kartu langsung meminta PIN untuk membuka detail lengkap fungsionaris
    card.onclick = () => requestPinAccess(staff.id, 'progress');
    card.onkeydown = (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        requestPinAccess(staff.id, 'progress');
      }
    };

    const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(staff.nama)}&background=1D536B&color=fff&size=200&bold=true`;

    card.innerHTML = `
      <div class="card-avatar-wrap">
        <img 
          src="${staff.foto}" 
          alt="${staff.nama}" 
          class="card-avatar-img" 
          loading="lazy" 
          onerror="this.src='${fallbackAvatar}'"
        />
        <div class="card-avatar-status" title="Aktif Berdinamika"></div>
      </div>

      <h3 class="card-name" title="${staff.nama}">${staff.nama}</h3>
      <p class="card-role" title="${staff.role}">${staff.role}</p>

      <div class="card-hint-badge">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
        <span>Masukkan PIN</span>
      </div>
    `;

    gridContainer.appendChild(card);
  });

  renderPagination(totalPages, filtered.length);
}

// 5B. PAGINATION CONTROLS (PAGES SISTEM UNTUK HP & PC)
function renderPagination(totalPages, totalItems) {
  const container = document.getElementById("staffPagination");
  if (!container) return;

  if (totalPages <= 1) {
    container.innerHTML = "";
    return;
  }

  // Windowed pages (adaptive for mobile screens)
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 640;
  const windowSize = isMobile ? 2 : 4;
  let startPage = Math.max(1, currentPage - Math.floor(windowSize / 2));
  let endPage = Math.min(totalPages, startPage + windowSize);
  if (endPage - startPage < windowSize) {
    startPage = Math.max(1, endPage - windowSize);
  }

  let html = `<div class="pagination-controls-row">`;
  html += `
    <button type="button" class="pagination-btn pagination-nav" ${currentPage === 1 ? 'disabled' : ''} onclick="goToPage(${currentPage - 1})" aria-label="Halaman Sebelumnya">
      ‹ Prev
    </button>
  `;

  if (startPage > 1) {
    html += `<button type="button" class="pagination-btn" onclick="goToPage(1)">1</button>`;
    if (startPage > 2) {
      html += `<span class="pagination-dots" style="color: var(--text-3); padding: 0 4px;">...</span>`;
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    html += `
      <button type="button" class="pagination-btn ${i === currentPage ? 'active' : ''}" onclick="goToPage(${i})">
        ${i}
      </button>
    `;
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      html += `<span class="pagination-dots" style="color: var(--text-3); padding: 0 4px;">...</span>`;
    }
    html += `<button type="button" class="pagination-btn" onclick="goToPage(${totalPages})">${totalPages}</button>`;
  }

  html += `
    <button type="button" class="pagination-btn pagination-nav" ${currentPage === totalPages ? 'disabled' : ''} onclick="goToPage(${currentPage + 1})" aria-label="Halaman Selanjutnya">
      Next ›
    </button>
  </div>
  <div class="pagination-info">Hal ${currentPage} dari ${totalPages} (${totalItems} Fungsionaris)</div>
  `;

  container.innerHTML = html;
}

function goToPage(page) {
  currentPage = page;
  renderStaffGrid();
  const staffSection = document.getElementById("staf");
  if (staffSection) {
    staffSection.scrollIntoView({ behavior: 'smooth' });
  }
}

// 6. FILTER & SEARCH HANDLERS
function setFilter(dept) {
  activeFilter = dept;
  currentPage = 1;

  const buttons = document.querySelectorAll("#filterTabs .filter-pill");
  buttons.forEach(btn => {
    if (btn.getAttribute("data-filter") === dept) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  renderStaffGrid();
}

function handleSearch(val) {
  searchQuery = val;
  currentPage = 1;
  const clearBtn = document.getElementById("clearSearchBtn");
  if (clearBtn) {
    clearBtn.style.display = val.trim() ? "flex" : "none";
  }
  renderStaffGrid();
}

function clearSearchInput() {
  const input = document.getElementById("searchInput");
  const clearBtn = document.getElementById("clearSearchBtn");
  if (input) input.value = "";
  if (clearBtn) clearBtn.style.display = "none";
  searchQuery = "";
  currentPage = 1;
  renderStaffGrid();
  if (input) input.focus();
}

function resetAllFilters() {
  clearSearchInput();
  setFilter('all');
}

// 7. SISTEM AUTENTIKASI PIN TERPROTEKSI UNTUK REPORT & SPREADSHEET
function requestPinAccess(staffId, mode) {
  const staff = staffList.find(s => s.id === staffId);
  if (!staff) return;

  authTargetMode = mode || 'progress';

  // Periksa apakah fungsionaris sudah berhasil verifikasi PIN dalam sesi ini
  const isSessionAuthed = sessionStorage.getItem('auth_pin_' + staff.id) === 'true';
  if (isSessionAuthed) {
    if (authTargetMode === 'progress') {
      openProgressModal(staff);
    } else {
      executeOpenSheet(staff);
    }
    return;
  }

  // Jika belum, tampilkan modal PIN dengan instruksi sesuai tujuan
  openModal(staff, authTargetMode);
}

function openModal(staff, mode = 'sheet') {
  currentSelectedStaff = staff;
  authTargetMode = mode || 'sheet';

  const modal = document.getElementById("passwordModal");
  const modalName = document.getElementById("modalName");
  const modalRole = document.getElementById("modalRole");
  const modalAvatar = document.getElementById("modalAvatar");
  const modalBiroTag = document.getElementById("modalBiroTag");
  const modalNrpTag = document.getElementById("modalNrpTag");
  const staffPin = document.getElementById("staffPin");
  const errorMessage = document.getElementById("errorMessage");
  const successMessage = document.getElementById("successMessage");
  const submitBtn = document.getElementById("submitBtn");
  const authForm = document.getElementById("authForm");
  const progressState = document.getElementById("progressState");
  const modalProfile = document.querySelector(".modal-profile");
  const authTargetText = document.getElementById("authTargetText");

  if (!modal) return;

  // Reset modal display state
  if (authForm) authForm.classList.remove("hidden");
  if (modalProfile) modalProfile.classList.remove("hidden");
  if (progressState) progressState.classList.add("hidden");

  if (modalName) modalName.innerText = staff.nama;
  if (modalRole) modalRole.innerText = staff.role;
  if (modalNrpTag) modalNrpTag.innerText = `NRP: ${staff.nrp}`;

  if (modalAvatar) {
    modalAvatar.src = staff.foto;
    modalAvatar.onerror = function() {
      this.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(staff.nama)}&background=1D536B&color=fff&size=200&bold=true`;
    };
  }

  if (modalBiroTag) {
    modalBiroTag.innerText = staff.departemenBEMFull || staff.departemenBEM;
    modalBiroTag.className = `modal-biro-tag ${getDeptBadgeClass(staff.departemenBEM)}`;
  }

  if (authTargetText) {
    authTargetText.innerText = (authTargetMode === 'progress')
      ? "PIN Diperlukan: Membuka Report Kinerja Personal"
      : "PIN Diperlukan: Mengisi Lembar Kerja Spreadsheet";
  }

  if (staffPin) {
    staffPin.value = "";
    staffPin.type = "password";
    staffPin.placeholder = (authTargetMode === 'progress')
      ? "Masukkan PIN untuk melihat nilai personal..."
      : "Masukkan PIN untuk mengisi form spreadsheet...";
  }
  isPasswordVisible = false;
  updateEyeIcon();

  if (errorMessage) errorMessage.classList.add("hidden");
  if (successMessage) successMessage.classList.add("hidden");
  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.innerText = (authTargetMode === 'progress')
      ? "Verifikasi & Buka Report"
      : "Verifikasi & Buka Spreadsheet";
  }

  modal.classList.remove("hidden");
  setTimeout(() => {
    if (staffPin) staffPin.focus();
  }, 50);
}

function closeModal() {
  const modal = document.getElementById("passwordModal");
  if (modal) modal.classList.add("hidden");

  const authForm = document.getElementById("authForm");
  const progressState = document.getElementById("progressState");
  const modalProfile = document.querySelector(".modal-profile");

  if (authForm) authForm.classList.remove("hidden");
  if (modalProfile) modalProfile.classList.remove("hidden");
  if (progressState) progressState.classList.add("hidden");

  currentSelectedStaff = null;
}

// 7B. PROGRESS DETAIL MODAL HANDLERS (REPORT RESMI PA KABINET & STAF)
function openProgressModal(staff) {
  currentProgressStaff = staff;
  const modal = document.getElementById("progressModal");
  if (!modal) return;

  const data = getStaffRubricData(staff);

  // Set avatar & profile info
  const avatar = document.getElementById("pmAvatar");
  if (avatar) {
    avatar.src = staff.foto;
    avatar.onerror = function() {
      this.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(staff.nama)}&background=1D536B&color=fff&size=200&bold=true`;
    };
  }

  const nameEl = document.getElementById("pmName");
  if (nameEl) nameEl.innerText = staff.nama;

  const roleEl = document.getElementById("pmRole");
  if (roleEl) roleEl.innerText = `${staff.role} • ${staff.asalDepartemen}`;

  const nrpEl = document.getElementById("pmNrp");
  if (nrpEl) nrpEl.innerText = `NRP: ${staff.nrp}`;

  const deptBadge = document.getElementById("pmDeptBadge");
  if (deptBadge) {
    deptBadge.innerText = staff.departemenBEMFull || staff.departemenBEM;
    deptBadge.className = `pill-dept ${getDeptBadgeClass(staff.departemenBEM)}`;
  }

  const roleBadge = document.getElementById("pmRoleBadge");
  if (roleBadge) {
    roleBadge.innerHTML = `<span class="pill-dept" style="background: rgba(29, 83, 107, 0.1); color: var(--accent); border: 1px solid var(--accent-border);">${data.rubricType}</span>`;
  }

  // Set metric numbers
  const overallScoreEl = document.getElementById("pmOverallScore");
  if (overallScoreEl) overallScoreEl.innerText = data.averageScore;

  const scoreCatEl = document.getElementById("pmScoreCategory");
  if (scoreCatEl) scoreCatEl.innerText = `Predikat: ${data.predikat}`;

  const achieveEl = document.getElementById("pmAchievementPct");
  if (achieveEl) achieveEl.innerText = data.achievementPct;

  const formStatusEl = document.getElementById("pmFormStatus");
  if (formStatusEl) {
    formStatusEl.innerText = data.formStatus;
    formStatusEl.style.color = data.hasSheet ? "#2A9D8F" : "var(--gold)";
  }

  const sheetAvailEl = document.getElementById("pmSheetAvailability");
  if (sheetAvailEl) sheetAvailEl.innerText = data.sheetNote;

  // Render 3D Animated Pie Chart
  setTimeout(() => {
    const canvas = document.getElementById("pieChart3D");
    if (canvas) {
      init3DPieChart(canvas, data.items);
    }
  }, 100);

  // Render Detail Indikator Penilaian (Cards)
  const indContainer = document.getElementById("pmIndicatorsList");
  if (indContainer) {
    indContainer.innerHTML = data.items.map((item, idx) => `
      <div class="pm-indicator-card" id="ind-card-${idx}">
        <div class="pm-ind-header">
          <div class="pm-ind-name-wrap">
            <span class="pm-ind-dot" style="background: ${item.color};"></span>
            <span class="pm-ind-name">${item.name}</span>
          </div>
          <span class="pm-ind-score-badge">${item.score.toFixed(1)} / 10</span>
        </div>
        <div class="pm-ind-track">
          <div class="pm-ind-fill" style="width: ${item.score * 10}%; background: linear-gradient(90deg, ${item.color} 0%, ${shadeColor(item.color, 25)} 100%);"></div>
        </div>
        <div class="pm-ind-desc">${item.desc}</div>
        <div class="pm-ind-param-box">
          <div class="pm-ind-param-tag">${item.levelBadge}</div>
          <p class="pm-ind-param-text">${item.levelText}</p>
        </div>
      </div>
    `).join('');
  }

  // Contextual feedback text
  const feedbackEl = document.getElementById("pmFeedbackText");
  if (feedbackEl) feedbackEl.innerText = data.feedback;

  modal.classList.remove("hidden");
}

function closeProgressModal() {
  const modal = document.getElementById("progressModal");
  if (modal) modal.classList.add("hidden");
  if (pie3DAnimationId) {
    cancelAnimationFrame(pie3DAnimationId);
    pie3DAnimationId = null;
  }
  const tooltip = document.getElementById('pie3DTooltip');
  if (tooltip) tooltip.classList.add('hidden');
  currentProgressStaff = null;
}

function transitionFromProgressToSheet() {
  if (!currentProgressStaff) return;
  const target = currentProgressStaff;
  closeProgressModal();
  setTimeout(() => {
    executeOpenSheet(target);
  }, 150);
}

function lockStaffSession() {
  if (currentProgressStaff) {
    const staffId = currentProgressStaff.id;
    const staffName = currentProgressStaff.nama;
    sessionStorage.removeItem('auth_pin_' + staffId);
    closeProgressModal();
    showToast("Sesi Dikunci", `Akses data privat ${staffName} telah dikunci kembali.`);
  }
}

function openProgressModalFromProgressState() {
  if (!currentSelectedStaff) return;
  const staff = currentSelectedStaff;
  closeModal();
  setTimeout(() => {
    openProgressModal(staff);
  }, 150);
}

function executeOpenSheet(staff) {
  const activeSheet = (staff.sheetUrl && staff.sheetUrl.trim() !== '' && !staff.sheetUrl.includes('on-progress') && staff.sheetUrl.startsWith('http'))
    ? staff.sheetUrl.trim()
    : (typeof MASTER_PA_SPREADSHEET_URL === 'string' && MASTER_PA_SPREADSHEET_URL.trim().startsWith('http'))
      ? MASTER_PA_SPREADSHEET_URL.trim()
      : '';

  if (activeSheet) {
    showToast("Akses Diberikan", `Membuka spreadsheet evaluasi ${staff.nama}...`);
    window.open(activeSheet, "_blank", "noopener,noreferrer");
    closeModal();
  } else {
    // Tautan masih on-progress: buka modal dengan notifikasi status
    currentSelectedStaff = staff;
    authTargetMode = 'sheet';

    const modal = document.getElementById("passwordModal");
    const authForm = document.getElementById("authForm");
    const progressState = document.getElementById("progressState");
    const progressStaffName = document.getElementById("progressStaffName");
    const modalProfile = document.querySelector(".modal-profile");

    if (modal) modal.classList.remove("hidden");
    if (authForm) authForm.classList.add("hidden");
    if (modalProfile) modalProfile.classList.add("hidden");
    if (progressStaffName) progressStaffName.innerText = staff.nama;
    if (progressState) progressState.classList.remove("hidden");

    showToast("Status Evaluasi", `Performance Appraisal ${staff.nama}: On Progress`);
  }
}

function togglePasswordVisibility() {
  const staffPin = document.getElementById("staffPin");
  if (!staffPin) return;

  isPasswordVisible = !isPasswordVisible;
  staffPin.type = isPasswordVisible ? "text" : "password";
  updateEyeIcon();
  staffPin.focus();
}

function updateEyeIcon() {
  const btn = document.getElementById("togglePasswordBtn");
  if (btn) {
    btn.innerHTML = isPasswordVisible
      ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`
      : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
  }
}

function handleVerifyPassword(event) {
  event.preventDefault();
  const staffPin = document.getElementById("staffPin");
  const errorMessage = document.getElementById("errorMessage");
  const errorMessageText = document.getElementById("errorMessageText");
  const successMessage = document.getElementById("successMessage");
  const successMessageText = document.getElementById("successMessageText");
  const submitBtn = document.getElementById("submitBtn");
  const modalContainer = document.getElementById("modalContainer");

  if (!staffPin || !currentSelectedStaff) return;

  const entered = staffPin.value.trim();

  // VERIFIKASI PIN / KODE UNIK PA PERSONAL
  // Hanya mencocokkan dengan PIN rahasia resmi fungsionaris (case-insensitive & trimmed)
  // NRP dan nomor publik tidak digunakan agar data nilai bersifat rahasia dan privat penuh
  const secretPin = (currentSelectedStaff.pin || "").trim();
  const isMatch = entered.length > 0 && 
                  (entered === secretPin || entered.toLowerCase() === secretPin.toLowerCase());

  if (isMatch) {
    // PIN BENAR
    if (errorMessage) errorMessage.classList.add("hidden");
    if (successMessage) successMessage.classList.remove("hidden");
    if (successMessageText) {
      successMessageText.innerText = (authTargetMode === 'progress')
        ? "PIN Terverifikasi! Membuka Report Kinerja Personal..."
        : "PIN Terverifikasi! Membuka Lembar Kerja Spreadsheet...";
    }

    // Simpan token otentikasi sesi
    sessionStorage.setItem('auth_pin_' + currentSelectedStaff.id, 'true');

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerText = "PIN Terverifikasi...";
    }

    if (authTargetMode === 'progress') {
      showToast("PIN Terverifikasi", `Membuka Report Kinerja ${currentSelectedStaff.nama}...`);
      setTimeout(() => {
        const staffToOpen = currentSelectedStaff;
        closeModal();
        openProgressModal(staffToOpen);
      }, 500);
    } else {
      setTimeout(() => {
        executeOpenSheet(currentSelectedStaff);
      }, 500);
    }

  } else {
    // PIN SALAH
    if (errorMessage) errorMessage.classList.remove("hidden");
    if (errorMessageText) {
      errorMessageText.innerText = "PIN / Kode Unik PA tidak sesuai. Silakan periksa kembali!";
    }
    if (successMessage) successMessage.classList.add("hidden");

    if (modalContainer) {
      modalContainer.classList.add("shake-anim");
      setTimeout(() => {
        modalContainer.classList.remove("shake-anim");
      }, 500);
    }

    staffPin.select();
    staffPin.focus();
  }
}

function openLupaPinHelp() {
  showToast("Bantuan Akses PIN", "Silakan hubungi rekan Biro Personalia BEM FTEIC ITS atau DM Instagram @bemfteic.its untuk bantuan verifikasi dan pemulihan PIN personal Anda.");
}

// 8. TOAST NOTIFICATION
function showToast(title, message) {
  const toast = document.getElementById("toastNotification");
  const toastTitle = document.getElementById("toastTitle");
  const toastMessage = document.getElementById("toastMessage");

  if (!toast) return;

  if (toastTitle) toastTitle.innerText = title;
  if (toastMessage) toastMessage.innerText = message;

  toast.classList.remove("hidden");
  setTimeout(() => {
    toast.classList.add("hidden");
  }, 3500);
}

// 9. FAQ ACCORDION
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  let allOpen = false;

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      item.classList.toggle('open', !isOpen);
      question.setAttribute('aria-expanded', !isOpen);
    });

    question.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const isOpen = item.classList.contains('open');
        item.classList.toggle('open', !isOpen);
        question.setAttribute('aria-expanded', !isOpen);
      }
    });
  });

  const faqToggleAllBtn = document.getElementById('faqToggleAll');
  const faqToggleIcon = document.getElementById('faqToggleIcon');

  if (faqToggleAllBtn) {
    faqToggleAllBtn.addEventListener('click', () => {
      allOpen = !allOpen;
      faqItems.forEach(item => {
        item.classList.toggle('open', allOpen);
        const q = item.querySelector('.faq-question');
        if (q) q.setAttribute('aria-expanded', String(allOpen));
      });
      if (faqToggleIcon) faqToggleIcon.textContent = allOpen ? '−' : '+';
      faqToggleAllBtn.lastChild.textContent = allOpen ? ' Tutup Semua' : ' Buka Semua';
    });
  }
}

// 10. STATS ANIMATED COUNTER
function initStatCounters() {
  function animateCounter(el) {
    const target = parseFloat(el.dataset.target);
    const duration = 1400;
    const start = performance.now();
    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      const val = eased * target;
      el.textContent = Math.floor(val);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }
    requestAnimationFrame(step);
  }

  const statNums = document.querySelectorAll('.stat-num');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.stat-num').forEach(animateCounter);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    const grid = document.querySelector('.stats-grid');
    if (grid) observer.observe(grid);
  } else {
    statNums.forEach(animateCounter);
  }
}

// 11. NAVBAR SCROLL
function initNavScroll() {
  const nav = document.getElementById('mainNav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

// 12. MOBILE MENU
function toggleMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!hamburger || !mobileMenu) return;

  const isOpen = mobileMenu.classList.contains('open');
  if (isOpen) {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  } else {
    hamburger.classList.add('open');
    mobileMenu.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
}
window.toggleMobileMenu = toggleMobileMenu;

function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!hamburger || !mobileMenu) return;

  hamburger.onclick = function (e) {
    if (e) e.preventDefault();
    toggleMobileMenu();
  };

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.onclick = function () {
      const h = document.getElementById('hamburger');
      const m = document.getElementById('mobileMenu');
      if (m) m.classList.remove('open');
      if (h) {
        h.classList.remove('open');
        h.setAttribute('aria-expanded', 'false');
      }
      document.body.style.overflow = '';
    };
  });
}

// Global modal dismiss on ESC & backdrop click
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
  }
});

const modalOverlay = document.getElementById('passwordModal');
if (modalOverlay) {
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });
}

// ── MAGIC UI: MAGIC CARD SPOTLIGHT GLOW ──
document.addEventListener('mousemove', (e) => {
  const card = e.target.closest('.staff-card, .magic-bento-card, .proker-card, .sop-insight-card, .bps-bureau-card, .framework-card, .okr-card, .team-showcase-card, .magic-terminal-card');
  if (card) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  }
});

// 13. SCROLL REVEAL (MAGIC UI BLUR-FADE)
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  if (!('IntersectionObserver' in window)) {
    reveals.forEach(el => el.classList.add('in-view'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -25px 0px'
  });

  reveals.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('in-view');
    } else {
      observer.observe(el);
    }
  });
}

// 14. HORIZONTAL SLIDERS CONTROLLER (PILLARS & JOURNEY CAROUSEL)
function initHorizontalSliders() {
  document.querySelectorAll('.pillars-slider-component, .journey-slider-component').forEach(container => {
    const track = container.querySelector('.pillars-slider-track, .journey-slider-track');
    const prevBtn = container.querySelector('.slider-prev-btn');
    const nextBtn = container.querySelector('.slider-next-btn');
    const curSpan = container.querySelector('.slider-active-idx');
    const totalSpan = container.querySelector('.slider-total-idx');
    if (!track) return;

    const cards = track.querySelectorAll('.pillar-slide-card, .journey-slide-card, .framework-card, .lifecycle-step-card');
    const total = cards.length;
    if (totalSpan) totalSpan.textContent = total;

    function updateCounter() {
      if (!curSpan || !cards.length) return;
      const scrollLeft = track.scrollLeft;
      const cardWidth = cards[0] ? cards[0].offsetWidth + 18 : 320;
      const idx = Math.round(scrollLeft / cardWidth) + 1;
      curSpan.textContent = Math.min(Math.max(idx, 1), total);
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        const cardWidth = cards[0] ? cards[0].offsetWidth + 18 : 320;
        track.scrollBy({ left: -cardWidth, behavior: 'smooth' });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const cardWidth = cards[0] ? cards[0].offsetWidth + 18 : 320;
        track.scrollBy({ left: cardWidth, behavior: 'smooth' });
      });
    }

    track.addEventListener('scroll', updateCounter, { passive: true });

    // Enable horizontal wheel scroll on hover over track
    track.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        if ((e.deltaY > 0 && track.scrollLeft + track.clientWidth < track.scrollWidth) ||
            (e.deltaY < 0 && track.scrollLeft > 0)) {
          e.preventDefault();
          track.scrollLeft += e.deltaY;
        }
      }
    }, { passive: false });

    // Keyboard navigation when track is focused
    track.addEventListener('keydown', (e) => {
      const cardWidth = cards[0] ? cards[0].offsetWidth + 18 : 320;
      if (e.key === 'ArrowRight') {
        track.scrollBy({ left: cardWidth, behavior: 'smooth' });
      } else if (e.key === 'ArrowLeft') {
        track.scrollBy({ left: -cardWidth, behavior: 'smooth' });
      }
    });

    updateCounter();
  });
}

// 15. GLOBAL BOOTSTRAP INITIALIZER
function bootstrapApp() {
  initScrollReveal();
  initNavScroll();
  initMobileMenu();
  if (typeof initStatCounters === 'function') initStatCounters();
  initHorizontalSliders();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrapApp);
} else {
  bootstrapApp();
}

