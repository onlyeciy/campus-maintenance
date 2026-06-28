---
name: software-engineering-specification
description: Gunakan skill ini untuk menyusun Spesifikasi Teknik Perangkat Lunak (Software Engineering Specification) — menerjemahkan temuan elisitasi atau kebutuhan yang dinyatakan menjadi functional requirements formal, non-functional requirements, business rules, user stories, dan acceptance criteria yang dapat diuji, masing-masing dengan ID requirement. Aktifkan kapan pun pengguna meminta "tulis requirements," "buat spesifikasi" untuk sebuah fitur, "tulis user stories," "tentukan acceptance criteria," "tulis business rules," atau meminta "dokumen requirements" / "spesifikasi" / "PRD" / "SRS." Aktifkan juga ketika pengguna memiliki temuan elisitasi (kebutuhan eksplisit/implisit) dan ingin mengubahnya menjadi requirements formal yang dapat diuji. JANGAN gunakan untuk problem framing, definisi stakeholder/scope (gunakan skill inception), untuk perencanaan wawancara atau ekstraksi kebutuhan mentah (gunakan skill elicitation), atau untuk desain teknis/arsitektur — skill ini menentukan *apa* yang harus dilakukan sistem, bukan *bagaimana* sistem akan dibangun.
---

# Spesifikasi Teknik Perangkat Lunak

## Tujuan

Skill ini mengubah kebutuhan — baik berupa pernyataan informal dari stakeholder maupun temuan elisitasi formal — menjadi sebuah **Spesifikasi**: artefak yang menyatakan secara presisi apa yang harus dilakukan sistem, aturan apa yang harus dipatuhinya, dan bagaimana setiap requirement akan diverifikasi.

Skill ini ada karena kesenjangan antara "apa yang dibutuhkan stakeholder" dan "apa yang dibangun" adalah sumber utama dari sebagian besar defect dan rework. Kebutuhan seperti "approver harus dapat menindaklanjuti permintaan dengan mudah" tidak dapat dibangun atau diuji. Sebuah spesifikasi menutup kesenjangan ini dengan menghasilkan functional requirements (apa yang dilakukan sistem), non-functional requirements (seberapa baik sistem melakukannya — performa, keamanan, usability, dll.), business rules (batasan yang diberlakukan domain terlepas dari fitur tertentu), user stories (kebutuhan yang dibingkai dari perspektif pengguna, untuk keperluan backlog), dan acceptance criteria (kondisi konkret dan dapat diuji yang membuktikan bahwa setiap story atau requirement telah terpenuhi).

## Kapan Digunakan

Gunakan skill ini ketika:
- Pengguna memiliki temuan elisitasi (kebutuhan eksplisit/implisit, dari skill elicitation atau sumber lain) dan ingin mengubahnya menjadi requirements formal.
- Pengguna secara langsung meminta functional atau non-functional requirements, business rules, user stories, atau acceptance criteria untuk sebuah fitur atau sistem.
- Pengguna meminta "dokumen requirements," "spesifikasi," "SRS" (Software Requirements Specification), atau "PRD" (Product Requirements Document).
- Pengguna memiliki deskripsi fitur yang masih kasar dan ingin memecahnya menjadi stories dengan acceptance criteria untuk backlog.

JANGAN gunakan skill ini ketika pengguna menginginkan:
- Bantuan mendefinisikan masalah bisnis, stakeholder, atau scope dari sebuah inisiatif — itu adalah fase inception; skill ini mengasumsikan framing tersebut sudah ada atau diberikan secara inline.
- Bantuan merencanakan wawancara atau mengekstrak kebutuhan dari transkrip mentah — itu adalah fase elicitation; skill ini mengasumsikan kebutuhan sudah diketahui, dinyatakan, atau diberikan sebagai temuan elisitasi.
- Arsitektur, pilihan teknologi, model data, atau detail implementasi — skill ini menspesifikasikan perilaku dan batasan yang dapat diobservasi, bukan desain internal yang memenuhinya.

## Input

