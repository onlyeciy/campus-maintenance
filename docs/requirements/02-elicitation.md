# Rencana & Temuan Elisitasi: Campus Service Request and Maintenance System
## A. Rencana Elisitasi
### Pemilihan Teknik
- **Teknik yang direkomendasikan**: *Semi-Structured Interview* dan *Diskusi Kelompok Terfokus (FGD - Focus Group Discussion)*
- **Alasan**: 
  - *Semi-Structured Interview* sangat efektif untuk menggali kebutuhan spesifik dan alur kerja harian dari masing-masing kelompok aktor (Pelapor, Administrator, Teknisi, Manajer Fasilitas) secara terpisah.
  - *Diskusi Kelompok Terfokus (FGD)* membantu mempertemukan perwakilan seluruh aktor untuk menyepakati visualisasi perjalanan pengguna (user journey) saat status laporan berpindah, memastikan alur kerja sistem terasa logis bagi pelapor maupun teknisi.
### Pertanyaan Interview
**Pertanyaan pembuka / konteks**
1. Bagaimana proses pelaporan masalah fasilitas kampus berjalan saat ini, dan apa kendala terbesar yang sering dialami oleh pelapor, admin, maupun teknisi di lapangan?
**Pertanyaan inti yang terbuka**
2. Untuk **Pelapor (Mahasiswa/Dosen)**: Ketika Anda membuat laporan mengenai kerusakan fasilitas (misalnya AC tidak dingin), informasi apa saja selain kategori masalah yang paling penting Anda cantumkan agar keluhan segera dipahami?
3. Untuk **Administrator**: Bagaimana cara Anda memverifikasi keabsahan laporan baru dan menentukan prioritasnya (High, Medium, Low) sebelum menugaskannya kepada teknisi?
4. Untuk **Teknisi**: Informasi detail apa saja yang wajib tercantum di dalam laporan tugas perbaikan agar Anda dapat langsung menyelesaikan masalah tanpa harus bertanya balik kepada pelapor?
5. Untuk **Manajer Fasilitas**: Informasi atau metrik performa apa saja yang paling kritis yang Anda butuhkan pada dashboard untuk mengevaluasi efisiensi tim pemeliharaan?
**Pertanyaan lanjutan yang menelusuri (untuk menyelesaikan pertanyaan terbuka dari Inception)**
6. **Mekanisme Login**: Bagaimana cara para pengguna masuk ke dalam aplikasi? Apakah akan menggunakan Single Sign-On (SSO) universitas atau akun lokal terpisah untuk masing-masing aktor?
7. **SLA & Eskalasi**: Apakah perlu ada notifikasi otomatis atau eskalasi jika teknisi tidak merespons tugas perbaikan dalam jangka waktu tertentu setelah ditugaskan?
**Pertanyaan penutup**
8. Apakah ada hal lain tentang sistem pengelolaan fasilitas kampus ini yang belum kita bahas dan menurut Anda penting untuk diimplementasikan?
---
## B. Temuan Elisitasi
### Kebutuhan Eksplisit
- **EN1**: Pelapor (Mahasiswa/Dosen) harus dapat membuat laporan keluhan baru dengan menentukan kategori fasilitas yang bermasalah (proyektor, internet, AC, kursi, alat laboratorium, kebersihan ruangan) — *sumber: CASE.md Bagian 1 & 2.2*
- **EN2**: Pelapor harus dapat melihat daftar laporan yang pernah mereka buat, melacak status terbarunya, melihat detail laporan, serta menambahkan komentar/catatan — *sumber: CASE.md Bagian 2.1 & 2.2*
- **EN3**: Pelapor harus memberikan konfirmasi penyelesaian (hasil perbaikan) setelah pekerjaan diselesaikan oleh Teknisi sebelum laporan ditutup — *sumber: CASE.md Bagian 1 & 2.1*
- **EN4**: Administrator membutuhkan fitur untuk meninjau laporan masuk (Under Review), menentukan kategori & tingkat prioritas (High, Medium, Low), serta menugaskan Teknisi yang sesuai — *sumber: CASE.md Bagian 1, 2.1, & 2.2*
- **EN5**: Administrator berwenang menutup (Closed) laporan secara permanen setelah dikonfirmasi selesai oleh Pelapor, atau membuka kembali (Reopened) jika konfirmasi ditolak — *sumber: CASE.md Bagian 1 & 2.2*
- **EN6**: Teknisi harus dapat melihat daftar tugas perbaikan yang didelegasikan kepada mereka, menerima tugas tersebut, memperbarui progres pengerjaan di lapangan, dan menandai pekerjaan telah selesai (Resolved) — *sumber: CASE.md Bagian 1 & 2.1*
- **EN7**: Manajer Fasilitas membutuhkan fitur dashboard sederhana untuk memantau ringkasan seluruh laporan perbaikan fasilitas — *sumber: CASE.md Bagian 2.1 & 2.2*
- **EN8**: Aplikasi tidak akan menyertakan fitur untuk mengunggah foto atau media visual sebagai bukti keluhan — *sumber: Keputusan Pengguna (Feedback Fase Inception)*
### Kebutuhan Implisit
- **IN1**: Detail laporan kerusakan harus mencantumkan lokasi fisik yang spesifik (nomor kelas, lantai, nama gedung/laboratorium) agar teknisi dapat menemukan lokasi tanpa kesulitan — *basis: Teknisi tidak dapat memperbaiki AC atau kursi yang rusak tanpa mengetahui lokasi fisiknya.*
- **IN2**: Setiap perubahan status laporan wajib mencatat nama aktor pengubah, timestamp waktu perubahan, dan riwayat status sebelumnya secara kronologis — *basis: Kebutuhan fitur "Menyimpan riwayat status" di CASE.md Bagian 2.2.*
- **IN3**: Hak akses untuk mengubah status laporan harus dibatasi secara ketat berdasarkan peran (Role-Based Access Control) — *basis: Alur siklus hidup status di CASE.md Bagian 2.3 menyiratkan masing-masing aktor hanya dapat mengeksekusi transisi status tertentu.*
- **IN4**: Dashboard Manajer Fasilitas membutuhkan representasi grafis (seperti diagram batang/lingkaran) yang meringkas jumlah laporan per status dan kategori keluhan — *basis: Peran manajer membutuhkan visualisasi visual yang cepat dicerna untuk evaluasi kinerja.*
### Sinyal yang Bertentangan atau Tidak Jelas
- Tidak ada pertentangan langsung yang ditemukan di dalam deskripsi sistem. Namun, mekanisme pembagian prioritas keluhan (apakah ditentukan secara subjektif oleh Administrator atau berdasarkan aturan otomatis untuk kategori tertentu) masih memerlukan panduan operasional.
### Kebutuhan yang Memerlukan Tindak Lanjut
- **Mekanisme Autentikasi**: Keputusan akhir mengenai integrasi Single Sign-On (SSO) kampus atau penggunaan kredensial lokal untuk masing-masing tipe pengguna perlu dikonfirmasi oleh Departemen IT Kampus.
- **SLA & Notifikasi**: Waktu respons standar perbaikan berdasarkan prioritas keluhan dan saluran pengiriman notifikasi otomatis perlu disepakati bersama Manajer Fasilitas.
## Status Dokumen
Temuan dan rencana elisitasi disusun berdasarkan analisis dokumen [CASE.md](file:///home/juiziy/.gemini/antigravity/worktrees/campus-maintenance/read-case-documentation/CASE.md) dan draf Inception yang telah disetujui. Detail integrasi IT dan kebijakan SLA memerlukan masukan dari pihak kampus sebelum berlanjut ke spesifikasi requirement fungsional terperinci.
