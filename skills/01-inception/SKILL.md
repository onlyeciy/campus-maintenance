---
name: software-engineering-inception
description: Gunakan skill ini untuk menghasilkan dokumen Software Engineering Inception — artefak fundamental yang menangkap masalah bisnis, tujuan, pemangku kepentingan (stakeholder), ruang lingkup (scope), asumsi, batasan (constraint), dan pertanyaan terbuka (open questions) sebelum pekerjaan desain atau requirement dimulai. Gunakan setiap kali pengguna meminta untuk "memulai proyek baru," "kick off," "mendefinisikan masalah," "scoping proyek," atau menulis "project charter," "dokumen inception," atau "vision document" — bahkan jika mereka hanya menyebutkan satu atau dua elemen ini, karena inception dimaksudkan untuk memunculkan sisanya. Gunakan juga saat pengguna menempelkan catatan rapat mentah, ide kasar, atau utas email tentang inisiatif baru dan ingin diubah menjadi sesuatu yang terstruktur. JANGAN gunakan untuk requirement fungsional/non-fungsional yang detail, user story, atau desain teknis — hal-hal tersebut datang setelah inception, dalam fase requirement yang terpisah.
---

# Software Engineering Inception

## Tujuan

Skill ini mengubah deskripsi inisiatif software yang kasar dan sering tidak lengkap menjadi sebuah **dokumen Inception** yang terstruktur: artefak fundamental yang menyelaraskan semua pihak tentang *mengapa* proyek ini ada sebelum siapa pun mulai mendesain atau membangun.

Inception menjawab pertanyaan-pertanyaan yang, jika dilewatkan, akan muncul kembali di kemudian hari sebagai kejutan yang mahal: Masalah bisnis apa yang sebenarnya sedang kita selesaikan? Siapa yang peduli dengan hasilnya? Apa yang secara eksplisit di luar ruang lingkup? Apa yang kita asumsikan tapi belum diverifikasi? Batasan apa yang tidak bisa dinegosiasikan? Apa yang belum kita ketahui?

Skill ini ada karena tim sering langsung melompat ke requirement atau solusi tanpa menyepakati masalahnya terlebih dahulu. Hal ini menghasilkan requirement yang menyelesaikan masalah yang salah, scope yang merembet (scope creep) karena batasannya tidak pernah dinyatakan, dan kerja ulang yang disebabkan oleh asumsi yang tidak ditandai sebagai asumsi oleh siapa pun. Dokumen Inception murah untuk ditulis dan mahal untuk dilewatkan.

## Kapan Digunakan

Gunakan skill ini saat:
- Pengguna memulai proyek software baru, inisiatif fitur, atau upaya produk dan perlu membingkainya sebelum requirement atau desain.
- Pengguna memberikan input mentah (catatan rapat, utas Slack, pitch kasar, email pemangku kepentingan) dan ingin disarikan menjadi pembingkaian masalah/scope yang formal.
- Pengguna secara eksplisit meminta "dokumen inception," "project charter," "vision document," atau meminta untuk mendefinisikan "masalah bisnis," "pemangku kepentingan," "ruang lingkup," "asumsi," "batasan," atau "pertanyaan terbuka" untuk sebuah upaya software.
- Pengguna sudah memiliki dokumen requirement atau backlog tetapi belum ada pernyataan masalah atau batasan scope yang terdokumentasi, dan meminta untuk membuatnya secara retroaktif.

JANGAN gunakan skill ini ketika pengguna menginginkan:
- Requirement fungsional/non-fungsional yang detail dengan ID requirement dan acceptance criteria — itu adalah langkah elisitasi requirement yang terpisah yang seharusnya menggunakan output skill ini sebagai input, bukan menggantikannya.
- Desain teknis, dokumen arsitektur, atau rencana implementasi.
- Rencana proyek dengan timeline, anggaran, atau alokasi sumber daya (batasan yang ditangkap di sini *dapat merujuk* pada batasan anggaran/timeline, tetapi skill ini tidak menghasilkan jadwal).

## Input

