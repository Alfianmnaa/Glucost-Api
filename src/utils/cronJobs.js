// const cron = require("node-cron");
// const Lacak = require("../models/lacakGula");

// // Menjalankan tugas setiap hari pada jam 08:30 pagi
// cron.schedule("37 8 * * *", async () => {
//   try {
//     await Lacak.updateMany(
//       {},
//       {
//         $set: {
//           konsumsiProduk: [], // Mengatur konsumsiProduk menjadi array kosong
//           konsumsiGula: 0, // Mengatur konsumsiGula menjadi 0
//         },
//       }
//     );
//     console.log("Data konsumsi gula harian telah direset pada jam 08:36 pagi.");
//   } catch (error) {
//     console.error("Error saat mereset data konsumsi gula:", error);
//   }
// });
const cron = require("node-cron");
const Lacak = require("../models/lacakGula");
const Riwayat = require("../models/riwayat");

// Menjalankan tugas setiap hari pada jam 08:30 pagi
cron.schedule("05 20 * * *", async () => {
  try {
    const lacakGulaData = await Lacak.find({});

    for (let lacak of lacakGulaData) {
      // Hitung total gula dari konsumsiProduk
      const totalGula = lacak.konsumsiProduk.reduce((acc, produk) => acc + produk.totalGula, 0);

      // Cari riwayat yang sesuai dengan userId dari lacakGulaUid
      let riwayat = await Riwayat.findOne({ riwayatUid: lacak.lacakGulaUid });

      if (!riwayat) {
        // Jika tidak ada riwayat, buat yang baru
        riwayat = new Riwayat({
          riwayatUid: lacak.lacakGulaUid,
          riwayatKonsumsi: [lacak.konsumsiProduk],
          riwayatKonsumsiGula: totalGula,
        });
      } else {
        // Jika sudah ada riwayat, update riwayat yang ada
        riwayat.riwayatKonsumsi.push(lacak.konsumsiProduk);
        riwayat.riwayatKonsumsiGula += totalGula;
      }

      await riwayat.save();

      // Reset data konsumsi di Lacak Gula
      await Lacak.findByIdAndUpdate(lacak._id, {
        konsumsiProduk: [],
        konsumsiGula: 0,
      });
    }

    console.log("Data riwayat berhasil diupdate dan data konsumsi gula harian telah direset.");
  } catch (error) {
    console.error("Error saat mengupdate riwayat dan mereset data konsumsi gula:", error);
  }
});