Kumpulkan atau minta sebanyak mungkin hal berikut sebelum menjalankan skill ini:

- **Kebutuhan sumber (source needs)**: temuan elisitasi (kebutuhan eksplisit/implisit), dokumen inception, atau deskripsi sederhana tentang apa yang diinginkan. Ini adalah bahan mentah yang harus dapat dirunut oleh setiap requirement.
- **Batas fitur atau sistem**: bagian mana dari sistem yang dicakup oleh spesifikasi ini, agar scope tidak melebar secara diam-diam.
- **Business rules yang sudah diketahui**: batasan domain yang ada terlepas dari fitur ini (misalnya batas regulasi, ambang batas persetujuan, aturan kalkulasi) — dari pengguna, dokumen sebelumnya, atau pengetahuan domain yang mereka konfirmasi.
- **Ekspektasi non-functional**: ekspektasi yang dinyatakan atau tersirat terkait performa, keamanan, ketersediaan, usability, kepatuhan (compliance) — bahkan yang diungkapkan secara informal sekalipun, untuk dipertajam menjadi bentuk yang terukur.
- **Preferensi format**: apakah pengguna ingin requirements klasik bergaya "shall," user stories ala Agile, atau keduanya? (Default ke keduanya jika tidak dispesifikasikan — lihat Format Output.)

## Konteks yang Diperlukan