Sebelum menjalankan skill ini, kumpulkan atau minta sebanyak mungkin input berikut. Tidak semua input perlu ada — adanya kekosongan (gap) memang diperkirakan dan harus dimunculkan sebagai pertanyaan terbuka, bukan menghentikan skill secara total (lihat Kondisi Kegagalan untuk batas antara "tidak lengkap tapi masih bisa dikerjakan" dan "terlalu tidak lengkap untuk dilanjutkan").

- **Materi sumber**: catatan rapat, transkrip, email, pitch, backlog, atau deskripsi verbal dari inisiatif tersebut.
- **Konteks bisnis**: masalah, pain point, atau peluang apa yang memicu inisiatif ini; tujuan bisnis atau metrik keberhasilan yang sudah diketahui.
- **Informasi pemangku kepentingan**: nama atau peran orang-orang yang meminta, akan menggunakan, akan mendanai, atau akan terdampak oleh hasilnya.
- **Batasan yang sudah diketahui**: apa pun yang sudah dinyatakan pengguna sebagai termasuk dalam scope, di luar scope, atau "belum saat ini."
- **Constraint yang sudah diketahui**: anggaran, timeline, mandat teknologi, persyaratan regulasi/kepatuhan, kebijakan organisasi.
- **Apa pun yang secara eksplisit belum terselesaikan**: keputusan yang masih menunggu, informasi yang masih hilang, dependensi pada tim/sistem lain.

Jika pengguna hanya memberikan satu atau dua kalimat, itu sudah menjadi titik awal yang valid — tugas skill ini adalah mengekstrak apa yang dinyatakan, tidak menyimpulkan apa pun sebagai fakta, dan menandai segala sesuatu yang lain sebagai pertanyaan terbuka atau asumsi yang perlu divalidasi.

## Konteks yang Dibutuhkan

Sebelum membuat draf, baca dan perhitungkan:
- **File yang diunggah atau teks yang ditempel** yang dirujuk pengguna (catatan rapat, brief, dokumen sebelumnya) — ini adalah sumber kebenaran utama dan didahulukan dibanding inferensi AI sendiri.
- **Dokumen inception, charter, atau requirement yang sudah ada** dalam proyek yang dirujuk pengguna, sehingga dokumen baru tidak bertentangan atau menduplikasi dokumen tersebut.
- **Giliran percakapan sebelumnya** di mana pengguna sudah menyatakan tujuan, pemangku kepentingan, atau batasan — jangan menanyakan ulang informasi yang sudah diberikan.

Jika tidak ada file atau konteks sebelumnya, lanjutkan hanya menggunakan apa yang dinyatakan pengguna dalam permintaan saat ini, dan andalkan langkah klarifikasi dalam Workflow untuk mengisi kekosongan.

## Workflow

1. **Ekstrak apa yang dinyatakan.** Baca semua materi sumber dan permintaan pengguna. Tarik setiap pernyataan eksplisit yang sesuai dengan: masalah bisnis, tujuan, pemangku kepentingan, item scope, asumsi, batasan, atau pertanyaan terbuka. Pertahankan makna aslinya — jangan ditambah-tambah (embellish).

2. **Identifikasi apa yang hilang atau implisit.** Bandingkan apa yang diekstrak dengan tujuh bagian yang diwajibkan (masalah bisnis, tujuan, pemangku kepentingan, scope, asumsi, batasan, pertanyaan terbuka). Untuk setiap kekosongan, tentukan: apakah ini dapat disimpulkan secara wajar dari konteks dan ditandai sebagai asumsi eksplisit, atau apakah ini tidak diketahui dan harus menjadi pertanyaan terbuka? Jangan pernah mengisi kekosongan secara diam-diam dengan detail yang dikarang.

3. **Susun draf dokumen bagian per bagian**, mengikuti struktur tepat dalam Format Output. Tulis tujuan agar masing-masing terkait dengan hasil yang terukur atau teramati jika memungkinkan. Tulis scope sebagai daftar in/out yang eksplisit, bukan dalam bentuk prosa. Tulis asumsi dan pertanyaan terbuka sebagai pernyataan datar, bernomor, dan dapat difalsifikasi — bukan kekhawatiran yang kabur.

