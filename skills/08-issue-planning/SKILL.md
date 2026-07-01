---
name: issue-planning
description: Mengubah requirement, PRD, atau spesifikasi menjadi GitHub Issues yang siap dikerjakan, menggunakan vertical slice (tracer bullet) agar setiap issue independen dan bisa langsung digarap. Gunakan skill ini setiap kali user menyebut "requirement", "PRD", "spesifikasi", "rencana fitur", atau minta dokumen/plan dipecah menjadi issue/task di GitHub — bahkan jika user tidak secara eksplisit menyebut kata "issue".
---

# Issue Planning

## Tujuan
Mengubah requirement (PRD, spesifikasi, atau rencana fitur) menjadi kumpulan GitHub Issues yang siap dikerjakan. Setiap issue merupakan potongan vertikal (tracer bullet) yang memotong seluruh layer integrasi (schema, API, UI, test) secara end-to-end, sehingga bisa dikerjakan dan diverifikasi secara independen — bukan potongan horizontal per-layer.

## Kapan Digunakan
- User memberikan dokumen requirement/PRD/spesifikasi dan minta dipecah menjadi issue atau task.
- User minta "buatkan GitHub Issues dari dokumen/plan ini".
- User mereferensikan issue GitHub yang sudah ada (nomor, URL, atau path) sebagai issue induk yang perlu dipecah lebih lanjut.
- User menyebut kebutuhan breakdown pekerjaan untuk tim atau agent otomatis dari sebuah rencana fitur.

## Input
- Dokumen requirement/PRD/spesifikasi (file yang diupload, teks di percakapan, atau referensi issue GitHub existing beserta isi dan komentarnya).
- Akses ke repository GitHub tempat issue akan dipublikasikan (nama repo atau konfigurasi `gh` CLI yang sudah tersedia).
- (Opsional) Daftar label triase yang harus dipasang pada issue yang siap dikerjakan agent otomatis (AFK agent).

## Langkah Kerja
1. **Baca input.** Baca requirement/PRD secara menyeluruh. Jika user memberi referensi issue existing, ambil isi lengkap beserta komentarnya dari issue tracker.
2. **Eksplorasi codebase (opsional).** Jika belum familiar dengan codebase, telusuri untuk memahami kondisi terkini, konvensi domain (glossary), dan ADR (Architecture Decision Record) di area yang akan disentuh. Cari peluang prefactor agar implementasi nanti lebih mudah — "buat perubahan jadi mudah, baru buat perubahan mudah itu".
3. **Susun vertical slice.** Pecah requirement menjadi issue-issue tracer bullet:
   - Setiap slice mengantarkan jalur SEMPIT tapi LENGKAP melintasi semua layer (schema, API, UI, test).
   - Satu slice yang selesai harus bisa didemokan atau diverifikasi berdiri sendiri.
   - Pekerjaan prefactor (jika ada) dikerjakan lebih dulu, sebelum slice fitur.
4. **Kerjakan tugas — tampilkan draft ke user.** Sajikan breakdown sebagai daftar bernomor. Untuk setiap slice cantumkan:
   - **Judul**: nama singkat dan deskriptif.
   - **Diblokir oleh**: slice lain yang harus selesai lebih dulu (jika ada).
   - **User story/ID requirement yang dicakup**: rujuk ID requirement asli dari dokumen sumber.
   Tanyakan ke user: apakah granularitasnya pas (terlalu kasar/terlalu detail)? Apakah relasi dependency sudah benar? Apakah ada slice yang perlu digabung atau dipecah lagi?
5. **Periksa hasil — iterasi sampai disetujui.** Ulangi langkah 3–4 sampai user secara eksplisit menyetujui breakdown. Jangan lanjut ke publish tanpa persetujuan ini.
6. **Publish issue.** Untuk setiap slice yang disetujui, buat issue baru di GitHub menggunakan template pada bagian Output. Publish berurutan sesuai dependency (blocker dipublish lebih dulu) agar "Diblokir Oleh" bisa merujuk ke nomor issue yang sudah nyata. Pasang label triase yang sesuai untuk issue yang siap dikerjakan agent otomatis, kecuali user minta sebaliknya. Jangan menutup atau mengubah issue induk.
7. **Berhenti jika informasi tidak cukup**, lihat bagian Kondisi Gagal.

## Output
Satu GitHub Issue baru per vertical slice, dengan body mengikuti template berikut:

```
## Requirement Terkait
Referensi ke issue induk atau ID requirement pada dokumen sumber (jika ada, kalau tidak ada hilangkan bagian ini).

## Yang Dibangun
Deskripsi ringkas perilaku end-to-end dari slice ini (bukan penjelasan per-layer).
Hindari path file atau cuplikan kode spesifik karena cepat basi.
Pengecualian: jika ada prototype yang menghasilkan snippet yang merepresentasikan keputusan penting secara lebih presisi daripada teks (state machine, reducer, schema, bentuk type), sertakan snippet itu secara ringkas dan sebutkan bahwa itu berasal dari prototype.

## Kriteria Penerimaan
- [ ] Kriteria 1
- [ ] Kriteria 2
- [ ] Kriteria 3

## Diblokir Oleh
- Referensi ke issue yang memblokir (jika ada)
Atau "Tidak ada - bisa langsung dikerjakan" jika tidak ada blocker.
```

## Aturan
- Jangan membuat fakta baru — seluruh isi issue harus berasal dari requirement/dokumen sumber, bukan asumsi bebas.
- Tandai asumsi secara eksplisit di body issue jika requirement ambigu (misalnya: "*Asumsi: ...*").
- Gunakan ID requirement/istilah domain dari dokumen sumber pada judul dan body issue untuk menjaga traceability.
- Jangan melewati scope — jangan menambahkan fitur atau kriteria penerimaan yang tidak diminta di requirement.
- Jangan menutup atau memodifikasi issue induk.
- Setiap slice wajib vertikal (lintas seluruh layer), bukan horizontal (satu layer saja).

## Quality Check
- Setiap issue dapat didemo atau diverifikasi berdiri sendiri tanpa menunggu slice lain (di luar yang tercantum di "Diblokir Oleh").
- Field "Diblokir Oleh" merujuk ke nomor issue yang benar-benar sudah dipublish, bukan placeholder.
- Judul dan deskripsi memakai istilah domain yang konsisten dengan dokumen requirement asli.
- Tidak ada path file atau cuplikan kode yang berpotensi basi di body, kecuali snippet keputusan penting dari prototype yang memang diperbolehkan.
- Semua slice yang disetujui user pada langkah 4–5 benar-benar terpublish; tidak ada yang terlewat atau terduplikasi.

## Kondisi Gagal
Berhenti dan minta klarifikasi ke user jika:
- Requirement tidak lengkap atau terlalu ambigu untuk dipecah menjadi slice yang jelas, dan user belum memberi klarifikasi setelah ditanya.
- Tidak ada akses ke repository/issue tracker GitHub untuk mempublish issue.
- User belum menyetujui breakdown pada langkah 5, jangan lanjut publish.
- Label triase yang diminta tidak dikenali/tidak tersedia di repository.

## Human Review
Sebelum atau sesudah publish, minta manusia memeriksa:
- Daftar breakdown vertical slice secara keseluruhan (wajib disetujui manual sebelum publish — lihat langkah 4–5).
- Ketepatan relasi dependency ("Diblokir Oleh") antar issue.
- Label triase yang dipasang, khususnya pada issue yang ditandai siap dikerjakan oleh agent otomatis (AFK agent).
- Kriteria penerimaan pada tiap issue, untuk memastikan cukup spesifik dan bisa diverifikasi.
