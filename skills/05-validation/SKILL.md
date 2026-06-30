---
name: 05-validation-change
description: Gunakan skill ini untuk memvalidasi artefak rekayasa perangkat lunak (dokumen inception, temuan elisitasi, spesifikasi, keputusan prioritisasi) terhadap kejelasan, kelengkapan, konsistensi, kelayakan, dan keterujian, memeriksa ketertelusuran di sepanjang rantai, serta menganalisis dampak dari perubahan yang diusulkan. Picu skill ini setiap kali pengguna meminta untuk "memvalidasi" kebutuhan/dokumen, "meninjau spesifikasi ini," "memeriksa celah/ambiguitas," "apakah kebutuhan ini dapat diuji," "apa yang rusak jika kita mengubah X," "analisis dampak," atau menempelkan permintaan perubahan dan bertanya apa saja yang terdampak. Picu juga ketika suatu kebutuhan, item lingkup, atau keputusan sedang diubah dan efek hilirnya perlu ditelusuri. JANGAN gunakan untuk menyusun konten inception, elisitasi, spesifikasi, atau prioritisasi yang baru dari awal — skill ini mengaudit dan menilai artefak serta perubahan yang sudah ada, bukan menulis kebutuhan baru dari nol.
---

# 05-validation-change

## Tujuan

Skill ini menyediakan dua kemampuan terkait yang menutup siklus rantai kebutuhan (inception → elisitasi → spesifikasi → prioritisasi): **validasi**, yang mengaudit artefak yang sudah ada terhadap enam kriteria kualitas, dan **analisis perubahan**, yang menilai apa yang tersentuh oleh suatu perubahan yang diusulkan sebelum disetujui.

Skill ini ada karena artefak yang dibuat lebih awal dalam rantai tersebut mengumpulkan cacat-cacat kecil — tujuan yang kabur, kriteria penerimaan yang tidak dapat diuji, kebutuhan yang bertentangan dengan kebutuhan lain — yang murah untuk ditangkap sekarang dan mahal untuk ditangkap setelah sistem dibangun. Skill ini juga ada karena perubahan tidak terhindarkan, dan perubahan yang tidak dianalisis ("tambahkan saja satu field ini") secara rutin merusak suatu dependensi, membatalkan rasionalisasi prioritisasi, atau bertentangan dengan aturan bisnis yang tidak pernah diperiksa ulang oleh siapa pun. Skill ini membuat kedua pemeriksaan tersebut eksplisit dan dapat diulang, alih-alih mengandalkan seseorang yang kebetulan menyadarinya.

## Kapan Digunakan

Gunakan skill ini ketika:
- Pengguna memiliki dokumen inception, temuan elisitasi, spesifikasi, atau keputusan prioritisasi yang sudah selesai atau sedang berjalan dan ingin diperiksa kualitasnya sebelum dilanjutkan.
- Pengguna bertanya apakah suatu kebutuhan, story, atau kriteria penerimaan tertentu jelas, dapat diuji, atau lengkap.
- Pengguna mengusulkan suatu perubahan (kebutuhan baru, fitur yang dihapus, aturan bisnis yang diubah, tenggat waktu yang berubah) dan ingin tahu apa lagi dalam proyek yang terdampak.
- Pengguna melaporkan bahwa dua bagian dokumentasi proyek tampak bertentangan dan ingin hal itu dikonfirmasi serta didiagnosis.

JANGAN gunakan skill ini ketika pengguna menginginkan:
- Draf pertama dokumen inception, temuan elisitasi, spesifikasi, atau keputusan prioritisasi yang ditulis dari awal — gunakan skill sebelumnya yang sesuai; skill ini meninjau apa yang sudah ada.
- Tinjauan kode umum atau analisis bug teknis — skill ini memvalidasi artefak rantai kebutuhan, bukan kode sumber.
- Keputusan yang dibuatkan untuk mereka tentang apakah harus menyetujui suatu perubahan — skill ini melaporkan dampak agar keputusan dapat dibuat; skill ini tidak menggantikan persetujuan pemangku kepentingan.

## Input

Kumpulkan atau minta sebanyak mungkin hal berikut sebelum menjalankan skill ini:

- **Artefak yang akan divalidasi atau perubahan yang akan dianalisis**: dokumen, daftar, atau keputusan sebenarnya yang dimaksud — skill ini tidak dapat memvalidasi sesuatu yang belum diberikan kepadanya.
- **Mode**: apakah ini adalah proses validasi (memeriksa kualitas konten yang sudah ada) atau analisis perubahan (menilai dampak dari suatu perubahan yang diusulkan)? Suatu permintaan bisa membutuhkan keduanya — misalnya "validasi perubahan ini sebelum kami menyetujuinya."
- **Artefak hulu/hilir**: setiap dokumen inception, elisitasi, spesifikasi, atau prioritisasi yang terhubung dengan apa yang sedang divalidasi atau diubah, sehingga ketertelusuran (traceability) dan dampak benar-benar dapat diperiksa, bukan diasumsikan.
- **Khusus untuk analisis perubahan**: pernyataan yang jelas tentang apa yang sedang diubah (ditambahkan, dihapus, dimodifikasi) dan alasannya, jika diketahui.

