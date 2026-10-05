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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1xT_eEtcQSdu9ELqIMZOCNWGN_ALbB8onAeBasds2S-4/edit?gid=346760844#gid=346760844"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1yLlhJSZpop_LcBhKjFAqukYwuq4q0PtdX1x8t2SGYDc/edit?usp=sharing"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1bwGEq_kaaGC9qc9A6xa_Kc-mbHuN0MfP2AP3Y9Es08s/edit?usp=sharing"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1VAiaCt_ATtf1PiEzY8N6PXEqiCxINtQXhB8YrEl2NZM/edit?gid=346760844#gid=346760844"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1tBmAYx2YljmSI3SMua894M9T3vJxHvwlMWk1KWUmumQ/edit?gid=346760844#gid=346760844"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/13ONynqsGjp6B0AReRrhyv8lScNkB2rX4Sk5HlpUNl8Q/edit?gid=346760844#gid=346760844"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1gzCGB9GnaUVNnMcIdaBFKDzMzwgRqwA0ir2ewRf4ZE0/edit?gid=346760844#gid=346760844"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1uINBdu5hewG6cH-5zzIWMOi3LFn7iilmirr3yrK0l7M/edit?gid=346760844#gid=346760844"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1Ao1Zxbpsmz_qoJwgvjcE4AiLizXlFbcDsrTtkAdFDiw/edit?gid=346760844#gid=346760844"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1htslHcO5YFcfnFnUByk6izoqQcKm_qhfUFeguysCLyA/edit?gid=346760844#gid=346760844"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1BAC2n7vfuAe9YJASfXZQ605b2M_C2HmUwYfEEypIl_o/edit?gid=346760844#gid=346760844"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1ZVrtUOc8onczqkX2eoCWYJyiY5ODAbMDk32K716C-QE/edit?gid=346760844#gid=346760844"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1Y4l6gQEctdPS_D3LO7dOgzsjfYG0nUI9J4wclloUJcY/edit?gid=346760844#gid=346760844"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1ngpLsJ8hIqQ0L9r3u0gupakaYXmGvc0FKZZB-c2Bc_M/edit?usp=sharing"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/19x0edAi3BIwW9RZIGMJ3LGhk9tIL615YwasOwWcQ4_8/edit?usp=sharing"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1YGvqJcducY2fhqy6F82fK5HP3jlep5kH3-V7-BPq2p4/edit?gid=346760844#gid=346760844"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1aTU_NLO4_8eMG9qI7yrmOWbGEeuYaEML3-LVkwl0ph4/edit?usp=sharing"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1_okzz1tlfbqib7U6AiuAiC1AyyzUUEtmUQw6NSYQudE/edit?usp=sharing"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1vSyyoyzeX-6gJH2wtSOx2ECXnIZdDbKZTSZ4h58-UQg/edit?gid=346760844#gid=346760844"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1akScl5j76YtoXpqnkW0nUAUE8XtsMlpYkPlsJLVzUwA/edit?gid=346760844#gid=346760844"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1IvbixUOaxHf-OCHxRav6sVhb1hjlPnEl-yYo9YKX-wU/edit?gid=346760844#gid=346760844"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1wZibiak-QtoDa0olFlzSAFR-dT_a5Fnf1X6jiI-ZqC0/edit?gid=346760844#gid=346760844"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1prQ3RyzCxsEWLF1kJ2L-DmVesJX11rdrdY8D83st1uw/edit?gid=346760844#gid=346760844"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1eCLQLIw1MIYDPjT7PiMAhf7s643AQJC4CRWm2SzEmt8/edit?gid=346760844#gid=346760844"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1ZPO8dRULBUZ--TUdCJ6PnNxgzSH5Mu-Yx6Z2D4G8IIA/edit?gid=346760844#gid=346760844"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/15FBvqCTh9elis1cdTsYfBlP1bNhzt62BKNyGKuGvY3o/edit?gid=346760844#gid=346760844"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1mUceAGNSlWIDUwexbFrw2ppAFwqFl10Y66oqJ-3TaiE/edit?usp=sharing"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1XuBmW1Ht4cd4fhr9-08haYuPGRsEt5oXHhJu_eboDrw/edit?usp=sharing"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1bY13BceAmDb__dOFqJ2sbNw26ZoG4NCN4lhOb5uaoH0/edit?usp=drive_link"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1vuES6IT7JtJG7LxFp5x0c5mv5rr-VHBP8krJjboJtIg/edit?usp=sharing"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1vo6jZ79fUA2aeuQk1SjIIfGjrXgzhx6TaQTo5iHDW5w/edit?usp=sharing"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1_r9cZVwFuSuxPcDZiSZPx1nLyw1TBuv86D-WgR7fVTU/edit?usp=drive_link"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/11Ho6z4kaux-W5GySb_aSzBXGNxtOG3OrRwZYVeygyL4/edit?usp=drive_link"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1As7WB1Ryit98r6U0i33PI0zisecBPNlE4NGrA25zMio/edit?usp=drive_link"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1aRyeDMLeg4FsCNarci-rUHPRLIylC_d1RXBwaYBGxxo/edit?usp=drive_link"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/18JXvD2N-4nBj6hSMlbd8GtdExONgcwyv3PaRiU5v9Qg/edit?usp=drive_link"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1JTgmf6eykf1uUwLV2f9y9ZXYC1QF4LUK3Nogy68vF5A/edit?usp=drive_link"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1G3RwIEJ44Vbn2UMyLghqQYiwuQTAWJeyOayyMKW2_wU/edit?usp=drive_link"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/163XoC3ociekfMCAl_NAqiXdG1xFa0rH0KxGSvRLhM3g/edit?usp=drive_link"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1iojuvMqZOnQA_Lwlt6AffgW7Wsut48LTN4Cyhe1gNwM/edit?usp=drive_link"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1Yf93Xk0JhEdvZ3z4zYBG4xbnjsdqIGrsO6x3D1Lf33Q/edit?usp=drive_link"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1ZDUGTZtifi5PFBtkkkrNvrCz45HtkeBCYADFlKj5mvo/edit?usp=sharing"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1b_FKWo39JpeN--WyaZZZClDbyGu-B-ZTHib7OjUFGbA/edit?usp=sharing"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1349XCLEPkcPWGEA7ukripQRAhFu4pK-oWBLDRyR7CfA/edit?usp=sharing"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1imBCd-Yvcb8WvOUGFTyOPhs-mHZzaKP0DoFZqJ65u10/edit?usp=sharing"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1XIDRxAIocLspO-dGEWW8xuJPRQVUgpvSKyRCTr-MTnw/edit?usp=sharing"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1ywS2RP8j6OddG93phiFPkYry3dK7OFdnC7l3VpMAmgg/edit?gid=346760844#gid=346760844"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1n5945rq1eOzVjX8WrG-YeA2kxaOzZ_L3ouqxDFVH8aI/edit?gid=346760844#gid=346760844",
    "statusMahasiswa": "SP2"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1as5tuVm0oZLd1ZDdrAkefcGxTvhnV9m313rcqE34n_s/edit?gid=346760844#gid=346760844"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1KzUXtMIcdZG6QNy_-WkrlSxGY2edu3C9AqcxJPXzLDE/edit?gid=346760844#gid=346760844"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1y-m5f1AOYWIcKZyyx_ZnnCDtM9EYFn8ZbGS9rSJfIVY/edit?gid=346760844#gid=346760844"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1Cfr8qh3gdyZzm7OOolz_1_N8cA4LO26aV8NEe3Sf8wM/edit?gid=346760844#gid=346760844"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1HRXoRZK3ZbCFUheVkPm5AYHr3tQdc4KUuRJeWKuLX8g/edit?gid=346760844#gid=346760844"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1J4iVqW3g6oGrbjga1tecy3jnYBpSc172lhVnlOI8L3Y/edit?gid=346760844#gid=346760844"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1Iusx0XoBIfUgzZvfBj_4tpmtpOK87GT8GW4qhVfnrgE/edit?gid=346760844#gid=346760844"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1NG27XAZev6BYU3LZyF6_hpjOR_hb4CAmRCLwjGG_0Vo/edit?gid=346760844#gid=346760844"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1AUWGn25_ISOjfqRp-ZRk9RoT1oKu7oFVEqNcN7Zp5WE/edit?gid=346760844#gid=346760844"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1LaqUpV4Cb4CE3yRw8wv2TVMdvQ7FkTf8XsdyxpgGAws/edit?gid=346760844#gid=346760844"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1gQz3I_AaodvrE4djGTp-Wl7OzBnL0Zdspa4JS7QAspE/edit?gid=346760844#gid=346760844"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/15Y5p0RQrQp0dFFOUnOm2LwUrk6pwl4Ua6Bvrn6YhscI/edit?usp=sharing"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1i43V_xVqDhE4uyIgbqzZjvIt8zqJqlKAcLxLGrrCsiU/edit?usp=sharing"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1Zk84jALyjoaOxI9VsCQTdWs8lCGFiirvGKGqqurzm5s/edit?usp=sharing"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1qCqsAScvhTSAsIIeCcLNPdocafULX3dTWX80M1IFt04/edit?usp=sharing"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1h8yJZx6oLeL0LOZCgaJPfhQsheoZPLb2ldWUXvEsy3Q/edit?gid=346760844#gid=346760844"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1jJkCmqyTVlPicCdHHsKvyKZboFXlYArzt69F4xwSytQ/edit?gid=346760844#gid=346760844"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1VPZOnaPDFBZLZ1Th7tyZFHnJUd9H1T_ZmPJup_xEkPc/edit?gid=346760844#gid=346760844"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1r3KvwMgJpU3lnmiZdGRXoHK2ZcnnuJPAOMWOoW0hDpQ/edit?gid=346760844#gid=346760844"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1drUjS8o60eZSRff5Uv2RO4VW5i6_rNfgDCPyPvBzl44/edit?gid=346760844#gid=346760844"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1YHX1Er60bZ83Cb8q6GKifXmavQaWcO17rXOsIFKia9k/edit?gid=346760844#gid=346760844"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/17abNSGCMOVDMHKtaj-7eiCwXlkumG3YsrwzE4FfedVM/edit?gid=346760844#gid=346760844"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1NInPeqc8mmz8NIUL86TsoB1C4dc0eT1RmG5vaQIFwuc/edit?gid=346760844#gid=346760844"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1p2c6Mec0AMipM-O-UUEXs1a_r-C8ht0M5xgmdihY0j4/edit?gid=346760844#gid=346760844"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1apOdGZl62iDdvyFdQVYcDwBWAQCTceDv6kUrib1ThO0/edit?gid=346760844#gid=346760844"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1_1V0_h7ukmi-9jbDi7j35skhqyPULIMZRXgpF3JuJrE/edit?gid=346760844#gid=346760844"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1u8bdCd4M8eQb-IneEbwiCbOzbmoCD8A8lE5BFJC658o/edit?gid=346760844#gid=346760844"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1eEcWqIJZwAA561v54HPjUYwyV875UnmDdPe6AoaXslk/edit?gid=346760844#gid=346760844"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1FWhtZBALOu0mkJtdwKTkfHgxH-p8tix35ZwT789guRg/edit?gid=346760844#gid=346760844"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1mr2mVUThFIpEmO9bQRZjG_pMa_2s1SPQ8UzS7yAqazQ/edit?usp=sharing"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1MnBcmddKZzCR8SDKNYyJdqxMtZbcrEKjGMmbzg3BP50/edit?usp=sharing"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1Zv0SF0pRtzoxRDRTFeVCyEMAik7vNUdq1UJMVREpT0M/edit?usp=sharing"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/16TYrorhtMOy9mjnUDCJ4_0tCff6Y-GJyClQjXr13XiA/edit?usp=sharing"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/15ybnnkDkntzRNZMFBRH6PBPoADZU0WpIU5ktACIbFGg/edit?usp=drive_link"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/133hhKZopk7P1yYhn3AjPKku9IgjHAk5G3vtOiAQgThw/edit?usp=drive_link"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/16PNxkaRaYSJlGnEX_q4wDEgkv7QCr67nwwuduBaMkcs/edit?usp=drive_link"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1hYi6DQByVH20eyJGGIo3gEMC6GXo_YXNvHqQOGsAva8/edit?usp=drive_link"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1wleZp9b9Ym6_xxNRCk0ARoUcF_giJ8v77HGirwVIgn0/edit?usp=drive_link"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1tS03Td9GqK0mfuKyOJlfuVidIspRxmRI_HMIw3Nax3A/edit?usp=drive_link"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1KKaoTL-1Ow7ifO0x4IZW1pbRFXskColuRWcYqlwQgHE/edit?usp=drive_link"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1wt5OGEKylwzM03RBQ0pLc8NkjR0wAdIZzzCd5YsY1eI/edit?usp=drive_link"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1BycwY9WcFQIyF4IGJ8s8IGdes3kQ-OiudyDkhYPmuIU/edit?usp=drive_link"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1PgGTy7cYM-OLO4Ro1C94NQvK-fm2Pa61fDVJJl9zRp4/edit?usp=drive_link"
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
    "sheetUrl": "https://docs.google.com/spreadsheets/d/1ABwY5AMCU83YfqScAiuUxOJ04VlIAxS6VSf58PmUW0w/edit?usp=drive_link"
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

