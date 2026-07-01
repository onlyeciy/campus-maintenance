# UI Flow: Campus Service Request and Maintenance System

## 1. Pendahuluan

Dokumen ini menggambarkan seluruh alur interaksi pengguna (*user flow*) pada sistem **Campus Service Request and Maintenance System**. Setiap alur mendeskripsikan langkah-langkah yang dilalui pengguna dari titik awal (*trigger*) hingga kondisi akhir (*end state*), termasuk percabangan logika dan penanganan error.

### 1.1 Aktor

| Aktor | Peran |
|---|---|
| **Pelapor** | Mahasiswa atau dosen yang melaporkan keluhan fasilitas |
| **Administrator** | Staf admin yang meninjau, memprioritaskan, dan menugaskan teknisi |
| **Teknisi** | Staf pemeliharaan yang menerima dan mengerjakan tugas perbaikan |
| **Manajer Fasilitas** | Kepala bagian yang memantau statistik dan kinerja sistem |

### 1.2 Notasi Diagram

| Simbol | Arti |
|---|---|
| `([...])` | Titik mulai / titik akhir (Start / End) |
| `[...]` | Halaman / Screen |
| `{...}` | Decision / Percabangan logika |
| `>...]` | Aksi pengguna |
| `-->` | Alur normal |
| `-.->` | Alur alternatif / error |

### 1.3 Referensi

- [`CASE.md`](../../../CASE.md) — Deskripsi umum & alur status
- [`docs/requirements/03-specification.md`](../requirements/03-specification.md) — FR, BR, User Stories
- [`docs/design/architecture-design.md`](architecture-design.md) — Arsitektur sistem
- [`docs/design/wireframe-ui.html`](wireframe-ui.html) — Wireframe UI

---

## 2. Alur Global: Login & Autentikasi

### UF-00 — Login dan Pemilihan Peran

**Aktor:** Semua aktor  
**Trigger:** Pengguna mengakses URL aplikasi atau sesi telah berakhir  
**FR terkait:** FR-24  
**BR terkait:** —  
**End State:** Pengguna berhasil masuk dan diarahkan ke halaman utama sesuai perannya

```mermaid
flowchart TD
    A([Buka Aplikasi]) --> B[Halaman Login]
    B --> C[/Pilih Peran: Pelapor / Admin / Teknisi / Manajer/]
    C --> D[/Isi Email & Kata Sandi/]
    D --> E{Validasi\nCredentials}
    E -- Valid & Peran Cocok --> F{Peran?}
    E -- Email / Password Salah --> G[Tampil Pesan: Email atau kata sandi salah]
    E -- Peran Tidak Cocok --> H[Tampil Pesan: Peran tidak sesuai akun ini]
    G --> D
    H --> C
    F -- Pelapor --> I[Halaman Dashboard Pelapor]
    F -- Administrator --> J[Halaman Admin Panel]
    F -- Teknisi --> K[Halaman Daftar Tugas Teknisi]
    F -- Manajer Fasilitas --> L[Halaman Dashboard Manajer]
```

#### Langkah-Langkah

| # | Aksi Pengguna | Respons Sistem |
|---|---|---|
| 1 | Buka URL aplikasi | Tampilkan halaman login dengan role selector |
| 2 | Pilih peran dari 4 opsi yang tersedia | Highlight pilihan peran aktif |
| 3 | Isi email dan kata sandi | — |
| 4 | Klik tombol **Masuk** | Validasi credentials + kecocokan peran ke DB |
| 5a | ✅ Valid | Buat session cookie → redirect ke halaman peran |
| 5b | ❌ Email/password salah | Tampil pesan error, form tetap aktif |
| 5c | ❌ Peran tidak cocok | Tampil pesan error, minta pilih ulang peran |

#### Edge Cases

| Kondisi | Penanganan |
|---|---|
| Sesi expired saat menggunakan aplikasi | Redirect ke halaman login, tampil notifikasi "Sesi Anda telah berakhir" |
| Akun belum dibuat | Tidak ada registrasi mandiri — hubungi Administrator |

---

## 3. Alur Pelapor

### UF-01 — Membuat Laporan Baru

