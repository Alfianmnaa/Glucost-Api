const Lacak = require("../models/lacakGula");

// create Lacak Gula
exports.buatLacakGula = async (req, res) => {
  try {
    const buatLacak = new Lacak(req.body);
    const simpanLacak = await buatLacak.save();
    res.status(200).json({
      message: "Lacak Gula berhasil dibuat!",
      simpanLacak,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// get semua lacak
exports.getSemuaLacak = async (req, res) => {
  try {
    const getSemua = await Lacak.find();
    res.status(200).json(getSemua);
  } catch (error) {
    res.status(500).json(error);
  }
};

// get satu
exports.getSatuLacak = async (req, res) => {
  try {
    const getSatu = await Lacak.findById(req.params.id);
    res.status(200).json(getSatu);
  } catch (error) {
    res.status(500).json(error);
  }
};

// update lacak
exports.editLacak = async (req, res) => {
  try {
    const temukanDanUpdate = await Lacak.findByIdAndUpdate(
      req.params.id,
      {
        $push: { konsumsiProduk: req.body.konsumsiBaru },
        $inc: { konsumsiGula: req.body.gulaTambahan },
      },
      { new: true }
    );

    res.status(200).json({
      message: "Lacak Berhasil diedit",
      temukanDanUpdate,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// hapus lacak
exports.hapusLacakGula = async (req, res) => {
  try {
    await Lacak.findByIdAndDelete(req.params.id);
    res.status(200).json("Lacak Gula Berhasil dihapus");
  } catch (error) {
    res.status(500).json(error);
  }
};

// hapus konsumsi spesifik
exports.hapusProdukDariLacak = async (req, res) => {
  try {
    const { id, produkId } = req.params;

    const temukanDanUpdate = await Lacak.findByIdAndUpdate(
      id,
      {
        $pull: { konsumsiProduk: { produkId: produkId } },
      },
      { new: true }
    );

    if (temukanDanUpdate) {
      // Update konsumsiGula setelah penghapusan produk
      const konsumsiGulaBaru = temukanDanUpdate.konsumsiProduk.reduce((acc, curr) => acc + curr.totalGula, 0);
      temukanDanUpdate.konsumsiGula = konsumsiGulaBaru;
      await temukanDanUpdate.save();

      res.status(200).json({
        message: "Produk berhasil dihapus dari Lacak Gula",
        temukanDanUpdate,
      });
    } else {
      res.status(404).json({ message: "Lacak Gula tidak ditemukan" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