## Konteks yang Diperlukan

Sebelum memvalidasi atau menganalisis, baca dan perhitungkan:
- **Artefak yang ditinjau itu sendiri**, secara utuh — pembacaan sebagian menghasilkan negatif palsu (melewatkan celah yang sebenarnya ada) dan positif palsu (menandai sesuatu yang sebenarnya sudah dibahas di bagian lain dokumen).
- **Setiap artefak hulu yang tertaut** (misalnya temuan elisitasi yang diklaim oleh suatu spesifikasi sebagai sumbernya, atau tujuan inception yang diklaim dilayani oleh rasionalisasi prioritisasi) — ketertelusuran dan analisis dampak tidak bermakna tanpa hal-hal yang ditelusuri tersebut.
- **Setiap artefak hilir yang tertaut** (misalnya prioritisasi atau desain yang menggunakan spesifikasi yang sedang diubah) — analisis perubahan harus memeriksa ke arah depan, bukan hanya ke belakang.

Jika artefak hulu atau hilir tidak tersedia, lanjutkan dengan apa yang tersedia dan secara eksplisit catat dalam output pemeriksaan ketertelusuran/dampak mana yang tidak dapat dilakukan karena kurangnya materi.

## Alur Kerja

1. **Tentukan mode.** Putuskan apakah ini adalah (a) memvalidasi kualitas artefak yang sudah ada, (b) menganalisis dampak dari suatu perubahan yang diusulkan, atau (c) keduanya — memvalidasi suatu perubahan sebelum diterima.

2. **Jika memvalidasi:** Telusuri artefak kriteria demi kriteria (Kejelasan, Kelengkapan, Konsistensi, Kelayakan, Keterujian, Ketertelusuran — lihat Bagian A Format Output untuk arti masing-masing dalam praktiknya). Jangan hanya membaca sekilas untuk mencari masalah yang jelas; periksa setiap kebutuhan/item satu per satu terhadap setiap kriteria yang berlaku.

3. **Jika menganalisis perubahan:** Identifikasi setiap item (kebutuhan, aturan bisnis, story, keputusan prioritisasi, dependensi) yang merujuk pada, bergantung pada, atau dirujuk oleh apa yang sedang diubah. Telusuri baik ke hulu (apakah perubahan ini melanggar sesuatu yang seharusnya dipenuhinya?) maupun ke hilir (apakah perubahan ini merusak sesuatu yang dibangun di atasnya?).

4. **Klasifikasikan setiap temuan berdasarkan tingkat keparahan** — Blocker (harus diperbaiki sebelum dilanjutkan), Major (sebaiknya diperbaiki, risiko nyata jika tidak), Minor (perlu dicatat, risiko rendah) — agar pengguna dapat bertindak terhadap masalah paling penting terlebih dahulu.

5. **Jalankan pemeriksaan kualitas** yang tercantum di bawah ini terhadap draf validasi/analisis itu sendiri sebelum menyajikannya.

6. **Berhenti dan minta klarifikasi** jika artefak atau deskripsi perubahan terlalu tidak lengkap untuk divalidasi atau dianalisis secara bermakna (lihat Kondisi Kegagalan).

## Format Output

Selalu hasilkan satu dokumen Markdown. Gunakan **Bagian A** untuk validasi, **Bagian B** untuk analisis dampak perubahan, atau keduanya secara berurutan jika permintaannya membutuhkan itu.