**Aktor:** Pelapor  
**Trigger:** Klik tombol **Buat Laporan Baru** di sidebar atau dashboard  
**FR terkait:** FR-01, FR-02, FR-03, FR-04  
**BR terkait:** BR-01, BR-09  
**End State:** Laporan tersimpan dengan status `Submitted`

```mermaid
flowchart TD
    A([Dashboard Pelapor]) --> B[/Klik 'Buat Laporan Baru'/]
    B --> C[Halaman Form Laporan Baru]
    C --> D[/Isi Kategori Masalah/]
    D --> E[/Isi Lokasi Gedung & Ruangan/]
    E --> F[/Isi Judul Singkat/]
    F --> G[/Isi Deskripsi Lengkap/]
    G --> H[/Klik 'Kirim Laporan'/]
    H --> I{Validasi\nForm}
    I -- Semua field valid --> J[Simpan Laporan\nStatus: Submitted]
    I -- Ada field kosong --> K[Tampil Pesan Error\nper Field]
    K --> C
    J --> L[Halaman Detail Laporan\ndengan status Submitted]
    L --> M([Selesai])
```

#### Langkah-Langkah

| # | Halaman | Aksi Pengguna | Respons Sistem |
|---|---|---|---|
| 1 | Dashboard | Klik **Buat Laporan Baru** | Navigasi ke form |
| 2 | Form | Pilih kategori masalah (dropdown) | — |
| 3 | Form | Pilih gedung & isi lantai/ruangan | — |
| 4 | Form | Isi judul singkat | — |
| 5 | Form | Isi deskripsi lengkap | — |
| 6 | Form | Klik **Kirim Laporan** | Validasi semua field wajib |
| 7a | — | ✅ Valid | Simpan ke DB, redirect ke detail laporan, status = `Submitted` |
| 7b | — | ❌ Ada field kosong | Tampil pesan error inline per field |

#### Kategori Masalah yang Tersedia (BR-01)

- Peralatan Presentasi (Proyektor, Layar)
- Jaringan & Internet
- Kenyamanan Ruangan (AC, Ventilasi)
- Furnitur (Kursi, Meja)
- Peralatan Laboratorium
- Kebersihan & Sanitasi

---

### UF-02 — Melihat Daftar & Mencari Laporan

**Aktor:** Pelapor  
**Trigger:** Klik menu **Laporan Saya** di sidebar  
**FR terkait:** FR-05, FR-06  
**End State:** Pengguna melihat dan/atau menemukan laporan yang dicari

```mermaid
flowchart TD
    A([Dashboard Pelapor]) --> B[Halaman Daftar Laporan Saya]
    B --> C{Pengguna\nmelakukan?}
    C -- Scroll daftar --> D[Tampil semua laporan milik Pelapor]
    C -- Filter status --> E[/Pilih filter: Semua / Aktif / Selesai/]
    C -- Cari laporan --> F[/Ketik kata kunci di search bar/]
    E --> G[Daftar laporan difilter]
    F --> H[Daftar laporan difilter berdasarkan keyword]
    G --> I[/Klik baris laporan/]
    H --> I
    D --> I
    I --> J[Halaman Detail Laporan]
```

---

### UF-03 — Melihat Detail Laporan

**Aktor:** Pelapor  
**Trigger:** Klik salah satu baris laporan di daftar  
**FR terkait:** FR-07, FR-22, FR-23  
**End State:** Pengguna melihat detail lengkap laporan termasuk status terkini dan riwayat

```mermaid
flowchart TD
    A([Daftar Laporan]) --> B[/Klik laporan/]
    B --> C[Halaman Detail Laporan]
    C --> D[Tampil Info: Kategori, Lokasi, Deskripsi,\nPelapor, Teknisi, Status, Prioritas]
    C --> E[Tampil Riwayat Status Kronologis\nNama aktor + Peran + Timestamp]
    C --> F[Tampil Komentar & Catatan]
    C --> G{Status\nLaporan?}
    G -- Resolved --> H[Tampil Tombol: Konfirmasi / Tolak]
    G -- Lainnya --> I[Tombol aksi tidak aktif]
    H --> J[/Klik Konfirmasi atau Tolak/]
    J --> K[UF-04: Konfirmasi Hasil]
```

---

### UF-04 — Konfirmasi atau Tolak Hasil Perbaikan