4. **Jalankan pemeriksaan kualitas** yang tercantum di bawah ini terhadap draf lengkap sebelum mempresentasikannya.

5. **Berhenti dan minta klarifikasi** jika kekosongan yang ditemukan di langkah 2 cukup parah sehingga menebak akan salah menggambarkan proyek (lihat Kondisi Kegagalan). Dokumen sebagian dengan kekosongan yang ditandai jelas adalah output yang dapat diterima; dokumen yang mengarang masalah bisnis atau daftar pemangku kepentingan tidak dapat diterima.

## Format Output

Selalu hasilkan satu dokumen Markdown menggunakan struktur tepat ini:

```markdown
# Dokumen Inception: [Nama Proyek/Inisiatif]

## 1. Masalah Bisnis
[1-3 paragraf yang menjelaskan masalah atau peluang yang membenarkan adanya inisiatif ini. Nyatakan siapa yang mengalami masalah ini dan apa yang terjadi jika tidak diselesaikan. Jangan jelaskan solusinya di bagian ini.]

## 2. Tujuan & Kriteria Keberhasilan
- G1: [Tujuan dinyatakan sebagai hasil (outcome), dengan ukuran keberhasilan jika diketahui]
- G2: ...
[Jika sebuah tujuan tidak memiliki ukuran yang dinyatakan, tandai: "(metrik keberhasilan belum disediakan — disarankan untuk mendefinisikannya)"]

## 3. Pemangku Kepentingan
| Peran | Nama/Grup | Kepentingan / Keterlibatan |
|------|-----------|-------------------|
| Sponsor | ... | ... |
| Pengguna akhir | ... | ... |
| ... | ... | ... |

## 4. Ruang Lingkup
### Termasuk dalam Lingkup
- ...
### Di Luar Lingkup
- ...
[Jika ruang lingkup belum dibahas secara eksplisit, nyatakan: "Batasan ruang lingkup belum disediakan — lihat Pertanyaan Terbuka."]

## 5. Asumsi
- A1: [Pernyataan] — *basis: [mengapa ini diasumsikan, misalnya "disimpulkan dari pernyataan pemangku kepentingan bahwa..."]*
- A2: ...

## 6. Batasan (Constraints)
- C1: [Jenis: Anggaran / Timeline / Teknis / Regulasi / Organisasi] — [Pernyataan]
- C2: ...

## 7. Pertanyaan Terbuka
- Q1: [Pertanyaan] — *pemilik: [siapa yang harus menjawab ini, jika diketahui, jika tidak "belum ditentukan"]*
- Q2: ...

## 8. Status Dokumen
[Satu baris yang mencatat tingkat kelengkapan, misalnya: "Draf berdasarkan [sumber]. Bagian X, Y memerlukan input pemangku kepentingan sebelum ini dapat difinalisasi."]
```

Jika sebuah bagian benar-benar tidak memiliki konten apa pun bahkan setelah inferensi, pertahankan headernya dan tulis "Tidak ada yang teridentifikasi — perlu validasi" daripada menghilangkan bagian tersebut. Setiap bagian harus muncul di setiap output.

## Aturan

