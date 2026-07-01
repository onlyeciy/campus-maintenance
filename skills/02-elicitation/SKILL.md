---
name: software-engineering-elicitation
description: Gunakan skill ini untuk menjalankan Elisitasi Requirement (Requirements Elicitation) untuk proyek software — memilih teknik elisitasi, menyusun pertanyaan interview/, dan menyarikan input mentah dari pemangku kepentingan menjadi kebutuhan eksplisit dan implisit dengan temuan elisitasi yang dapat dilacak. Gunakan setiap kali pengguna meminta untuk "mengelisitasi requirement," "menyiapkan pertanyaan interview," "mengumpulkan kebutuhan pemangku kepentingan," atau menempelkan transkrip interview/rapat mentah dan ingin kebutuhan diekstrak darinya. Gunakan juga ketika pengguna sudah memiliki dokumen inception (masalah bisnis, pemangku kepentingan, scope) dan ingin melanjutkan ke langkah berikutnya yaitu mencari tahu apa yang sebenarnya dibutuhkan oleh pemangku kepentingan. JANGAN gunakan untuk menulis requirement formal final dengan ID dan acceptance criteria, atau untuk desain sistem/teknis — hal-hal tersebut termasuk dalam fase spesifikasi requirement yang terpisah yang seharusnya menggunakan temuan skill ini sebagai input.
---

# Software Engineering Elicitation

## Tujuan

Skill ini mengubah pertanyaan "apa yang sebenarnya dibutuhkan oleh pemangku kepentingan?" menjadi sebuah proses yang terstruktur dan dapat diulang. Skill ini membantu memilih **teknik elisitasi** yang tepat untuk situasi yang dihadapi, menyusun **pertanyaan interview** yang memunculkan kebutuhan yang mungkin tidak terpikir untuk disampaikan secara sukarela oleh pemangku kepentingan, dan mengubah jawaban mentah menjadi pemisahan yang jelas antara **kebutuhan eksplisit** (apa yang secara langsung dikatakan oleh pemangku kepentingan) dan **kebutuhan implisit** (apa yang mereka asumsikan, anggap sudah jelas, atau ungkapkan secara tidak langsung).

Skill ini ada karena requirement yang dikumpulkan dengan buruk menyebabkan dua kegagalan yang berulang: keinginan yang dinyatakan oleh pemangku kepentingan diterima begitu saja tanpa menelusuri kebutuhan yang mendasarinya, dan asumsi yang tidak dinyatakan ("tentu saja itu harus berjalan di mobile," "jelas itu harus aman") tidak pernah tertangkap sampai akhir proyek, saat menambahkannya sudah menjadi mahal. Elisitasi yang baik memunculkan kedua sisi — apa yang dikatakan dan apa yang dimaksudkan tapi tidak diucapkan — dan mencatat keduanya sebagai temuan yang dapat dilacak, bukan hilang begitu saja dalam catatan rapat.

## Kapan Digunakan

Gunakan skill ini saat:
- Pengguna perlu merencanakan cara mengumpulkan requirement untuk sebuah proyek — memilih antara interview, survei, observasi, analisis dokumen, prototyping, atau teknik lainnya.
- Pengguna perlu pertanyaan interview atau yang disusun untuk grup pemangku kepentingan atau topik tertentu.
- Pengguna memiliki input mentah — transkrip, catatan rapat, hasil survei, email — dan ingin diolah menjadi daftar kebutuhan, dengan memisahkan apa yang dinyatakan secara eksplisit dari apa yang tersirat.
- Pengguna memiliki dokumen Inception (masalah bisnis, pemangku kepentingan, scope) dan sedang berpindah ke langkah berikutnya yaitu mencari tahu apa yang dibutuhkan oleh pemangku kepentingan tersebut dari solusi yang akan dibuat.

