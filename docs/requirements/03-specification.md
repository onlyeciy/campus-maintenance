# Spesifikasi: Campus Service Request and Maintenance System

## 1. Functional Requirements
| ID | Requirement | Sumber |
|----|-------------|--------|
| FR-01 | Sistem harus mengizinkan Pelapor membuat laporan keluhan fasilitas baru. | EN1, G1, CASE 2.2 |
| FR-02 | Sistem harus mewajibkan Pelapor memilih satu kategori masalah saat membuat laporan. | EN1, CASE 1, CASE 2.2 |
| FR-03 | Sistem harus mewajibkan Pelapor mengisi lokasi fisik laporan secara spesifik. | IN1 |
| FR-04 | Sistem harus menyimpan laporan baru dengan status awal `Submitted`. | CASE 2.3, C1 |
| FR-05 | Sistem harus menampilkan daftar laporan yang pernah dibuat oleh Pelapor. | EN2, CASE 2.1 |
| FR-06 | Sistem harus mengizinkan pengguna mencari dan menyaring laporan berdasarkan status, kategori, dan tanggal. | CASE 2.2, Inception 4 |
| FR-07 | Sistem harus menampilkan detail laporan yang mencakup informasi pelapor, kategori masalah, lokasi, status terbaru, komentar, dan riwayat status. | EN2, IN1, IN2, Inception 4 |
| FR-08 | Sistem harus mengizinkan Pelapor menambahkan komentar atau catatan pada laporan yang mereka buat. | EN2, CASE 2.1, CASE 2.2 |
| FR-09 | Sistem harus mengizinkan Administrator meninjau laporan masuk yang berstatus `Under Review`. | EN4, CASE 2.1 |
| FR-10 | Sistem harus mengizinkan Administrator menentukan atau memperbaiki kategori laporan. | EN4, CASE 2.1, CASE 2.2 |
| FR-11 | Sistem harus mengizinkan Administrator menentukan prioritas laporan sebagai `High`, `Medium`, atau `Low`. | EN4, A2 |
| FR-12 | Sistem harus mengizinkan Administrator menugaskan satu Teknisi yang sesuai ke laporan yang telah ditinjau. | EN4, G2, CASE 2.2 |
| FR-13 | Sistem harus mengubah status laporan menjadi `Assigned` setelah Administrator menugaskan Teknisi. | EN4, CASE 2.3, C1 |
| FR-14 | Sistem harus menampilkan daftar tugas perbaikan yang ditugaskan kepada Teknisi yang sedang login. | EN6, CASE 2.1 |
| FR-15 | Sistem harus mengizinkan Teknisi menerima tugas yang telah ditugaskan kepada mereka. | EN6, CASE 2.1 |
| FR-16 | Sistem harus mengizinkan Teknisi mengubah status tugas dari `Assigned` menjadi `In Progress`. | EN6, CASE 2.3, C1 |
| FR-17 | Sistem harus mengizinkan Teknisi memperbarui progres pengerjaan melalui komentar atau catatan. | EN6, CASE 2.1, Inception 4 |
| FR-18 | Sistem harus mengizinkan Teknisi menandai pekerjaan sebagai selesai dengan status `Resolved`. | EN6, CASE 2.3, C1 |
| FR-19 | Sistem harus mengizinkan Pelapor memberikan konfirmasi menerima hasil perbaikan pada laporan berstatus `Resolved`. | EN3, Inception 4 |
| FR-20 | Sistem harus mengizinkan Administrator menutup laporan menjadi `Closed` setelah Pelapor mengonfirmasi hasil perbaikan. | EN5, CASE 2.3 |
| FR-21 | Sistem harus mengizinkan Administrator membuka kembali laporan menjadi `Reopened` jika Pelapor menolak hasil perbaikan. | EN5, Inception 4 |
| FR-22 | Sistem harus mencatat setiap perubahan status laporan secara kronologis. | IN2, CASE 2.2 |
| FR-23 | Sistem harus mencatat nama aktor, peran aktor, timestamp, status sebelum, dan status sesudah pada setiap riwayat perubahan status. | IN2 |
| FR-24 | Sistem harus membatasi aksi pembuatan, peninjauan, penugasan, pembaruan status, konfirmasi, penutupan, dan pembukaan kembali laporan berdasarkan peran pengguna. | IN3, CASE 2.1 |
| FR-25 | Sistem harus menampilkan dashboard ringkas untuk Manajer Fasilitas. | EN7, G4, CASE 2.2 |
| FR-26 | Sistem harus menampilkan jumlah laporan per status pada dashboard Manajer Fasilitas. | EN7, IN4 |
| FR-27 | Sistem harus menampilkan jumlah laporan per kategori keluhan pada dashboard Manajer Fasilitas. | EN7, IN4 |

