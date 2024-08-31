const Jenis = require("../models/jenisKategori");

exports.buatJenis = async (req, res) => {
  try {
    const jenisBaru = new Jenis(req.body);
    const simpanJenis = await jenisBaru.save();
    res.status(200).json({
      message: "Jenis Kategori Berhasil dibuat",
      simpanJenis,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// get one
exports.getSatuJenis = async (req, res) => {
  try {
    const getOne = await Jenis.findById(req.params.id);
    res.status(200).json(getOne);
  } catch (error) {
    res.status(500).json(err);
  }
};

// get all
exports.getSemuaJenis = async (req, res) => {
  try {
    const getAll = await Jenis.find();
    res.status(200).json(getAll);
  } catch (error) {
    res.status(500).json(error);
  }
};

// update user
exports.editJenis = async (req, res) => {
  try {
    const temukanDanUpdate = await Jenis.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json({
      message: "Jenis Berhasil diubah",
      temukanDanUpdate,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// delete account
exports.hapusJenis = async (req, res) => {
  try {
    await Jenis.findByIdAndDelete(req.params.id);
    res.status(200).json("Jenis Berhasil Dihapus");
  } catch (error) {
    res.status(500).json(error);
  }
};
