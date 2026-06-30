---
name: architecture-design
description: Menentukan bagian utama (arsitektur) aplikasi untuk proyek Campus Service Request and Maintenance System, berdasarkan requirements yang sudah disusun. Gunakan skill ini setiap kali mahasiswa diminta merancang arsitektur sistem, menentukan komponen frontend/backend/database, memilih pola komunikasi antar komponen, atau membuat diagram arsitektur sebelum masuk ke tahap database/API design dan implementasi. Pastikan skill ini dipakai sebelum membuat skema database atau menulis kode, bukan sesudahnya.
---

# Architecture Design

## Tujuan
Menentukan bagian utama aplikasi: komponen frontend, backend, database, dan layanan pendukung lain, beserta cara komponen-komponen tersebut saling berkomunikasi. Hasil skill ini menjadi dasar untuk Database dan API Design dan Implementation.

## Kapan Digunakan
Dijalankan setelah requirements (functional & non-functional) sudah divalidasi (skill 03 dan 05), dan sebelum tim mulai merancang tabel database, endpoint API, atau menulis kode. Gunakan juga ulang jika ada perubahan requirement besar yang memengaruhi struktur sistem.

## Input
- Dokumen functional requirements dan non-functional requirements (hasil skill 03).
- Dokumen user story dan acceptance criteria.
- Daftar aktor sistem (Pelapor, Administrator, Teknisi, Manajer Fasilitas).
- Batasan teknis proyek: wajib menggunakan Cloudflare Workers dan Cloudflare D1 pada paket gratis, tanpa layanan berbayar tambahan.
- Catatan fitur opsional yang dipilih tim (jika ada), misalnya upload foto atau notifikasi email.

## Langkah Kerja
1. Baca seluruh requirements dan user story yang tersedia.
2. Identifikasi komponen utama sistem: frontend (antarmuka pengguna), backend/API (logika bisnis), database (penyimpanan data), dan komponen pendukung lain jika diperlukan (misalnya scheduled job, queue).
3. Tentukan tanggung jawab tiap komponen secara singkat (satu sampai tiga kalimat per komponen).
4. Tentukan pola komunikasi antar komponen, misalnya frontend memanggil REST API ke backend, backend membaca/menulis ke D1.
5. Petakan setiap aktor (Pelapor, Administrator, Teknisi, Manajer Fasilitas) ke komponen yang mereka gunakan.
6. Petakan alur status laporan (Submitted → Under Review → Assigned → In Progress → Resolved → Closed) ke komponen mana yang bertanggung jawab mengubah status tersebut.
7. Cek kesesuaian dengan batasan teknis (Cloudflare Workers + D1, paket gratis, tanpa object storage berbayar kecuali fitur upload foto memang dipilih dan sudah disetujui).
8. Buat diagram arsitektur sederhana (boleh berupa diagram teks/ASCII atau deskripsi kotak-panah) yang menunjukkan komponen dan arah komunikasi.
9. Periksa apakah ada requirement yang belum tertampung dalam arsitektur. Jika ada, catat sebagai pertanyaan terbuka, jangan menebak.
10. Berhenti dan tandai sebagai tidak lengkap jika requirements yang dibaca belum final atau masih ada yang ditandai "asumsi belum diverifikasi" pada dokumen sebelumnya.

## Output
Buat file `architecture-design.md` yang berisi:
- Daftar komponen utama beserta tanggung jawabnya.
- Diagram arsitektur sederhana (kotak-panah atau teks terstruktur).
- Pemetaan aktor ke komponen.
- Pemetaan alur status laporan ke komponen yang menangani.
- Daftar batasan teknis yang diikuti (Cloudflare Workers, D1, paket gratis).
- Daftar asumsi yang dibuat selama proses ini.
- Daftar pertanyaan terbuka yang perlu dijawab manusia sebelum lanjut ke Database dan API Design.

## Aturan
- Jangan membuat requirement atau fitur baru yang tidak ada di dokumen requirements.
- Tandai dengan jelas setiap asumsi yang dibuat, jangan menganggapnya sebagai fakta.
- Gunakan ID requirement (misalnya FR-01, NFR-02) saat mengaitkan keputusan arsitektur dengan requirement tertentu.
- Jangan keluar dari batasan teknis proyek (Cloudflare Workers + D1, paket gratis, tanpa layanan berbayar tambahan) kecuali user secara eksplisit menyatakan ada pengecualian yang disetujui.
- Jangan langsung merancang skema tabel database atau endpoint API secara detail di sini; itu adalah tugas skill 07 (Database dan API Design).
- Jaga arsitektur tetap sederhana sesuai skala tugas individu/tim kecil, hindari kompleksitas berlebihan (misalnya microservices, message queue) kecuali requirement benar-benar membutuhkannya.

## Quality Check
- Apakah setiap aktor dalam requirements sudah punya jalur akses yang jelas ke komponen yang relevan?
- Apakah setiap status dalam alur laporan punya komponen yang jelas bertanggung jawab mengubahnya?
- Apakah arsitektur masih sesuai dengan batasan Cloudflare Workers + D1 paket gratis?
- Apakah semua fitur wajib (lihat daftar fitur wajib) dapat dipetakan ke komponen dalam arsitektur ini?
- Apakah diagram arsitektur mudah dipahami oleh anggota tim lain tanpa penjelasan tambahan?

## Kondisi Gagal
- Berhenti jika dokumen requirements belum tersedia atau belum divalidasi.
- Berhenti jika ada requirement yang bertentangan dengan batasan teknis (Cloudflare Workers + D1 paket gratis) dan belum ada keputusan dari mahasiswa/dosen.
- Berhenti jika fitur yang diminta jelas membutuhkan layanan berbayar tanpa ada konfirmasi bahwa itu diperbolehkan.

## Human Review
- Mahasiswa harus memeriksa apakah pembagian komponen masuk akal untuk skala proyek individu/tim kecil.
- Mahasiswa harus mengonfirmasi atau membetulkan semua asumsi yang ditandai AI.
- Mahasiswa harus menjawab pertanyaan terbuka sebelum hasil ini dipakai sebagai dasar Database dan API Design.
- Dosen atau reviewer dapat memeriksa apakah arsitektur konsisten dengan requirement dan alur status yang sudah disepakati.