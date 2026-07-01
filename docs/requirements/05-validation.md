# Validasi: Dokumen Rekayasa Kebutuhan Campus Service Request and Maintenance System
Dokumen ini memvalidasi rantai artefak rekayasa kebutuhan (Inception, Elisitasi, Spesifikasi, dan Prioritisasi) untuk sistem pengelolaan keluhan fasilitas kampus. Evaluasi dilakukan berdasarkan enam kriteria kualitas standar rekayasa perangkat lunak.
---
## A. Temuan Validasi
### Kejelasan (Clarity)
- **NFR-01 (Aksesibilitas Perangkat)**: Pernyataan mengenai perangkat dan browser minimum ditangguhkan dengan catatan "perlu konfirmasi Departemen IT Kampus". Hal ini membuat cakupan dukungan teknis sistem menjadi kabur bagi pengembang.  
  *Tingkat Keparahan:* **Major**
- **NFR-03 (Pembaruan Status Tepat Waktu)**: Frasa "secara tepat waktu" bersifat subjektif. Catatan ukuran menyatakan "ambang batas real-time belum ditentukan", sehingga tidak ada standar kejelasan tentang apa yang dimaksud dengan "tepat waktu" (apakah di bawah 5 detik, 1 menit, atau polling berkala).  
  *Tingkat Keparahan:* **Major**
- **NFR-04 (Waktu Respons Penugasan)**: Target SLA waktu respons penugasan ditangguhkan ("belum ditentukan, perlu konfirmasi Manajer Fasilitas"). Hal ini membuat definisi performa respons sistem tidak jelas.  
  *Tingkat Keparahan:* **Major**
- **NFR-05 (Retensi Riwayat Audit)**: Batasan retensi data audit ditangguhkan ("perlu konfirmasi"). Ini meninggalkan ketidakjelasan tentang berapa lama log perubahan status harus disimpan di database sebelum diarsipkan.  
  *Tingkat Keparahan:* **Major**
- **NFR-06 (Aksesibilitas Visual Dashboard)**: Frasa "dapat dibaca" bersifat subjektif dan standar aksesibilitas visual ditandai sebagai "perlu konfirmasi".  
  *Tingkat Keparahan:* **Major**
### Kelengkapan (Completeness)
- **FR-15 (Teknisi Menerima Tugas)**: Kebutuhan menyatakan "Sistem harus mengizinkan Teknisi menerima tugas", tetapi alur status yang didefinisikan di `BR-03` tidak memiliki status antara seperti "Accepted" atau "Acknowledged". Di dalam `US-06` (`AC-06.2`), aksi menerima tugas langsung mengubah status menjadi `In Progress`. Pemisahan antara "menerima tugas" (FR-15) dan "mulai mengerjakan" (FR-16) di tingkat requirement fungsional tidak diimbangi dengan kejelasan struktur data status.  
  *Tingkat Keparahan:* **Major**
- **Siklus Hidup Status `Reopened`**: Spesifikasi mendefinisikan transisi status ke `Reopened` (`FR-21` / `BR-08`), tetapi tidak mendefinisikan transisi hilir setelah status tersebut (misalnya, apakah dari `Reopened` laporan harus kembali ke `Under Review` atau langsung ke `Assigned` untuk penugasan ulang teknisi). Dokumentasi siklus status pada `US-08` tidak lengkap dalam mendefinisikan perilaku akhir dari status `Reopened`.  
  *Tingkat Keparahan:* **Blocker**
### Konsistensi (Consistency)
- **Konflik Siklus Status Linear vs Status `Reopened`**:
  - `C1` (Inception 6) dan `BR-03` (Specification 3) menyatakan bahwa status laporan harus mengikuti siklus utama yang **kaku dan berurutan (linear)**: `Submitted -> Under Review -> Assigned -> In Progress -> Resolved -> Closed`.
  - Namun, `FR-21` dan `BR-08` memperkenalkan status `Reopened` jika pelapor menolak hasil perbaikan (`Resolved`).
  - Ini adalah kontradiksi logis langsung (Blocker). Siklus tidak lagi kaku dan berurutan secara linear jika terdapat kemungkinan kembali/looping (melalui status `Reopened` atau kembali ke tahap penugasan).  
  *Tingkat Keparahan:* **Blocker**
- **Pertanyaan Terbuka Inception (`Q1`) vs Keputusan Elisitasi/Spesifikasi**:
  - Dokumen `01-inception.md` mencantumkan `Q1` (Apakah pelapor diizinkan mengunggah foto?) sebagai pertanyaan terbuka dengan pemilik "belum ditentukan".
  - Sementara itu, `02-elicitation.md` (`EN8`) dan `03-specification.md` (`BR-09`) secara tegas memutuskan bahwa fitur unggah foto berada di luar lingkup.
  - Ini merupakan ketidakkonsistenan informasi antar-dokumen. Meskipun dokumen dibuat berurutan, draf Inception sebaiknya diperbarui untuk mencerminkan keputusan akhir tersebut agar tidak membingungkan pembaca baru.  
  *Tingkat Keparahan:* **Minor**