## 2. Non-Functional Requirements
| ID | Requirement | Ukuran | Sumber |
|----|-------------|--------|--------|
| NFR-01 | Sistem harus dapat diakses melalui perangkat smartphone dan komputer yang memiliki koneksi internet. | Perangkat dan browser minimum perlu konfirmasi Departemen IT Kampus | A1 |
| NFR-02 | Sistem harus membatasi akses fitur dan data berdasarkan peran pengguna. | Matriks hak akses per peran harus terpenuhi untuk Pelapor, Administrator, Teknisi, dan Manajer Fasilitas | IN3 |
| NFR-03 | Sistem harus menampilkan pembaruan status laporan kepada Pelapor secara tepat waktu. | Ambang batas real-time belum ditentukan dan perlu konfirmasi stakeholder | G3 |
| NFR-04 | Sistem harus mendukung waktu respons penugasan yang dapat diukur untuk laporan masuk. | Target SLA belum ditentukan dan perlu konfirmasi Manajer Fasilitas | G2, Q3, temuan tindak lanjut |
| NFR-05 | Sistem harus menyimpan riwayat status sehingga dapat diaudit. | Periode retensi data audit perlu konfirmasi stakeholder | IN2 |
| NFR-06 | Sistem harus menyajikan visualisasi dashboard yang dapat dibaca untuk evaluasi kinerja pemeliharaan. | Jenis grafik minimal: ringkasan per status dan per kategori; standar aksesibilitas visual perlu konfirmasi | IN4, G4 |
| NFR-07 | Sistem harus berjalan pada stack frontend React, TypeScript, dan Vite. | Sesuai template repositori yang digunakan | C2 |

## 3. Business Rules
| ID | Aturan | Sumber |
|----|--------|--------|
| BR-01 | Kategori masalah yang tersedia adalah Peralatan Presentasi, Jaringan & Internet, Kenyamanan Ruangan, Furnitur, Peralatan Laboratorium, Kebersihan & Sanitasi. | EN1, CASE 1 |
| BR-02 | Prioritas laporan hanya boleh bernilai `High`, `Medium`, atau `Low`. | EN4 |
| BR-03 | Status laporan harus mengikuti siklus utama `Submitted -> Under Review -> Assigned -> In Progress -> Resolved -> Closed`. | C1, CASE 2.3 |
| BR-04 | Hanya Administrator yang boleh menentukan prioritas laporan. | EN4, IN3 |
| BR-05 | Hanya Administrator yang boleh menugaskan Teknisi pada laporan. | EN4, IN3 |
| BR-06 | Hanya Teknisi yang ditugaskan pada laporan yang boleh memperbarui progres pengerjaan dan menandai pekerjaan selesai. | EN6, IN3 |
| BR-07 | Laporan tidak boleh ditutup permanen sebelum Pelapor memberikan konfirmasi penyelesaian. | EN3, EN5 |
| BR-08 | Jika Pelapor menolak hasil perbaikan, Administrator dapat membuka kembali laporan dengan status `Reopened`. | EN5 |
| BR-09 | Sistem tidak mencakup fitur unggah foto atau media visual sebagai bukti keluhan. | EN8, Inception 4 |
| BR-10 | Sistem tidak mencakup manajemen inventaris, pemesanan suku cadang, absensi, penjadwalan shift, payroll teknisi, integrasi keuangan, atau pelacakan GPS teknisi. | Inception 4 |

