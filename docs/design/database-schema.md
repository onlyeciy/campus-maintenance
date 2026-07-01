# Skema Database: Campus Service Request and Maintenance System

## Sumber Dokumen
- [`docs/requirements/03-specification.md`](file:///c:/Users/Prayshe/OneDrive/Documents/GitHub/campus-maintenance/docs/requirements/03-specification.md)
- [`docs/design/architecture-design.md`](file:///c:/Users/Prayshe/OneDrive/Documents/GitHub/campus-maintenance/docs/design/architecture-design.md)
- Skill `07-Databse-dan-API-design/SKILL.md`

---

## 1. Daftar Entitas

Entitas diekstrak dari requirement berdasarkan noun yang muncul berulang kali:

| Entitas | Tabel | Dasar Requirement |
|---|---|---|
| Pengguna (Pelapor, Admin, Teknisi, Manajer) | `users` | FR-24, BR-05, OQ-05/06, ASUMSI-06 |
| Sesi aktif login | `sessions` | OQ-01 (session cookie stateful) |
| Laporan keluhan | `reports` | FR-01 s.d. FR-23 |
| Komentar pada laporan | `comments` | FR-08, FR-17 |
| Riwayat perubahan status | `status_history` | FR-22, FR-23, NFR-05 |

---

## 2. Skema Tabel

---

### Tabel: `users`
Sumber requirement: FR-24, BR-04, BR-05, BR-06, FR-12, ASUMSI-06

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | INTEGER PRIMARY KEY AUTOINCREMENT | Kunci utama pengguna |
| `name` | TEXT NOT NULL | Nama lengkap pengguna (ditampilkan di riwayat status FR-23) |
| `email` | TEXT NOT NULL UNIQUE | Email pengguna (kampus atau non-kampus, lihat ASUMSI-06) |
| `password_hash` | TEXT NOT NULL | Hash bcrypt password; **tidak pernah dikembalikan di response API** |
| `role` | TEXT NOT NULL | Nilai: `'reporter'` / `'admin'` / `'technician'` / `'manager'` — satu akun satu peran (MVP) |
| `created_at` | TEXT NOT NULL | Timestamp ISO 8601 saat akun dibuat |

**Relasi:**
- `users.id` ← direferensikan oleh `sessions.user_id`
- `users.id` ← direferensikan oleh `reports.reporter_id`
- `users.id` ← direferensikan oleh `reports.assigned_technician_id`
- `users.id` ← direferensikan oleh `comments.author_id`
- `users.id` ← direferensikan oleh `status_history.actor_id`

**Catatan:** Email tidak divalidasi domain karena Teknisi bisa pakai email non-kampus (ASUMSI-06). Admin membuat semua akun — tidak ada registrasi mandiri.

**Constraint SQL:**
```sql
CHECK (role IN ('reporter', 'admin', 'technician', 'manager'))
```

---

### Tabel: `sessions`
Sumber requirement: OQ-01 (keputusan session cookie stateful), ASUMSI-02

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | INTEGER PRIMARY KEY AUTOINCREMENT | Kunci utama sesi |
| `user_id` | INTEGER NOT NULL | FK → `users.id` |
| `token` | TEXT NOT NULL UNIQUE | Session token acak (disimpan di HttpOnly cookie di browser) |
| `expires_at` | TEXT NOT NULL | Timestamp kedaluwarsa sesi (ISO 8601) |
| `created_at` | TEXT NOT NULL | Timestamp sesi dibuat |

**Relasi:**
- `sessions.user_id` → `users.id` (FOREIGN KEY)

**Catatan:** Token sesi divalidasi oleh modul `auth` pada setiap request. Setelah logout atau expired, baris dihapus atau diabaikan berdasarkan `expires_at`.

---

### Tabel: `reports`
Sumber requirement: FR-01, FR-02, FR-03, FR-04, FR-06, FR-07, FR-09, FR-10, FR-11, FR-12, FR-13, FR-16, FR-18, FR-19, FR-20, FR-21, BR-01, BR-02, BR-03, BR-07, BR-08

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | INTEGER PRIMARY KEY AUTOINCREMENT | Kunci utama laporan |
| `reporter_id` | INTEGER NOT NULL | FK → `users.id`; pengguna yang membuat laporan (Pelapor) |
| `category` | TEXT NOT NULL | Salah satu dari: `'Peralatan Presentasi'` / `'Jaringan & Internet'` / `'Kenyamanan Ruangan'` / `'Furnitur'` / `'Peralatan Laboratorium'` / `'Kebersihan & Sanitasi'` (BR-01) |
| `location` | TEXT NOT NULL | Lokasi fisik laporan (wajib diisi, FR-03) |
| `description` | TEXT NOT NULL | Deskripsi keluhan dari Pelapor |
| `status` | TEXT NOT NULL DEFAULT 'Submitted' | Status terkini: `'Submitted'` / `'Under Review'` / `'Assigned'` / `'In Progress'` / `'Resolved'` / `'Closed'` / `'Reopened'` (BR-03) |
| `priority` | TEXT | Nilai: `'High'` / `'Medium'` / `'Low'` — hanya boleh diset Admin (BR-02, BR-04); NULL jika belum diprioritaskan |
| `assigned_technician_id` | INTEGER | FK → `users.id`; Teknisi yang ditugaskan (NULL jika belum ada). Hanya satu Teknisi per laporan (FR-12) |
| `reporter_confirmation` | TEXT | Status konfirmasi Pelapor setelah Resolved: `'accepted'` / `'rejected'` / NULL (FR-19, BR-07) |
| `created_at` | TEXT NOT NULL | Timestamp laporan dibuat (ISO 8601) |
| `updated_at` | TEXT NOT NULL | Timestamp terakhir laporan diperbarui (ISO 8601) |

**Relasi:**
- `reports.reporter_id` → `users.id` (FOREIGN KEY)
- `reports.assigned_technician_id` → `users.id` (FOREIGN KEY, nullable)
- `reports.id` ← direferensikan oleh `comments.report_id`
- `reports.id` ← direferensikan oleh `status_history.report_id`

**Constraint SQL:**
```sql
CHECK (category IN ('Peralatan Presentasi', 'Jaringan & Internet', 'Kenyamanan Ruangan', 'Furnitur', 'Peralatan Laboratorium', 'Kebersihan & Sanitasi'))
CHECK (status IN ('Submitted', 'Under Review', 'Assigned', 'In Progress', 'Resolved', 'Closed', 'Reopened'))
CHECK (priority IS NULL OR priority IN ('High', 'Medium', 'Low'))
CHECK (reporter_confirmation IS NULL OR reporter_confirmation IN ('accepted', 'rejected'))
```

**Catatan alur status (BR-03):**
```
Submitted → Under Review → Assigned → In Progress → Resolved → Closed
                                   ↑                          ↓
                               Reopened ←──────────────────────
```

---

### Tabel: `comments`
Sumber requirement: FR-08, FR-17, AC-03.1, AC-03.2, AC-07.1

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | INTEGER PRIMARY KEY AUTOINCREMENT | Kunci utama komentar |
| `report_id` | INTEGER NOT NULL | FK → `reports.id`; laporan tempat komentar ditambahkan |
| `author_id` | INTEGER NOT NULL | FK → `users.id`; penulis komentar (Pelapor FR-08, Teknisi FR-17) |
| `content` | TEXT NOT NULL | Isi komentar atau catatan progres |
| `created_at` | TEXT NOT NULL | Timestamp komentar dibuat (ISO 8601) |

**Relasi:**
- `comments.report_id` → `reports.id` (FOREIGN KEY)
- `comments.author_id` → `users.id` (FOREIGN KEY)

**Catatan:** Komentar dapat ditambahkan oleh Pelapor (FR-08) dan Teknisi (FR-17). Sistem tidak membatasi tipe komentar di level database; RBAC di backend yang menentukan siapa boleh menambah komentar pada kondisi apa (BR-06).

---

### Tabel: `status_history`
Sumber requirement: FR-22, FR-23, NFR-05, IN-02, AC-09.1, AC-09.2, AC-09.3

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | INTEGER PRIMARY KEY AUTOINCREMENT | Kunci utama entri riwayat |
| `report_id` | INTEGER NOT NULL | FK → `reports.id`; laporan yang statusnya berubah |
| `actor_id` | INTEGER NOT NULL | FK → `users.id`; pengguna yang memicu perubahan |
| `actor_name` | TEXT NOT NULL | Nama aktor saat perubahan terjadi (FR-23; disimpan denormalized supaya tetap akurat meski data user berubah) |
| `actor_role` | TEXT NOT NULL | Peran aktor saat perubahan: `'reporter'` / `'admin'` / `'technician'` / `'manager'` (FR-23) |
| `status_before` | TEXT | Status laporan sebelum perubahan; NULL untuk status awal `Submitted` |
| `status_after` | TEXT NOT NULL | Status laporan setelah perubahan (FR-23) |
| `created_at` | TEXT NOT NULL | Timestamp perubahan terjadi (ISO 8601) — kronologis (AC-09.3) |

**Relasi:**
- `status_history.report_id` → `reports.id` (FOREIGN KEY)
- `status_history.actor_id` → `users.id` (FOREIGN KEY)

**Catatan:** `actor_name` dan `actor_role` disimpan secara denormalized (bukan hanya FK) agar riwayat audit tetap akurat meski data pengguna diubah di masa depan (NFR-05 — retensi ≥ 3 tahun). Ini adalah keputusan desain yang sengaja mengorbankan normalisasi demi keandalan audit.

---

## 3. Diagram Relasi (ERD Tekstual)

```
users (id, name, email, password_hash, role, created_at)
  │
  ├──< sessions (id, user_id→users, token, expires_at, created_at)
  │
  ├──< reports (id, reporter_id→users, category, location, description,
  │             status, priority, assigned_technician_id→users,
  │             reporter_confirmation, created_at, updated_at)
  │              │
  │              ├──< comments (id, report_id→reports, author_id→users,
  │              │              content, created_at)
  │              │
  │              └──< status_history (id, report_id→reports, actor_id→users,
  │                                   actor_name, actor_role, status_before,
  │                                   status_after, created_at)
  │
  └── (assigned_technician_id di reports → users.id, role='technician')
```

---

## 4. Asumsi yang Ditandai

| ID | Asumsi | Dasar |
|---|---|---|
| [DB-ASUMSI-01] | `actor_name` dan `actor_role` di `status_history` disimpan secara denormalized (bukan hanya FK) untuk memastikan integritas audit jangka panjang. | NFR-05 (retensi ≥ 3 tahun), perubahan nama pengguna tidak boleh merusak riwayat |
| [DB-ASUMSI-02] | Satu laporan hanya punya satu `assigned_technician_id` (satu Teknisi aktif per laporan). Jika laporan dibuka kembali (Reopened) dan ditugaskan ulang, kolom ini di-overwrite dengan Teknisi baru. Riwayat penugasan tetap dapat ditelusuri lewat `status_history`. | FR-12 ("satu Teknisi"), arsitektur section 1.3 |
| [DB-ASUMSI-03] | Tipe data timestamp menggunakan TEXT dengan format ISO 8601 (bukan INTEGER Unix timestamp) karena lebih mudah dibaca dan SQLite/D1 mendukung fungsi datetime dengan format ini. | Keterbatasan D1 SQLite |
| [DB-ASUMSI-04] | Kolom `reporter_confirmation` menyimpan konfirmasi Pelapor (`'accepted'`/`'rejected'`/NULL) di tabel `reports` alih-alih tabel terpisah, karena satu laporan hanya memiliki satu konfirmasi aktif pada satu waktu. | BR-07, AC-08.1 s.d. AC-08.5 |
| [DB-ASUMSI-05] | Tidak ada tabel `categories` atau `locations` terpisah karena requirement tidak menyebutkan manajemen master data kategori/lokasi; kategori disimpan sebagai TEXT dengan CHECK constraint (BR-01). | BR-01, BR-10 |

---

## 5. Quality Check

- [x] Setiap tabel punya `PRIMARY KEY`
- [x] Setiap `FOREIGN KEY` merujuk ke tabel yang benar-benar ada di skema ini
- [x] Alur status laporan (BR-03) tercermin di kolom `status` di tabel `reports` dan tabel `status_history`
- [x] `password_hash` tidak pernah dikembalikan di response API (dicatat di api-contract.md)
- [x] Semua asumsi ditulis terpisah dan jelas ditandai
- [x] Tidak ada tabel/kolom yang tidak dapat ditelusuri ke requirement

---

## 6. Status Dokumen

Dokumen ini disusun menggunakan skill `07-Databse-dan-API-design/SKILL.md` berdasarkan:
- `docs/requirements/03-specification.md`
- `docs/design/architecture-design.md`

**Human Review diperlukan sebelum implementasi:**
- Apakah asumsi [DB-ASUMSI-01] s.d. [DB-ASUMSI-05] masuk akal untuk studi kasus ini?
- Apakah ada entitas yang menurut mahasiswa terlewat?
- Apakah pembagian kolom `reporter_confirmation` di tabel `reports` sudah sesuai?