JANGAN gunakan skill ini ketika pengguna menginginkan:
- Requirement formal dengan ID requirement, prioritas, dan acceptance criteria — itu adalah spesifikasi requirement, fase berikutnya yang menggunakan temuan skill ini sebagai bahan mentah.
- Arsitektur, desain teknis, atau pilihan solusi — temuan elisitasi menjelaskan kebutuhan, bukan bagaimana kebutuhan tersebut akan dipenuhi.
- Dokumen inception/pembingkaian masalah yang baru — jika belum ada masalah bisnis atau daftar pemangku kepentingan, arahkan pengguna ke fase inception terlebih dahulu, karena elisitasi membutuhkan kerangka proyek untuk dapat mengelisitasi *di dalamnya*.

## Input

Kumpulkan atau minta sebanyak mungkin input berikut sebelum menjalankan skill ini. Sama seperti pada inception, kekosongan (gap) memang diperkirakan terjadi — kekosongan tersebut harus dimunculkan sebagai temuan yang ditandai "perlu ditindaklanjuti," bukan dikarang.

- **Kerangka proyek**: masalah bisnis, tujuan, dan daftar pemangku kepentingan (idealnya dari dokumen Inception yang sudah ada) yang menjadi fokus elisitasi ini.
- **Pemangku kepentingan target**: dari siapa elisitasi ini dilakukan — peran, grup, atau individu yang disebutkan — untuk aktivitas elisitasi ini.
- **Materi mentah untuk diolah** (jika ada): transkrip interview, catatan rapat, hasil survei, tiket support, dokumentasi yang sudah ada, atau catatan observasi.
- **Tujuan elisitasi**: apakah pengguna meminta untuk *merencanakan* aktivitas elisitasi (memilih teknik + menyusun pertanyaan) atau untuk *mengolah* input yang sudah dikumpulkan menjadi temuan? Ini adalah output yang berbeda (lihat Format Output).
- **Batasan pada aktivitas**: waktu yang tersedia dengan pemangku kepentingan, remote vs. tatap muka, jumlah pemangku kepentingan, pertimbangan bahasa/komunikasi.

## Konteks yang Dibutuhkan

Sebelum menyusun draf, baca dan perhitungkan:
- **Dokumen Inception apa pun** yang dirujuk pengguna atau yang sudah dihasilkan sebelumnya dalam percakapan — tujuan, scope, dan pemangku kepentingan yang didefinisikan di sana harus menjadi jangkar untuk menentukan kebutuhan mana yang masih dalam batas dan pemangku kepentingan mana yang paling penting.
- **Materi elisitasi mentah apa pun yang disediakan** (transkrip, catatan, tiket) — ini adalah sumber utama untuk kebutuhan eksplisit/implisit dan didahulukan dibanding inferensi.
- **Temuan elisitasi sebelumnya** dalam proyek, sehingga temuan baru tidak menduplikasi atau secara diam-diam bertentangan dengan temuan sebelumnya tanpa ditandai.

Jika tidak ada dokumen Inception, lanjutkan tetapi catat dalam output bahwa temuan belum berlandaskan pada masalah bisnis atau scope yang terdokumentasi, dan sarankan untuk menjalankan inception terlebih dahulu jika ini adalah inisiatif yang benar-benar baru.

## Workflow

1. **Tentukan mode.** Putuskan apakah permintaan ini adalah (a) *merencanakan* aktivitas elisitasi — memilih teknik dan menyusun pertanyaan — atau (b) *mengolah* input mentah yang sudah dikumpulkan menjadi temuan. Beberapa permintaan membutuhkan keduanya, dalam urutan tersebut.

2. **Jika merencanakan:** Cocokkan teknik dengan situasi (lihat panduan teknik yang tertanam dalam Format Output — Bagian A) berdasarkan ketersediaan pemangku kepentingan, jumlah pemangku kepentingan, dan jenis kebutuhan yang sedang dieksplorasi (berorientasi proses vs. berorientasi data vs. berorientasi usability). Susun pertanyaan terbuka terlebih dahulu, lalu serangkaian pertanyaan lanjutan yang lebih terarah dan lebih sedikit jumlahnya. Hindari pertanyaan yang menggiring atau yang sudah mengandaikan solusi (misalnya hindari "apakah Anda ingin dashboard untuk ini?" dan gunakan "bagaimana cara Anda melacak hal ini saat ini, dan di mana letak kendalanya?" sebagai gantinya).

