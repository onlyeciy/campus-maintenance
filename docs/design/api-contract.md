# Kontrak API: Campus Service Request and Maintenance System

## Sumber Dokumen
- [`docs/requirements/03-specification.md`](file:///c:/Users/Prayshe/OneDrive/Documents/GitHub/campus-maintenance/docs/requirements/03-specification.md)
- [`docs/design/architecture-design.md`](file:///c:/Users/Prayshe/OneDrive/Documents/GitHub/campus-maintenance/docs/design/architecture-design.md)
- [`docs/design/database-schema.md`](file:///c:/Users/Prayshe/OneDrive/Documents/GitHub/campus-maintenance/docs/design/database-schema.md)
- Skill `07-Databse-dan-API-design/SKILL.md`

---

## Konvensi Umum

| Hal | Keputusan |
|---|---|
| **Base URL** | `https://<workers-domain>/api` (dikonfirmasi saat deployment, lihat ASUMSI-03 di architecture-design.md) |
| **Format** | JSON (`Content-Type: application/json`) untuk semua request & response |
| **Autentikasi** | Session cookie `HttpOnly` dikirim otomatis browser di setiap request; backend memvalidasi ke tabel `sessions` |
| **Otorisasi** | RBAC di modul `workflow` & `auth`; response `403 Forbidden` jika peran tidak sesuai |
| **Timestamp** | Semua field timestamp menggunakan format ISO 8601, contoh: `"2026-07-01T08:00:00Z"` |
| **Password** | Field `password_hash` **tidak pernah** dikembalikan di response manapun |
| **Status Code** | `200` OK, `201` Created, `400` Bad Request, `401` Unauthorized, `403` Forbidden, `404` Not Found |

---

## Ringkasan Endpoint per Modul

| Modul | Method | Path | Fungsi |
|---|---|---|---|
| `auth` | POST | `/auth/login` | Login & buat sesi |
| `auth` | POST | `/auth/logout` | Logout & hapus sesi |
| `auth` | GET | `/auth/me` | Cek sesi aktif & profil pengguna |
| `users` | GET | `/users` | Daftar semua pengguna (Admin) |
| `users` | POST | `/users` | Buat akun pengguna baru (Admin) |
| `users` | GET | `/users/technicians` | Daftar Teknisi tersedia untuk penugasan (Admin) |
| `users` | PUT | `/users/:id` | Ubah data pengguna (Admin) |
| `reports` | POST | `/reports` | Buat laporan baru (Pelapor) |
| `reports` | GET | `/reports` | Daftar laporan (filter per peran) |
| `reports` | GET | `/reports/:id` | Detail satu laporan |
| `workflow` | PATCH | `/reports/:id/review` | Admin mulai tinjau laporan (Submitted → Under Review) |
| `workflow` | PATCH | `/reports/:id/assign` | Admin tugaskan Teknisi (Under Review / Reopened → Assigned) |
| `workflow` | PATCH | `/reports/:id/accept` | Teknisi terima tugas (Assigned → In Progress) |
| `workflow` | PATCH | `/reports/:id/resolve` | Teknisi tandai selesai (In Progress → Resolved) |
| `workflow` | PATCH | `/reports/:id/confirm` | Pelapor konfirmasi hasil (simpan accepted/rejected) |
| `workflow` | PATCH | `/reports/:id/close` | Admin tutup laporan (Resolved → Closed) |
| `workflow` | PATCH | `/reports/:id/reopen` | Admin buka kembali laporan (Resolved → Reopened) |
| `comments` | POST | `/reports/:id/comments` | Tambah komentar pada laporan |
| `comments` | GET | `/reports/:id/comments` | Daftar komentar laporan |
| `status-history` | GET | `/reports/:id/status-history` | Riwayat perubahan status laporan |
| `dashboard` | GET | `/dashboard` | Agregasi laporan per status & kategori (Manajer) |

---

## Modul: `auth`

---

### POST /auth/login
Sumber requirement: FR-24, OQ-01, OQ-05, ASUMSI-02, ASUMSI-06  
Aktor yang boleh akses: Semua (tidak perlu sesi aktif)  
Modul Workers: `auth`

**Fungsi:** Memvalidasi email + password + role yang dipilih. Jika valid, membuat session token di tabel `sessions` dan mengembalikan cookie `HttpOnly`.

Request body:
```json
{
  "email": "budi@kampus.ac.id",
  "password": "plaintext_password",
  "role": "reporter"
}
```

Response 200:
```json
{
  "message": "Login berhasil",
  "user": {
    "id": 1,
    "name": "Budi Santoso",
    "email": "budi@kampus.ac.id",
    "role": "reporter"
  }
}
```
> Set-Cookie header: `session=<token>; HttpOnly; Secure; SameSite=Strict; Path=/`

Error cases:
- `400` — field wajib tidak lengkap (`email`, `password`, `role`)
- `400` — nilai `role` tidak valid (bukan salah satu dari empat peran)
- `401` — email tidak ditemukan atau password salah
- `401` — email & password cocok tapi peran yang dipilih tidak sesuai peran akun di database (OQ-05: validasi ganda)

---

### POST /auth/logout
Sumber requirement: OQ-01, ASUMSI-02  
Aktor yang boleh akses: Semua pengguna yang sedang login  
Modul Workers: `auth`

**Fungsi:** Menghapus baris sesi dari tabel `sessions` dan menginvalidasi cookie.

Request body: *(tidak ada)*

Response 200:
```json
{
  "message": "Logout berhasil"
}
```

Error cases:
- `401` — tidak ada sesi aktif (cookie tidak ada atau token tidak ditemukan di DB)

---

### GET /auth/me
Sumber requirement: FR-24, OQ-01  
Aktor yang boleh akses: Semua pengguna yang sedang login  
Modul Workers: `auth`

**Fungsi:** Memverifikasi sesi aktif dan mengembalikan data pengguna yang sedang login. Digunakan Frontend untuk routing per peran setelah reload halaman.

Request body: *(tidak ada)*

Response 200:
```json
{
  "user": {
    "id": 1,
    "name": "Budi Santoso",
    "email": "budi@kampus.ac.id",
    "role": "reporter"
  }
}
```

Error cases:
- `401` — sesi tidak ada atau sudah kedaluwarsa

---

## Modul: `users`

---

### GET /users
Sumber requirement: FR-24, ASUMSI-06  
Aktor yang boleh akses: `admin`  
Modul Workers: `users`

**Fungsi:** Menampilkan daftar semua pengguna (untuk panel manajemen akun oleh Admin).

Request body: *(tidak ada)*

Query params (opsional): `?role=technician` — filter per peran

Response 200:
```json
{
  "users": [
    {
      "id": 1,
      "name": "Budi Santoso",
      "email": "budi@kampus.ac.id",
      "role": "reporter",
      "created_at": "2026-07-01T08:00:00Z"
    }
  ]
}
```

Error cases:
- `401` — tidak ada sesi aktif
- `403` — peran bukan `admin`

---

### GET /users/technicians
Sumber requirement: FR-12, BR-05  
Aktor yang boleh akses: `admin`  
Modul Workers: `users`

**Fungsi:** Mengembalikan daftar pengguna dengan role `technician` untuk keperluan dropdown penugasan Teknisi oleh Administrator.

Request body: *(tidak ada)*

Response 200:
```json
{
  "technicians": [
    {
      "id": 3,
      "name": "Agus Perbaikan",
      "email": "agus@vendor.com"
    }
  ]
}
```

Error cases:
- `401` — tidak ada sesi aktif
- `403` — peran bukan `admin`

---

### POST /users
Sumber requirement: FR-24, ASUMSI-06  
Aktor yang boleh akses: `admin`  
Modul Workers: `users`

**Fungsi:** Admin membuat akun pengguna baru. Tidak ada registrasi mandiri (ASUMSI-06).

Request body:
```json
{
  "name": "Siti Teknisi",
  "email": "siti@vendor.com",
  "password": "plaintext_password",
  "role": "technician"
}
```

Response 201:
```json
{
  "message": "Akun berhasil dibuat",
  "user": {
    "id": 5,
    "name": "Siti Teknisi",
    "email": "siti@vendor.com",
    "role": "technician",
    "created_at": "2026-07-01T08:00:00Z"
  }
}
```

Error cases:
- `400` — field wajib tidak lengkap atau role tidak valid
- `400` — email sudah terdaftar (UNIQUE constraint)
- `401` — tidak ada sesi aktif
- `403` — peran bukan `admin`

---

### PUT /users/:id
Sumber requirement: FR-24, ASUMSI-06  
Aktor yang boleh akses: `admin`  
Modul Workers: `users`

**Fungsi:** Admin mengubah data pengguna (nama, email, peran, atau reset password).

Request body (semua field opsional, minimal satu):
```json
{
  "name": "Siti Rahayu",
  "email": "siti.baru@vendor.com",
  "role": "reporter",
  "password": "new_password"
}
```

Response 200:
```json
{
  "message": "Data pengguna berhasil diperbarui",
  "user": {
    "id": 5,
    "name": "Siti Rahayu",
    "email": "siti.baru@vendor.com",
    "role": "reporter",
    "created_at": "2026-07-01T08:00:00Z"
  }
}
```

Error cases:
- `400` — tidak ada field yang dikirim
- `400` — email baru sudah dipakai pengguna lain
- `401` — tidak ada sesi aktif
- `403` — peran bukan `admin`
- `404` — pengguna dengan id tidak ditemukan

---

## Modul: `reports`

---

### POST /reports
Sumber requirement: FR-01, FR-02, FR-03, FR-04, BR-01, BR-09, AC-01.1–AC-01.5  
Aktor yang boleh akses: `reporter`  
Modul Workers: `reports`

**Fungsi:** Pelapor membuat laporan keluhan baru. Status awal otomatis `Submitted`. Entri `status_history` pertama dibuat bersamaan.

Request body:
```json
{
  "category": "Jaringan & Internet",
  "location": "Gedung A, Ruang 201",
  "description": "WiFi tidak bisa tersambung sejak pagi"
}
```

Response 201:
```json
{
  "message": "Laporan berhasil dibuat",
  "report": {
    "id": 10,
    "reporter_id": 1,
    "category": "Jaringan & Internet",
    "location": "Gedung A, Ruang 201",
    "description": "WiFi tidak bisa tersambung sejak pagi",
    "status": "Submitted",
    "priority": null,
    "assigned_technician_id": null,
    "reporter_confirmation": null,
    "created_at": "2026-07-01T08:00:00Z",
    "updated_at": "2026-07-01T08:00:00Z"
  }
}
```

Error cases:
- `400` — `category` tidak diisi atau bukan salah satu dari 6 kategori valid (AC-01.2, BR-01)
- `400` — `location` tidak diisi (AC-01.3)
- `400` — `description` tidak diisi
- `401` — tidak ada sesi aktif
- `403` — peran bukan `reporter`

---

### GET /reports
Sumber requirement: FR-05, FR-06, FR-07, FR-09, FR-14, AC-02.1–AC-02.4, AC-04.1, AC-06.1  
Aktor yang boleh akses: `reporter`, `admin`, `technician`  
Modul Workers: `reports`

**Fungsi:** Mengembalikan daftar laporan yang difilter berdasarkan peran pengguna:
- **Pelapor:** hanya laporan miliknya (`reporter_id = session.user_id`)
- **Administrator:** semua laporan
- **Teknisi:** hanya laporan yang ditugaskan kepadanya (`assigned_technician_id = session.user_id`)

Query params (opsional):
- `?status=Submitted` — filter per status (FR-06)
- `?category=Furnitur` — filter per kategori (FR-06)
- `?from=2026-06-01&to=2026-06-30` — filter rentang tanggal (FR-06)

Response 200:
```json
{
  "reports": [
    {
      "id": 10,
      "category": "Jaringan & Internet",
      "location": "Gedung A, Ruang 201",
      "description": "WiFi tidak bisa tersambung sejak pagi",
      "status": "Submitted",
      "priority": null,
      "reporter": {
        "id": 1,
        "name": "Budi Santoso"
      },
      "assigned_technician": null,
      "created_at": "2026-07-01T08:00:00Z",
      "updated_at": "2026-07-01T08:00:00Z"
    }
  ]
}
```

Error cases:
- `401` — tidak ada sesi aktif
- `403` — peran `manager` mencoba akses endpoint ini (Manajer menggunakan `/dashboard`)
- `400` — nilai query param `status` atau `category` tidak valid

---

### GET /reports/:id
Sumber requirement: FR-07, AC-02.5, AC-07.3  
Aktor yang boleh akses: `reporter` (hanya laporan miliknya), `admin`, `technician` (hanya laporan yang ditugaskan kepadanya)  
Modul Workers: `reports`

**Fungsi:** Mengembalikan detail satu laporan beserta reporter dan teknisi yang ditugaskan.

Request body: *(tidak ada)*

Response 200:
```json
{
  "report": {
    "id": 10,
    "category": "Jaringan & Internet",
    "location": "Gedung A, Ruang 201",
    "description": "WiFi tidak bisa tersambung sejak pagi",
    "status": "In Progress",
    "priority": "High",
    "reporter_confirmation": null,
    "reporter": {
      "id": 1,
      "name": "Budi Santoso",
      "email": "budi@kampus.ac.id"
    },
    "assigned_technician": {
      "id": 3,
      "name": "Agus Perbaikan",
      "email": "agus@vendor.com"
    },
    "created_at": "2026-07-01T08:00:00Z",
    "updated_at": "2026-07-01T09:00:00Z"
  }
}
```

Error cases:
- `401` — tidak ada sesi aktif
- `403` — Pelapor mencoba akses laporan milik orang lain; Teknisi mencoba akses laporan yang bukan tugasnya
- `404` — laporan tidak ditemukan

---

## Modul: `workflow`

> Setiap endpoint di modul ini memicu pencatatan otomatis ke tabel `status_history` oleh modul `status-history` (FR-22, FR-23).

---

### PATCH /reports/:id/review
Sumber requirement: FR-09, BR-03, AC-04.1  
Aktor yang boleh akses: `admin`  
Modul Workers: `workflow`

**Fungsi:** Administrator mulai meninjau laporan, mengubah status dari `Submitted` ke `Under Review`. Administrator juga dapat memperbarui `category` dan `priority` pada langkah ini (FR-10, FR-11).

Request body (semua field opsional):
```json
{
  "category": "Peralatan Presentasi",
  "priority": "High"
}
```

Response 200:
```json
{
  "message": "Laporan sedang ditinjau",
  "report": {
    "id": 10,
    "status": "Under Review",
    "category": "Peralatan Presentasi",
    "priority": "High",
    "updated_at": "2026-07-01T09:00:00Z"
  }
}
```

Error cases:
- `400` — status laporan bukan `Submitted` (transisi tidak valid, BR-03)
- `400` — nilai `priority` bukan `High`/`Medium`/`Low` (AC-04.3, BR-02)
- `400` — nilai `category` tidak valid (BR-01)
- `401` — tidak ada sesi aktif
- `403` — peran bukan `admin` (AC-04.4)
- `404` — laporan tidak ditemukan

---

### PATCH /reports/:id/assign
Sumber requirement: FR-10, FR-11, FR-12, FR-13, BR-05, BR-08, AC-05.1, AC-05.2, AC-08.6  
Aktor yang boleh akses: `admin`  
Modul Workers: `workflow`

**Fungsi:** Administrator menugaskan Teknisi ke laporan. Berlaku dari status `Under Review` (→ `Assigned`) maupun `Reopened` (→ `Assigned`, BR-08). Dapat sekaligus memperbarui `category` dan `priority` (FR-10, FR-11).

Request body:
```json
{
  "assigned_technician_id": 3,
  "category": "Jaringan & Internet",
  "priority": "Medium"
}
```

Response 200:
```json
{
  "message": "Teknisi berhasil ditugaskan",
  "report": {
    "id": 10,
    "status": "Assigned",
    "assigned_technician_id": 3,
    "category": "Jaringan & Internet",
    "priority": "Medium",
    "updated_at": "2026-07-01T09:30:00Z"
  }
}
```

Error cases:
- `400` — status laporan bukan `Under Review` atau `Reopened` (transisi tidak valid, BR-03)
- `400` — `assigned_technician_id` tidak dikirim
- `400` — `assigned_technician_id` bukan pengguna dengan role `technician`
- `400` — nilai `priority` atau `category` tidak valid
- `401` — tidak ada sesi aktif
- `403` — peran bukan `admin` (AC-05.3)
- `404` — laporan atau teknisi tidak ditemukan

---

### PATCH /reports/:id/accept
Sumber requirement: FR-15, FR-16, BR-06, AC-06.1, AC-06.2  
Aktor yang boleh akses: `technician` (hanya Teknisi yang ditugaskan pada laporan ini)  
Modul Workers: `workflow`

**Fungsi:** Teknisi menerima tugas, mengubah status dari `Assigned` ke `In Progress`.

Request body: *(tidak ada)*

Response 200:
```json
{
  "message": "Tugas diterima, status diperbarui ke In Progress",
  "report": {
    "id": 10,
    "status": "In Progress",
    "updated_at": "2026-07-01T10:00:00Z"
  }
}
```

Error cases:
- `400` — status laporan bukan `Assigned` (transisi tidak valid, BR-03)
- `401` — tidak ada sesi aktif
- `403` — peran bukan `technician`, atau Teknisi ini bukan yang ditugaskan pada laporan (AC-06.3, BR-06)
- `404` — laporan tidak ditemukan

---

### PATCH /reports/:id/resolve
Sumber requirement: FR-18, BR-06, AC-07.2  
Aktor yang boleh akses: `technician` (hanya Teknisi yang ditugaskan pada laporan ini)  
Modul Workers: `workflow`

**Fungsi:** Teknisi menandai pekerjaan selesai, mengubah status dari `In Progress` ke `Resolved`.

Request body: *(tidak ada)*

Response 200:
```json
{
  "message": "Pekerjaan ditandai selesai, status diperbarui ke Resolved",
  "report": {
    "id": 10,
    "status": "Resolved",
    "updated_at": "2026-07-01T14:00:00Z"
  }
}
```

Error cases:
- `400` — status laporan bukan `In Progress` (transisi tidak valid, BR-03)
- `401` — tidak ada sesi aktif
- `403` — peran bukan `technician`, atau Teknisi ini bukan yang ditugaskan pada laporan (BR-06)
- `404` — laporan tidak ditemukan

---

### PATCH /reports/:id/confirm
Sumber requirement: FR-19, BR-07, AC-08.1, AC-08.3  
Aktor yang boleh akses: `reporter` (hanya pemilik laporan)  
Modul Workers: `workflow`

**Fungsi:** Pelapor mengonfirmasi hasil perbaikan (menerima atau menolak). Menyimpan nilai `reporter_confirmation` di tabel `reports`. Status laporan **tidak** berubah di endpoint ini — perubahan status (`Closed` / `Reopened`) dilakukan oleh Admin melalui endpoint terpisah.

Request body:
```json
{
  "confirmation": "accepted"
}
```
> Nilai yang valid: `"accepted"` atau `"rejected"`

Response 200:
```json
{
  "message": "Konfirmasi berhasil disimpan",
  "report": {
    "id": 10,
    "status": "Resolved",
    "reporter_confirmation": "accepted",
    "updated_at": "2026-07-01T15:00:00Z"
  }
}
```

Error cases:
- `400` — status laporan bukan `Resolved` (FR-19 mensyaratkan laporan sudah Resolved)
- `400` — nilai `confirmation` bukan `"accepted"` atau `"rejected"`
- `401` — tidak ada sesi aktif
- `403` — peran bukan `reporter`, atau bukan pemilik laporan
- `404` — laporan tidak ditemukan

---

### PATCH /reports/:id/close
Sumber requirement: FR-20, BR-07, AC-08.2, AC-08.5  
Aktor yang boleh akses: `admin`  
Modul Workers: `workflow`

**Fungsi:** Administrator menutup laporan, mengubah status dari `Resolved` ke `Closed`. Hanya bisa dilakukan setelah `reporter_confirmation = 'accepted'` (BR-07).

Request body: *(tidak ada)*

Response 200:
```json
{
  "message": "Laporan berhasil ditutup",
  "report": {
    "id": 10,
    "status": "Closed",
    "updated_at": "2026-07-01T16:00:00Z"
  }
}
```

Error cases:
- `400` — status laporan bukan `Resolved`
- `400` — `reporter_confirmation` bukan `'accepted'` (laporan belum dikonfirmasi Pelapor, AC-08.5, BR-07)
- `401` — tidak ada sesi aktif
- `403` — peran bukan `admin`
- `404` — laporan tidak ditemukan

---

### PATCH /reports/:id/reopen
Sumber requirement: FR-21, BR-08, AC-08.4  
Aktor yang boleh akses: `admin`  
Modul Workers: `workflow`

**Fungsi:** Administrator membuka kembali laporan menjadi `Reopened` jika Pelapor menolak hasil perbaikan. Hanya bisa dilakukan setelah `reporter_confirmation = 'rejected'` (BR-08).

Request body: *(tidak ada)*

Response 200:
```json
{
  "message": "Laporan dibuka kembali",
  "report": {
    "id": 10,
    "status": "Reopened",
    "reporter_confirmation": "rejected",
    "updated_at": "2026-07-01T16:30:00Z"
  }
}
```

Error cases:
- `400` — status laporan bukan `Resolved`
- `400` — `reporter_confirmation` bukan `'rejected'` (Pelapor belum menolak)
- `401` — tidak ada sesi aktif
- `403` — peran bukan `admin`
- `404` — laporan tidak ditemukan

---

## Modul: `comments`

---

### POST /reports/:id/comments
Sumber requirement: FR-08, FR-17, AC-03.1, AC-07.1  
Aktor yang boleh akses: `reporter` (pemilik laporan), `technician` (Teknisi yang ditugaskan)  
Modul Workers: `comments`

**Fungsi:** Menambahkan komentar atau catatan progres pada laporan.

Request body:
```json
{
  "content": "Sudah cek router, perlu penggantian kabel patch."
}
```

Response 201:
```json
{
  "message": "Komentar berhasil ditambahkan",
  "comment": {
    "id": 25,
    "report_id": 10,
    "author": {
      "id": 3,
      "name": "Agus Perbaikan",
      "role": "technician"
    },
    "content": "Sudah cek router, perlu penggantian kabel patch.",
    "created_at": "2026-07-01T11:00:00Z"
  }
}
```

Error cases:
- `400` — `content` kosong
- `401` — tidak ada sesi aktif
- `403` — peran bukan `reporter` atau `technician`; atau reporter bukan pemilik laporan; atau teknisi bukan yang ditugaskan (BR-06)
- `404` — laporan tidak ditemukan

---

### GET /reports/:id/comments
Sumber requirement: FR-07, AC-02.5, AC-03.2  
Aktor yang boleh akses: `reporter` (pemilik laporan), `admin`, `technician` (yang ditugaskan)  
Modul Workers: `comments`

**Fungsi:** Mengambil seluruh komentar pada laporan, diurutkan dari yang terlama ke terbaru (kronologis).

Request body: *(tidak ada)*

Response 200:
```json
{
  "comments": [
    {
      "id": 25,
      "author": {
        "id": 3,
        "name": "Agus Perbaikan",
        "role": "technician"
      },
      "content": "Sudah cek router, perlu penggantian kabel patch.",
      "created_at": "2026-07-01T11:00:00Z"
    }
  ]
}
```

Error cases:
- `401` — tidak ada sesi aktif
- `403` — reporter bukan pemilik laporan; teknisi bukan yang ditugaskan
- `404` — laporan tidak ditemukan

---

## Modul: `status-history`

---

### GET /reports/:id/status-history
Sumber requirement: FR-22, FR-23, NFR-05, AC-09.1, AC-09.2, AC-09.3  
Aktor yang boleh akses: `reporter` (pemilik laporan), `admin`, `technician` (yang ditugaskan)  
Modul Workers: `status-history`

**Fungsi:** Mengambil seluruh riwayat perubahan status laporan, diurutkan kronologis dari yang terlama ke terbaru (AC-09.3).

Request body: *(tidak ada)*

Response 200:
```json
{
  "status_history": [
    {
      "id": 1,
      "actor_name": "Budi Santoso",
      "actor_role": "reporter",
      "status_before": null,
      "status_after": "Submitted",
      "created_at": "2026-07-01T08:00:00Z"
    },
    {
      "id": 2,
      "actor_name": "Admin Kampus",
      "actor_role": "admin",
      "status_before": "Submitted",
      "status_after": "Under Review",
      "created_at": "2026-07-01T09:00:00Z"
    }
  ]
}
```

Error cases:
- `401` — tidak ada sesi aktif
- `403` — reporter bukan pemilik laporan; teknisi bukan yang ditugaskan
- `404` — laporan tidak ditemukan

---

## Modul: `dashboard`

---

### GET /dashboard
Sumber requirement: FR-25, FR-26, FR-27, NFR-06, AC-10.1, AC-10.2, AC-10.3, AC-10.4  
Aktor yang boleh akses: `manager`  
Modul Workers: `dashboard`

**Fungsi:** Mengembalikan data agregasi laporan: jumlah laporan per status (FR-26) dan jumlah laporan per kategori (FR-27). Data diambil melalui query agregasi langsung ke D1 tanpa caching (ASUMSI-04 dari architecture-design.md).

Request body: *(tidak ada)*

Response 200:
```json
{
  "summary": {
    "total_reports": 42,
    "by_status": {
      "Submitted": 5,
      "Under Review": 3,
      "Assigned": 8,
      "In Progress": 10,
      "Resolved": 7,
      "Closed": 9,
      "Reopened": 0
    },
    "by_category": {
      "Peralatan Presentasi": 12,
      "Jaringan & Internet": 9,
      "Kenyamanan Ruangan": 7,
      "Furnitur": 5,
      "Peralatan Laboratorium": 6,
      "Kebersihan & Sanitasi": 3
    }
  }
}
```

Error cases:
- `401` — tidak ada sesi aktif
- `403` — peran bukan `manager` (AC-10.4)

---

## Pemetaan FR ke Endpoint (Traceability Check)

| FR | Deskripsi Singkat | Endpoint(s) |
|---|---|---|
| FR-01 | Pelapor buat laporan baru | `POST /reports` |
| FR-02 | Wajib pilih kategori | `POST /reports` (validasi `category`) |
| FR-03 | Wajib isi lokasi fisik | `POST /reports` (validasi `location`) |
| FR-04 | Status awal `Submitted` | `POST /reports` (set `status='Submitted'`) |
| FR-05 | Tampilkan daftar laporan Pelapor | `GET /reports` (filter per `reporter_id`) |
| FR-06 | Filter laporan per status/kategori/tanggal | `GET /reports` (query params) |
| FR-07 | Detail laporan lengkap | `GET /reports/:id`, `GET /reports/:id/comments`, `GET /reports/:id/status-history` |
| FR-08 | Pelapor tambah komentar | `POST /reports/:id/comments` |
| FR-09 | Admin tinjau laporan masuk | `PATCH /reports/:id/review` |
| FR-10 | Admin tentukan/perbaiki kategori | `PATCH /reports/:id/review`, `PATCH /reports/:id/assign` |
| FR-11 | Admin tentukan prioritas | `PATCH /reports/:id/review`, `PATCH /reports/:id/assign` |
| FR-12 | Admin tugaskan satu Teknisi | `PATCH /reports/:id/assign` |
| FR-13 | Status → `Assigned` setelah penugasan | `PATCH /reports/:id/assign` |
| FR-14 | Teknisi lihat daftar tugasnya | `GET /reports` (filter per `assigned_technician_id`) |
| FR-15 | Teknisi terima tugas | `PATCH /reports/:id/accept` |
| FR-16 | Status → `In Progress` setelah terima | `PATCH /reports/:id/accept` |
| FR-17 | Teknisi tambah catatan progres | `POST /reports/:id/comments` |
| FR-18 | Teknisi tandai selesai → `Resolved` | `PATCH /reports/:id/resolve` |
| FR-19 | Pelapor konfirmasi hasil perbaikan | `PATCH /reports/:id/confirm` |
| FR-20 | Admin tutup laporan → `Closed` | `PATCH /reports/:id/close` |
| FR-21 | Admin buka kembali → `Reopened` | `PATCH /reports/:id/reopen` |
| FR-22 | Catat setiap perubahan status | Semua `PATCH /reports/:id/*` (otomatis via `status-history`) |
| FR-23 | Riwayat memuat nama, peran, timestamp | `GET /reports/:id/status-history` |
| FR-24 | RBAC per peran | Semua endpoint (validasi peran di setiap handler) |
| FR-25 | Dashboard ringkas Manajer | `GET /dashboard` |
| FR-26 | Jumlah laporan per status | `GET /dashboard` (`by_status`) |
| FR-27 | Jumlah laporan per kategori | `GET /dashboard` (`by_category`) |

---

## Asumsi yang Ditandai

| ID | Asumsi | Dasar |
|---|---|---|
| [API-ASUMSI-01] | Konfirmasi Pelapor (`/confirm`) dan perubahan status (`/close`, `/reopen`) dipisah menjadi dua endpoint berbeda agar tanggung jawab aktor jelas: Pelapor hanya menyimpan konfirmasi, Admin yang mengubah status akhir. | BR-07, BR-08, AC-08.1–AC-08.5 |
| [API-ASUMSI-02] | Endpoint `PATCH /reports/:id/review` sekaligus menampung update `category` dan `priority` karena Administrator meninjau dan memprioritaskan dalam satu langkah yang sama (FR-09, FR-10, FR-11). | Alur kerja Administrator di architecture-design.md section 3 |
| [API-ASUMSI-03] | `GET /reports` menggunakan filter peran server-side (bukan filter di frontend) untuk memastikan Pelapor tidak bisa mengakses laporan orang lain hanya dengan mengubah query param. | FR-24, NFR-02 |
| [API-ASUMSI-04] | Tidak ada endpoint pagination di MVP. Jika jumlah laporan bertambah besar, pagination perlu ditambahkan di iterasi berikutnya. | Skala proyek individu/tim kecil |
| [API-ASUMSI-05] | Endpoint `status-history` hanya `GET` (read-only). Pencatatan dilakukan otomatis oleh backend setiap kali ada perubahan status — tidak ada endpoint `POST /status-history` yang bisa dipanggil manual. | FR-22, FR-23 (pencatatan otomatis) |

---

## Quality Check

- [x] Setiap FR (FR-01 s.d. FR-27) punya minimal satu endpoint yang menanganinya
- [x] Setiap endpoint punya minimal satu FR sumber yang dicantumkan
- [x] `password_hash` tidak pernah dikembalikan di response manapun
- [x] Alur status laporan (BR-03) tercermin di endpoint workflow: `review → assign → accept → resolve → confirm → close/reopen`
- [x] Semua asumsi ditulis terpisah dan jelas ditandai
- [x] Tidak ada endpoint yang tidak dapat ditelusuri ke requirement

---

## Status Dokumen

Dokumen ini disusun menggunakan skill `07-Databse-dan-API-design/SKILL.md` berdasarkan:
- `docs/requirements/03-specification.md`
- `docs/design/architecture-design.md`
- `docs/design/database-schema.md`

**Human Review diperlukan sebelum implementasi:**
- Apakah pemisahan endpoint `confirm` (Pelapor) dan `close`/`reopen` (Admin) sudah sesuai alur yang diinginkan?
- Apakah semua asumsi [API-ASUMSI-01] s.d. [API-ASUMSI-05] masuk akal untuk studi kasus ini?
- Apakah pembagian akses per aktor pada setiap endpoint sudah sesuai dengan matriks RBAC yang diharapkan?
- Apakah endpoint sudah realistis untuk dikerjakan dalam waktu yang tersedia?