```markdown
# Validasi / Analisis Perubahan: [Nama Artefak atau Perubahan]

## A. Temuan Validasi (digunakan saat memvalidasi artefak)

### Kejelasan
- [Temuan: ID/lokasi item, masalah, tingkat keparahan] — atau "Tidak ditemukan masalah kejelasan."

### Kelengkapan
- [Temuan] — memeriksa bagian yang hilang, kebutuhan yang belum terjawab, atau kebutuhan tanpa kriteria penerimaan.

### Konsistensi
- [Temuan] — memeriksa kontradiksi antar-item, atau antara artefak ini dengan artefak hulu.

### Kelayakan
- [Temuan] — memeriksa kebutuhan yang bertentangan dengan batasan yang dinyatakan (teknis, anggaran, jadwal) atau yang bertentangan satu sama lain sehingga pengiriman bersama menjadi tidak masuk akal.

### Keterujian
- [Temuan] — memeriksa kebutuhan/kriteria penerimaan yang tidak dapat diubah menjadi tes lulus/gagal sebagaimana tertulis.

### Ketertelusuran
- [Temuan] — memeriksa bahwa setiap item terhubung ke kebutuhan/tujuan hulu dan, jika berlaku, ke konsumen hilir.

### Ringkasan berdasarkan Tingkat Keparahan
| Tingkat Keparahan | Jumlah | Item |
|----------|-------|-------|
| Blocker | # | [ID] |
| Major | # | [ID] |
| Minor | # | [ID] |

## B. Analisis Dampak Perubahan (digunakan saat menilai perubahan yang diusulkan)

### Perubahan yang Diusulkan
[Nyatakan ulang apa yang sedang berubah, dalam satu atau dua kalimat]

### Dampak Hulu
[Apakah perubahan ini masih memenuhi tujuan/kebutuhan yang seharusnya dilayani? Adakah konflik dengan tujuan inception atau temuan elisitasi?]

### Dampak Hilir
| Item Terdampak | Hubungan | Efek dari Perubahan |
|---------------|--------------|-------------------|
| FR-03 | Bergantung pada item yang sedang diubah | [apa yang rusak, apa yang perlu dikerjakan ulang] |
| ... | ... | ... |

### Prioritisasi Terdampak
[Apakah perubahan ini membatalkan klasifikasi MoSCoW atau rasionalisasinya? misalnya, suatu dependensi kini mengarah pada sesuatu yang baru saja keluar dari lingkup.]

### Rekomendasi
[Bukan keputusan — melainkan masukan terstruktur untuk satu keputusan: misalnya "Perubahan ini berdampak rendah dan terisolasi" atau "Perubahan ini membatalkan BR-01 dan memerlukan prioritisasi ulang FR-04 sebelum disetujui."]

## Status Dokumen
[Satu baris tentang kelengkapan/cakupan tinjauan, misalnya: "Memvalidasi spesifikasi FR-01–FR-04 terhadap elisitasi EN1-EN2, IN1-IN2. Dokumen inception tidak tersedia — ketertelusuran tujuan tidak dapat sepenuhnya diperiksa."]
```

Jika hanya satu mode yang berlaku, hilangkan bagian lainnya sepenuhnya.

## Aturan

- Jangan melaporkan temuan tanpa mengutip ID atau lokasi item spesifik yang menjadi acuannya. "Beberapa kebutuhan tidak jelas" tidak dapat digunakan; "FR-03 menggunakan kata 'cepat' tanpa ambang batas yang terukur" dapat digunakan.
- Terapkan keenam kriteria (Kejelasan, Kelengkapan, Konsistensi, Kelayakan, Keterujian, Ketertelusuran) selama validasi, bahkan jika beberapa tidak menghasilkan temuan — nyatakan "Tidak ditemukan masalah" alih-alih melewatkan suatu kriteria begitu saja.
- Jangan mengarang tautan hulu/hilir yang hilang agar ketertelusuran tampak lebih baik daripada kenyataannya. Jika suatu kebutuhan tidak memiliki sumber yang dinyatakan, sebutkan itu sebagai temuan Kelengkapan atau Ketertelusuran.
- Klasifikasikan setiap temuan dengan tingkat keparahan (Blocker/Major/Minor) menggunakan standar yang konsisten: Blocker = artefak tidak dapat diandalkan apa adanya; Major = risiko nyata cacat atau pengerjaan ulang jika tidak ditangani; Minor = gaya penulisan atau risiko rendah.
- Untuk analisis dampak perubahan, periksa kedua arah — hulu (apakah perubahan masih melayani kebutuhan/tujuan asli) dan hilir (item apa yang dibangun di atasnya yang terdampak) — analisis dampak satu arah tidak lengkap.
- Jangan merekomendasikan apakah suatu perubahan harus disetujui — laporkan dampak, manfaat, dan risikonya, dan biarkan pengguna atau pemangku kepentingan yang memutuskan. Skill ini menginformasikan keputusan; skill ini tidak membuat keputusan.
- Jangan secara diam-diam memperbaiki artefak yang sedang divalidasi. Laporkan temuan; jika pengguna secara terpisah meminta artefak diperbaiki, itu adalah permintaan berbeda yang ditangani dengan skill penyusunan yang relevan (inception/elisitasi/spesifikasi/prioritisasi).

## Pemeriksaan Kualitas

