# Dokumen Inception: Campus Service Request and Maintenance System
## 1. Masalah Bisnis
Mahasiswa dan dosen di lingkungan kampus sering menghadapi berbagai masalah terkait fasilitas fisik, seperti proyektor rusak, koneksi internet bermasalah, AC tidak dingin, kursi rusak, alat laboratorium bermasalah, hingga ruangan yang kotor. Masalah-masalah ini langsung mengganggu kenyamanan dan kelancaran kegiatan belajar mengajar, praktikum, serta operasional akademik sehari-hari. Tanpa penanganan yang terorganisir dan cepat, kualitas layanan kampus akan menurun, dan kerusakan fasilitas dapat memburuk, sehingga menimbulkan biaya perbaikan yang lebih besar di kemudian hari.
## 2. Tujuan & Kriteria Keberhasilan
- G1: Menyediakan platform digital terpusat bagi mahasiswa dan dosen untuk melaporkan keluhan fasilitas secara mandiri. (metrik keberhasilan belum disediakan — disarankan untuk mendefinisikannya, misalnya 100% keluhan terfasilitasi secara digital)
- G2: Mengotomatisasi alur kerja peninjauan dan penugasan teknisi oleh Administrator guna mempercepat respons perbaikan. (metrik keberhasilan belum disediakan — disarankan untuk mendefinisikannya, misalnya rata-rata waktu respons penugasan kurang dari 24 jam)
- G3: Memberikan transparansi progres perbaikan kepada pelapor melalui pembaruan status real-time oleh teknisi. (metrik keberhasilan belum disediakan — disarankan untuk mendefinisikannya, misalnya tingkat kepuasan pelapor di atas 80%)
- G4: Menyajikan ringkasan data laporan melalui dashboard terpadu bagi Manajer Fasilitas untuk membantu pengambilan keputusan dan evaluasi kinerja pemeliharaan. (metrik keberhasilan belum disediakan — disarankan untuk mendefinisikannya)
## 3. Pemangku Kepentingan
|
 Peran 
|
 Nama/Grup 
|
 Kepentingan / Keterlibatan 
|
|
------
|
-----------
|
-------------------
|
|
 Pelapor 
|
 Mahasiswa / Dosen 
|
 Membuat laporan keluhan, memantau status perkembangan perbaikan secara real-time, memberikan komentar, serta mengonfirmasi hasil perbaikan setelah selesai. 
|
|
 Administrator 
|
 Staf Admin / Operator 
|
 Memeriksa laporan masuk, menentukan kategori dan tingkat prioritas perbaikan, menugaskan teknisi yang sesuai, serta menutup laporan secara resmi setelah dikonfirmasi pelapor. 
|
|
 Teknisi 
|
 Staf Pemeliharaan (Maintenance Staff) 
|
 Melihat daftar tugas perbaikan yang diberikan, menerima tugas, memperbarui progres pengerjaan di lapangan, dan menandai pekerjaan telah selesai. 
|
|
 Manajer Fasilitas 
|
 Kepala Bagian Umum / Facility Manager 
|
 Memantau kinerja sistem pemeliharaan secara keseluruhan melalui dashboard ringkas dan laporan performa berkala. 
|
## 4. Ruang Lingkup
### Termasuk dalam Lingkup
- Pembuatan laporan keluhan baru dengan kategori masalah (proyektor, internet, AC, kursi, alat lab, kebersihan ruangan).
- Pencarian dan penyaringan (filtering) daftar laporan berdasarkan kriteria tertentu (status, kategori, tanggal).
- Halaman detail laporan yang menampilkan informasi lengkap pelapor, masalah, riwayat status, dan komentar.
- Fitur verifikasi/pemeriksaan laporan masuk serta penentuan prioritas oleh Administrator.
- Fitur penugasan teknisi secara manual oleh Administrator.
- Modul bagi Teknisi untuk memperbarui status pengerjaan (Assigned -> In Progress -> Resolved).
- Fitur komentar atau catatan pada setiap laporan untuk komunikasi antar aktor.
- Fitur pencatatan riwayat perubahan status laporan secara otomatis.
- Fitur konfirmasi penyelesaian pekerjaan oleh Pelapor.
- Fitur penutupan (Closed) atau pembukaan kembali (Reopened) laporan oleh Administrator.
- Dashboard sederhana untuk Manajer Fasilitas yang menampilkan statistik laporan ringkas.
### Di Luar Lingkup
- Fitur pengunggahan foto atau bukti visual kerusakan oleh pelapor.
- Manajemen inventaris gudang dan pemesanan suku cadang (spare parts).
- Sistem absensi, penjadwalan shift kerja, serta penggajian (payroll) teknisi.
- Integrasi dengan sistem keuangan kampus untuk penganggaran perbaikan fasilitas.
- Pelacakan lokasi real-time (GPS) untuk teknisi di area kampus.
## 5. Asumsi
- A1: Semua pengguna memiliki perangkat pintar (smartphone atau komputer) dan koneksi internet yang memadai untuk mengakses aplikasi. — *basis: disimpulkan dari kebutuhan pembaruan status dan pelacakan real-time oleh semua aktor.*
- A2: Staf Administrator memiliki panduan atau kriteria standar dalam menentukan tingkat prioritas laporan. — *basis: disimpulkan dari fitur penentuan prioritas oleh Administrator.*
- A3: Sistem ini berjalan di bawah infrastruktur IT internal kampus. — *basis: disimpulkan dari nama proyek "Campus Service Request".*
## 6. Batasan (Constraints)
- C1: Alur Kerja (Workflow Status) — Status laporan harus mengikuti siklus hidup yang kaku dan berurutan: Submitted -> Under Review -> Assigned -> In Progress -> Resolved -> Closed. — *basis: Alur Sistem di CASE.md Bagian 2.3*
- C2: Teknologi — Aplikasi harus dikembangkan menggunakan stack React, TypeScript, dan Vite (sisi frontend) berdasarkan template repositori yang ada. — *basis: struktur file template di repositori.*
## 7. Pertanyaan Terbuka
- Q1: Apakah pelapor diizinkan mengunggah foto atau bukti visual saat membuat laporan kerusakan? — *pemilik: [DITETAPKAN DI LUAR LINGKUP - Rilis MVP tidak mendukung pengunggahan foto/bukti visual berdasarkan keputusan EN8 di docs/requirements/02-elicitation.md]*
- Q2: Bagaimana mekanisme autentikasi pengguna? Apakah akan diintegrasikan dengan Single Sign-On (SSO) kampus yang sudah ada? — *pemilik: Departemen IT Kampus*
- Q3: Apakah ada batas waktu (SLA) otomatis untuk merespons atau menyelesaikan laporan berdasarkan prioritasnya? — *pemilik: Manajer Fasilitas*
- Q4: Apakah sistem perlu mengirimkan notifikasi instan (email/WhatsApp/push notification) kepada aktor terkait ketika terjadi perubahan status? — *pemilik: belum ditentukan*
## 8. Status Dokumen
dokumen dibuat berdasarkan analisis dokumen [CASE.md](file:///home/juiziy/.gemini/antigravity/worktrees/campus-maintenance/read-case-documentation/CASE.md) menggunakan panduan dari [SKILL.md](file:///home/juiziy/campus-maintenance/skills/01-inception/SKILL.md). Bagian metrik keberhasilan, detail autentikasi, dan pertanyaan terbuka memerlukan masukan lebih lanjut dari pemangku kepentingan sebelum dokumen ini dapat difinalisasi.