## 4. User Stories & Acceptance Criteria

### US-01: Membuat laporan keluhan
**Sebagai** Pelapor, **saya ingin** membuat laporan keluhan fasilitas dengan kategori dan lokasi yang jelas, **sehingga** masalah fasilitas dapat diteruskan untuk ditinjau oleh Administrator.

Requirement terkait: FR-01, FR-02, FR-03, FR-04, BR-01, BR-09

**Acceptance Criteria:**
- AC-01.1: Given saya login sebagai Pelapor, When saya membuka formulir laporan baru, Then saya dapat mengisi kategori masalah, lokasi fisik, dan deskripsi keluhan.
- AC-01.2: Given saya belum memilih kategori masalah, When saya mengirim formulir laporan, Then sistem menolak penyimpanan dan menunjukkan bahwa kategori wajib dipilih.
- AC-01.3: Given saya belum mengisi lokasi fisik, When saya mengirim formulir laporan, Then sistem menolak penyimpanan dan menunjukkan bahwa lokasi wajib diisi.
- AC-01.4: Given data laporan wajib sudah lengkap, When saya mengirim laporan, Then sistem menyimpan laporan dengan status `Submitted`.
- AC-01.5: Given saya membuat laporan baru, When saya melihat formulir laporan, Then saya tidak melihat kontrol untuk mengunggah foto atau media visual.

### US-02: Melihat dan memfilter laporan
**Sebagai** Pelapor, **saya ingin** melihat, mencari, dan menyaring laporan saya, **sehingga** saya dapat memantau keluhan yang sudah saya ajukan.

Requirement terkait: FR-05, FR-06, FR-07

**Acceptance Criteria:**
- AC-02.1: Given saya login sebagai Pelapor, When saya membuka daftar laporan, Then sistem menampilkan laporan yang pernah saya buat.
- AC-02.2: Given daftar laporan tersedia, When saya menyaring berdasarkan status, Then sistem hanya menampilkan laporan dengan status yang dipilih.
- AC-02.3: Given daftar laporan tersedia, When saya menyaring berdasarkan kategori, Then sistem hanya menampilkan laporan dengan kategori yang dipilih.
- AC-02.4: Given daftar laporan tersedia, When saya menyaring berdasarkan tanggal, Then sistem hanya menampilkan laporan dalam rentang tanggal yang dipilih.
- AC-02.5: Given saya memilih salah satu laporan, When halaman detail dibuka, Then sistem menampilkan informasi laporan, status terbaru, komentar, dan riwayat status.

### US-03: Berkomentar pada laporan
**Sebagai** Pelapor, **saya ingin** menambahkan komentar pada laporan saya, **sehingga** saya dapat memberikan informasi tambahan tanpa membuat laporan baru.

Requirement terkait: FR-08, FR-17

**Acceptance Criteria:**
- AC-03.1: Given saya membuka detail laporan yang saya buat, When saya menambahkan komentar, Then komentar tersimpan pada laporan tersebut.
- AC-03.2: Given komentar berhasil disimpan, When detail laporan dibuka kembali, Then komentar tersebut tampil dalam daftar komentar laporan.

### US-04: Meninjau dan memprioritaskan laporan
**Sebagai** Administrator, **saya ingin** meninjau laporan masuk dan menentukan prioritasnya, **sehingga** laporan dapat diproses sesuai urgensi perbaikan.

Requirement terkait: FR-09, FR-10, FR-11, BR-02, BR-04

