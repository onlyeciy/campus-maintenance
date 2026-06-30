# Prioritisasi: Campus Service Request and Maintenance System — Rilis MVP (Minimum Viable Product)
## 1. Peta Ketergantungan
Berikut adalah tabel ketergantungan antar kebutuhan fungsional (FR) dan non-fungsional (NFR). Ketergantungan ini membatasi urutan pengerjaan dan penetapan prioritas.
|
 Item 
|
 Bergantung Pada 
|
 Catatan 
|
|
------
|
-----------------
|
---------
|
|
**
FR-02
**
 (Pilih Kategori) 
|
 FR-01 
|
 Kategori dipilih sebagai atribut wajib dari laporan yang dibuat di FR-01. 
|
|
**
FR-03
**
 (Lokasi Fisik) 
|
 FR-01 
|
 Lokasi fisik wajib diisi sebagai bagian dari formulir pembuatan laporan di FR-01. 
|
|
**
FR-04
**
 (Status 
`Submitted`
) 
|
 FR-01 
|
 Status awal 
`Submitted`
 disematkan otomatis saat laporan dibuat di FR-01. 
|
|
**
FR-05
**
 (Daftar Laporan Pelapor) 
|
 FR-01 
|
 Daftar laporan tidak dapat ditampilkan jika fitur pembuatan laporan di FR-01 belum ada. 
|
|
**
FR-06
**
 (Cari & Saring) 
|
 FR-05, FR-14, FR-09 
|
 Fitur pencarian dan penyaringan memerlukan daftar laporan dasar yang sudah diimplementasikan. 
|
|
**
FR-07
**
 (Detail Laporan) 
|
 FR-01 
|
 Halaman detail memuat informasi lengkap dari laporan yang dibuat di FR-01. 
|
|
**
FR-08
**
 (Komentar Pelapor) 
|
 FR-07 
|
 Komentar ditambahkan pada halaman detail laporan yang disediakan oleh FR-07. 
|
|
**
FR-09
**
 (Admin Tinjau Laporan) 
|
 FR-01 
|
 Admin hanya dapat meninjau laporan yang telah dibuat oleh pelapor di FR-01. 
|
|
**
FR-10
**
 (Admin Koreksi Kategori) 
|
 FR-09 
|
 Koreksi kategori dilakukan selama proses peninjauan laporan di FR-09. 
|
|
**
FR-11
**
 (Admin Tentukan Prioritas) 
|
 FR-09 
|
 Prioritas ditentukan selama proses peninjauan laporan di FR-09. 
|
|
**
FR-12
**
 (Admin Tugaskan Teknisi) 
|
 FR-09 
|
 Penugasan teknisi dilakukan setelah laporan ditinjau oleh Admin di FR-09. 
|
|
**
FR-13
**
 (Status 
`Assigned`
) 
|
 FR-12 
|
 Transisi status ke 
`Assigned`
 dipicu otomatis setelah penugasan teknisi di FR-12. 
|
|
**
FR-14
**
 (Daftar Tugas Teknisi) 
|
 FR-13 
|
 Daftar tugas teknisi menampilkan laporan yang telah ditugaskan dan berstatus 
`Assigned`
 (FR-13). 
|
|
**
FR-15
**
 (Teknisi Terima Tugas) 
|
 FR-14 
|
 Teknisi menerima tugas berdasarkan daftar tugas yang tampil di FR-14. 
|
|
**
FR-16
**
 (Status 
`In Progress`
) 
|
 FR-15 
|
 Transisi status ke 
`In Progress`
 terjadi setelah teknisi menerima tugas di FR-15. 
|
|
**
FR-17
**
 (Teknisi Update Progres) 
|
 FR-16 
|
 Pembaruan progres pengerjaan dilakukan saat laporan sudah berstatus 
`In Progress`
 (FR-16). 
|
|
**
FR-18
**
 (Status 
`Resolved`
) 
|
 FR-16 
|
 Pekerjaan ditandai selesai (
`Resolved`
) setelah melewati tahap pengerjaan di FR-16. 
|
|
**
FR-19
**
 (Pelapor Konfirmasi Hasil) 
|
 FR-18 
|
 Pelapor memberikan konfirmasi atas laporan yang telah ditandai selesai (
`Resolved`
) di FR-18. 
|
|
**
FR-20
**
 (Admin Tutup Laporan 
`Closed`
) 
|
 FR-19 
|
 Laporan ditutup secara permanen oleh Admin setelah dikonfirmasi selesai oleh Pelapor di FR-19. 
