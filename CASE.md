# Campus Service Request and Maintenance System

## 1. Deskripsi Umum

Aplikasi ini digunakan oleh mahasiswa atau dosen untuk melaporkan masalah fasilitas kampus. Contoh masalah yang dapat dilaporkan antara lain:

- Proyektor rusak
- Internet bermasalah
- AC tidak dingin
- Kursi rusak
- Alat laboratorium bermasalah
- Ruangan kotor

Laporan yang masuk akan diperiksa oleh **Administrator**. Setelah diperiksa, laporan diberikan kepada **Teknisi** untuk ditangani. Teknisi akan memperbarui progres pekerjaan sampai pekerjaan tersebut selesai. Pelapor dapat memantau perkembangan laporan dan memberikan konfirmasi atas hasil pekerjaan. Administrator kemudian menutup laporan setelah dikonfirmasi.

---

## 2. Aktor dan Fitur Sistem

### 2.1 Aktor Sistem

| Aktor | Apa yang Dapat Dilakukan |
|---|---|
| **Pelapor** | Membuat laporan, melihat status, menambahkan komentar, dan mengonfirmasi hasil. |
| **Administrator** | Memeriksa laporan, menentukan kategori dan prioritas, menugaskan teknisi, serta menutup laporan. |
| **Teknisi** | Melihat tugas, menerima tugas, memperbarui progres, dan menandai pekerjaan selesai. |
| **Manajer Fasilitas** | Melihat dashboard dan laporan ringkas. |

### 2.2 Fitur Wajib

1. Membuat laporan baru.
2. Melihat daftar laporan.
3. Mencari dan menyaring laporan.
4. Melihat detail laporan.
5. Memeriksa laporan.
6. Menentukan prioritas.
7. Menugaskan teknisi.
8. Mengubah status pekerjaan.
9. Menambahkan komentar atau catatan.
10. Menyimpan riwayat status.
11. Menutup atau membuka kembali laporan.
12. Menampilkan dashboard sederhana.

### 2.3 Alur Sistem

```
Submitted
   ↓
Under Review
   ↓
Assigned
   ↓
In Progress
   ↓
Resolved
   ↓
Closed
```

| Status | Keterangan |
|---|---|
| **Submitted** | Laporan baru dibuat oleh Pelapor. |
| **Under Review** | Laporan sedang diperiksa oleh Administrator. |
| **Assigned** | Laporan telah ditugaskan kepada Teknisi. |
| **In Progress** | Teknisi sedang mengerjakan perbaikan. |
| **Resolved** | Pekerjaan telah selesai, menunggu konfirmasi Pelapor. |
| **Closed** | Laporan ditutup oleh Administrator setelah dikonfirmasi. |

---