**Acceptance Criteria:**
- AC-04.1: Given saya login sebagai Administrator, When saya membuka daftar laporan masuk, Then saya dapat melihat laporan yang perlu ditinjau.
- AC-04.2: Given laporan sedang ditinjau, When saya memperbarui kategori laporan, Then sistem menyimpan kategori baru pada laporan tersebut.
- AC-04.3: Given laporan sedang ditinjau, When saya memilih prioritas selain `High`, `Medium`, atau `Low`, Then sistem menolak nilai prioritas tersebut.
- AC-04.4: Given saya bukan Administrator, When saya mencoba mengubah prioritas laporan, Then sistem menolak aksi tersebut.

### US-05: Menugaskan teknisi
**Sebagai** Administrator, **saya ingin** menugaskan Teknisi pada laporan yang telah ditinjau, **sehingga** pekerjaan perbaikan memiliki penanggung jawab yang jelas.

Requirement terkait: FR-12, FR-13, BR-05

**Acceptance Criteria:**
- AC-05.1: Given laporan telah ditinjau oleh Administrator, When saya memilih Teknisi dan menyimpan penugasan, Then sistem menetapkan Teknisi tersebut sebagai penanggung jawab laporan.
- AC-05.2: Given penugasan Teknisi berhasil disimpan, When detail laporan dibuka, Then status laporan berubah menjadi `Assigned`.
- AC-05.3: Given saya bukan Administrator, When saya mencoba menugaskan Teknisi, Then sistem menolak aksi tersebut.

### US-06: Mengerjakan tugas perbaikan
**Sebagai** Teknisi, **saya ingin** melihat dan menerima tugas yang diberikan kepada saya, **sehingga** saya dapat mengetahui pekerjaan perbaikan yang harus ditangani.

Requirement terkait: FR-14, FR-15, FR-16, BR-06

**Acceptance Criteria:**
- AC-06.1: Given saya login sebagai Teknisi, When saya membuka daftar tugas, Then sistem menampilkan tugas yang ditugaskan kepada saya.
- AC-06.2: Given tugas berstatus `Assigned`, When saya menerima dan mulai mengerjakan tugas, Then sistem mengubah status tugas menjadi `In Progress`.
- AC-06.3: Given sebuah laporan tidak ditugaskan kepada saya, When saya mencoba memperbarui status pengerjaan laporan tersebut, Then sistem menolak aksi tersebut.

### US-07: Memperbarui progres dan menyelesaikan pekerjaan
**Sebagai** Teknisi, **saya ingin** menambahkan progres dan menandai pekerjaan selesai, **sehingga** Pelapor dan Administrator mengetahui status pekerjaan terbaru.

Requirement terkait: FR-17, FR-18, BR-06

**Acceptance Criteria:**
- AC-07.1: Given saya adalah Teknisi yang ditugaskan dan laporan berstatus `In Progress`, When saya menambahkan catatan progres, Then sistem menyimpan catatan tersebut pada laporan.
- AC-07.2: Given pekerjaan telah selesai, When saya menandai laporan sebagai selesai, Then sistem mengubah status laporan menjadi `Resolved`.
- AC-07.3: Given laporan sudah berstatus `Resolved`, When Pelapor membuka detail laporan, Then sistem menampilkan status `Resolved` dan catatan progres terakhir yang tersimpan.

### US-08: Mengonfirmasi hasil perbaikan
**Sebagai** Pelapor, **saya ingin** mengonfirmasi apakah hasil perbaikan sudah sesuai, **sehingga** laporan hanya ditutup jika pekerjaan benar-benar diterima.

Requirement terkait: FR-19, FR-20, FR-21, BR-07, BR-08