Sebelum menyusun draf, baca dan pertimbangkan:
- **Dokumen Inception** mana pun yang dirujuk atau dihasilkan sebelumnya — tujuan dan scope menjadi jangkar untuk menentukan requirement mana yang termasuk dalam lingkup.
- **Temuan Elisitasi** mana pun yang dirujuk atau dihasilkan sebelumnya — setiap functional/non-functional requirement sebaiknya dapat dirunut ke kebutuhan eksplisit atau implisit (EN#/IN#) jika ada.
- **Spesifikasi atau backlog yang sudah ada** untuk sistem yang sama, agar requirement baru tidak menduplikasi, menomori ulang, atau secara diam-diam bertentangan dengan requirement yang sudah ada.

Jika tidak ada artefak inception atau elisitasi, lanjutkan hanya dengan menggunakan apa yang dinyatakan langsung oleh pengguna, dan catat di Status Dokumen bahwa requirements belum dirunut ke temuan upstream.

## Alur Kerja

1. **Inventarisasi kebutuhan sumber.** Daftar setiap kebutuhan berbeda dari materi yang diberikan (temuan elisitasi, tujuan inception, atau deskripsi sederhana pengguna). Catat mana yang bersifat functional (perilaku sistem), mana yang non-functional (atribut kualitas), dan mana yang merupakan aturan domain yang berdiri sendiri terlepas dari fitur tertentu.

2. **Susun functional requirements.** Untuk setiap kebutuhan functional, tulis satu atau lebih pernyataan requirement menggunakan frasa "Sistem harus..." (the system shall...), masing-masing dengan ID unik. Pastikan setiap requirement atomik — satu perilaku yang dapat diuji per requirement, bukan kalimat majemuk yang mencakup beberapa perilaku.

3. **Susun non-functional requirements.** Untuk setiap kebutuhan atribut kualitas, tulis requirement dengan ambang batas yang konkret dan terukur (misalnya waktu respons, jumlah pengguna konkuren, persentase uptime, standar enkripsi). Jika materi sumber hanya menyiratkan atribut kualitas secara samar ("harus cepat"), tulis requirement tersebut dengan ambang batas placeholder yang secara eksplisit ditandai sebagai perlu konfirmasi stakeholder — jangan pernah mengarang angka dan menyajikannya sebagai sudah disepakati.

4. **Susun business rules** secara terpisah dari functional requirements — rules adalah *batasan* yang harus ditegakkan atau dipatuhi sistem (misalnya "pengeluaran di atas $500 memerlukan approver kedua"), bukan tindakan yang dilakukan sistem atas inisiatifnya sendiri.

5. **Susun user stories dan acceptance criteria.** Untuk setiap functional requirement signifikan atau klaster requirements, tulis sebuah user story ("Sebagai [peran], saya ingin [tujuan], sehingga [manfaat]") dan pasangkan dengan acceptance criteria dalam bentuk Given/When/Then. Acceptance criteria harus cukup konkret sehingga seorang tester dapat menandainya pass/fail tanpa perlu interpretasi lebih lanjut.

6. **Jalankan quality checks** yang tercantum di bawah ini terhadap keseluruhan draf sebelum mempresentasikannya.

7. **Berhenti dan minta klarifikasi** jika kebutuhan sumber terlalu tipis, kontradiktif, atau tidak ada sehingga tidak dapat menspesifikasikan apa pun secara berarti (lihat Kondisi Kegagalan).

## Format Output

Selalu hasilkan satu dokumen Markdown tunggal menggunakan struktur ini:

```markdown
# Spesifikasi: [Nama Fitur/Sistem]

## 1. Functional Requirements
| ID | Requirement | Sumber |
|----|-------------|--------|
| FR-01 | Sistem harus ... | EN1 / IN2 / dinyatakan oleh pengguna |
| FR-02 | ... | ... |

## 2. Non-Functional Requirements
| ID | Requirement | Ukuran | Sumber |
|----|-------------|--------|--------|
| NFR-01 | Sistem harus ... | [ambang batas konkret, atau "perlu konfirmasi"] | ... |
| NFR-02 | ... | ... | ... |

## 3. Business Rules
| ID | Aturan | Sumber |
|----|--------|--------|
| BR-01 | [Batasan dinyatakan sebagai aturan, bukan tindakan] | ... |
| BR-02 | ... | ... |

## 4. User Stories & Acceptance Criteria

### US-01: [Judul singkat]
**Sebagai** [peran], **saya ingin** [tujuan], **sehingga** [manfaat].

Requirement terkait: [FR-#, NFR-#, BR-# sesuai relevansi]

**Acceptance Criteria:**
- AC-01.1: Given [konteks], When [tindakan], Then [hasil yang dapat diobservasi]
- AC-01.2: ...

### US-02: [Judul singkat]
...

## 5. Catatan Traceability
[Requirement mana pun yang tidak dapat dirunut ke kebutuhan sumber, dan alasannya — misalnya diturunkan dari sebuah business rule alih-alih dari kebutuhan yang dinyatakan]

## 6. Status Dokumen
[Satu baris tentang kelengkapan, misalnya: "Draf berdasarkan temuan elisitasi EN1-EN2, IN1-IN2. Ambang batas NFR-01 perlu konfirmasi stakeholder."]
```

Jika pengguna hanya meminta satu bagian saja (misalnya "tulis user stories saja"), hasilkan hanya bagian yang relevan — jangan menambah-nambah respons dengan bagian kosong yang tidak mereka minta. Jika pengguna tidak menentukan, sertakan semua bagian yang memiliki konten nyata.

## Aturan

- Jangan mengarang requirement, business rule, atau acceptance criterion yang tidak memiliki dasar dari kebutuhan yang diberikan, dokumen inception, atau instruksi eksplisit pengguna. Setiap requirement perlu sebuah Sumber.
- Gunakan ID requirement yang unik untuk setiap functional requirement (FR-##), non-functional requirement (NFR-##), business rule (BR-##), user story (US-##), dan acceptance criterion (AC-##.#). Jangan pernah menggunakan ulang atau melewatkan penomoran secara sembarangan.
- Pisahkan functional dan non-functional requirements dalam tabel yang berbeda. Requirement tentang *apa* yang dilakukan sistem adalah functional; requirement tentang *seberapa baik* sistem melakukannya (kecepatan, keamanan, reliabilitas, usability, skalabilitas, compliance) adalah non-functional. Jangan mencampur keduanya.
- Jangan gunakan kata-kata yang ambigu dan tidak terukur ("cepat," "aman," "ramah pengguna," "skalabel," "andal," "intuitif") dalam pernyataan requirement tanpa melampirkan ukuran konkret, atau secara eksplisit menandainya sebagai ukuran yang masih menunggu konfirmasi.
- Jangan menghasilkan requirement, story, atau acceptance criterion yang tidak dapat diuji atau diverifikasi. Jika sebuah kebutuhan tidak dapat dirumuskan menjadi sesuatu yang dapat diperiksa, tulis ulang sampai bisa, atau tandai di Catatan Traceability sebagai sesuatu yang perlu dipecah lebih lanjut.
- Jaga agar business rules tetap berbeda dari functional requirements: business rule adalah sebuah batasan atau kebijakan ("diskon tidak boleh melebihi 20% tanpa persetujuan manajer"); functional requirement adalah tindakan sistem ("sistem harus menerapkan kode diskon saat checkout"). Kebutuhan yang sama dapat menghasilkan keduanya.
- Acceptance criteria harus ditulis dalam istilah yang konkret dan dapat diobservasi (Given/When/Then atau yang setara) — jangan pernah hanya sebagai pengulangan requirement dengan kata-kata yang sedikit berbeda.

## Quality Checks

Sebelum mempresentasikan dokumen, verifikasi:
- **Complete (Lengkap)**: setiap kebutuhan functional dan non-functional yang teridentifikasi di langkah 1 memiliki setidaknya satu requirement, story, atau rule yang mencakupnya, atau secara eksplisit dicatat sebagai ditangguhkan (deferred).
- **Consistent (Konsisten)**: tidak ada dua requirement yang saling bertentangan; tidak ada business rule yang bertentangan dengan functional requirement; user stories tidak menyiratkan perilaku yang tidak ada dalam tabel functional requirements.
- **Unambiguous (Tidak ambigu)**: setiap requirement dan acceptance criterion adalah pernyataan yang tunggal, spesifik, dan atomik.
- **Testable (Dapat diuji)**: setiap requirement dan acceptance criterion dapat diubah menjadi test case pass/fail sebagaimana tertulis, tanpa perlu interpretasi lebih lanjut.
- **Traceable (Dapat dirunut)**: setiap requirement, rule, dan story mengutip kebutuhan sumber atau dicatat di Catatan Traceability jika tidak memilikinya.
- **Memiliki framing nilai bisnis**: klausa "sehingga" pada setiap user story menyatakan manfaat yang nyata, bukan pengulangan dari tujuan ("sehingga berfungsi" bukan sebuah manfaat).

Jika ada pemeriksaan yang gagal, perbaiki draf sebelum mempresentasikannya.

## Kondisi Kegagalan

Berhenti dan minta klarifikasi dari pengguna — daripada menghasilkan spesifikasi lengkap — ketika:
- **Tidak ada kebutuhan sumber, temuan elisitasi, atau deskripsi fitur sama sekali** (misalnya, pengguna mengatakan "tulis requirements" tanpa memberikan subjek apa pun). Tanyakan fitur atau sistem apa yang harus dicakup sebelum membuat draf.
- **Kebutuhan sumber secara langsung saling bertentangan** dengan cara yang akan memaksa spesifikasi untuk menegaskan dua perilaku yang tidak kompatibel (misalnya satu stakeholder membutuhkan auto-approval, stakeholder lain membutuhkan semua permintaan ditinjau manual, tanpa resolusi yang dinyatakan) — tanyakan mana yang otoritatif daripada memilih satu secara diam-diam.
- **Permintaan sebenarnya meminta desain atau arsitektur** (misalnya "buat spesifikasi skema database untuk ini") — klarifikasi bahwa skill ini mencakup spesifikasi behavioral/functional, bukan desain teknis, dan tanyakan apakah mereka ingin functional requirements yang mendasarinya terlebih dahulu.

JANGAN berhenti untuk kesenjangan biasa — ambang batas non-functional yang belum ada, business rule yang belum dikonfirmasi, atau fitur yang dideskripsikan sebagian adalah hal normal pada fase ini dan harus ditandai dalam requirement itu sendiri ("perlu konfirmasi") atau di Catatan Traceability, bukan diperlakukan sebagai penghalang (blocker). Patokan untuk berhenti adalah "tidak ada kebutuhan nyata untuk dispesifikasikan, atau kebutuhan-kebutuhan tersebut tidak dapat direkonsiliasi," bukan "ada beberapa detail yang belum dikonfirmasi."

## Contoh Pemanggilan (Invocation)

> "Berikut temuan elisitasi untuk tool persetujuan pengeluaran: EN1 (approver perlu semua permintaan pending dalam satu tempat), EN2 (notifikasi approver saat pengajuan), IN1 (perlu menolak dengan alasan), IN2 (perlu riwayat audit). Bisakah Anda mengubah ini menjadi spesifikasi dengan user stories dan acceptance criteria?"

## Contoh Output yang Diharapkan

```markdown
# Spesifikasi: Tool Persetujuan Pengeluaran

## 1. Functional Requirements
| ID | Requirement | Sumber |
|----|-------------|--------|
| FR-01 | Sistem harus menampilkan semua permintaan pengeluaran yang pending dalam satu daftar untuk approver. | EN1 |
| FR-02 | Sistem harus memberi notifikasi kepada approver yang ditugaskan ketika permintaan pengeluaran baru diajukan. | EN2 |
| FR-03 | Sistem harus mengizinkan approver untuk menolak permintaan dan mewajibkan pengisian alasan. | IN1 |
| FR-04 | Sistem harus mencatat approver, keputusan, dan timestamp untuk setiap persetujuan atau penolakan. | IN2 |

## 2. Non-Functional Requirements
| ID | Requirement | Ukuran | Sumber |
|----|-------------|--------|--------|
| NFR-01 | Sistem harus mengirimkan notifikasi pengajuan kepada approver secara cepat. | Ambang batas belum ditentukan — perlu konfirmasi | EN2 (tersirat) |

## 3. Business Rules
| ID | Aturan | Sumber |
|----|--------|--------|
| BR-01 | Permintaan yang ditolak harus menyertakan alasan sebelum dapat diajukan ulang. | IN1 |

## 4. User Stories & Acceptance Criteria

### US-01: Meninjau permintaan yang pending
**Sebagai** approver, **saya ingin** melihat semua permintaan pengeluaran yang pending dalam satu tempat, **sehingga** saya tidak perlu melacak formulir kertas untuk mengetahui apa yang memerlukan perhatian saya.

Requirement terkait: FR-01

**Acceptance Criteria:**
- AC-01.1: Given saya login sebagai approver, When saya membuka tampilan persetujuan, Then saya melihat setiap permintaan yang sedang menunggu keputusan saya.
- AC-01.2: Given sebuah permintaan sudah disetujui atau ditolak, When saya melihat daftar persetujuan, Then permintaan tersebut tidak muncul dalam daftar pending.

### US-02: Menolak permintaan dengan alasan
**Sebagai** approver, **saya ingin** menolak permintaan dan menyatakan alasannya, **sehingga** pemohon mengetahui apa yang harus diperbaiki.

Requirement terkait: FR-03, BR-01

**Acceptance Criteria:**
- AC-02.1: Given sebuah permintaan pending, When saya memilih untuk menolaknya, Then saya diwajibkan memasukkan alasan sebelum penolakan disimpan.
- AC-02.2: Given sebuah permintaan telah ditolak, When pemohon melihatnya, Then mereka melihat alasan yang diberikan.

## 5. Catatan Traceability
NFR-01 tidak memiliki ambang batas numerik yang dinyatakan dalam temuan
elisitasi; ambang batas ini diturunkan dari urgensi yang tersirat pada EN2
dan perlu konfirmasi stakeholder.

## 6. Status Dokumen
Draf berdasarkan temuan elisitasi EN1, EN2, IN1, IN2. Ambang batas NFR-01 dan
kebutuhan non-functional tambahan lainnya (keamanan, periode retensi audit)
masih memerlukan konfirmasi.
```