Sebelum menyajikan dokumen, pastikan:
- **Lengkap**: setiap kriteria yang berlaku (dalam mode validasi) atau arah dampak (dalam mode perubahan) telah dibahas, dengan temuan atau pernyataan eksplisit "tidak ditemukan."
- **Konsisten**: temuan-temuan tidak saling bertentangan (misalnya menandai item yang sama sebagai sepenuhnya dapat ditelusuri sekaligus kehilangan sumber).
- **Tidak ambigu**: setiap temuan menyatakan masalah spesifik dan lokasinya, bukan kesan yang kabur.
- **Dapat diuji/ditindaklanjuti**: setiap temuan cukup spesifik sehingga seseorang dapat bertindak langsung — memperbaiki kata-kata, menambahkan tautan yang hilang, menjalankan ulang prioritisasi, dan sebagainya.
- **Dapat ditelusuri**: setiap temuan merujuk pada artefak dan ID item asalnya, dan, dalam analisis perubahan, setiap efek hilir menyebutkan item terdampak secara spesifik.
- **Memiliki kerangka nilai bisnis**: Rekomendasi (dalam mode perubahan) atau Ringkasan Tingkat Keparahan (dalam mode validasi) menghubungkan temuan kembali ke risiko atau nilai nyata, bukan sekadar penghitungan checklist.

Jika ada pemeriksaan yang gagal, perbaiki draf sebelum menyajikannya.

## Kondisi Kegagalan

Berhenti dan minta klarifikasi dari pengguna — alih-alih menghasilkan output lengkap — ketika:
- **Tidak ada artefak dan tidak ada deskripsi perubahan yang diberikan sama sekali** (misalnya, pengguna mengatakan "validasi kebutuhan saya" tanpa lampiran atau teks apa pun). Minta artefak atau perubahan sebelum melanjutkan.
- **Perubahan yang diusulkan dijelaskan terlalu samar untuk ditelusuri** (misalnya "kami mungkin akan mengubah beberapa hal tentang alur persetujuan" tanpa rincian) — tanyakan apa secara spesifik yang ditambahkan, dihapus, atau dimodifikasi.
- **Artefak merujuk pada item hulu/hilir yang tidak ada di mana pun dalam materi yang diberikan dan pengguna belum menyatakan apakah item tersebut memang hilang atau hanya belum dibagikan** — tanyakan apakah artefak tersebut ada dan harus diberikan, karena jawabannya menentukan apakah ini temuan Kelengkapan atau permintaan input tambahan.

JANGAN berhenti untuk pekerjaan validasi biasa — menemukan beberapa masalah Blocker atau Major adalah output yang diharapkan dan berguna dari skill ini, bukan alasan untuk berhenti. Standar untuk berhenti adalah "tidak ada hal konkret untuk divalidasi atau ditelusuri," bukan "artefak memiliki masalah."

## Contoh Pemanggilan

> "Ini spesifikasi kami untuk tool pengajuan biaya (expense tool) [FR-01 hingga FR-04 dan NFR-01]. Bisakah kamu memvalidasinya untuk keterujian dan ketertelusuran sebelum kami serahkan ke tim developer?"

## Contoh Output yang Diharapkan

```markdown
# Validasi: Spesifikasi Tool Persetujuan Biaya

## A. Temuan Validasi

### Kejelasan
- Tidak ditemukan masalah kejelasan pada FR-01–FR-03.
- NFR-01 ("mengirimkan notifikasi pengajuan dengan segera") menggunakan kata "segera" tanpa ambang batas yang ditentukan. — Tingkat Keparahan: Major

### Kelengkapan
- FR-04 (riwayat audit) tidak memiliki kriteria penerimaan yang tertaut di bagian user stories. — Tingkat Keparahan: Major

### Konsistensi
- Tidak ditemukan kontradiksi antara FR-01–FR-04.

### Kelayakan
- Tidak ditemukan masalah kelayakan berdasarkan batasan yang dinyatakan.

### Keterujian
- NFR-01 tidak dapat diuji sebagaimana tertulis — "segera" tidak memiliki kondisi lulus/gagal yang terukur. — Tingkat Keparahan: Blocker
- FR-01–FR-03 masing-masing dapat diuji sebagaimana tertulis.

### Ketertelusuran
- FR-01, FR-02, FR-03 jelas tertelusuri ke temuan elisitasi EN1, EN2, IN1.
- FR-04 tertelusuri ke IN2, tetapi celah kriteria penerimaannya (lihat Kelengkapan) memutus ketertelusuran yang dapat diuji ke langkah verifikasi.

### Ringkasan berdasarkan Tingkat Keparahan
| Tingkat Keparahan | Jumlah | Item |
|----------|-------|-------|
| Blocker | 1 | NFR-01 |
| Major | 2 | NFR-01 (kejelasan), FR-04 (kriteria penerimaan hilang) |
| Minor | 0 | — |

## Status Dokumen
Memvalidasi spesifikasi FR-01–FR-04 dan NFR-01 terhadap temuan elisitasi
EN1, EN2, IN1, IN2. Dokumen inception tidak diberikan — ketertelusuran
tingkat tujuan tidak dapat diperiksa.
```