3. **Jika mengolah:** Baca semua materi mentah. Untuk setiap pernyataan yang mengandung kebutuhan yang berbeda, klasifikasikan sebagai **eksplisit** (pemangku kepentingan secara langsung menyatakan sebuah keinginan, masalah, atau requirement) atau **implisit** (disimpulkan dari konteks, nada bicara, workaround yang mereka jelaskan, atau asumsi yang tertanam dalam cara mereka menyampaikan sesuatu). Jangan menaikkan kebutuhan implisit menjadi eksplisit hanya karena tampak jelas benar — pertahankan kejujuran pembedaan ini.

4. **Jalankan pemeriksaan kualitas** yang tercantum di bawah ini terhadap draf output sebelum mempresentasikannya.

5. **Berhenti dan minta klarifikasi** jika input terlalu tipis untuk mengelisitasi atau mengklasifikasikan apa pun secara bermakna (lihat Kondisi Kegagalan). Daftar temuan yang singkat dengan kekosongan yang ditandai jelas dapat diterima; mengarang kebutuhan pemangku kepentingan yang tidak pernah dikatakan atau disiratkan tidak dapat diterima.

## Format Output

Selalu hasilkan satu dokumen Markdown. Gunakan **Bagian A** saat merencanakan aktivitas elisitasi, **Bagian B** saat mengolah input mentah menjadi temuan, atau keduanya secara berurutan jika permintaan menghendakinya.

```markdown
# [Rencana / Temuan] Elisitasi: [Nama Proyek/Inisiatif]

## A. Rencana Elisitasi (gunakan saat merencanakan suatu aktivitas)

### Pemilihan Teknik
- Teknik yang direkomendasikan: [misalnya Interview / Workshop / Survei / Observasi / Analisis Dokumen / Prototyping]
- Alasan: [mengapa ini sesuai untuk grup pemangku kepentingan, batasan waktu, dan jenis kebutuhan]

### Pertanyaan Interview
**Pertanyaan pembuka / konteks**
1. ...
**Pertanyaan inti yang terbuka**
2. ...
**Pertanyaan lanjutan yang menelusuri** (digunakan jika jawaban dari pertanyaan terbuka terasa kabur atau hanya di permukaan)
3. ...
**Pertanyaan penutup** (selalu sertakan satu untuk memunculkan hal-hal yang terlewat)
- "Apakah ada hal lain tentang [topik] yang belum kita bahas dan menurut Anda penting?"

## B. Temuan Elisitasi (gunakan saat mengolah input mentah)

### Kebutuhan Eksplisit
- EN1: [Kebutuhan sebagaimana dinyatakan] — *sumber: [siapa yang mengatakannya / dokumen mana, jika diketahui]*
- EN2: ...

### Kebutuhan Implisit
- IN1: [Kebutuhan yang disimpulkan] — *basis: [pernyataan, workaround, atau konteks yang menjadi dasar inferensi ini]*
- IN2: ...

### Sinyal yang Bertentangan atau Tidak Jelas
- [Bagian mana pun di mana pemangku kepentingan tidak setuju, atau sebuah pernyataan dapat dibaca dengan lebih dari satu cara]

### Kebutuhan yang Memerlukan Tindak Lanjut
- [Apa pun yang terlalu tipis untuk diklasifikasikan dengan yakin — catat apa yang hilang dan kepada siapa harus ditanyakan]

## Status Dokumen
[Satu baris tentang kelengkapan/sumber, misalnya: "Temuan berdasarkan transkrip interview dengan Sarah (Finance), 2024-06-10. Belum ada input dari pengguna akhir — lihat Kebutuhan yang Memerlukan Tindak Lanjut."]
```