**Acceptance Criteria:**
- AC-08.1: Given laporan saya berstatus `Resolved`, When saya menyetujui hasil perbaikan, Then sistem menyimpan konfirmasi penyelesaian pada laporan.
- AC-08.2: Given laporan telah dikonfirmasi selesai oleh Pelapor, When Administrator menutup laporan, Then sistem mengubah status laporan menjadi `Closed`.
- AC-08.3: Given laporan saya berstatus `Resolved`, When saya menolak hasil perbaikan, Then sistem menyimpan penolakan penyelesaian pada laporan.
- AC-08.4: Given Pelapor menolak hasil perbaikan, When Administrator membuka kembali laporan, Then sistem mengubah status laporan menjadi `Reopened`.
- AC-08.5: Given laporan belum dikonfirmasi selesai oleh Pelapor, When Administrator mencoba menutup laporan, Then sistem menolak penutupan permanen.

### US-09: Mencatat riwayat status
**Sebagai** Administrator, **saya ingin** setiap perubahan status tercatat otomatis, **sehingga** proses penanganan laporan dapat diaudit.

Requirement terkait: FR-22, FR-23, NFR-05

**Acceptance Criteria:**
- AC-09.1: Given status laporan berubah, When perubahan status berhasil disimpan, Then sistem menambahkan entri riwayat status baru.
- AC-09.2: Given entri riwayat status dibuat, When riwayat ditampilkan, Then entri memuat nama aktor, peran aktor, timestamp, status sebelum, dan status sesudah.
- AC-09.3: Given laporan memiliki beberapa perubahan status, When riwayat status ditampilkan, Then sistem menampilkan riwayat secara kronologis.

### US-10: Memantau dashboard fasilitas
**Sebagai** Manajer Fasilitas, **saya ingin** melihat dashboard ringkas laporan fasilitas, **sehingga** saya dapat mengevaluasi beban kerja dan kondisi layanan pemeliharaan kampus.

Requirement terkait: FR-25, FR-26, FR-27, NFR-06

**Acceptance Criteria:**
- AC-10.1: Given saya login sebagai Manajer Fasilitas, When saya membuka dashboard, Then sistem menampilkan ringkasan jumlah laporan.
- AC-10.2: Given data laporan tersedia, When dashboard ditampilkan, Then sistem menampilkan jumlah laporan per status.
- AC-10.3: Given data laporan tersedia, When dashboard ditampilkan, Then sistem menampilkan jumlah laporan per kategori keluhan.
- AC-10.4: Given saya bukan Manajer Fasilitas, When saya mencoba membuka dashboard manajerial, Then sistem menolak akses tersebut.

## 5. Catatan Traceability
Semua functional requirements diturunkan dari CASE.md, dokumen inception, dan temuan elisitasi EN1-EN8 serta IN1-IN4.

NFR-03, NFR-04, dan NFR-05 memiliki ukuran operasional yang belum final karena dokumen sumber belum menetapkan ambang batas real-time, SLA respons/perbaikan, atau periode retensi audit. Requirement tersebut tetap dicatat karena tersirat dari tujuan transparansi progres, kebutuhan eskalasi/SLA, dan kebutuhan riwayat status.

Mekanisme autentikasi, integrasi SSO kampus, dan notifikasi otomatis belum dispesifikasikan sebagai functional requirement karena masih menjadi pertanyaan terbuka pada Q2 dan Q4. Jika stakeholder menyetujui SSO atau notifikasi, requirement tambahan perlu dibuat pada revisi berikutnya.

Fitur unggah foto atau media visual sengaja dinyatakan sebagai business rule pengecualian karena sudah diputuskan di luar lingkup melalui EN8.

## 6. Status Dokumen
Draf spesifikasi ini disusun berdasarkan CASE.md, docs/requirements/01-inception.md, dan docs/requirements/02-elicitation.md menggunakan skill 03-specification. Ambang batas SLA, mekanisme autentikasi, notifikasi, standar aksesibilitas dashboard, dan periode retensi audit masih memerlukan konfirmasi stakeholder.
