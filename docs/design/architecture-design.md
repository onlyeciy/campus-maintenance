# Arsitektur Sistem: Campus Service Request and Maintenance System

## 1. Daftar Komponen Utama

### 1.1 Frontend (React + TypeScript + Vite → Cloudflare Pages)

**Tanggung Jawab:**
Menyajikan antarmuka pengguna (UI) yang diakses melalui browser desktop dan smartphone. Menangani routing halaman per-peran (Pelapor, Administrator, Teknisi, Manajer Fasilitas), mengirimkan permintaan REST ke Backend API, dan menampilkan respons data kepada pengguna.

**Teknologi & Deployment:** React + TypeScript + Vite, di-deploy ke **Cloudflare Pages**.

**Requirement terkait:** NFR-01, NFR-07, C2.

**Halaman / Modul utama:**
- Halaman Login — satu halaman login dengan **role selector** (Pelapor / Admin / Teknisi / Manajer); pengguna memilih perannya, mengisi email + password, lalu sistem memvalidasi kecocokan keduanya
- **Pelapor:** Formulir laporan baru, Daftar laporan, Detail laporan, Komentar, Konfirmasi hasil
- **Administrator:** Daftar laporan masuk, Tinjau & prioritaskan, Tugaskan teknisi, Tutup / buka kembali
- **Teknisi:** Daftar tugas, Terima tugas, Update progres, Tandai selesai
- **Manajer Fasilitas:** Dashboard ringkas (laporan per status & per kategori)

---

### 1.2 Backend / API (Cloudflare Workers — Modular)

**Tanggung Jawab:**
Menjalankan logika bisnis sistem, memvalidasi permintaan dari Frontend, menerbitkan dan memvalidasi session cookie, menerapkan RBAC, mengeksekusi transisi status laporan sesuai alur kerja, serta membaca/menulis data ke Cloudflare D1.

**Teknologi & Deployment:** Cloudflare Workers, dirancang secara **modular** (setiap resource/domain fungsional memiliki file/modul handler tersendiri, bukan satu skrip monolitik).

**Requirement terkait:** FR-24 (RBAC), FR-04/13/16/18/20/21 (transisi status), NFR-02, IN3, BR-03–BR-08, C1.

**Modul-modul Workers:**

| Modul | Tanggung Jawab |
|---|---|
| `auth` | Verifikasi email kampus + password, penerbitan & validasi session cookie, invalidasi sesi (logout) |
| `reports` | CRUD laporan keluhan, validasi field wajib (kategori, lokasi fisik) |
| `workflow` | Eksekusi transisi status (FR-04, 13, 16, 18, 20, 21), validasi RBAC per aksi |
| `comments` | Tambah & baca komentar pada laporan |
| `status-history` | Pencatatan otomatis setiap perubahan status (nama aktor, peran, timestamp, status sebelum/sesudah) |
| `dashboard` | Agregasi data laporan per status & per kategori untuk Manajer Fasilitas |
| `users` | Manajemen data pengguna oleh Admin: buat akun, atur peran (Pelapor/Admin/Teknisi/Manajer), reset password |

---

### 1.3 Database (Cloudflare D1 — SQLite, Paket Gratis)

**Tanggung Jawab:**
Menyimpan seluruh data persisten: data pengguna & peran, laporan keluhan, komentar, riwayat perubahan status, dan sesi aktif.

**Requirement terkait:** NFR-05 (retensi riwayat ≥ 3 tahun), FR-22/23 (log audit), FR-04/13/16/18/20/21.

**Tabel konseptual** *(detail kolom dan relasi akan dirancang di skill 07 — Database & API Design)*:

| Tabel | Isi |
|---|---|
| `users` | Data pengguna: email kampus, nama, peran (Pelapor/Admin/Teknisi/Manajer), password hash |
| `sessions` | Sesi aktif: session token, user_id, expiry — untuk validasi session cookie |
| `reports` | Laporan keluhan: kategori, lokasi, deskripsi, status terbaru, prioritas, pelapor, teknisi yang ditugaskan |
| `comments` | Komentar pada laporan: teks, penulis, timestamp |
| `status_history` | Riwayat kronologis perubahan status: nama aktor, peran, status_sebelum, status_sesudah, timestamp |

---

## 2. Diagram Arsitektur

```
┌─────────────────────────────────────────────────────────────────────┐
│                         PENGGUNA (Browser)                          │
│    Desktop / Smartphone — Chrome/Firefox/Edge/Safari ≥ v100        │
└────────────────────────────┬────────────────────────────────────────┘
                             │ HTTPS + Session Cookie
                             │
┌────────────────────────────▼────────────────────────────────────────┐
│                   FRONTEND                                          │
│         React + TypeScript + Vite                                   │
│         Di-deploy ke: Cloudflare Pages                              │
│                                                                     │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────────┐   │
│  │ Halaman    │ │ Halaman    │ │ Halaman    │ │ Dashboard      │   │
│  │ Pelapor    │ │ Admin      │ │ Teknisi    │ │ Manajer        │   │
│  └────────────┘ └────────────┘ └────────────┘ └────────────────┘   │
│  [Login Page] — email kampus + password → set session cookie        │
└────────────────────────────┬────────────────────────────────────────┘
                             │ REST API Call (JSON / HTTPS)
                             │ Session Cookie dikirim di setiap request
                             │
┌────────────────────────────▼────────────────────────────────────────┐
│                   BACKEND / API                                     │
│         Cloudflare Workers — Modular                                │
│                                                                     │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌─────────────┐  │
│  │   auth     │  │  reports   │  │  workflow  │  │  dashboard  │  │
│  │  (session  │  │  (CRUD     │  │  (transisi │  │  (agregasi  │  │
│  │   cookie)  │  │   laporan) │  │   status + │  │   per status│  │
│  └────────────┘  └────────────┘  │   RBAC)    │  │   & kategori│  │
│                                  └────────────┘  └─────────────┘  │
│  ┌────────────┐  ┌──────────────┐  ┌────────────┐                  │
│  │  comments  │  │status-history│  │   users    │                  │
│  └────────────┘  └──────────────┘  └────────────┘                  │
└────────────────────────────┬────────────────────────────────────────┘
                             │ SQL Query (D1 Binding)
                             │
┌────────────────────────────▼────────────────────────────────────────┐
│                   DATABASE                                          │
│         Cloudflare D1 (SQLite — Paket Gratis)                       │
│                                                                     │
│  [users]  [sessions]  [reports]  [comments]  [status_history]      │
└─────────────────────────────────────────────────────────────────────┘
```

**Pola komunikasi:**
- **Frontend → Backend:** REST API (JSON over HTTPS). Session cookie dikirim otomatis di setiap request. Frontend tidak mengakses D1 secara langsung.
- **Backend → Database:** D1 Binding — query SQL dieksekusi di dalam Cloudflare Workers, tidak melalui jaringan publik.
- **Frontend ↔ Cloudflare Pages:** Static asset di-serve oleh Cloudflare Pages; Workers dipanggil via fetch sebagai API endpoint terpisah.
- **Tidak ada** komunikasi Frontend → Database secara langsung.
- **Tidak ada** notifikasi (in-app maupun eksternal).

---

## 3. Pemetaan Aktor ke Komponen

| Aktor | Halaman Frontend (Pages) | Modul Backend (Workers) | Tabel D1 |
|---|---|---|---|
| **Pelapor** | Form laporan baru, Daftar laporan, Detail laporan, Komentar, Konfirmasi hasil | `reports`, `workflow`, `comments`, `status-history` | `reports`, `comments`, `status_history` |
| **Administrator** | Daftar laporan masuk, Tinjau & prioritaskan, Tugaskan teknisi, Tutup/Reopen | `reports`, `workflow`, `users` (daftar teknisi) | `reports`, `status_history`, `users` |
| **Teknisi** | Daftar tugas, Terima tugas, Update progres, Tandai selesai | `reports`, `workflow`, `comments`, `status-history` | `reports`, `comments`, `status_history` |
| **Manajer Fasilitas** | Dashboard ringkas | `dashboard` | `reports` (agregasi read-only) |
| **Semua Aktor** | Halaman Login | `auth` | `users`, `sessions` |

