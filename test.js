// const produk = [
//   {
//     produkId: 1,
//     namaProduk: "susu",
//   },
//   {
//     produkId: 2,
//     namaProduk: "milo",
//   },
// ];

// const hasil = produk.find((item) => item.produkId == 2);
// console.log(hasil);
var date = new Date();
var tahun = date.getFullYear();
var bulan = date.getMonth();
var tanggal = date.getDate();
var hari = date.getDay();
var jam = date.getHours();
var menit = date.getMinutes();
var detik = date.getSeconds();
switch (hari) {
  case 0:
    hari = "Minggu";
    break;
  case 1:
    hari = "Senin";
    break;
  case 2:
    hari = "Selasa";
    break;
  case 3:
    hari = "Rabu";
    break;
  case 4:
    hari = "Kamis";
    break;
  case 5:
    hari = "Jum'at";
    break;
  case 6:
    hari = "Sabtu";
    break;
}
switch (bulan) {
  case 0:
    bulan = "Januari";
    break;
  case 1:
    bulan = "Februari";
    break;
  case 2:
    bulan = "Maret";
    break;
  case 3:
    bulan = "April";
    break;
  case 4:
    bulan = "Mei";
    break;
  case 5:
    bulan = "Juni";
    break;
  case 6:
    bulan = "Juli";
    break;
  case 7:
    bulan = "Agustus";
    break;
  case 8:
    bulan = "September";
    break;
  case 9:
    bulan = "Oktober";
    break;
  case 10:
    bulan = "November";
    break;
  case 11:
    bulan = "Desember";
    break;
}
var tampilTanggal = "Tanggal: " + hari + ", " + tanggal + " " + bulan + " " + tahun;
var tampilWaktu = "Jam: " + jam + ":" + menit + ":" + detik;
console.log(tampilTanggal);
console.log(tampilWaktu);
// const produkId = Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
// console.log(produkId);
// const updateQueryParams = () => {
//   const params = new URLSearchParams();

//   if (searchTerm) params.set("search", searchTerm);
//   if (kategoriDipilih) params.set("kategori", kategoriDipilih);
//   if (rentangDipilih) params.set("rentang", rentangDipilih === "Rendah" ? "rendah" : rentangDipilih === "Sedang" ? "sedang" : "tinggi");
//   if (urutanDipilih) params.set("urutkan", urutanDipilih === "Gula Terendah" ? "terendah" : "tertinggi");

//   navigate(`/semua/produk?${params.toString()}`);
// };

// // Panggil updateQueryParams setiap kali parameter berubah
// useEffect(() => {
//   updateQueryParams();
// }, [kategoriDipilih, rentangDipilih, urutanDipilih, searchTerm]);
// const params = {
//   search: searchTerm,
//   kategori: kategoriDipilih,
//   rentang: rentangDipilih === "Rendah" ? "rendah" : rentangDipilih === "Sedang" ? "sedang" : rentangDipilih === "Tinggi" ? "tinggi" : undefined,
//   urutkan: urutanDipilih === "Gula Terendah" ? "terendah" : urutanDipilih === "Gula Tertinggi" ? "tertinggi" : undefined,
// };