|
|
**
FR-21
**
 (Admin Reopen Laporan) 
|
 FR-19 
|
 Laporan dibuka kembali jika pelapor menolak hasil perbaikan di FR-19. 
|
|
**
FR-22
**
 & 
**
FR-23
**
 (Pencatatan Riwayat Status) 
|
 FR-04, FR-13, FR-16, FR-18, FR-20, FR-21 
|
 Log riwayat audit status mencatat transisi status yang dipicu oleh alur kerja. 
|
|
**
FR-24
**
 (Role-Based Access Control) 
|
 Seluruh FR 
|
 Pembatasan hak akses berbasis peran harus diterapkan pada setiap fitur dan transisi status. 
|
|
**
FR-25
**
, 
**
FR-26
**
, 
**
FR-27
**
 (Dashboard) 
|
 FR-01, FR-04, FR-13, FR-16, FR-18, FR-20 
|
 Dashboard memerlukan data keluhan dan riwayat status yang terkumpul di database. 
|
|
**
NFR-02
**
 (Matriks Hak Akses) 
|
 FR-24 
|
 Penerapan teknis pembatasan akses untuk memenuhi NFR-02 bergantung pada FR-24. 
|
|
**
NFR-05
**
 (Audit Riwayat Status) 
|
 FR-22, FR-23 
|
 Keterauditan riwayat status bergantung pada pencatatan otomatis di FR-22 dan FR-23. 
|
|
**
NFR-06
**
 (Visualisasi Dashboard) 
|
 FR-25, FR-26, FR-27 
|
 Visualisasi grafis pada dashboard bergantung pada modul dashboard utama. 
|
---
## 2. Konflik Pemangku Kepentingan
### Konflik 1: Mekanisme Penentuan Prioritas Keluhan (Otomatis vs Manual/Subjektif)
- **Pemangku kepentingan yang terlibat:** Staf Administrator vs. Manajer Fasilitas & Teknisi.
- **Posisi:**
  - *Staf Administrator* menginginkan fleksibilitas untuk menentukan prioritas secara subjektif/manual berdasarkan analisis deskripsi laporan, karena keluhan yang masuk sering kali membutuhkan verifikasi kontekstual yang tidak dapat diprediksi oleh sistem.
  - *Manajer Fasilitas & Teknisi* menginginkan sistem otomatisasi prioritas berdasarkan kategori keluhan atau dampak (misalnya, masalah internet laboratorium langsung High, AC ruang kelas Medium) untuk standardisasi respons dan keadilan pengerjaan.
- **Resolusi:** 
  Pada rilis pertama (MVP), prioritas ditentukan secara manual oleh Administrator (FR-11) dengan opsi `High`, `Medium`, atau `Low`. Namun, Administrator wajib merujuk pada SOP / panduan kriteria standar penentuan prioritas (sesuai Asumsi A2). Fitur otomatisasi prioritas ditangguhkan ke rilis berikutnya.
- **Alasan:**
  Mengembangkan mesin aturan otomatis (rules engine) membutuhkan waktu analisis data historis dan konfigurasi tambahan yang kompleks. Dengan menetapkan prioritas secara manual oleh Admin, sistem dapat segera dirilis ke pengguna, dan standardisasi tetap dijaga secara operasional melalui SOP non-sistem.
### Konflik 2: Mekanisme Autentikasi Pengguna (Integrasi SSO Kampus vs Akun Lokal)
- **Pemangku kepentingan yang terlibat:** Departemen IT Kampus vs. Tim Pengembang & Pengguna Akhir (Mahasiswa/Dosen/Teknisi).
- **Posisi:**
  - *Departemen IT Kampus* mewajibkan integrasi Single Sign-On (SSO) internal universitas sejak awal demi keamanan, kemudahan manajemen pengguna, dan kepatuhan terhadap kebijakan tata kelola IT kampus.
  - *Tim Pengembang* menyarankan penggunaan database kredensial lokal (local credentials) terlebih dahulu untuk memotong waktu integrasi eksternal yang lambat karena kendala administratif dan birokrasi kampus.
- **Resolusi:**
  Aplikasi akan menggunakan akun dan kredensial lokal terpisah pada rilis pertama (MVP) dengan otorisasi berbasis peran (RBAC) yang ketat (FR-24). Integrasi SSO kampus (Q2) secara resmi ditangguhkan ke Fase 2.