// ==============================================================================
// 1B-2. GOOGLE SPREADSHEET REAL-TIME ENGINE (OPTION 1: LIVE 360° SYNC)
// ==============================================================================
// Global memory cache untuk skor live hasil fetch Google Sheets
const liveStaffCache = {};

// Parser CSV sesuai standar RFC 4180 (mendukung koma dalam kutip & newline)
function parseCsvRows(text) {
  if (!text) return [];
  const rows = [];
  let row = [];
  let cell = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        cell += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      row.push(cell);
      cell = '';
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') i++;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = '';
    } else {
      cell += char;
    }
  }
  if (cell !== '' || row.length > 0) {
    row.push(cell);
    rows.push(row);
  }
  return rows;
}

// Normalisasi string untuk pencocokan nama & indikator
function cleanTokenStr(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Pencocokan nama fungsionaris dengan kolom spreadsheet (toleran gelar/singkatan/panggilan)
function isStaffNameMatchingCol(targetName, colCell) {
  if (!targetName || !colCell) return false;
  const targetClean = cleanTokenStr(targetName);
  const colClean = cleanTokenStr(colCell);

  if (targetClean === colClean) return true;
  if (targetClean.length >= 3 && colClean.length >= 3) {
    if (colClean.includes(targetClean) || targetClean.includes(colClean)) {
      const shorter = colClean.length < targetClean.length ? colClean : targetClean;
      if (shorter.length >= 4) return true;
    }
  }

  const tTokens = targetClean.split(' ').filter(w => w.length > 1);
  const cTokens = colClean.split(' ').filter(w => w.length > 1);
  if (tTokens.length === 0 || cTokens.length === 0) return false;

  // Filter kata-kata boilerplate header spreadsheet
  const ignoreWords = new Set(['nilai', 'indikator', 'performance', 'appraisal', 'kabinet', 'staf', 'staff', 'panduan', 'pengisian', 'biro', 'dept', 'departemen']);
  const cleanTT = tTokens.filter(w => !ignoreWords.has(w));
  const cleanCT = cTokens.filter(w => !ignoreWords.has(w));
  if (cleanTT.length === 0 || cleanCT.length === 0) return false;

  // Single token match (misal di sheet hanya ditulis "Keindra" atau "Alvia" atau "Janice")
  if (cleanCT.length === 1 && cleanTT.includes(cleanCT[0])) return true;
  if (cleanTT.length === 1 && cleanCT.includes(cleanTT[0])) return true;

  let matches = 0;
  for (const tw of cleanTT) {
    if (cleanCT.includes(tw)) matches++;
  }

  if (matches >= 2) return true;
  if (matches >= 1 && (cleanCT.length <= 2 || cleanTT.length <= 2)) return true;

  return false;
}

// Menentukan daftar tab deterministik spreadsheet evaluator berdasarkan peran target
// Template organisasi memiliki tepat 2 tab:
// - Evaluator Kabinet: 'PA Kabinet-Staf' & 'PA Kabinet-Kabinet'
// - Evaluator Staf / Sekretaris: 'PA Staf-Staf' & 'PA Staf-Kabinet'
function getDeterministicTabsForTarget(evaluator, target) {
  const isTargetKabinet = ['Pimpinan', 'Wakil Pimpinan', 'Kabiro'].includes(target.roleCategory);
  const isEvaluatorKabinet = ['Pimpinan', 'Wakil Pimpinan', 'Kabiro'].includes(evaluator.roleCategory);

  if (isTargetKabinet) {
    return isEvaluatorKabinet
      ? ['PA Kabinet-Kabinet', 'PA Staf-Kabinet']
      : ['PA Staf-Kabinet', 'PA Kabinet-Kabinet'];
  } else {
    return isEvaluatorKabinet
      ? ['PA Kabinet-Staf', 'PA Staf-Staf']
      : ['PA Staf-Staf', 'PA Kabinet-Staf'];
  }
}

// Throttling concurrency untuk request HTTP paralel di browser (mencegah bottleneck antrean)
async function mapConcurrent(items, limit, fn) {
  const results = new Array(items.length);
  let currentIndex = 0;

  async function worker() {
    while (currentIndex < items.length) {
      const idx = currentIndex++;
      try {
        results[idx] = await fn(items[idx], idx);
      } catch (err) {
        results[idx] = null;
      }
    }
  }

  const workerCount = Math.min(limit, items.length);
  const workers = Array.from({ length: workerCount }, () => worker());
  await Promise.all(workers);
  return results;
}

// Fetch single sheet CSV via GViz endpoint dengan AbortController timeout, anti-cache timestamp, dan opsi range
async function fetchSheetCsvWithTimeout(sheetId, tabName, timeoutMs = 9000, range = '') {
  let url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(tabName)}&t=${Date.now()}`;
  if (range) {
    url += `&range=${encodeURIComponent(range)}&headers=0`;
  }
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const resp = await fetch(url, { signal: controller.signal, cache: 'no-store' });
    clearTimeout(timer);
    if (!resp.ok) return null;
    const text = await resp.text();
    return parseCsvRows(text);
  } catch (err) {
    clearTimeout(timer);
    return null;
  }
}

// Escaping string untuk render aman ke DOM
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Validasi teks catatan/feedback agar tidak menyimpan angka rata-rata formula (seperti 8.75), teks boilerplate, atau nama fungsionaris
function isValidFeedbackText(text, targetStaff = null) {
  if (!text) return false;
  const trimmed = String(text).trim();
  if (trimmed.length <= 2) return false;

  // Lewati jika hanya angka/formula rata-rata (misal: "8.75", "9", "8,833333333")
  const isNumericOnly = !isNaN(parseFloat(trimmed.replace(',', '.'))) && !/[a-zA-Z]{3,}/.test(trimmed);
  if (isNumericOnly) return false;

  // Lewati jika teks adalah nama target fungsionaris yang sedang dinilai
  if (targetStaff && isStaffNameMatchingCol(targetStaff.nama, trimmed)) {
    return false;
  }

  // Lewati teks judul spreadsheet, panduan, atau contoh petunjuk pengisian
  const lower = trimmed.toLowerCase();
  if (lower.includes('performance appraisal') || lower.includes('panduan pengisian') ||
      lower.includes('contoh pengisian') || lower.includes('contoh pengsisian') || 
      lower.includes('makasih banget udah sering backup') || lower.includes('wajib diisi') ||
      lower.includes('tuliskan kebiasaan') || lower.includes('tuliskan kesan')) {
    return false;
  }

  // Lewati jika teks persis sama dengan nama salah satu fungsionaris di daftar organisasi
  if (typeof staffList !== 'undefined' && Array.isArray(staffList)) {
    const isExactName = staffList.some(s => s.nama.toLowerCase() === lower);
    if (isExactName) return false;
  }

  // Lewati error formula spreadsheet
  if (trimmed.startsWith('#DIV') || trimmed.startsWith('#REF') || trimmed.startsWith('#VALUE') || trimmed.startsWith('#NAME?')) {
    return false;
  }
  return true;
}

// Periksa apakah input hanya berupa template [Stop]: [Start]: [Continue]: tanpa tulisan apapun dari penilai
function isTemplateOnly(text) {
  if (!text) return true;
  const cleaned = String(text)
    .replace(/\[Stop\]\s*:?/gi, '')
    .replace(/\[Start\]\s*:?/gi, '')
    .replace(/\[Continue\]\s*:?/gi, '')
    .replace(/•\s*(Stop|Start|Continue)\s*:?/gi, '')
    .replace(/-\s*(Stop|Start|Continue)\s*:?/gi, '')
    .replace(/\r|\n|\t/g, '')
    .trim();
  return cleaned.length <= 2;
}

// Parser universal komponen Stop, Start, Continue
function parseSscSections(text) {
  if (!text) return null;
  let norm = text
    .replace(/(?:^|\n)\s*[•\-*]?\s*(?:\[Stop\]|Stop)\s*:?/gi, '\n[Stop]:')
    .replace(/(?:^|\n)\s*[•\-*]?\s*(?:\[Start\]|Start)\s*:?/gi, '\n[Start]:')
    .replace(/(?:^|\n)\s*[•\-*]?\s*(?:\[Continue\]|Continue)\s*:?/gi, '\n[Continue]:');

  const stopMatch = norm.match(/\[Stop\]\s*:?\s*([^\[]+?)(?=\[(?:Start|Continue)\]|$)/i);
  const startMatch = norm.match(/\[Start\]\s*:?\s*([^\[]+?)(?=\[(?:Stop|Continue)\]|$)/i);
  const contMatch = norm.match(/\[Continue\]\s*:?\s*([^\[]+?)(?=\[(?:Stop|Start)\]|$)/i);

  const stopText = stopMatch ? stopMatch[1].trim() : '';
  const startText = startMatch ? startMatch[1].trim() : '';
  const contText = contMatch ? contMatch[1].trim() : '';

  if (!stopText && !startText && !contText) return null;
  return { stop: stopText, start: startText, continue: contText };
}

// Renderer HTML terstruktur untuk evaluasi Stop, Start, Continue
function formatSscHtml(text) {
  if (!text) return '';
  const parsed = parseSscSections(text);
  if (parsed && (parsed.stop || parsed.start || parsed.continue)) {
    let html = `<div class="pm-ssc-container">`;
    html += `<div class="pm-ssc-title">Evaluasi Kinerja (Stop, Start, Continue):</div>`;
    html += `<div class="pm-ssc-grid">`;
    if (parsed.stop) {
      html += `
        <div class="pm-ssc-item pm-ssc-stop">
          <div class="pm-ssc-tag"><span class="pm-ssc-dot dot-stop"></span> STOP (Hentikan)</div>
          <div class="pm-ssc-desc">${escapeHtml(parsed.stop)}</div>
        </div>
      `;
    }
    if (parsed.start) {
      html += `
        <div class="pm-ssc-item pm-ssc-start">
          <div class="pm-ssc-tag"><span class="pm-ssc-dot dot-start"></span> START (Mulai Coba)</div>
          <div class="pm-ssc-desc">${escapeHtml(parsed.start)}</div>
        </div>
      `;
    }
    if (parsed.continue) {
      html += `
        <div class="pm-ssc-item pm-ssc-continue">
          <div class="pm-ssc-tag"><span class="pm-ssc-dot dot-continue"></span> CONTINUE (Pertahankan)</div>
          <div class="pm-ssc-desc">${escapeHtml(parsed.continue)}</div>
        </div>
      `;
    }
    html += `</div></div>`;
    return html;
  }
  return `<div class="pm-ssc-container"><div class="pm-ssc-title">Evaluasi Kinerja (Stop, Start, Continue):</div><div class="pm-peer-item-content">${escapeHtml(text)}</div></div>`;
}

// Renderer HTML terstruktur untuk Komentar Penilai (Pesan, Kesan & Harapan)
function formatPesanHtml(text) {
  if (!text) return '';
  return `
    <div class="pm-pesan-box">
      <div class="pm-pesan-header">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        <span>Kesan, Pesan &amp; Harapan:</span>
      </div>
      <div class="pm-pesan-content">"${escapeHtml(text)}"</div>
    </div>
  `;
}

// Master Asynchronous Live Score Fetcher & Weighted 360-degree Aggregator
// Rumus Pembobotan Resmi:
// Target Staf: Kabinet = 0.55, Staf = 0.35, Diri Sendiri = 0.10 (Total 1.0)
// Target Kabinet: Staf = 0.55, Kabinet = 0.35, Diri Sendiri = 0.10 (Total 1.0)
async function fetchLiveScoresForStaff(staff, forceRefresh = false) {
  if (!staff) return null;

  // Cek cache (Memory & SessionStorage) - hanya gunakan jika data terbukti berisi skor dan berumur < 30 detik
  if (!forceRefresh) {
    if (liveStaffCache[staff.id]) {
      const cached = liveStaffCache[staff.id];
      if (cached && cached.evaluatorCount > 0 && (Date.now() - (cached.cachedAt || 0) < 30 * 1000)) {
        return cached;
      }
    }
    const sessionCached = sessionStorage.getItem('live_pa_data_' + staff.id);
    if (sessionCached) {
      try {
        const parsed = JSON.parse(sessionCached);
        if (parsed && parsed.evaluatorCount > 0 && (Date.now() - (parsed.cachedAt || 0) < 30 * 1000)) {
          liveStaffCache[staff.id] = parsed;
          return parsed;
        }
      } catch (e) {}
    }
  }

  const isTargetKabinet = ['Pimpinan', 'Wakil Pimpinan', 'Kabiro'].includes(staff.roleCategory);
  const indicatorList = isTargetKabinet ? RUBRIC_KABINET : RUBRIC_STAF;

  // Dapatkan seluruh fungsionaris di departemen yang sama yang memiliki link Google Sheet
  const deptMembers = staffList.filter(s =>
    s.departemenBEM === staff.departemenBEM &&
    s.sheetUrl &&
    s.sheetUrl.includes('/d/')
  );

  const evaluators = deptMembers;

  // Fetch lembar spreadsheet evaluator secara ter-throttle (maks 5 koneksi simultan)
  const settledResults = await mapConcurrent(evaluators, 5, async (ev) => {
    const sheetIdMatch = ev.sheetUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (!sheetIdMatch) return null;
    const sheetId = sheetIdMatch[1];
    const candidateTabs = getDeterministicTabsForTarget(ev, staff);

    let foundRows = null;
    let targetColIdx = -1;
    let matchedTab = null;

    for (const tab of candidateTabs) {
      const rows = await fetchSheetCsvWithTimeout(sheetId, tab, 9000);
      if (!rows || rows.length === 0) continue;

      const maxScan = Math.min(15, rows.length);
      for (let r = 0; r < maxScan; r++) {
        const row = rows[r];
        for (let c = 0; c < row.length; c++) {
          if (isStaffNameMatchingCol(staff.nama, row[c])) {
            targetColIdx = c;
            break;
          }
        }
        if (targetColIdx !== -1) break;
      }

      if (targetColIdx !== -1) {
        foundRows = rows;
        matchedTab = tab;
        break; // Hentikan loop tab begitu kolom target ditemukan di tab utama
      }
    }

    if (!foundRows || targetColIdx === -1) return null;

    // Fetch range khusus feedback kualitatif (A54:Z75 untuk Staf, A34:Z48 untuk Kabinet)
    // Range ini memuat teks kualitatif Stop/Start/Continue dan Kesan/Pesan tanpa dominasi angka skor,
    // sehingga Google Visualization API tidak mengubah teks menjadi null.
    let feedbackRows = null;
    try {
      const isKabTargetTab = isTargetKabinet || matchedTab.endsWith('Kabinet') || (foundRows && foundRows.length < 45);
      const primaryRange = isKabTargetTab ? 'A34:Z48' : 'A54:Z75';
      const secondaryRange = isKabTargetTab ? 'A54:Z75' : 'A34:Z48';

      feedbackRows = await fetchSheetCsvWithTimeout(sheetId, matchedTab, 6000, primaryRange);
      if (!feedbackRows || feedbackRows.length === 0) {
        feedbackRows = await fetchSheetCsvWithTimeout(sheetId, matchedTab, 5000, secondaryRange);
      }
    } catch (e) {
      console.warn("Feedback range fetch notice:", e);
    }

    return { evaluator: ev, tabName: matchedTab, rows: foundRows, feedbackRows, colIdx: targetColIdx };
  });

  // Map nilai per indikator dikelompokkan ke dalam 3 tier: kabinet, staf, self
  const scoresByGroup = {};
  indicatorList.forEach(ind => {
    scoresByGroup[ind.key] = {
      kabinet: [],
      staf: [],
      self: []
    };
  });

  const collectedFeedback = [];
  const activeKabinetEvaluators = new Set();
  const activeStafEvaluators = new Set();
  let hasSelfAssessment = false;

  settledResults.forEach(item => {
    if (!item) return;
    const { evaluator, rows, feedbackRows, colIdx } = item;

    const isSelf = evaluator.id === staff.id;
    const isKab = ['Pimpinan', 'Wakil Pimpinan', 'Kabiro'].includes(evaluator.roleCategory);
    const grp = isSelf ? 'self' : (isKab ? 'kabinet' : 'staf');

    let evaluatorContributedScore = false;

    // 1. Ekstraksi skor indikator numerik dari tabel utama
    for (let r = 0; r < rows.length; r++) {
      const row = rows[r];
      if (row.length <= colIdx) continue;

      // Pencocokan indikator spesifik pada kolom nama indikator (row[1] atau row[0])
      const indCell = cleanTokenStr(row[1] || row[0] || '');

      indicatorList.forEach(ind => {
        const indNameClean = cleanTokenStr(ind.name);
        const indKeyClean = cleanTokenStr(ind.key);

        const isMatch = indCell === indNameClean ||
                        indCell.startsWith(indNameClean) ||
                        indCell === indKeyClean ||
                        (indCell.length > 2 && indNameClean.startsWith(indCell));

        if (isMatch) {
          const rawCell = (row[colIdx] || '').trim().replace(',', '.');
          const numVal = parseFloat(rawCell);
          if (!isNaN(numVal) && numVal > 0 && numVal <= 20) {
            const normalized = numVal > 10 ? numVal / 2.0 : numVal;
            scoresByGroup[ind.key][grp].push(normalized);
            evaluatorContributedScore = true;
          }
        }
      });
    }

    // 2. Ekstraksi catatan dan evaluasi kualitatif (ANONIM - TIDAK MENYIMPAN NAMA PENILAI)
    // Cek feedbackRows (range khusus kualitatif di bagian bawah spreadsheet yang bebas dari tipe data angka)
    let sscText = "";
    let pesanText = "";

    const candidateSources = (feedbackRows && feedbackRows.length > 0) ? [feedbackRows] : [];

    for (const rList of candidateSources) {
      if (sscText && pesanText) break;

      for (let r = 0; r < rList.length; r++) {
        const row = rList[r];
        if (row.length <= colIdx) continue;

        const headerText = cleanTokenStr((row[0] || '') + ' ' + (row[1] || '') + ' ' + (row[2] || ''));
        const rawContent = (row[colIdx] || '').trim();

        if (!isValidFeedbackText(rawContent, staff)) continue;

        const isSscRow = headerText.includes('stop') || headerText.includes('start') || headerText.includes('continue') ||
                         headerText.includes('kebiasaan') || headerText.includes('dihentikan') ||
                         rawContent.toLowerCase().includes('[stop]') || rawContent.toLowerCase().includes('[start]') || rawContent.toLowerCase().includes('[continue]');

        if (isSscRow && !sscText) {
          if (!isTemplateOnly(rawContent)) {
            sscText = rawContent;
          }
          continue;
        }

        const isPesanRow = headerText.includes('pesan') || headerText.includes('kesan') || headerText.includes('harapan');
        if (isPesanRow && !pesanText) {
          if (!isTemplateOnly(rawContent)) {
            pesanText = rawContent;
          }
          continue;
        }
      }
    }

    // Hanya masukkan masukan dari rekan (evaluasi orang lain ke fungsionaris ini)
    if (!isSelf && (sscText || pesanText)) {
      collectedFeedback.push({
        evaluatorRole: isKab ? 'Kabinet' : 'Staf',
        stopStartContinue: sscText,
        pesanKesan: pesanText,
        text: [sscText, pesanText].filter(Boolean).join('\n\n')
      });
    }

    if (evaluatorContributedScore) {
      if (isSelf) {
        hasSelfAssessment = true;
      } else if (isKab) {
        activeKabinetEvaluators.add(evaluator.id);
      } else {
        activeStafEvaluators.add(evaluator.id);
      }
    }
  });

  // Bobot Resmi Sesuai Arahan:
  // Untuk Menilai Staf: Kabinet = 0.55, Staf = 0.35, Diri Sendiri = 0.10 (Total = 1.0)
  // Untuk Menilai Kabinet: Staf = 0.55, Kabinet = 0.35, Diri Sendiri = 0.10 (Total = 1.0)
  const weightKabinet = isTargetKabinet ? 0.35 : 0.55;
  const weightStaf = isTargetKabinet ? 0.55 : 0.35;
  const weightSelf = 0.10;

  const calculatedScores = {};
  let validIndicatorCount = 0;

  indicatorList.forEach(ind => {
    const kabinetScores = scoresByGroup[ind.key]['kabinet'];
    const stafScores = scoresByGroup[ind.key]['staf'];
    const selfScores = scoresByGroup[ind.key]['self'];

    const kabAvg = kabinetScores.length > 0 ? (kabinetScores.reduce((a, b) => a + b, 0) / kabinetScores.length) : null;
    const stafAvg = stafScores.length > 0 ? (stafScores.reduce((a, b) => a + b, 0) / stafScores.length) : null;
    const selfAvg = selfScores.length > 0 ? (selfScores.reduce((a, b) => a + b, 0) / selfScores.length) : null;

    let activeWeights = 0;
    let weightedSum = 0;

    if (kabAvg !== null) {
      weightedSum += weightKabinet * kabAvg;
      activeWeights += weightKabinet;
    }
    if (stafAvg !== null) {
      weightedSum += weightStaf * stafAvg;
      activeWeights += weightStaf;
    }
    if (selfAvg !== null) {
      weightedSum += weightSelf * selfAvg;
      activeWeights += weightSelf;
    }

    if (activeWeights > 0) {
      const finalScore = weightedSum / activeWeights;
      calculatedScores[ind.key] = {
        average: parseFloat(finalScore.toFixed(1)),
        rawScore: finalScore,
        kabinetAvg: kabAvg !== null ? parseFloat(kabAvg.toFixed(1)) : null,
        stafAvg: stafAvg !== null ? parseFloat(stafAvg.toFixed(1)) : null,
        selfAvg: selfAvg !== null ? parseFloat(selfAvg.toFixed(1)) : null,
        kabCount: kabinetScores.length,
        stafCount: stafScores.length,
        selfCount: selfScores.length,
        isTargetKabinet,
        weights: {
          kabinet: weightKabinet,
          staf: weightStaf,
          self: weightSelf
        }
      };
      validIndicatorCount++;
    }
  });

  const now = new Date();
  const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';
  const totalEvaluatorCount = activeKabinetEvaluators.size + activeStafEvaluators.size + (hasSelfAssessment ? 1 : 0);

  const liveResult = {
    isLive: validIndicatorCount > 0,
    scores: calculatedScores,
    peerFeedback: collectedFeedback,
    evaluatorCount: totalEvaluatorCount,
    kabinetEvaluatorCount: activeKabinetEvaluators.size,
    stafEvaluatorCount: activeStafEvaluators.size,
    hasSelfAssessment,
    isTargetKabinet,
    weights: {
      kabinet: weightKabinet,
      staf: weightStaf,
      self: weightSelf
    },
    timestamp: timeStr,
    cachedAt: Date.now()
  };

  // Simpan ke memory & session cache hanya jika sudah ada evaluator yang mengisi
  if (totalEvaluatorCount > 0 && validIndicatorCount > 0) {
    liveStaffCache[staff.id] = liveResult;
    try {
      sessionStorage.setItem('live_pa_data_' + staff.id, JSON.stringify(liveResult));
    } catch (e) {}
  } else {
    delete liveStaffCache[staff.id];
    try {
      sessionStorage.removeItem('live_pa_data_' + staff.id);
    } catch (e) {}
  }

  return liveResult;
}

// Controller tombol "Sinkronkan Live" di dalam Progress Modal
async function refreshLiveScoreCurrentStaff() {
  if (!currentProgressStaff) return;
  const staff = currentProgressStaff;

  const refreshBtn = document.getElementById("pmRefreshBtn");
  const refreshBtnText = document.getElementById("pmRefreshBtnText");
  if (refreshBtn) refreshBtn.classList.add("refreshing");
  if (refreshBtnText) refreshBtnText.innerText = "Menyinkronkan...";

  try {
    delete liveStaffCache[staff.id];
    sessionStorage.removeItem('live_pa_data_' + staff.id);

    showToast("Sinkronisasi Berjalan", `Mengambil pembaruan nilai terkini ${staff.nama} dari Google Sheets...`);
    const freshLiveData = await fetchLiveScoresForStaff(staff, true);
    openProgressModal(staff, freshLiveData);

    showToast("Sinkronisasi Selesai", `Data evaluasi ${staff.nama} berhasil diperbarui (${freshLiveData.timestamp}).`);
  } catch (err) {
    showToast("Info", "Pembaruan selesai dengan data terbaru.");
    openProgressModal(staff);
  } finally {
    if (refreshBtn) refreshBtn.classList.remove("refreshing");
    if (refreshBtnText) refreshBtnText.innerText = "Sinkronkan Live";
  }
}

// GENERATOR DATA REPORT & NILAI RESMI PA (MENDUKUNG DATA REAL-TIME GOOGLE SHEETS & PEMBOBOTAN 360°)
function getStaffRubricData(staff, liveData = null) {
  const isKabinet = staff.roleCategory === 'Pimpinan' || staff.roleCategory === 'Wakil Pimpinan' || staff.roleCategory === 'Kabiro';
  const rubricTemplate = isKabinet ? RUBRIC_KABINET : RUBRIC_STAF;

  const seed = (staff.nrp ? parseInt(staff.nrp.slice(-4), 10) : 1000) || 1234;

  // Skor per indikator 0 - 10 (Hanya dari penilaian asli Google Sheets. JIKA BELUM DINILAI = SKOR 0.0)
  const items = rubricTemplate.map((item, idx) => {
    let score = 0;
    let isLive = false;
    let evalCount = 0;
    let kabinetAvg = null;
    let stafAvg = null;
    let selfAvg = null;
    let breakdownHtml = "";
    let breakdownTooltip = "";

    // 1. Cek apakah ada data skor real-time dari Google Sheets
    const matchKey = item.key;
    const matchNameKey = item.name.toLowerCase();
    const liveScoreObj = liveData && liveData.scores ? (liveData.scores[matchKey] || liveData.scores[matchNameKey] || liveData.scores[matchKey.replace(/_/g, ' ')]) : null;

    if (liveScoreObj && typeof liveScoreObj.average === 'number' && (liveScoreObj.kabCount > 0 || liveScoreObj.stafCount > 0 || liveScoreObj.selfCount > 0)) {
      score = liveScoreObj.average;
      evalCount = (liveScoreObj.kabCount || 0) + (liveScoreObj.stafCount || 0) + (liveScoreObj.selfCount || 0);
      kabinetAvg = liveScoreObj.kabinetAvg;
      stafAvg = liveScoreObj.stafAvg;
      selfAvg = liveScoreObj.selfAvg;
      isLive = true;

      if (isKabinet) {
        breakdownHtml = `
          <span class="pm-breakdown-item" title="Bobot Staf menilai Kabinet = 55%">Staf (55%): <strong class="pm-breakdown-val">${stafAvg !== null ? stafAvg.toFixed(1) : '-'}</strong></span>
          <span class="pm-breakdown-item" title="Bobot Kabinet menilai Kabinet = 35%">Kabinet (35%): <strong class="pm-breakdown-val">${kabinetAvg !== null ? kabinetAvg.toFixed(1) : '-'}</strong></span>
          <span class="pm-breakdown-item" title="Bobot Diri Sendiri = 10%">Diri Sendiri (10%): <strong class="pm-breakdown-val">${selfAvg !== null ? selfAvg.toFixed(1) : '-'}</strong></span>
        `;
        breakdownTooltip = `Staf 55% (${stafAvg !== null ? stafAvg.toFixed(1) : '-'}), Kabinet 35% (${kabinetAvg !== null ? kabinetAvg.toFixed(1) : '-'}), Diri Sendiri 10% (${selfAvg !== null ? selfAvg.toFixed(1) : '-'})`;
      } else {
        breakdownHtml = `
          <span class="pm-breakdown-item" title="Bobot Kabinet menilai Staf = 55%">Kabinet (55%): <strong class="pm-breakdown-val">${kabinetAvg !== null ? kabinetAvg.toFixed(1) : '-'}</strong></span>
          <span class="pm-breakdown-item" title="Bobot Staf menilai Staf = 35%">Staf (35%): <strong class="pm-breakdown-val">${stafAvg !== null ? stafAvg.toFixed(1) : '-'}</strong></span>
          <span class="pm-breakdown-item" title="Bobot Diri Sendiri = 10%">Diri Sendiri (10%): <strong class="pm-breakdown-val">${selfAvg !== null ? selfAvg.toFixed(1) : '-'}</strong></span>
        `;
        breakdownTooltip = `Kabinet 55% (${kabinetAvg !== null ? kabinetAvg.toFixed(1) : '-'}), Staf 35% (${stafAvg !== null ? stafAvg.toFixed(1) : '-'}), Diri Sendiri 10% (${selfAvg !== null ? selfAvg.toFixed(1) : '-'})`;
      }
    } else {
      // Belum ada penilai yang menilai sama sekali: HARUS 0!
      score = 0;
      evalCount = 0;
      isLive = false;
      kabinetAvg = null;
      stafAvg = null;
      selfAvg = null;
      breakdownHtml = "";
      breakdownTooltip = "Belum ada penilaian";
    }

    let levelKey = "0";
    let levelBadge = "Belum Dinilai (0 / 10)";
    let levelText = "Belum ada masukan penilaian untuk indikator ini di Google Sheets.";

    if (score > 0) {
      if (score < 3.0) {
        levelKey = "1-2";
        levelBadge = "Kurang (1-2)";
      } else if (score < 6.0) {
        levelKey = "3-5";
        levelBadge = "Cukup (3-5)";
      } else if (score < 9.0) {
        levelKey = "6-8";
        levelBadge = "Baik (6-8)";
      } else {
        levelKey = "9-10";
        levelBadge = "Sangat Baik (9-10)";
      }
      levelText = item.levels[levelKey] || item.desc;
    }

    return {
      name: item.name,
      desc: item.desc,
      color: item.color,
      score: parseFloat(score.toFixed(1)),
      levelBadge,
      levelText,
      isLive,
      evalCount,
      kabinetAvg,
      stafAvg,
      selfAvg,
      breakdownHtml,
      breakdownTooltip
    };
  });

  const totalScore = items.reduce((sum, it) => sum + it.score, 0);
  const scoredItems = items.filter(it => it.score > 0);
  // Hitung rata-rata berdasarkan indikator yang sudah dinilai agar penilaian berjalan tidak terdepresiasi
  const averageScore = scoredItems.length > 0 ? (totalScore / scoredItems.length).toFixed(1) : "0.0";
  const achievementPct = scoredItems.length > 0 ? Math.round((parseFloat(averageScore) / 10) * 100) : 0;

  // Status Mahasiswa: Normal / SP1 / SP2 / ST1 / ST2
  // Muhammad Sandhika Setiawan (staf-050) berstatus SP2, fungsionaris lain Normal
  const statusMahasiswa = staff.statusMahasiswa || (staff.id === 'staf-050' || (staff.nama && staff.nama.toLowerCase().includes("sandhika")) ? "SP2" : "Normal");

  let predikat = "Belum Ada Penilaian";
  if (parseFloat(averageScore) > 0) {
    if (parseFloat(averageScore) >= 9.2) predikat = "Istimewa (High Performer)";
    else if (parseFloat(averageScore) >= 8.5) predikat = "Sangat Baik (On Track)";
    else if (parseFloat(averageScore) >= 7.5) predikat = "Baik (Kompeten)";
    else predikat = "Cukup (Dalam Pendampingan)";
  }

  const activeSheet = (staff.sheetUrl && staff.sheetUrl.trim() !== '' && !staff.sheetUrl.includes('on-progress') && staff.sheetUrl.startsWith('http'))
    ? staff.sheetUrl.trim()
    : (typeof MASTER_PA_SPREADSHEET_URL === 'string' && MASTER_PA_SPREADSHEET_URL.trim().startsWith('http'))
      ? MASTER_PA_SPREADSHEET_URL.trim()
      : '';
  const hasSheet = Boolean(activeSheet);

  const isLive = Boolean(liveData && liveData.isLive);
  const evaluatorCount = liveData ? (liveData.evaluatorCount || 0) : 0;

  let formStatus = "";
  let sheetNote = "";
  if (isLive && evaluatorCount > 0) {
    const isFull = scoredItems.length === items.length;
    const completeness = isFull ? "Lengkap" : `${scoredItems.length}/${items.length} Indikator`;
    formStatus = `🟢 Live Sync (${evaluatorCount} Penilai • ${completeness})`;
    sheetNote = `Google Sheets Real-Time (${liveData.timestamp || 'Terkini'})`;
  } else {
    formStatus = hasSheet ? "Menunggu Penilai (0 Penilai)" : "Siap Diisi (Q1 2026)";
    sheetNote = hasSheet ? "Google Sheets Terhubung (Belum Ada Penilai)" : "Menunggu Rekap Personalia";
  }

  let feedback = "";
  if (evaluatorCount === 0 || scoredItems.length === 0) {
    feedback = `Belum ada masukan penilaian untuk ${staff.nama}. Skor capaian seluruh indikator dan catatan evaluasi rekan akan otomatis terisi serta diperbarui secara real-time setelah penilai mengisi formulir Performance Appraisal di Google Sheets.`;
  } else if (staff.roleCategory === 'Pimpinan') {
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
    rubricType: isKabinet ? "Evaluasi Kabinet (7 Indikator)" : "Evaluasi Staf (12 Indikator)",
    rubricTypeFull: isKabinet ? "Evaluasi Kepemimpinan Kabinet (7 Indikator) — Polaris Leadership" : "Evaluasi Kinerja Staf (12 Indikator) — Elevator Kapasitas Insan",
    averageScore,
    achievementPct: `${achievementPct}%`,
    statusMahasiswa,
    predikat,
    formStatus,
    sheetNote,
    hasSheet,
    feedback,
    items,
    isLive,
    evaluatorCount,
    kabinetEvaluatorCount: liveData ? (liveData.kabinetEvaluatorCount || 0) : 0,
    stafEvaluatorCount: liveData ? (liveData.stafEvaluatorCount || 0) : 0,
    hasSelfAssessment: liveData ? Boolean(liveData.hasSelfAssessment) : false,
    peerFeedback: (liveData && liveData.peerFeedback ? liveData.peerFeedback : []).filter(fb => {
      if (!fb) return false;
      const ssc = (fb.stopStartContinue || '').trim();
      const pesan = (fb.pesanKesan || '').trim();
      const txt = (fb.text || pesan || ssc || '').trim();
      if (!txt) return false;

      // Filter keluar jika konten hanya angka (misal formula 8.75)
      const isNumOnly = !isNaN(parseFloat(txt.replace(',', '.'))) && !/[a-zA-Z]{3,}/.test(txt);
      if (isNumOnly) return false;

      // Filter keluar jika teks sama dengan nama target fungsionaris yang sedang dinilai
      if (isStaffNameMatchingCol(staff.nama, txt)) return false;

      // Filter keluar jika teks adalah nama salah satu fungsionaris lain di organisasi
      if (typeof staffList !== 'undefined' && Array.isArray(staffList)) {
        if (staffList.some(s => s.nama.toLowerCase() === txt.toLowerCase())) return false;
      }

      // Filter keluar jika teks adalah judul spreadsheet atau template pengisian
      const lower = txt.toLowerCase();
      if (lower.includes('performance appraisal') || lower.includes('panduan pengisian')) return false;
      if (isTemplateOnly(txt)) return false;

      return true;
    }),
    timestamp: liveData ? liveData.timestamp : null
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
  const isZeroState = (total <= 0);

  let currentAngle = -Math.PI / 2;
  currentPieSlices = dataItems.map(d => {
    const sliceAngle = isZeroState
      ? (Math.PI * 2) / dataItems.length
      : (d.score / total) * Math.PI * 2;
    const start = currentAngle;
    const end = currentAngle + sliceAngle;
    currentAngle = end;
    return {
      ...d,
      start,
      end,
      mid: (start + end) / 2,
      percent: isZeroState ? "0.0" : ((d.score / total) * 100).toFixed(1)
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
    ctx.fillStyle = isZeroState ? 'rgba(15, 23, 42, 0.05)' : 'rgba(15, 23, 42, 0.1)';
    ctx.fill();
    ctx.restore();

    // Side 3D extrusion walls
    for (let y = depth; y >= 0; y -= 2) {
      currentPieSlices.forEach((s, idx) => {
        const sweepEnd = -Math.PI / 2 + (s.end - (-Math.PI / 2)) * progress;
        if (s.start >= sweepEnd) return;
        const currentEnd = Math.min(s.end, sweepEnd);

        const isHover = idx === hoveredPieIndex;
        const offX = isHover ? Math.cos(s.mid) * 10 : 0;
        const offY = isHover ? Math.sin(s.mid) * 10 * 0.52 - 3 : 0;

        ctx.beginPath();
        ctx.ellipse(cx + offX, cy + y + offY, rx, ry, 0, s.start, currentEnd);
        ctx.lineTo(cx + offX, cy + y + offY);
        ctx.closePath();

        if (isZeroState) {
          const shade = -20 + (y / depth) * 12;
          ctx.fillStyle = shadeColor("#94A3B8", shade);
        } else {
          const shade = -35 + (y / depth) * 15 + Math.cos(s.mid) * 8;
          ctx.fillStyle = shadeColor(s.color, Math.max(-50, Math.min(20, shade)));
        }
        ctx.fill();
      });
    }

    // Top faces
    currentPieSlices.forEach((s, idx) => {
      const sweepEnd = -Math.PI / 2 + (s.end - (-Math.PI / 2)) * progress;
      if (s.start >= sweepEnd) return;
      const currentEnd = Math.min(s.end, sweepEnd);

      const isHover = idx === hoveredPieIndex;
      const offX = isHover ? Math.cos(s.mid) * 10 : 0;
      const offY = isHover ? Math.sin(s.mid) * 10 * 0.52 - 3 : 0;

      ctx.save();
      ctx.beginPath();
      ctx.ellipse(cx + offX, cy + offY, rx, ry, 0, s.start, currentEnd);
      ctx.lineTo(cx + offX, cy + offY);
      ctx.closePath();

      if (isZeroState) {
        const grad = ctx.createRadialGradient(
          cx + offX - 25, cy + offY - 15, 10,
          cx + offX, cy + offY, rx
        );
        grad.addColorStop(0, isHover ? "#E2E8F0" : "#F8FAFC");
        grad.addColorStop(0.85, isHover ? "#CBD5E1" : "#E2E8F0");
        grad.addColorStop(1, "#94A3B8");
        ctx.fillStyle = grad;
        ctx.fill();

        ctx.strokeStyle = isHover ? '#0284C7' : 'rgba(255, 255, 255, 0.7)';
        ctx.lineWidth = isHover ? 2 : 1;
        ctx.stroke();

        // Tampilkan 0.0 di setiap slice
        if (s.end - s.start > 0.35 && progress >= 0.8) {
          const textDist = rx * 0.65;
          const tx = cx + offX + Math.cos(s.mid) * textDist;
          const ty = cy + offY + Math.sin(s.mid) * textDist * 0.52;
          ctx.font = '600 10px system-ui, -apple-system, sans-serif';
          ctx.fillStyle = '#64748B';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText("0.0", tx, ty);
        }
      } else {
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
      }

      ctx.restore();
    });

    // Jika isZeroState: Tambahkan label tengah 3D disk
    if (isZeroState && progress >= 0.85) {
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx * 0.35, ry * 0.35, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.92)';
      ctx.shadowColor = 'rgba(15, 23, 42, 0.12)';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.font = 'bold 14px system-ui, -apple-system, sans-serif';
      ctx.fillStyle = '#475569';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText("0.0", cx, cy - 5);

      ctx.font = '600 8.5px system-ui, -apple-system, sans-serif';
      ctx.fillStyle = '#94A3B8';
      ctx.fillText("BELUM DINILAI", cx, cy + 8);
      ctx.restore();
    }
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
        <div class="pie-tooltip-title" style="color: ${isZeroState ? '#64748B' : s.color};">
          <span class="pie-tooltip-dot" style="background: ${isZeroState ? '#94A3B8' : s.color};"></span>
          ${s.name}
        </div>
        <div class="pie-tooltip-score">Skor: <strong>${s.score.toFixed(1)}</strong> / 10 ${isZeroState ? '(Belum Dinilai)' : `(${s.percent}%)`}</div>
        <div class="pie-tooltip-sub">${isZeroState ? 'Belum ada penilaian masuk di Google Sheets' : s.desc}</div>
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
    <div class="pie-legend-item ${s.score === 0 ? 'is-zero' : ''}" data-index="${idx}">
      <span class="pie-legend-color" style="background: ${s.score === 0 ? '#94A3B8' : s.color};"></span>
      <span class="pie-legend-name">${s.name}</span>
      <span class="pie-legend-val ${s.score === 0 ? 'is-zero' : ''}">${s.score.toFixed(1)}</span>
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
  initHeroScrollFade();

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
      : "PIN Diperlukan: Mengisi Lembar Kerja PA Agustus";
  }

  if (staffPin) {
    staffPin.value = "";
    staffPin.type = "password";
    staffPin.placeholder = (authTargetMode === 'progress')
      ? "Masukkan PIN untuk melihat nilai personal..."
      : "Masukkan PIN untuk mengisi form PA Agustus...";
  }
  isPasswordVisible = false;
  updateEyeIcon();

  if (errorMessage) errorMessage.classList.add("hidden");
  if (successMessage) successMessage.classList.add("hidden");
  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.innerText = (authTargetMode === 'progress')
      ? "Verifikasi & Buka Report"
      : "Verifikasi & Buka PA Agustus";
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
function openProgressModal(staff, liveData = null) {
  currentProgressStaff = staff;
  const modal = document.getElementById("progressModal");
  if (!modal) return;

  // Ambil data cache live jika valid (< 30 detik dan terdapat skor)
  if (!liveData && liveStaffCache[staff.id]) {
    const cached = liveStaffCache[staff.id];
    if (cached && cached.evaluatorCount > 0 && (Date.now() - (cached.cachedAt || 0) < 30 * 1000)) {
      liveData = cached;
    }
  } else if (!liveData) {
    try {
      const sessionCached = sessionStorage.getItem('live_pa_data_' + staff.id);
      if (sessionCached) {
        const parsed = JSON.parse(sessionCached);
        if (parsed && parsed.evaluatorCount > 0 && (Date.now() - (parsed.cachedAt || 0) < 30 * 1000)) {
          liveData = parsed;
          liveStaffCache[staff.id] = liveData;
        }
      }
    } catch (e) {}
  }

  const data = getStaffRubricData(staff, liveData);

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
    const fullTitle = data.rubricTypeFull || data.rubricType;
    roleBadge.className = "pill-dept pm-rubric-pill";
    roleBadge.title = fullTitle;
    roleBadge.textContent = data.rubricType;
  }

  // Update Live Sync Status Banner
  const liveBanner = document.getElementById("pmLiveBanner");
  const liveTitle = document.getElementById("pmLiveStatusTitle");
  const liveBadge = document.getElementById("pmLiveSyncBadge");
  const liveDesc = document.getElementById("pmLiveStatusDesc");
  const refreshBtnText = document.getElementById("pmRefreshBtnText");

  if (liveBanner) {
    if (data.isLive && data.evaluatorCount > 0) {
      liveBanner.classList.remove("is-pending");
      if (liveTitle) liveTitle.innerText = "Data Real-Time Google Sheets (Terhubung)";
      if (liveBadge) {
        liveBadge.innerText = `Live 360° • ${data.evaluatorCount} Penilai`;
        liveBadge.className = "pm-live-badge-chip";
      }
      if (liveDesc) {
        liveDesc.innerHTML = `Skor dihitung otomatis dari rata-rata terbobot <strong>${data.evaluatorCount} lembar penilaian aktif</strong> (Periode PA Agustus 2026) di ${staff.departemenBEMFull}. Sinkronisasi: <strong>${data.timestamp || 'Terkini'}</strong>.`;
      }
      if (refreshBtnText) refreshBtnText.innerText = "Sinkronkan Live";
    } else {
      liveBanner.classList.add("is-pending");
      if (liveTitle) liveTitle.innerText = "Belum Ada Nilai Masuk (Menunggu Penilai)";
      if (liveBadge) {
        liveBadge.innerText = "Skor 0.0 • 0 Penilai";
        liveBadge.className = "pm-live-badge-chip";
      }
      if (liveDesc) {
        liveDesc.innerHTML = `Saat ini sedang berlangsung <strong>Periode Pengisian PA Agustus (04 – 07 Oktober 2026)</strong>. Seluruh capaian indikator akan terisi secara otomatis begitu penilai mengisi formulir Google Sheets sebelum deadline <strong>Rabu, 7 Oktober 2026 pukul 23.59 WIB</strong>.`;
      }
      if (refreshBtnText) refreshBtnText.innerText = "Cek Pembaruan";
    }
  }

  // Set metric numbers
  const overallScoreEl = document.getElementById("pmOverallScore");
  if (overallScoreEl) overallScoreEl.innerText = data.averageScore;

  const scoreCatEl = document.getElementById("pmScoreCategory");
  if (scoreCatEl) scoreCatEl.innerText = `Predikat: ${data.predikat}`;

  // Set Status Mahasiswa (Normal / SP1 / SP2 / ST1 / ST2)
  const statusEl = document.getElementById("pmStudentStatus");
  const statusSubEl = document.getElementById("pmStudentStatusSub");
  if (statusEl) {
    const rawStatus = (data.statusMahasiswa || "Normal").toUpperCase().trim();
    
    let dotColor = "#16A34A";
    let textColor = "#16A34A";
    let subText = "Kondisi Aktif & Tertib";
    let subColor = "";

    if (rawStatus === "SP2") {
      dotColor = "#DC2626";
      textColor = "#DC2626";
      subText = "Surat Peringatan 2";
      subColor = "#EF4444";
    } else if (rawStatus === "SP1") {
      dotColor = "#D97706";
      textColor = "#D97706";
      subText = "Surat Peringatan 1";
      subColor = "#F59E0B";
    } else if (rawStatus === "ST2") {
      dotColor = "#E11D48";
      textColor = "#E11D48";
      subText = "Surat Teguran 2";
      subColor = "#FB7185";
    } else if (rawStatus === "ST1") {
      dotColor = "#EA580C";
      textColor = "#EA580C";
      subText = "Surat Teguran 1";
      subColor = "#FB923C";
    }

    statusEl.innerHTML = `<span class="pm-status-badge-chip" style="color: ${textColor};"><span class="pm-status-dot" style="background: ${dotColor};"></span>${rawStatus}</span>`;
    if (statusSubEl) {
      statusSubEl.innerText = subText;
      statusSubEl.style.color = subColor;
    }
  }

  const achieveEl = document.getElementById("pmAchievementPct");
  if (achieveEl) achieveEl.innerText = data.achievementPct;

  const formStatusEl = document.getElementById("pmFormStatus");
  if (formStatusEl) {
    formStatusEl.innerText = data.formStatus;
    formStatusEl.style.color = (data.isLive || data.hasSheet) ? "#2A9D8F" : "var(--gold)";
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
      <div class="pm-indicator-card ${item.score === 0 ? 'is-zero-score' : ''}" id="ind-card-${idx}">
        <div class="pm-ind-header">
          <div class="pm-ind-name-wrap">
            <span class="pm-ind-dot" style="background: ${item.score === 0 ? '#94A3B8' : item.color};"></span>
            <span class="pm-ind-name">${item.name}</span>
            ${item.isLive && item.evalCount > 0 ? `
              <span class="pm-live-indicator-tag" title="Dihitung dari ${item.evalCount} penilai terbobot">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                ${item.evalCount} Penilai
              </span>
            ` : `
              <span class="pm-zero-indicator-tag">
                Belum Dinilai
              </span>
            `}
          </div>
          <span class="pm-ind-score-badge ${item.score === 0 ? 'is-zero' : ''}">${item.score.toFixed(1)} / 10</span>
        </div>
        <div class="pm-ind-track">
          <div class="pm-ind-fill" style="width: ${item.score * 10}%; background: ${item.score === 0 ? '#CBD5E1' : `linear-gradient(90deg, ${item.color} 0%, ${shadeColor(item.color, 25)} 100%)`};"></div>
        </div>
        ${item.breakdownHtml ? `<div class="pm-breakdown-row">${item.breakdownHtml}</div>` : ''}
        <div class="pm-ind-desc">${item.desc}</div>
        <div class="pm-ind-param-box ${item.score === 0 ? 'is-zero' : ''}">
          <div class="pm-ind-param-tag">${item.levelBadge}</div>
          <p class="pm-ind-param-text">${item.levelText}</p>
        </div>
      </div>
    `).join('');
  }

  // Contextual feedback text
  const feedbackEl = document.getElementById("pmFeedbackText");
  if (feedbackEl) feedbackEl.innerText = data.feedback;

  // Render Peer Feedback dari Google Sheets (100% ANONIM - TANPA NAMA PENILAI)
  const peerBox = document.getElementById("pmPeerFeedbackBox");
  const peerCount = document.getElementById("pmPeerFeedbackCount");
  const peerList = document.getElementById("pmPeerFeedbackList");

  if (peerBox && peerList) {
    // Pastikan card Catatan & Evaluasi Rekan SELALU tampil untuk semua fungsionaris
    peerBox.classList.remove("hidden");

    const validFeedback = (data.peerFeedback || []).filter(fb => {
      if (!fb) return false;
      const ssc = (fb.stopStartContinue || '').trim();
      const pesan = (fb.pesanKesan || '').trim();
      const txt = (fb.text || pesan || ssc || '').trim();
      if (!txt) return false;
      if (isStaffNameMatchingCol(staff.nama, txt)) return false;
      if (typeof staffList !== 'undefined' && Array.isArray(staffList)) {
        if (staffList.some(s => s.nama.toLowerCase() === txt.toLowerCase())) return false;
      }
      if (txt.toLowerCase().includes('performance appraisal')) return false;
      if (isTemplateOnly(txt)) return false;
      return true;
    });

    if (validFeedback && validFeedback.length > 0) {
      if (peerCount) peerCount.innerText = `${validFeedback.length} Masukan (Anonim)`;
      peerList.innerHTML = validFeedback.map((fb, fIdx) => {
        const sscHtml = fb.stopStartContinue ? formatSscHtml(fb.stopStartContinue) : '';
        const pesanHtml = fb.pesanKesan ? formatPesanHtml(fb.pesanKesan) : '';

        let contentHtml = '';
        if (sscHtml || pesanHtml) {
          contentHtml = `${sscHtml}${pesanHtml}`;
        } else if (fb.text) {
          contentHtml = `<div class="pm-peer-item-content">${escapeHtml(fb.text)}</div>`;
        }

        return `
          <div class="pm-peer-item-card">
            <div class="pm-peer-item-author">
              <div class="pm-peer-author-left">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <span>Catatan Rekan #${fIdx + 1}</span>
              </div>
              <span class="pm-peer-anon-badge">🔒 Anonim</span>
            </div>
            ${contentHtml}
          </div>
        `;
      }).join('');
    } else {
      if (peerCount) peerCount.innerText = "0 Masukan (Anonim)";
      peerList.innerHTML = `
        <div class="pm-peer-empty-state">
          <div class="pm-peer-empty-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              <line x1="9" y1="10" x2="15" y2="10"/>
              <line x1="12" y1="7" x2="12" y2="13"/>
            </svg>
          </div>
          <div class="pm-peer-empty-title">Belum Ada Catatan Tertulis</div>
          <div class="pm-peer-empty-desc">
            Evaluasi kualitatif (Stop, Start, Continue) dari rekan fungsionaris atau pimpinan di Google Sheets akan otomatis tersinkronisasi di sini secara <strong>100% Anonim</strong> setelah dituliskan pada lembar kerja.
          </div>
          <div class="pm-peer-anon-guarantee">
            <span>🔒 Sistem menjamin kerahasiaan identitas penilai demi transparansi dan kenyamanan bersama.</span>
          </div>
        </div>
      `;
    }
  }

  modal.classList.remove("hidden");

  // Selalu picu sinkronisasi live secara proaktif jika data belum ada atau sudah lebih dari 30 detik
  const isCacheFresh = liveData && liveData.cachedAt && (Date.now() - liveData.cachedAt < 30 * 1000) && (liveData.evaluatorCount > 0);
  if (!isCacheFresh) {
    const refreshBtn = document.getElementById("pmRefreshBtn");
    const refreshBtnText = document.getElementById("pmRefreshBtnText");
    if (refreshBtn) refreshBtn.classList.add("refreshing");
    if (refreshBtnText) refreshBtnText.innerText = "Sinkronisasi Live...";

    fetchLiveScoresForStaff(staff, true).then(fresh => {
      if (fresh && currentProgressStaff && currentProgressStaff.id === staff.id) {
        openProgressModal(staff, fresh);
      }
    }).catch(err => {
      console.warn("Live fetch error:", err);
    }).finally(() => {
      const rb = document.getElementById("pmRefreshBtn");
      const rbt = document.getElementById("pmRefreshBtnText");
      if (rb) rb.classList.remove("refreshing");
      if (rbt) rbt.innerText = "Sinkronkan Live";
    });
  }
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
  executeOpenSheet(target);
}