---

## 4. Pemetaan Alur Status ke Komponen

| Transisi Status | Aktor Pemicu | Modul Workers | Requirement |
|---|---|---|---|
| — → `Submitted` (status awal) | Pelapor | `reports` — saat laporan baru dibuat | FR-04 |
| `Submitted → Under Review` | Administrator | `workflow` — saat Admin membuka & meninjau laporan | FR-09 |
| `Under Review → Assigned` | Administrator | `workflow` — saat Admin menugaskan Teknisi | FR-12, FR-13 |
| `Assigned → In Progress` | Teknisi | `workflow` — saat Teknisi menerima tugas | FR-15, FR-16 |
| `In Progress → Resolved` | Teknisi | `workflow` — saat Teknisi menandai selesai | FR-18 |
| `Resolved → Closed` | Administrator | `workflow` — setelah Pelapor konfirmasi menerima | FR-19, FR-20, BR-07 |
| `Resolved → Reopened` | Administrator | `workflow` — jika Pelapor menolak hasil | FR-21, BR-08 |
| `Reopened → Assigned` | Administrator | `workflow` — Admin menugaskan ulang Teknisi | BR-08, FR-12 |

**Pencatatan otomatis:** Setiap transisi status di atas akan dicatat oleh modul `status-history` ke tabel `status_history`, memuat: nama aktor, peran, timestamp, status sebelum, dan status sesudah (FR-22, FR-23).

---

## 5. Keputusan Desain dari Jawaban Pertanyaan Terbuka

| ID Pertanyaan | Pertanyaan Asal | Keputusan | Dampak Arsitektur |
|---|---|---|---|
| **OQ-01** | Mekanisme autentikasi lokal: JWT atau session cookie? | **Session cookie (stateful)** | Backend menerbitkan session token yang disimpan di tabel `sessions` di D1; cookie HttpOnly dikirim ke browser; setiap request Workers memvalidasi cookie ke D1 |
| **OQ-02** | Satu Workers script atau dibagi per modul? | **Modular** (bukan monolitik) | Setiap domain fungsional (`auth`, `reports`, `workflow`, `comments`, `status-history`, `dashboard`, `users`) menjadi modul/file handler tersendiri |
| **OQ-03** | Frontend di-deploy ke mana? | **Cloudflare Pages** | Frontend (Vite build output) di-deploy ke Cloudflare Pages; Workers dipanggil sebagai API eksternal dari Pages |
| **OQ-04** | Ada notifikasi in-app? | **Tidak ada notifikasi** (baik in-app maupun eksternal) | Tidak ada modul notifikasi, tidak ada WebSocket, tidak ada polling interval — halaman detail menampilkan status terbaru saat dibuka |
| **OQ-05** | Siapa yang membuat akun & bagaimana alur login? | **Opsi A + Role-Selection Login:** Admin membuat semua akun (tidak ada registrasi mandiri). Halaman login menyediakan role selector (Pelapor / Admin / Teknisi / Manajer). Backend memvalidasi: (1) email + password benar, (2) peran yang dipilih cocok dengan peran akun di DB. Jika keduanya valid → session dibuat → redirect ke halaman peran. Satu akun = satu peran (untuk MVP). | Tidak perlu modul registrasi; tidak ada validasi domain email; modul `users` hanya dapat diakses Administrator; Teknisi boleh email non-kampus; validasi ganda di `auth` module (credentials + role match) |

---

## 6. Batasan Teknis yang Diikuti

