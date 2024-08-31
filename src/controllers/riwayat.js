const Riwayat = require("../models/riwayat");

// buat riwayat dengan cron jika user belum pernah ada riwayat
exports.buatRiwayat = async (req, res) => {
  try {
    const buatRiwayatBaru = new Riwayat(req.body);
    const simpanRiwayatBaru = await buatRiwayatBaru.save();
    res.status(200).json({
      message: "Riwayat berhasil dibuat",
      simpanRiwayatBaru,
    });
  } catch (error) {
    res.status(200).json(error);
  }
};

// get semua
exports.getSemuaRiwayat = async (req, res) => {
  try {
    const getSemua = await Riwayat.find();
    res.status(200).json(getSemua);
  } catch (error) {
    res.status(200).json(error);
  }
};

// get satu riwayat
exports.getSatuRiwayat = async (req, res) => {
  try {
    const getSatu = await Riwayat.findById(req.params.id);
    res.status(200).json(getSatu);
  } catch (error) {
    res.status(200).json(error);
  }
};

// edit riwayat menggunakan cron jika user sudah mempunyai riwayat
exports.editRiwayat = async (req, res) => {
  try {
    const temukanDanUpdate = await Riwayat.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          riwayatKonsumsi: req.body.konsumsiProduk,
        },
        $set: {
          riwayatKonsumsiGula: req.body.totalGula,
        },
      },
      {
        new: true,
      }
    );
    res.status(200).json(temukanDanUpdate);
  } catch (error) {
    res.status(200).json(error);
  }
};