function lockStaffSession() {
  if (currentProgressStaff) {
    const staffId = currentProgressStaff.id;
    const staffName = currentProgressStaff.nama;
    sessionStorage.removeItem('auth_pin_' + staffId);
    sessionStorage.removeItem('live_pa_data_' + staffId);
    delete liveStaffCache[staffId];
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
  if (!staff) staff = currentProgressStaff || currentSelectedStaff;
  if (!staff) return;

  const activeSheet = (staff.sheetUrl && staff.sheetUrl.trim() !== '' && !staff.sheetUrl.includes('on-progress') && staff.sheetUrl.startsWith('http'))
    ? staff.sheetUrl.trim()
    : (typeof MASTER_PA_SPREADSHEET_URL === 'string' && MASTER_PA_SPREADSHEET_URL.trim().startsWith('http'))
      ? MASTER_PA_SPREADSHEET_URL.trim()
      : '';

  if (activeSheet) {
    showToast("Akses Diberikan", `Membuka spreadsheet evaluasi ${staff.nama}...`);
    try {
      const win = window.open(activeSheet, "_blank", "noopener,noreferrer");
      if (!win || win.closed || typeof win.closed === 'undefined') {
        const a = document.createElement("a");
        a.href = activeSheet;
        a.target = "_blank";
        a.rel = "noopener,noreferrer";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    } catch (err) {
      window.location.href = activeSheet;
    }
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
  const secretPin = (currentSelectedStaff.pin || "").trim();
  const isMatch = entered.length > 0 && 
                  (entered === secretPin || entered.toLowerCase() === secretPin.toLowerCase());

  if (isMatch) {
    // PIN BENAR
    if (errorMessage) errorMessage.classList.add("hidden");
    if (successMessage) successMessage.classList.remove("hidden");
    if (successMessageText) {
      successMessageText.innerText = (authTargetMode === 'progress')
        ? "PIN Terverifikasi! Mengambil skor real-time dari Google Sheets..."
        : "PIN Terverifikasi! Membuka Lembar Kerja Spreadsheet...";
    }

    // Simpan token otentikasi sesi
    sessionStorage.setItem('auth_pin_' + currentSelectedStaff.id, 'true');

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerText = (authTargetMode === 'progress')
        ? "Menghitung Skor Real-Time..."
        : "Membuka Spreadsheet...";
    }

    if (authTargetMode === 'progress') {
      const staffToOpen = currentSelectedStaff;
      showToast("PIN Terverifikasi", `Menghubungkan ke spreadsheet & menghitung skor ${staffToOpen.nama}...`);

      // Mengambil data skor real-time secara asynchronous (force fresh)
      fetchLiveScoresForStaff(staffToOpen, true).then(liveData => {
        closeModal();
        openProgressModal(staffToOpen, liveData);
        if (liveData && liveData.isLive) {
          showToast("Live Sync Sukses", `Berhasil menghitung skor real-time ${staffToOpen.nama} dari ${liveData.evaluatorCount} penilai.`);
        }
      }).catch(err => {
        console.warn("Live fetch fallback:", err);
        closeModal();
        openProgressModal(staffToOpen);
      });
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

// 11B. HERO BACKGROUND PHOTO SCROLL-DRIVEN FADE OUT
function initHeroScrollFade() {
  const hero = document.getElementById('beranda');
  const photo = document.getElementById('heroBgPhoto');
  const overlay = document.querySelector('.hero-bg-photo-overlay');
  if (!hero || !photo) return;

  let ticking = false;

  function updateHeroFade() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
    const heroHeight = hero.offsetHeight || 600;

    // Fades smoothly from 1 to 0 as user scrolls through the hero section
    const fadeDistance = heroHeight * 0.85;
    const progress = Math.min(1, Math.max(0, scrollY / fadeDistance));
    const opacity = (1 - progress);

    photo.style.opacity = opacity.toFixed(3);
    if (overlay) {
      overlay.style.opacity = opacity.toFixed(3);
    }
    // Subtle scale and translateY for smooth, natural parallax
    photo.style.transform = `scale(${1 + progress * 0.08}) translateY(${progress * 28}px)`;

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateHeroFade);
      ticking = true;
    }
  }, { passive: true });

  updateHeroFade();
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
  if (typeof initHeroScrollFade === 'function') initHeroScrollFade();
  initHorizontalSliders();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrapApp);
} else {
  bootstrapApp();
}

