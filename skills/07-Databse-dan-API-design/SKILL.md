# Database dan API Design

## Tujuan
Skill ini membantu mengubah requirement (functional requirement, user story, acceptance criteria) dan architecture design menjadi dua artefak teknis yang konkret: **skema database** (tabel, kolom, tipe data, relasi) dan **kontrak API** (daftar endpoint, method, request/response). Kedua artefak ini menjadi jembatan antara "apa yang harus bisa dilakukan sistem" dan "kode apa yang harus ditulis". Tanpa desain ini, implementasi akan dikerjakan secara ad-hoc dan sulit ditelusuri kembali ke requirement aslinya.

Skill ini berlaku khusus untuk stack proyek: Cloudflare Workers (sebagai backend/API) dan Cloudflare D1 (database SQLite). Karena D1 berbasis SQL, desain tabel harus mengikuti aturan relational database biasa (primary key, foreign key, normalisasi secukupnya).

## Kapan Digunakan
Gunakan skill ini setelah requirement (skill 03) dan architecture design (skill 06) sudah disetujui, dan sebelum issue planning (skill 09) dibuat. Jalankan skill ini:
- Saat pertama kali merancang database dan API untuk seluruh aplikasi.
- Saat ada requirement baru atau berubah yang menambah entitas baru (misalnya menambah aktor "Manajer Fasilitas" yang butuh endpoint dashboard baru).
- Saat reviewer menemukan endpoint atau tabel yang tidak konsisten dengan requirement.

Jangan gunakan skill ini untuk menulis kode implementasi endpoint (itu tugas skill 10 - Implementation). Skill ini hanya menghasilkan desain/spesifikasi, bukan kode yang jalan.

## Input
Baca file-file berikut sebelum mulai bekerja. Jika salah satu tidak ada, tandai di bagian Kondisi Gagal dan tanyakan ke mahasiswa sebelum melanjutkan.
- `requirements/functional-requirements.md` — daftar FR dengan ID (misalnya FR-01, FR-02).
- `requirements/user-stories.md` — user story dan acceptance criteria per aktor.
- `design/architecture.md` — komponen utama aplikasi dan pembagian tanggung jawab (frontend, backend, database).
- Daftar aktor dan alur status laporan (Submitted → Under Review → Assigned → In Progress → Resolved → Closed), termasuk status tambahan jika ada.

## Langkah Kerja
1. Baca seluruh input di atas. Buat daftar entitas (noun) yang muncul berulang kali di requirement — misalnya: Laporan, Pengguna, Komentar, Riwayat Status, Kategori, Lokasi/Ruangan. Setiap entitas berpotensi menjadi satu tabel.
2. Untuk setiap entitas, tentukan kolom yang dibutuhkan berdasarkan acceptance criteria yang relevan. Jangan menambahkan kolom yang tidak didukung oleh requirement manapun — jika merasa perlu menambah kolom "untuk jaga-jaga", tandai sebagai asumsi, bukan fakta.
3. Tentukan relasi antar tabel (one-to-many, many-to-many) berdasarkan alur bisnis. Contoh: satu Laporan memiliki banyak Komentar dan banyak entri Riwayat Status; satu Teknisi bisa ditugaskan ke banyak Laporan.
4. Petakan setiap Functional Requirement ke satu atau lebih endpoint API. Satu FR bisa membutuhkan lebih dari satu endpoint (misalnya FR "Administrator dapat menugaskan teknisi" membutuhkan endpoint untuk melihat daftar teknisi tersedia dan endpoint untuk menyimpan penugasan).
5. Untuk setiap endpoint, tentukan: method HTTP, path, siapa yang boleh mengakses (aktor mana), bentuk request body (jika ada), dan bentuk response. Gunakan status code yang wajar (200, 201, 400, 403, 404).
6. Periksa silang: setiap FR harus punya minimal satu endpoint, dan setiap endpoint harus bisa ditelusuri ke minimal satu FR. Jika ada endpoint tanpa requirement pendukung, hapus atau tandai sebagai asumsi yang perlu dikonfirmasi.
7. Berhenti dan tanyakan ke mahasiswa jika requirement tidak menyebutkan detail penting yang dibutuhkan untuk desain (misalnya: apakah satu laporan boleh punya banyak teknisi sekaligus, atau hanya satu).