**Aktor:** Pelapor  
**Trigger:** Laporan berstatus `Resolved`, Pelapor membuka detail laporan  
**FR terkait:** FR-19  
**BR terkait:** BR-07, BR-08  
**End State (Konfirmasi):** Administrator dapat menutup laporan → status `Closed`  
**End State (Tolak):** Administrator dapat membuka kembali → status `Reopened`

```mermaid
flowchart TD
    A([Detail Laporan\nStatus: Resolved]) --> B{Pelapor\nmemilih?}
    B -- Klik 'Konfirmasi Selesai' --> C[/Konfirmasi bahwa masalah sudah\nbenar-benar tertangani/]
    B -- Klik 'Tolak / Reopen' --> D[/Isi alasan penolakan\ndi form komentar/]
    C --> E[Sistem mencatat konfirmasi Pelapor]
    D --> F[Sistem mencatat penolakan Pelapor]
    E --> G[Notifikasi ke Administrator\nuntuk menutup laporan]
    F --> H[Notifikasi ke Administrator\nuntuk membuka kembali laporan]
    G --> I([Menunggu Admin menutup laporan])
    H --> J([Menunggu Admin reopen laporan])
```

#### Skenario

| Skenario | Aksi Pelapor | Aksi Sistem | Status Berikutnya |
|---|---|---|---|
| Puas dengan hasil | Klik **Konfirmasi Selesai** | Catat konfirmasi | Menunggu Admin → `Closed` |
| Tidak puas | Klik **Tolak / Reopen** + isi alasan | Catat penolakan | Menunggu Admin → `Reopened` |

---

### UF-05 — Menambahkan Komentar pada Laporan

**Aktor:** Pelapor  
**Trigger:** Pengguna berada di halaman detail laporan  
**FR terkait:** FR-08  
**End State:** Komentar tersimpan dan tampil di thread diskusi

```mermaid
flowchart TD
    A([Detail Laporan]) --> B[/Isi teks di kolom komentar/]
    B --> C[/Klik 'Kirim'/]
    C --> D{Teks\nkosong?}
    D -- Ya --> E[Tombol Kirim tidak aktif]
    D -- Tidak --> F[Simpan komentar ke DB]
    F --> G[Komentar muncul di thread\ndengan nama + peran + timestamp]
```

---

## 4. Alur Administrator

### UF-06 — Meninjau Laporan Masuk

**Aktor:** Administrator  
**Trigger:** Klik tombol **Tinjau** pada laporan berstatus `Submitted`  
**FR terkait:** FR-09, FR-10, FR-11  
**BR terkait:** BR-04  
**End State:** Laporan berstatus `Under Review`

```mermaid
flowchart TD
    A([Admin Panel — Daftar Laporan]) --> B[/Filter: Status = Submitted/]
    B --> C[Tampil laporan berstatus Submitted]
    C --> D[/Klik 'Tinjau' pada laporan/]
    D --> E[Halaman Detail Laporan + Panel Tindakan Admin]
    E --> F[Status otomatis berubah ke Under Review]
    E --> G[/Baca detail laporan: kategori, lokasi, deskripsi/]
    G --> H{Laporan\nvalid?}
    H -- Valid, lanjut ke penugasan --> I[UF-07: Tentukan Prioritas & Tugaskan]
    H -- Tidak relevan / duplikat --> J[/Klik 'Tolak Laporan'/]
    J --> K[Isi alasan penolakan]
    K --> L[Laporan ditolak & dicatat di riwayat]
```

---

### UF-07 — Menentukan Prioritas & Menugaskan Teknisi

**Aktor:** Administrator  
**Trigger:** Laporan sedang ditinjau (status `Under Review`)  
**FR terkait:** FR-11, FR-12, FR-13  
**BR terkait:** BR-02, BR-04, BR-05  
**End State:** Laporan berstatus `Assigned`, teknisi mendapat tugas baru

```mermaid
flowchart TD
    A([Detail Laporan\nStatus: Under Review]) --> B[/Pilih Prioritas:\nCritical / High / Medium / Low/]
    B --> C[/Pilih Teknisi dari dropdown\nHanya teknisi tersedia yang bisa dipilih/]
    C --> D[/Isi catatan untuk teknisi opsional/]
    D --> E[/Klik 'Tugaskan Teknisi'/]
    E --> F{Validasi:\nPrioritas &\nTeknisi terisi?}
    F -- Lengkap --> G[Status laporan → Assigned]
    F -- Tidak lengkap --> H[Tampil pesan error\npada field kosong]
    H --> B
    G --> I[Catat di status_history:\naktor, peran, timestamp,\nstatus sebelum dan sesudah]
    I --> J[Teknisi menerima tugas baru\ndi daftar tugasnya]
    J --> K([Selesai])
```