- **Alasan:**
  Integrasi dengan SSO kampus memerlukan pembukaan gerbang API, konfigurasi protokol (OAuth2/SAML), dan persetujuan birokrasi IT universitas yang biasanya memakan waktu berminggu-minggu. Penundaan integrasi SSO ke Fase 2 memastikan aplikasi dapat dideploy ke lingkungan pengujian operasional lebih cepat.
### Konflik 3: Ketersediaan Fitur Unggah Bukti Foto Kerusakan
- **Pemangku kepentingan yang terlibat:** Pelapor (Mahasiswa/Dosen) & Teknisi vs. Manajer Fasilitas & Tim Pengembang.
- **Posisi:**
  - *Pelapor & Teknisi* sangat menginginkan fitur pengunggahan foto kerusakan saat membuat laporan, agar masalah lebih mudah dipahami oleh admin dan teknisi tanpa harus mencari penjelasan verbal yang panjang.
  - *Manajer Fasilitas & Tim Pengembang* menyarankan untuk meniadakan fitur foto pada rilis awal karena masalah keterbatasan kapasitas penyimpanan server internal kampus dan perlunya pengamanan tambahan terhadap file upload (risiko malware/skrip berbahaya).
- **Resolusi:**
  Sesuai keputusan elisitasi fungsional (EN-8/BR-09), fitur pengunggahan foto secara resmi dinyatakan berada **di luar lingkup** rilis awal. Klarifikasi visual dilakukan secara verbal/komentar atau melalui koordinasi langsung di lokasi.
- **Alasan:**
  Penetapan di luar lingkup ini disepakati demi keamanan data server kampus dan untuk mempercepat penyelesaian modul inti database tanpa terhambat penanganan enkripsi file dan validasi tipe media (security hardening).
---
## 3. Klasifikasi MoSCoW
|
 ID 
|
 Item 
|
 Klasifikasi 
|
 Alasan 
|
|
----
|
------
|
-------------
|
--------
|
|
**
FR-01
**
|
 Membuat laporan baru 
|
**
Must
**
|
 Fitur utama sistem; tanpanya alur pelaporan tidak dapat dimulai. 
|
|
**
FR-02
**
|
 Memilih kategori masalah 
|
**
Must
**
|
 Diperlukan untuk pengelompokan masalah dasar di sisi Admin dan dashboard (BR-01). 
|
|
**
FR-03
**
|
 Mengisi lokasi fisik spesifik 
|
**
Must
**
|
 Kritis bagi Teknisi untuk menemukan lokasi kerusakan tanpa kebingungan (IN1). 
|
|
**
FR-04
**
|
 Status awal 
`Submitted`
|
**
Must
**
|
 Menjamin konsistensi alur kerja siklus hidup status (C1). 
|
|
**
FR-05
**
|
 Tampilan daftar laporan Pelapor 
|
**
Must
**
|
 Pelapor harus dapat memantau keluhan yang mereka ajukan secara transparan. 
|
|
**
FR-07
**
|
 Detail laporan 
|
**
Must
**
|
 Halaman sentral untuk koordinasi, riwayat status, dan pengubahan data. 
|
|
**
FR-09
**
|
 Tinjau laporan 
`Under Review`
|
**
Must
**
|
 Langkah penapisan wajib bagi Admin untuk memverifikasi keabsahan laporan. 
|
|
**
FR-11
**
|
 Tentukan prioritas manual 
|
**
Must
**
|
 Diperlukan Admin untuk menandai urgensi pengerjaan keluhan (BR-02). 
|
|
**
FR-12
**
|
 Tugaskan Teknisi 
|
**
Must
**
|
 Penugasan personil adalah pendorong utama penanganan masalah di lapangan (G2). 
|
|
**
FR-13
**
|
 Ubah status menjadi 
`Assigned`
|
**
Must
**
|
 Menjamin perpindahan status sistem sesuai alur sequential (C1). 
|
|
**
FR-14
**
|
 Tampilan daftar tugas Teknisi 
|
**
Must
**
|
 Teknisi harus tahu pekerjaan apa saja yang didelegasikan kepada mereka. 
|
|
**
FR-15
**
|
 Teknisi menerima tugas 
|
**
Must
**
|
 Konfirmasi penerimaan pengerjaan oleh Teknisi secara sistemik. 
|
|
**
FR-16
**
|
 Ubah status ke 
`In Progress`
|
**
Must
**
|
 Penanda bahwa perbaikan fisik sedang berjalan di lapangan (C1). 
|
|
**
FR-18
**
|
 Tandai tugas selesai 
`Resolved`
|
**
Must
**
|
 Penanda pengerjaan selesai untuk memicu konfirmasi dari pelapor (C1). 