Jika Bagian A atau B tidak relevan dengan permintaan, hilangkan bagian tersebut secara keseluruhan daripada meninggalkan header kosong tanpa konten.

## Aturan

- Jangan mengarang kebutuhan yang tidak dinyatakan atau tidak dapat disimpulkan secara wajar dari materi sebenarnya yang diberikan. Setiap kebutuhan eksplisit harus dapat dilacak ke sesuatu yang benar-benar dikatakan oleh pemangku kepentingan; setiap kebutuhan implisit harus dapat dilacak ke basis yang spesifik.
- Beri tag setiap kebutuhan dengan ID (EN# untuk eksplisit, IN# untuk implisit) agar temuan elisitasi dapat dirujuk nanti oleh spesifikasi requirement.
- Pertahankan kebutuhan eksplisit dan implisit dalam daftar yang terpisah. Jangan mencampurkannya — jika tidak yakin kategori mana yang sesuai untuk suatu kebutuhan, tempatkan sebagai implisit dan jelaskan mengapa itu tidak jelas-jelas eksplisit.
- Jangan menulis pertanyaan interview yang sudah mengandaikan sebuah solusi (misalnya "seberapa sering Anda akan menggunakan aplikasi mobile untuk ini?" sudah mengandaikan adanya aplikasi mobile). Tanyakan tentang proses, rasa sakit (pain), atau tujuan yang mendasarinya sebagai gantinya.
- Jangan gunakan bahasa yang kabur dan tidak terukur saat menyatakan suatu kebutuhan ("sistemnya harus cepat," "mudah digunakan") tanpa menandainya sebagai belum terukur — disiplin yang sama seperti pada tujuan di inception berlaku untuk kebutuhan di sini.
- Jangan menghasilkan requirement formal (dengan frasa "sistem harus...", level prioritas, atau acceptance criteria) sebagai output dari skill ini — temuan menjelaskan kebutuhan, bukan solusi yang sudah dispesifikasikan. Penerjemahan itu adalah tugas fase berikutnya.
- Jangan menyelesaikan konflik antar pernyataan pemangku kepentingan secara diam-diam. Catat di bawah Sinyal yang Bertentangan atau Tidak Jelas, bukan memihak salah satu pihak.

## Pemeriksaan Kualitas

Sebelum mempresentasikan dokumen, verifikasi:
- **Lengkap**: setiap pernyataan yang mengandung kebutuhan berbeda dalam materi mentah sudah diklasifikasikan di suatu tempat (eksplisit, implisit, bertentangan, atau tindak lanjut) — tidak ada yang secara diam-diam terlewat.
- **Konsisten**: tidak ada kebutuhan yang dicatat sebagai eksplisit yang sebenarnya adalah inferensi, dan sebaliknya; tidak ada temuan yang bertentangan dengan masalah bisnis atau scope proyek yang dinyatakan tanpa ditandai sebagai konflik.
- **Tidak ambigu**: setiap kebutuhan adalah pernyataan tunggal yang spesifik, bukan parafrase kabur yang bisa berarti beberapa hal.
- **Dapat dibedakan dari requirement**: tidak ada apa pun dalam temuan yang terbaca seperti pernyataan requirement formal; jika ada, lunakkan kembali menjadi deskripsi kebutuhan.
- **Dapat dilacak (traceable)**: setiap kebutuhan eksplisit mengutip sumbernya (siapa/di mana); setiap kebutuhan implisit mengutip basisnya (dari mana inferensinya berasal).
- **Memiliki pembingkaian nilai bisnis**: jika memungkinkan, setiap kebutuhan dihubungkan kembali ke masalah bisnis atau tujuan yang relevan, sehingga temuan bukan hanya daftar yang tidak saling terhubung.

Jika ada pemeriksaan yang gagal, perbaiki draf sebelum mempresentasikannya.

## Kondisi Kegagalan

Berhenti dan minta klarifikasi dari pengguna — daripada menghasilkan output lengkap — ketika:
- **Tidak ada materi mentah dan tidak ada target elisitasi yang jelas** (misalnya, pengguna hanya berkata "elisitasi requirement" tanpa pemangku kepentingan, topik, atau transkrip yang diberikan). Tanyakan siapa/apa yang harus menjadi fokus sebelum menyusun pertanyaan atau temuan.
- **Materi mentah sama sekali tidak mengandung konten yang bermuatan kebutuhan** (misalnya, transkrip yang seluruhnya berisi obrolan ringan atau logistik) — nyatakan hal ini daripada merekayasa temuan hanya untuk mengisi template.
- **Permintaan mencampurkan elisitasi dengan fase yang berbeda** (misalnya, pengguna menempelkan transkrip dan meminta "dokumen requirement" dengan ID dan acceptance criteria) — klarifikasi apakah mereka menginginkan temuan elisitasi (skill ini) atau spesifikasi requirement lengkap (fase berikutnya), karena kedua output ini secara material berbeda.

JANGAN berhenti untuk ketipisan yang biasa — transkrip yang singkat, satu pemangku kepentingan, atau jawaban yang sebagian memang normal pada fase ini dan seharusnya menghasilkan daftar temuan yang lebih singkat ditambah item tindak lanjut, bukan permintaan yang diblokir. Batasannya adalah "tidak ada hal nyata untuk diolah atau direncanakan," bukan "input-nya terbatas."

## Contoh Permintaan

> "Ini transkrip dari panggilan kami dengan Sarah dari Finance tentang alat persetujuan pengeluaran: [transkrip]. Bisakah Anda mengeluarkan kebutuhan eksplisit dan implisitnya?"

## Contoh Output yang Diharapkan

```markdown
# Temuan Elisitasi: Alat Persetujuan Pengeluaran (Expense Approval Tool)

## B. Temuan Elisitasi

### Kebutuhan Eksplisit
- EN1: Approver perlu melihat semua permintaan pengeluaran yang menunggu di satu tempat — *sumber: Sarah, transkrip panggilan 2024-06-10*
- EN2: Alat ini harus memberi notifikasi kepada approver saat permintaan baru diajukan — *sumber: Sarah, transkrip panggilan 2024-06-10*

### Kebutuhan Implisit
- IN1: Approver kemungkinan membutuhkan cara untuk menolak suatu permintaan dengan alasan, bukan hanya menyetujui — *basis: Sarah menyebutkan karyawan saat ini mengajukan ulang formulir setelah diberi tahu secara lisan "ini tidak memenuhi syarat," yang menyiratkan bahwa feedback penolakan adalah bagian dari proses informal saat ini*
- IN2: Mungkin ada kebutuhan untuk riwayat audit tentang siapa yang menyetujui apa dan kapan — *basis: Sarah menyebutkan "finance perlu menjelaskan keputusan di kemudian hari" selama tinjauan anggaran*

### Sinyal yang Bertentangan atau Tidak Jelas
- Tidak ada yang teridentifikasi dalam transkrip ini.

### Kebutuhan yang Memerlukan Tindak Lanjut
- Apakah karyawan (peminta) memiliki kebutuhan di luar kecepatan pengajuan belum dieksplorasi — belum ada karyawan yang diwawancarai.
- Kebutuhan integrasi dengan sistem akuntansi yang sudah ada disebutkan sebagai pertanyaan terbuka dalam dokumen Inception tetapi tidak dibahas dalam panggilan ini.

## Status Dokumen
Temuan berdasarkan satu panggilan dengan Sarah (Finance), 2024-06-10. Belum
ada input dari sisi karyawan atau IT/integrasi — lihat Kebutuhan yang
Memerlukan Tindak Lanjut.
```