#### Aturan Pemilihan Teknisi

| Kondisi | Perilaku |
|---|---|
| Teknisi tersedia | Dapat dipilih dari dropdown |
| Teknisi sedang bertugas | Ditampilkan dengan label *(Sedang bertugas)*, tidak bisa dipilih |
| Tidak ada teknisi tersedia | Tampil pesan, Admin diminta mencoba lagi nanti |

---

### UF-08 — Menutup Laporan (Closed)

**Aktor:** Administrator  
**Trigger:** Pelapor telah mengonfirmasi hasil perbaikan  
**FR terkait:** FR-20  
**BR terkait:** BR-07  
**End State:** Laporan berstatus `Closed` secara permanen

```mermaid
flowchart TD
    A([Admin Panel — Laporan Resolved]) --> B[/Buka Detail Laporan/]
    B --> C{Pelapor sudah\nkonfirmasi?}
    C -- Sudah --> D[Tombol 'Tutup Laporan' aktif]
    C -- Belum --> E[Tombol 'Tutup Laporan' nonaktif]
    E --> F([Tunggu konfirmasi Pelapor])
    D --> G[/Klik 'Tutup Laporan'/]
    G --> H[Status laporan → Closed]
    H --> I[Catat di status_history]
    I --> J([Laporan selesai permanen])
```

---

### UF-09 — Membuka Kembali Laporan (Reopened)

**Aktor:** Administrator  
**Trigger:** Pelapor menolak hasil perbaikan  
**FR terkait:** FR-21  
**BR terkait:** BR-08  
**End State:** Laporan berstatus `Reopened`, siap ditugaskan ulang

```mermaid
flowchart TD
    A([Detail Laporan\nPelapor Menolak Hasil]) --> B[/Klik 'Buka Kembali Laporan'/]
    B --> C[Status laporan → Reopened]
    C --> D[Catat di status_history]
    D --> E[/Admin menugaskan ulang ke Teknisi/]
    E --> F[UF-07: Tentukan Prioritas & Tugaskan]
    F --> G[Status laporan → Assigned]
    G --> H([Alur perbaikan dimulai kembali])
```

> **Catatan BR-08:** Laporan berstatus `Reopened` **wajib** ditugaskan kembali oleh Administrator sebelum statusnya dapat berubah ke `Assigned`.

---

### UF-10 — Manajemen Pengguna (Buat Akun)

**Aktor:** Administrator  
**Trigger:** Klik menu **Manajemen Pengguna** → **Buat Akun Baru**  
**FR terkait:** FR-24 (RBAC)  
**End State:** Akun baru tersimpan di DB, pengguna dapat login

```mermaid
flowchart TD
    A([Menu Manajemen Pengguna]) --> B[/Klik 'Buat Akun Baru'/]
    B --> C[Form: Nama, Email, Password Awal, Peran]
    C --> D[/Isi semua field/]
    D --> E[/Klik 'Simpan'/]
    E --> F{Validasi:\nEmail unik &\nField lengkap?}
    F -- Valid --> G[Akun tersimpan di DB]
    F -- Email sudah digunakan --> H[Tampil pesan: Email sudah terdaftar]
    F -- Field kosong --> I[Tampil pesan error per field]
    H --> D
    I --> D
    G --> J([Akun berhasil dibuat])
```

> **Catatan:** Tidak ada registrasi mandiri. Semua akun hanya dibuat oleh Administrator. Teknisi dapat menggunakan email non-kampus.

---

## 5. Alur Teknisi

### UF-11 — Melihat & Menerima Tugas

**Aktor:** Teknisi  
**Trigger:** Login sebagai Teknisi → otomatis masuk ke halaman Daftar Tugas  
**FR terkait:** FR-14, FR-15, FR-16  
**BR terkait:** BR-06  
**End State:** Tugas diterima, status laporan berubah ke `In Progress`