|
|
**
FR-19
**
|
 Pelapor konfirmasi hasil 
|
**
Must
**
|
 Kriteria penutupan wajib; memastikan kualitas hasil kerja teknisi (EN3). 
|
|
**
FR-20
**
|
 Tutup laporan 
`Closed`
|
**
Must
**
|
 Tahap akhir siklus hidup laporan; menutup tanggung jawab perbaikan (C1). 
|
|
**
FR-21
**
|
 Buka kembali laporan 
`Reopened`
|
**
Must
**
|
 Penanganan jika pekerjaan perbaikan ditolak oleh pelapor (BR-08). 
|
|
**
FR-24
**
|
 Role-Based Access Control (RBAC) 
|
**
Must
**
|
 Mencegah penyalahgunaan pengubahan status antar aktor (IN3, NFR-02). 
|
|
**
NFR-01
**
|
 Aksesibilitas multi-device 
|
**
Must
**
|
 Memastikan pelapor (desktop/hp) dan teknisi (lapangan/hp) dapat mengakses sistem (A1). 
|
|
**
NFR-02
**
|
 Pembatasan akses per peran 
|
**
Must
**
|
 Menjaga keamanan data laporan dan integritas status alur kerja. 
|
|
**
NFR-07
**
|
 Stack React, TS, dan Vite 
|
**
Must
**
|
 Batasan arsitektural teknis yang wajib diikuti (C2). 
|
|
**
FR-06
**
|
 Cari & Saring Laporan 
|
**
Should
**
|
 Sangat membantu Admin dan Pelapor mencari laporan lama, namun tidak memblokir alur utama jika dikerjakan setelah MVP dasar selesai. 
|
|
**
FR-08
**
|
 Tambah komentar Pelapor 
|
**
Should
**
|
 Memfasilitasi komunikasi jika ada detail tambahan, tetapi secara teknis alur status tetap dapat berjalan tanpa kolom komentar. 
|
|
**
FR-10
**
|
 Admin koreksi kategori 
|
**
Should
**
|
 Penting untuk merapikan data salah input pelapor, tetapi bisa dikoreksi lewat jalur operasional non-sistem di awal. 
|
|
**
FR-17
**
|
 Teknisi perbarui progres via catatan 
|
**
Should
**
|
 Transparansi progres pengerjaan penting (G3), namun bisa diakomodasi sementara lewat status transisi 
`In Progress`
 itu sendiri. 
|
|
**
FR-22
**
|
 Catat riwayat status otomatis 
|
**
Should
**
|
 Kebutuhan audit transparansi (IN2). Dapat diimplementasikan sebagai pencatatan log data sederhana di database. 
|
|
**
FR-23
**
|
 Detail entri riwayat status 
|
**
Should
**
|
 Melengkapi FR-22 dengan pencatatan nama aktor, timestamp, dan perubahan status (IN2). 
|
|
**
NFR-05
**
|
 Riwayat status dapat diaudit 
|
**
Should
**
|
 Menjamin transparansi performa, namun bukan fitur fungsional transaksional yang memblokir perbaikan fisik. 
|
|
**
FR-25
**
|
 Dashboard Manajer Fasilitas 
|
**
Could
**
|
 Membantu evaluasi performa manajemen, tetapi tidak berdampak langsung pada kecepatan perbaikan teknis harian. 
|
|
**
FR-26
**
|
 Jumlah laporan per status di dashboard
|
**
Could
**
|
 Atribut visual dashboard (IN4); dapat ditunda dan disajikan lewat ekspor excel sementara. 
|
|
**
FR-27
**
|
 Jumlah laporan per kategori di dashboard
|
**
Could
**
|
 Atribut visual dashboard (IN4); dapat ditunda dan disajikan lewat ekspor excel sementara. 
|
|
**
NFR-06
**
|
 Representasi grafis dashboard 
|
**
Could
**
|
 Kebutuhan estetika visual manajemen, bukan kebutuhan operasional primer. 
|
|
**
Q2 (SSO)
**
|
 Integrasi SSO Kampus 
|
**
Won't
**
|
 Ditangguhkan ke Fase 2 menunggu persetujuan teknis dan birokrasi IT Kampus. 
|
|
**
Q3 (SLA)
**
|
 SLA Otomatis & Eskalasi 
|
**
Won't
**
|
 Ditangguhkan ke Fase 2 menunggu kesepakatan tertulis dari Manajer Fasilitas mengenai matriks waktu respons. 
|
|
**
Q4 (Notif)
**
|
 Notifikasi Eksternal (WA/Push) 