- Jangan mengarang fakta yang tidak diberikan atau tidak dapat disimpulkan secara wajar dari konteks yang diberikan. Jika sesuatu harus disimpulkan, beri label sebagai asumsi (Bagian 5), bukan sebagai fakta di bagian lain.
- Tandai setiap asumsi secara eksplisit, dengan basisnya. Asumsi tanpa basis yang dinyatakan tidak dapat digunakan.
- Gunakan identifier untuk tujuan (G#), asumsi (A#), batasan (C#), dan pertanyaan terbuka (Q#) agar dapat dirujuk nanti oleh dokumen requirement atau desain.
- Pertahankan scope, asumsi, batasan, dan pertanyaan terbuka sebagai kategori yang terpisah — jangan mencampurkan batasan ke dalam daftar asumsi atau pertanyaan terbuka ke dalam scope. Jika sesuatu bisa cocok di dua kategori, tempatkan sesuai dengan pembingkaian pengguna sendiri dan catat ambiguitasnya daripada memilih secara diam-diam.
- Jangan gunakan bahasa yang kabur dan tidak terukur ("cepat," "scalable," "ramah pengguna," "andal") di bagian Tujuan tanpa melampirkan ukuran atau secara eksplisit menandainya sebagai belum terukur. Istilah kabur diperbolehkan dalam narasi Masalah Bisnis, di mana istilah tersebut menggambarkan rasa sakit (pain) bukan kriteria keberhasilan.
- Jangan menyatakan sesuatu sebagai kepentingan pemangku kepentingan jika hal itu tidak pernah benar-benar dinyatakan — jika pengguna hanya memberikan nama dan peran tanpa kepentingan yang dinyatakan, tulis "kepentingan belum ditangkap" daripada menebak apa yang mereka pedulikan.
- Jangan mereduksi output skill ini menjadi requirement. Tujuan menjelaskan hasil yang diinginkan; ini bukan tempat untuk pernyataan requirement fungsional, user story, atau acceptance criteria.

## Pemeriksaan Kualitas

Sebelum mempresentasikan dokumen, verifikasi:
- **Lengkap**: semua 8 bagian ada, bahkan jika beberapa bertuliskan "Tidak ada yang teridentifikasi."
- **Konsisten**: tidak ada tujuan yang bertentangan dengan batasan yang dinyatakan; tidak ada item dalam-scope yang bertentangan dengan item luar-scope; kepentingan pemangku kepentingan tidak bertentangan dengan masalah bisnis yang dinyatakan.
- **Tidak ambigu**: setiap tujuan, asumsi, dan batasan adalah pernyataan tunggal yang spesifik — bukan paragraf yang dapat dibaca dengan berbagai cara.
- **Dapat dibedakan dari requirement**: tidak ada apa pun dalam Tujuan atau Scope yang terbaca seperti requirement fungsional ("sistem harus..."); jika ada, tulis ulang sebagai outcome atau pindahkan detailnya ke Pertanyaan Terbuka untuk fase berikutnya.
- **Dapat dilacak (traceable)**: setiap asumsi, batasan, dan pertanyaan terbuka memiliki ID dan, jika relevan, basis atau pemilik yang dinyatakan.
- **Memiliki pembingkaian nilai bisnis**: bagian Masalah Bisnis menjelaskan *mengapa ini penting*, bukan hanya *apa yang akan dibangun*.

Jika ada pemeriksaan yang gagal, perbaiki draf sebelum mempresentasikannya — jangan mempresentasikan draf yang Anda tahu gagal pada suatu pemeriksaan lalu meminta pengguna untuk menemukannya.

## Kondisi Kegagalan

Berhenti dan minta klarifikasi dari pengguna — daripada menghasilkan dokumen lengkap — ketika:
- **Tidak ada masalah bisnis yang dapat diidentifikasi sama sekali**, bahkan setelah membaca semua materi yang disediakan (misalnya, pengguna hanya berkata "buatkan saya sebuah aplikasi" tanpa ada penjelasan mengapa). Tanyakan apa yang memicu inisiatif ini sebelum membuat draf.
- **Informasi yang dinyatakan secara langsung bertentangan dengan dirinya sendiri** (misalnya, tujuan yang dinyatakan bertentangan dengan batasan yang dinyatakan, atau dua pemangku kepentingan dijelaskan memiliki prioritas yang berlawanan dan tidak dapat direkonsiliasi) dengan cara yang tidak bisa begitu saja dicatat sebagai pertanyaan terbuka — tanyakan versi mana yang otoritatif.
- **Input adalah jenis dokumen yang sama sekali berbeda** (misalnya, pengguna menempelkan requirement yang sudah jadi atau spesifikasi teknis dan meminta "inception") — tunjukkan hal ini dan tanyakan apakah mereka ingin masalah/scope direkayasa balik (reverse-engineered) dari dokumen tersebut, karena itu menghasilkan dokumen yang secara material berbeda dari inception yang baru.

JANGAN berhenti untuk ketidaklengkapan yang biasa — pemangku kepentingan yang belum disebutkan, batasan yang belum dinyatakan, atau scope yang belum jelas memang diperkirakan terjadi pada fase ini dan seharusnya menjadi Pertanyaan Terbuka atau Asumsi yang ditandai, bukan penghalang. Batasannya adalah "saya harus mengarang premis intinya," bukan "ada beberapa field yang kosong."

## Contoh Permintaan

> "Kami ingin membangun alat internal baru untuk menggantikan proses persetujuan pengeluaran (expense approval) manual kami. Saat ini bagian finance harus mengejar formulir kertas dan itu memakan waktu berminggu-minggu. Sarah dari Finance yang meminta ini, dan CFO kami ingin ini selesai sebelum akhir tahun. Bisakah Anda menulis dokumen inception untuk ini?"

## Contoh Output yang Diharapkan

```markdown
# Dokumen Inception: Alat Persetujuan Pengeluaran (Expense Approval Tool)

## 1. Masalah Bisnis
Saat ini bagian Finance memproses persetujuan pengeluaran melalui workflow
manual berbasis kertas. Hal ini menyebabkan siklus persetujuan memakan waktu
berminggu-minggu, menciptakan keterlambatan bagi karyawan yang menunggu
reimbursement dan menghabiskan banyak waktu staf Finance untuk mengejar
formulir. Inisiatif ini bertujuan untuk menggantikan proses manual ini
dengan alat digital.

## 2. Tujuan & Kriteria Keberhasilan
- G1: Menghilangkan langkah persetujuan pengeluaran berbasis kertas (metrik keberhasilan belum disediakan — disarankan untuk mendefinisikannya, misalnya target waktu penyelesaian persetujuan)
- G2: Mengurangi waktu siklus persetujuan dari "berminggu-minggu" menjadi target yang terdefinisi (target belum ditentukan)

## 3. Pemangku Kepentingan
| Peran | Nama/Grup | Kepentingan / Keterlibatan |
|------|-----------|-------------------|
| Peminta / Sponsor | Sarah (Finance) | Ingin beban kerja manual berkurang |
| Sponsor Eksekutif | CFO | Ingin pengiriman selesai sebelum akhir tahun |
| Pengguna akhir | Karyawan yang mengajukan pengeluaran | Kepentingan belum ditangkap |
| Pengguna akhir | Approver Finance | Kepentingan belum ditangkap |

## 4. Ruang Lingkup
### Termasuk dalam Lingkup
- Penggantian digital untuk workflow persetujuan berbasis kertas saat ini
### Di Luar Lingkup
Batasan ruang lingkup belum disediakan — lihat Pertanyaan Terbuka.

## 5. Asumsi
- A1: "Akhir tahun" merujuk pada akhir tahun fiskal organisasi — *basis: tidak dinyatakan secara eksplisit; interpretasi umum, perlu konfirmasi*
- A2: Alat ini untuk penggunaan karyawan internal saja, bukan vendor eksternal — *basis: dijelaskan sebagai "alat internal"*

## 6. Batasan (Constraints)
- C1: Timeline — harus dikirimkan sebelum akhir tahun (menurut CFO)

## 7. Pertanyaan Terbuka
- Q1: Berapa target waktu siklus persetujuan secara spesifik (hari, jam)? — *pemilik: Sarah / Finance*
- Q2: Apakah ini perlu terintegrasi dengan sistem akuntansi/ERP yang sudah ada? — *pemilik: belum ditentukan*
- Q3: Apa yang dimaksud "akhir tahun" — kalender atau fiskal? — *pemilik: CFO*

## 8. Status Dokumen
Draf berdasarkan deskripsi verbal awal. Scope, kebutuhan integrasi, dan
target metrik memerlukan input pemangku kepentingan sebelum ini dapat
difinalisasi.
```