```mermaid
flowchart TD
    A([Halaman Daftar Tugas Teknisi]) --> B[Tampil tugas berstatus Assigned\ndiurutkan berdasarkan prioritas]
    B --> C[/Klik kartu tugas untuk melihat detail/]
    C --> D[Halaman Detail Tugas]
    D --> E[Baca: lokasi, kategori, deskripsi,\nprioritas, catatan dari Admin]
    E --> F{Teknisi\nmemilih?}
    F -- Klik 'Terima Tugas' --> G[Status laporan → In Progress]
    G --> H[Catat di status_history:\nTeknisi, timestamp, Assigned → In Progress]
    H --> I[Tugas muncul di seksi\n'Sedang Dikerjakan']
    I --> J([Pekerjaan dimulai])
    F -- Kembali ke daftar --> B
```

---

### UF-12 — Memperbarui Progres Pengerjaan

**Aktor:** Teknisi  
**Trigger:** Tugas berstatus `In Progress`, Teknisi ingin update catatan pekerjaan  
**FR terkait:** FR-17  
**BR terkait:** BR-06  
**End State:** Komentar progres tersimpan dan tampil di thread laporan

```mermaid
flowchart TD
    A([Detail Tugas\nStatus: In Progress]) --> B[/Isi catatan progres di kolom komentar/]
    B --> C[/Klik 'Kirim'/]
    C --> D[Komentar tersimpan di DB]
    D --> E[Tampil di thread dengan\nnama Teknisi + timestamp]
    E --> F([Pelapor & Admin dapat\nmembaca update ini])
```

---

### UF-13 — Menandai Pekerjaan Selesai

**Aktor:** Teknisi  
**Trigger:** Pekerjaan selesai, Teknisi siap melaporkan hasil  
**FR terkait:** FR-18  
**BR terkait:** BR-06  
**End State:** Status laporan berubah ke `Resolved`, menunggu konfirmasi Pelapor

```mermaid
flowchart TD
    A([Detail Tugas\nStatus: In Progress]) --> B[/Klik 'Tandai Selesai'/]
    B --> C{Konfirmasi:\n'Apakah pekerjaan\nbenar-benar selesai?'}
    C -- Ya, Selesai --> D[Status laporan → Resolved]
    C -- Batal --> A
    D --> E[Catat di status_history:\nTeknisi, timestamp, In Progress → Resolved]
    E --> F[Tugas berpindah ke seksi\n'Menunggu Konfirmasi']
    F --> G([Menunggu konfirmasi Pelapor])
```

---

## 6. Alur Manajer Fasilitas

### UF-14 — Melihat Dashboard Statistik

**Aktor:** Manajer Fasilitas  
**Trigger:** Login sebagai Manajer → otomatis masuk ke Dashboard  
**FR terkait:** FR-25, FR-26, FR-27  
**End State:** Manajer membaca ringkasan data fasilitas

```mermaid
flowchart TD
    A([Login sebagai Manajer]) --> B[Halaman Dashboard Fasilitas]
    B --> C[Tampil Stat Cards:\nTotal Laporan, Selesai,\nRata-rata Penyelesaian, Kritis Aktif]
    B --> D[Tampil Bar Chart:\nLaporan per Bulan]
    B --> E[Tampil Donut Chart:\nDistribusi Status]
    B --> F[Tampil Progress Bar:\nLaporan per Kategori]
    B --> G{Manajer\nmemilih?}
    G -- Ganti periode --> H[/Pilih bulan/tahun dari filter/]
    H --> I[Data di-refresh sesuai periode]
    I --> B
    G -- Ekspor --> J[/Klik 'Ekspor PDF'/]
    J --> K[Unduh laporan PDF]
```

---

## 7. Alur Status Laporan (Master Flow)

Diagram berikut menggambarkan **seluruh transisi status** yang dapat terjadi pada sebuah laporan, beserta aktor pemicunya.

```mermaid
stateDiagram-v2
    direction LR

    [*] --> Submitted : Pelapor membuat laporan (UF-01)

    Submitted --> UnderReview : Admin meninjau laporan (UF-06)

    UnderReview --> Assigned : Admin menugaskan Teknisi (UF-07)

    Assigned --> InProgress : Teknisi menerima tugas (UF-11)

    InProgress --> Resolved : Teknisi tandai selesai (UF-13)

    Resolved --> Closed : Pelapor konfirmasi ✅ +\nAdmin menutup laporan (UF-04, UF-08)

    Resolved --> Reopened : Pelapor menolak ❌ +\nAdmin buka kembali (UF-04, UF-09)

    Reopened --> Assigned : Admin tugaskan ulang (UF-09 → UF-07)

    Closed --> [*]
```