| Batasan | Penjelasan |
|---|---|
| **Cloudflare Workers** | Backend/API dijalankan sebagai edge serverless function di Cloudflare Workers. Tidak menggunakan VPS, Node.js standalone, atau server tradisional. |
| **Cloudflare Pages** | Frontend di-deploy ke Cloudflare Pages (integrasi native dengan Workers & D1). |
| **Cloudflare D1** | Database menggunakan Cloudflare D1 (SQLite) pada paket gratis. Tidak ada PostgreSQL, MySQL, Supabase, atau layanan database berbayar. |
| **Paket Gratis** | Tidak ada layanan berbayar tambahan. Tidak ada object storage (R2/S3) karena upload foto di luar lingkup (EN8, BR-09). |
| **React + TypeScript + Vite** | Frontend wajib menggunakan stack ini sesuai template repositori (NFR-07, C2). |
| **Tanpa object storage** | Tidak ada Cloudflare R2, AWS S3, atau penyimpanan file karena unggah foto di luar lingkup (BR-09). |
| **Tanpa SSO eksternal** | Autentikasi menggunakan email kampus + session cookie lokal. Integrasi SSO ditangguhkan ke Fase 2 (Q2 → Won't Have). |
| **Tanpa notifikasi** | Tidak ada notifikasi in-app, push notification, email, maupun WhatsApp (Q4 → Won't Have, diperkuat keputusan OQ-04). |
| **Tanpa Scheduled Job** | Tidak ada Cron Trigger Workers untuk SLA otomatis (Q3 → Won't Have). |
| **Arsitektur Modular** | Backend menggunakan struktur modular (bukan microservices) — cocok untuk skala tim kecil, menghindari kompleksitas berlebihan. |

---

## 7. Asumsi yang Ditandai

| ID | Asumsi | Dasar |
|---|---|---|
| [ASUMSI-01] | Endpoint API dalam pemetaan aktor bersifat ilustrasi konseptual; nama dan struktur final ditentukan di skill 07. | Aturan SKILL.md: jangan merancang endpoint detail di sini. |
| [ASUMSI-02] | Session cookie disimpan sebagai HttpOnly cookie (bukan localStorage) untuk keamanan. Token sesi disimpan di tabel `sessions` di D1. | Keputusan OQ-01: session cookie; best practice keamanan web. |
| [ASUMSI-03] | Cloudflare Workers dipanggil oleh Frontend Pages melalui satu base URL (misalnya `api.campus-maintenance.workers.dev` atau melalui Pages Functions). Konfigurasi domain final belum ditentukan. | Perlu keputusan deployment; akan dikonfirmasi saat setup Cloudflare. |
| [ASUMSI-04] | Dashboard Manajer (FR-25/26/27) menggunakan query agregasi langsung ke D1 tanpa caching, karena tidak ada kebutuhan real-time pada dashboard dan skala data kecil. | FR-25/26/27 diklasifikasikan Could Have; tidak ada requirement real-time dashboard. |
| [ASUMSI-05] | Setiap modul Workers (auth, reports, workflow, dll.) berjalan dalam satu Cloudflare Workers deployment dengan router internal (misalnya Hono.js atau routing manual), bukan sebagai Workers deployment terpisah per modul. | Keputusan OQ-02: modular tapi bukan microservices terpisah; menjaga kesederhanaan deployment. |
| [ASUMSI-06] | Semua akun pengguna dibuat oleh Administrator melalui panel manajemen pengguna. Tidak ada halaman registrasi mandiri. Admin menentukan email, password awal, dan peran saat membuat akun. Email tidak divalidasi domain (Teknisi bisa pakai email non-kampus). Satu akun hanya memiliki satu peran pada MVP. | Keputusan OQ-05 + OQ-06: Opsi A + Role-Selection Login dipilih; Teknisi bisa jadi staf outsourcing tanpa email kampus. |

---

## 8. Pertanyaan Terbuka Sisa

> ✅ **Semua pertanyaan terbuka (OQ-01 s.d. OQ-06) telah dijawab.** Tidak ada pertanyaan yang tersisa.

| ID | Pertanyaan | Keputusan |
|---|---|---|
| **OQ-06** | Apakah pengguna registrasi mandiri atau di-provisioning Admin? Apakah ada validasi domain email? | **Opsi A dipilih:** Admin membuat semua akun — tidak ada registrasi mandiri, tidak ada validasi domain email. Teknisi boleh pakai email non-kampus. |

---

## 9. Quality Check

- [x] **Setiap aktor memiliki jalur akses yang jelas** — Pelapor, Administrator, Teknisi, dan Manajer Fasilitas semuanya dipetakan ke halaman Frontend dan modul Backend yang berbeda berdasarkan perannya.
- [x] **Setiap status laporan memiliki komponen yang bertanggung jawab** — Seluruh 8 transisi status dipetakan ke modul `workflow` di Backend dengan aktor yang jelas.
- [x] **Arsitektur sesuai batasan Cloudflare Workers + D1 paket gratis** — Tidak ada layanan berbayar, object storage, atau server eksternal.
- [x] **Semua fitur wajib CASE.md §2.2 dapat dipetakan** — 12 fitur wajib semuanya tercakup dalam modul Frontend dan Backend.
- [x] **Diagram arsitektur sederhana dan dapat dipahami** tanpa penjelasan tambahan.
- [x] **OQ-01 s.d. OQ-06 sudah dijawab dan diintegrasikan** ke dalam keputusan arsitektur.
- [x] **Mekanisme login final:** Opsi A + Role-Selection Login — pengguna memilih peran di halaman login, backend memvalidasi credentials + role match, Admin provisioning semua akun, tidak ada registrasi mandiri, tidak ada validasi domain email.

---

## 10. Status Dokumen

Dokumen arsitektur ini disusun berdasarkan:
- [`docs/requirements/01-inception.md`](file:///c:/Users/Prayshe/OneDrive/Documents/GitHub/campus-maintenance/docs/requirements/01-inception.md)
- [`docs/requirements/02-elicitation.md`](file:///c:/Users/Prayshe/OneDrive/Documents/GitHub/campus-maintenance/docs/requirements/02-elicitation.md)
- [`docs/requirements/03-specification.md`](file:///c:/Users/Prayshe/OneDrive/Documents/GitHub/campus-maintenance/docs/requirements/03-specification.md)
- [`docs/requirements/04-prioritization.md`](file:///c:/Users/Prayshe/OneDrive/Documents/GitHub/campus-maintenance/docs/requirements/04-prioritization.md)
- [`CASE.md`](file:///c:/Users/Prayshe/OneDrive/Documents/GitHub/campus-maintenance/CASE.md)
- [`skills/06-architecture/SKILL.md`](file:///c:/Users/Prayshe/OneDrive/Documents/GitHub/campus-maintenance/skills/06-architecture/SKILL.md)
- Jawaban pertanyaan terbuka OQ-01 s.d. OQ-06 dari mahasiswa (2026-07-01)
- Keputusan mekanisme login: Opsi A + Role-Selection Login (2026-07-01)

**Kondisi arsitektur saat ini:** ✅ **FINAL** — Semua pertanyaan terbuka sudah dijawab dan semua keputusan desain sudah ditetapkan. Dokumen ini siap digunakan sebagai dasar skill 07 (Database & API Design).

**Human Review diperlukan sebelum skill 07:**
- Mahasiswa harus memverifikasi bahwa pembagian 7 modul Workers (auth, reports, workflow, comments, status-history, dashboard, users) masuk akal untuk skala proyek individu/tim kecil.
- Mahasiswa harus mengonfirmasi konfigurasi domain/URL untuk pemanggilan Workers dari Cloudflare Pages (ASUMSI-03) saat setup deployment.