### Kelayakan (Feasibility)
- **Implementasi State Machine non-Linear**: Implementasi teknis state machine dengan alur kaku (sesuai constraint `C1`/`BR-03`) tidak layak dikembangkan jika harus mendukung penolakan hasil perbaikan (`Reopened`). State machine harus didesain ulang sebagai diagram alir non-linear dengan looping transisi status.  
  *Tingkat Keparahan:* **Blocker**
### Keterujian (Testability)
- **NFR-03 (Pembaruan Status Real-time)**: Tidak dapat diuji (untestable) karena tidak memiliki ambang batas waktu numerik yang konkret (misalnya, "Sistem harus menampilkan pembaruan status kepada Pelapor dalam waktu maksimal 5 detik setelah status diubah").  
  *Tingkat Keparahan:* **Blocker**
- **NFR-04 (Target SLA Respons)**: Tidak dapat diuji karena nilai SLA respons masih berupa placeholder kosong ("belum ditentukan").  
  *Tingkat Keparahan:* **Blocker**
- **FR-15 (Menerima Tugas)**: Keterujian fitur ini terhambat karena tidak ada perubahan status sistem yang dapat diamati secara independen dari `In Progress` (`FR-16`).  
  *Tingkat Keparahan:* **Major**
### Ketertelusuran (Traceability)
- Secara umum, ketertelusuran dokumen berjalan dengan sangat baik:
  - Seluruh functional requirements (`FR-01` s.d `FR-27`) tertelusuri dengan jelas ke temuan elisitasi eksplisit (`EN`) dan implisit (`IN`).
  - Dokumen prioritisasi [04-prioritization.md](file:///C:/Users/Prayshe/.gemini/antigravity/worktrees/campus-maintenance/prioritize-inception-elicitation-requirements/docs/requirements/04-prioritization.md) memetakan seluruh item spesifikasi menggunakan ID yang konsisten.
  - Terdapat sedikit celah ketertelusuran pada `FR-21` (Reopened) yang dirunut ke `Inception 4` (Scope), tetapi detail mekanismenya tidak sepenuhnya tergambar di elisitasi bagian transisi status.  
  *Tingkat Keparahan:* **Minor**
---
## B. Ringkasan berdasarkan Tingkat Keparahan
|
 Tingkat Keparahan 
|
 Jumlah 
|
 Item 
|
|
----------
|
-------
|
-------
|
|
**
Blocker
**
|
 4 
|
 Konflik Siklus Status Linear vs 
`Reopened`
 (
`BR-03`
 vs 
`FR-21`
/
`BR-08`
), Kelayakan State Machine, Keterujian NFR-03 (Pembaruan Status), Keterujian NFR-04 (Target SLA) 
|
|
**
Major
**
|
 6 
|
 NFR-01 (Browser Minimum), NFR-03 (Clarity), NFR-04 (Clarity), NFR-05 (Retensi Audit), NFR-06 (Visualisasi), FR-15/FR-16 (Ambiguity Menerima Tugas) 
|
|
**
Minor
**
|
 2 
|
 Inkonsistensi 
`Q1`
 pada Inception Document, Ketertelusuran Detail Mekanisme Reopened (
`FR-21`
) 
|
---
## C. Rekomendasi Resolusi Tindak Lanjut
1. **Definisi Ulang Siklus Status (Mengatasi Blocker Kontradiksi Status)**:
   - Ubah batasan `BR-03` dan `C1` dari "siklus utama kaku dan berurutan linear" menjadi "siklus status berbasis State Chart yang mendukung alur kerja melingkar (loopback)".
   - Definisikan alur transisi `Reopened` secara formal: `Resolved -> (Rejected by Pelapor) -> Reopened -> (Admin Assign/Update) -> Assigned/In Progress`.
2. **Tetapkan Ambang Batas Pengukuran NFR (Mengatasi Blocker Keterujian NFR)**:
   - **NFR-03**: Tetapkan ambang batas, misalnya: "Sistem harus memperbarui status di UI Pelapor dalam 10 detik melalui mekanisme polling atau WebSockets."
   - **NFR-04**: Karena SLA ditangguhkan pada Fase MVP (`Won't Have` pada prioritisasi), hapus NFR-04 dari scope MVP agar tidak memblokir kelayakan pengujian rilis pertama.
3. **Sinkronisasi Dokumen Inception**:
   - Perbarui bagian `Q1` di `docs/requirements/01-inception.md` dengan menandai statusnya sebagai **[CLOSED - TERCANTUM DI LUAR LINGKUP]** berdasarkan keputusan `EN8` di dokumen elisitasi.
---
## Status Dokumen
Memvalidasi dokumen inception (`01-inception.md`), rencana & temuan elisitasi (`02-elicitation.md`), spesifikasi (`03-specification.md`), dan prioritisasi (`04-prioritization.md`) berdasarkan pedoman mutu `skills/05-validation/SKILL.md`. Hasil validasi ini memerlukan tindakan koreksi pada bagian alur status sebelum spesifikasi diserahkan kepada tim pengembang.