### Tabel Transisi Status

| Dari | Ke | Aktor | Alur | FR |
|---|---|---|---|---|
| *(Baru)* | `Submitted` | Pelapor | UF-01 | FR-04 |
| `Submitted` | `Under Review` | Administrator | UF-06 | FR-09 |
| `Under Review` | `Assigned` | Administrator | UF-07 | FR-12, FR-13 |
| `Assigned` | `In Progress` | Teknisi | UF-11 | FR-15, FR-16 |
| `In Progress` | `Resolved` | Teknisi | UF-13 | FR-18 |
| `Resolved` | `Closed` | Administrator | UF-08 | FR-20 |
| `Resolved` | `Reopened` | Administrator | UF-09 | FR-21 |
| `Reopened` | `Assigned` | Administrator | UF-09 → UF-07 | BR-08, FR-12 |

---

## 8. Screen Mapping

Pemetaan setiap halaman UI ke alur yang menggunakannya.

| Screen / Halaman | URL | Alur yang Menggunakan | Aktor |
|---|---|---|---|
| Halaman Login | `/login` | UF-00 | Semua |
| Dashboard Pelapor | `/pelapor/laporan` | UF-02 | Pelapor |
| Form Laporan Baru | `/pelapor/laporan/baru` | UF-01 | Pelapor |
| Detail Laporan (Pelapor) | `/pelapor/laporan/:id` | UF-03, UF-04, UF-05 | Pelapor |
| Admin Panel — Daftar | `/admin/laporan` | UF-06 | Administrator |
| Admin — Detail & Tinjau | `/admin/laporan/:id` | UF-06, UF-07, UF-08, UF-09 | Administrator |
| Admin — Manajemen User | `/admin/pengguna` | UF-10 | Administrator |
| Daftar Tugas Teknisi | `/teknisi/tugas` | UF-11 | Teknisi |
| Detail Tugas Teknisi | `/teknisi/tugas/:id` | UF-11, UF-12, UF-13 | Teknisi |
| Dashboard Manajer | `/manajer/dashboard` | UF-14 | Manajer Fasilitas |

---

## 9. Edge Cases & Penanganan Error

| Kode | Skenario | Penanganan |
|---|---|---|
| EC-01 | Pengguna mengakses URL halaman peran lain | Redirect ke halaman perannya sendiri (RBAC) |
| EC-02 | Sesi kadaluarsa saat mengisi form | Redirect ke login, data form hilang — tampilkan pesan peringatan |
| EC-03 | Tidak ada teknisi tersedia saat Admin ingin menugaskan | Tampil pesan: *"Tidak ada teknisi tersedia saat ini"*, Admin menunggu |
| EC-04 | Pelapor mencoba akses detail laporan milik orang lain | Tampil halaman 403 Forbidden |
| EC-05 | Teknisi mencoba akses detail laporan bukan tugasnya | Tampil halaman 403 Forbidden |
| EC-06 | Laporan dihapus atau tidak ditemukan | Tampil halaman 404 Not Found |
| EC-07 | Koneksi internet terputus saat submit form | Tampil pesan error jaringan, data form tetap tersimpan di lokal |
| EC-08 | Teknisi klik "Tandai Selesai" dua kali | Tombol dinonaktifkan setelah klik pertama untuk mencegah duplikasi |

---

## 10. Status Dokumen

| Item | Detail |
|---|---|
| **Versi** | 1.0.0 |
| **Tanggal** | 1 Juli 2026 |
| **Dibuat oleh** | Antigravity AI |
| **Referensi Wireframe** | [`wireframe-ui.html`](wireframe-ui.html) |
| **Status** | ✅ Draft Final |

Dokumen ini disusun berdasarkan:
- [`CASE.md`](../../../CASE.md)
- [`docs/requirements/01-inception.md`](../requirements/01-inception.md)
- [`docs/requirements/03-specification.md`](../requirements/03-specification.md)
- [`docs/design/architecture-design.md`](architecture-design.md)