|
**
Won't
**
|
 Ditangguhkan karena biaya API eksternal dan kebutuhan sertifikat pihak ketiga. Hanya menggunakan notifikasi in-app dasar jika dimungkinkan. 
|
---
## 4. Trade-off
1. **Dashboard Manajer Fasilitas didegradasi ke *Could Have*:**
   - **Mendapatkan:** Penghematan waktu pengembangan frontend dan backend yang signifikan, memungkinkan tim fokus 100% pada penyelesaian alur kerja transaksional keluhan (pelaporan, peninjauan, perbaikan, konfirmasi) yang sangat krusial bagi mahasiswa dan teknisi.
   - **Mengorbankan:** Manajer Fasilitas tidak memiliki visualisasi dashboard real-time di dalam sistem sejak hari pertama rilis MVP. Evaluasi kinerja awal harus dilakukan dengan meminta data mentah excel kepada Administrator.
   - **Diterima karena:** Prioritas utama sistem adalah memastikan AC rusak, proyektor mati, atau internet kampus bermasalah segera dilaporkan dan diperbaiki oleh teknisi. Dashboard visual bersifat sekunder dibanding keberhasilan perbaikan fisik di lapangan.
2. **Penggunaan Akun Lokal alih-alih SSO Kampus:**
   - **Mendapatkan:** Menghilangkan ketergantungan eksternal pada tim IT universitas, menghindari hambatan administrasi dokumen, dan mempercepat fase deployment uji coba (pilot testing).
   - **Mengorbankan:** Pengguna harus membuat akun baru secara manual untuk aplikasi ini dan mengelola kredensial tambahan (tidak terintegrasi dengan akun email kampus utama).
   - **Diterima karena:** Integrasi SSO dapat memakan waktu berminggu-minggu karena birokrasi kampus. Akun lokal memungkinkan sistem langsung diuji coba dalam skala kecil (pilot group) tanpa menunggu persetujuan IT formal.
3. **Penundaan Riwayat Status Detail (`FR-22`, `FR-23`) ke *Should Have*:**
   - **Mendapatkan:** Kecepatan implementasi database skema awal tanpa perlu mendesain tabel audit log relasional yang rumit di iterasi pertama.
   - **Mengorbankan:** Administrator tidak dapat melihat kronologi audit terperinci mengenai siapa yang mengubah status laporan pada rilis MVP awal, hanya status terbaru saja yang tercatat di laporan.
   - **Diterima karena:** Alur kerja utama tetap dapat diselesaikan dengan menyimpan kolom status terbaru di dalam tabel laporan keluhan utama.
---
## 5. Ringkasan Alasan Keputusan
Prioritisasi rilis MVP untuk **Campus Service Request and Maintenance System** didasarkan pada satu prinsip utama: **menghilangkan sumbatan (bottleneck) komunikasi fisik dalam pelaporan kerusakan fasilitas**. 
Oleh karena itu, semua fitur yang mendukung alur kerja pelaporan secara vertikal (Pelapor -> Admin -> Teknisi -> Pelapor -> Admin) diklasifikasikan sebagai **Must Have**. Fitur-fitur ini mencakup pembuatan laporan keluhan, peninjauan, penugasan teknisi, pengerjaan di lapangan, konfirmasi pelapor, penutupan laporan, dan pembatasan akses berbasis peran (RBAC) demi integritas data alur kerja.
Fitur penunjang produktivitas (pencarian, saringan, komentar koordinasi) diklasifikasikan sebagai **Should Have** karena penting untuk efisiensi sehari-hari tetapi secara fungsional tidak menghentikan alur perbaikan jika terjadi keterlambatan rilis. 
Dashboard eksekutif diklasifikasikan sebagai **Could Have** karena bersifat analitis pasca-kejadian. Integrasi eksternal (SSO, otomatisasi SLA, WhatsApp API) dikategorikan sebagai **Won't Have** untuk iterasi pertama untuk meminimalkan ketergantungan pada birokrasi eksternal kampus dan biaya infrastruktur pihak ketiga.
---
## 6. Status Dokumen
Draf dokumen prioritisasi ini disusun berdasarkan draf spesifikasi `03-specification.md`, rencana & temuan elisitasi `02-elicitation.md`, dan dokumen inception `01-inception.md` dengan merujuk pada panduan operasional `skills/04-prioritization/SKILL.md`. Dokumen prioritisasi ini siap diajukan kepada Manajer Fasilitas dan Departemen IT Kampus untuk mendapatkan persetujuan akhir sebelum tahap implementasi dimulai.
---