## Output
Buat atau perbarui dua file berikut:

**`design/database-schema.md`** — untuk setiap tabel, tuliskan dalam format:
```markdown
### Tabel: nama_tabel
Sumber requirement: FR-xx, FR-yy

| Kolom | Tipe | Keterangan |
|---|---|---|
| id | INTEGER PK | |
| ... | ... | ... |

Relasi: ...
```

**`design/api-contract.md`** — untuk setiap endpoint, tuliskan dalam format:
```markdown
### METHOD /path
Sumber requirement: FR-xx
Aktor yang boleh akses: ...

Request body:
{ ... }

Response 200:
{ ... }

Error cases: ...
```

## Aturan
Jelaskan alasan di balik aturan ini, bukan sekadar daftar larangan — tujuannya adalah menjaga agar desain database dan API tetap bisa ditelusuri kembali ke requirement, sehingga reviewer dan teknisi penilai bisa memverifikasi bahwa tidak ada fitur yang dibuat tanpa dasar dan tidak ada requirement yang terlewat.

- Jangan membuat tabel, kolom, atau endpoint baru yang tidak bisa ditelusuri ke requirement manapun. Jika dirasa perlu, tulis sebagai asumsi eksplisit di akhir dokumen, bukan disisipkan diam-diam ke dalam tabel.
- Selalu cantumkan ID requirement (FR-xx) di setiap tabel dan endpoint, supaya traceability dari requirement sampai database/API tetap terjaga sampai tahap testing nanti.
- Gunakan nama tabel dan kolom yang konsisten dengan istilah di requirement (misalnya jika requirement menyebut "Laporan", jangan tiba-tiba memakai nama tabel "tickets" tanpa alasan).
- Jangan melebihi scope studi kasus: fitur opsional (upload foto, email notification, login Google, dll.) tidak perlu didesain kecuali mahasiswa secara eksplisit memintanya untuk ditambahkan.
- Sesuaikan desain dengan keterbatasan Cloudflare D1 (SQLite) — hindari fitur SQL yang tidak didukung D1.

## Quality Check
Sebelum menyerahkan hasil ke mahasiswa, periksa kembali:
- [ ] Setiap FR di `functional-requirements.md` punya minimal satu endpoint yang menanganinya.
- [ ] Setiap endpoint punya minimal satu FR sumber yang dicantumkan.
- [ ] Setiap tabel punya primary key, dan setiap foreign key merujuk ke tabel yang benar-benar ada di skema.
- [ ] Alur status laporan (Submitted → ... → Closed) tercermin di skema (misalnya lewat kolom status atau tabel riwayat status) dan di endpoint yang relevan.
- [ ] Tidak ada kolom atau endpoint yang menyimpan data sensitif tanpa kebutuhan jelas (misalnya password tidak pernah dikembalikan di response API).
- [ ] Semua asumsi ditulis terpisah dan jelas ditandai sebagai asumsi, bukan dicampur dengan fakta dari requirement.

## Kondisi Gagal
Berhenti dan minta klarifikasi ke mahasiswa jika:
- File requirement atau architecture design belum tersedia atau masih berupa draft kosong.
- Ada requirement yang saling bertentangan soal data yang harus disimpan (misalnya dua acceptance criteria yang mengasumsikan struktur data berbeda untuk hal yang sama).
- Requirement menyiratkan kebutuhan yang melebihi kapasitas paket gratis Cloudflare D1/Workers (misalnya penyimpanan file besar), karena ini di luar batasan yang ditetapkan di spesifikasi tugas.

## Human Review
Mahasiswa wajib memeriksa secara manual sebelum desain ini dipakai untuk membuat GitHub Issues:
- Apakah semua asumsi yang ditandai AI memang masuk akal untuk studi kasus ini?
- Apakah ada entitas penting yang menurut mahasiswa terlewat oleh AI (misalnya lokasi/ruangan, lampiran, atau log aktivitas)?
- Apakah pembagian akses per aktor pada setiap endpoint sudah sesuai dengan tabel aktor di spesifikasi tugas?
- Apakah skema ini realistis untuk dikerjakan dalam waktu yang tersedia (kompleksitas tabel/endpoint tidak berlebihan untuk tugas individu/tim kecil)?
