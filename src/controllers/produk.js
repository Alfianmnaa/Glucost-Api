const Produk = require("../models/produk");

// create Produk
exports.buatProduk = async (req, res) => {
  try {
    const produkBaru = new Produk(req.body);
    const simpanProduk = await produkBaru.save();
    res.status(200).json({
      message: "Produk berhasil dibuat",
      data: simpanProduk,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// get all
exports.getAllProduk = async (req, res) => {
  try {
    const { search, kategori, rentang, urutkan } = req.query;

    const query = {};
    const sort = {};

    // Search by name of the product
    if (search) {
      query.namaProduk = { $regex: search, $options: "i" };
    }

    if (kategori) {
      query.kategori = kategori;
    }

    if (rentang) {
      if (rentang === "rendah") {
        query.rasioGula = { $lt: 5 };
      } else if (rentang === "sedang") {
        query.rasioGula = { $gte: 5, $lt: 10 };
      } else if (rentang === "tinggi") {
        query.rasioGula = { $gte: 10 };
      }
    }

    // Sort by sugar ratio
    if (urutkan === "terendah") {
      sort.rasioGula = 1; // Ascending order
    } else if (urutkan === "tertinggi") {
      sort.rasioGula = -1; // Descending order
    }

    const getSemua = await Produk.find(query).sort(sort);

    res.status(200).json(getSemua);
  } catch (error) {
    res.status(500).json(error);
  }
};

// with pagination
exports.getSemuaProduk = async (req, res) => {
  try {
    const { search, kategori, rentang, urutkan, page = 1, limit = 6 } = req.query;

    const query = {};
    const sort = {};

    // Search by name of the product
    if (search) {
      query.namaProduk = { $regex: search, $options: "i" };
    }

    if (kategori) {
      query.kategori = kategori;
    }

    if (rentang) {
      if (rentang === "rendah") {
        query.rasioGula = { $lt: 5 };
      } else if (rentang === "sedang") {
        query.rasioGula = { $gte: 5, $lt: 10 };
      } else if (rentang === "tinggi") {
        query.rasioGula = { $gte: 10 };
      }
    }

    // Sort by sugar ratio
    if (urutkan === "terendah") {
      sort.rasioGula = 1; // Ascending order
    } else if (urutkan === "tertinggi") {
      sort.rasioGula = -1; // Descending order
    }

    const skip = (page - 1) * limit;
    const totalItems = await Produk.countDocuments(query);
    const getSemua = await Produk.find(query).sort(sort).skip(skip).limit(parseInt(limit));

    res.status(200).json({
      products: getSemua,
      currentPage: page,
      totalPages: Math.ceil(totalItems / limit),
      totalItems: totalItems,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// exports.getSemuaProduk = async (req, res) => {
//   try {
//     const { search, kategori, rentang, urutkan, page = 1, limit = 2 } = req.query;

//     const query = {};
//     const sort = {};

//     // Search by name of the product
//     if (search) {
//       query.namaProduk = { $regex: search, $options: "i" };
//     }

//     if (kategori) {
//       query.kategori = kategori;
//     }

//     if (rentang) {
//       if (rentang === "rendah") {
//         query.rasioGula = { $lt: 5 };
//       } else if (rentang === "sedang") {
//         query.rasioGula = { $gte: 5, $lt: 10 };
//       } else if (rentang === "tinggi") {
//         query.rasioGula = { $gte: 10 };
//       }
//     }

//     // Sort by sugar ratio
//     if (urutkan === "terendah") {
//       sort.rasioGula = 1; // Ascending order
//     } else if (urutkan === "tertinggi") {
//       sort.rasioGula = -1; // Descending order
//     }

//     const skip = (page - 1) * limit;

//     const getSemua = await Produk.find(query).sort(sort).skip(skip).limit(parseInt(limit));

//     const totalDocuments = await Produk.countDocuments(query);
//     const totalPages = Math.ceil(totalDocuments / limit);

//     res.status(200).json({
//       data: getSemua,
//       currentPage: page,
//       totalPages,
//     });
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

// get satu produk
exports.getSatuProduk = async (req, res) => {
  try {
    const getSatu = await Produk.findById(req.params.id);
    res.status(200).json(getSatu);
  } catch (error) {
    res.status(500).json(error);
  }
};

// update produk
exports.editProduk = async (req, res) => {
  try {
    const temukanDanUpdate = await Produk.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json({
      message: "Produk Berhasil diubah",
      temukanDanUpdate,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

//  hapus produk
exports.hapusProduk = async (req, res) => {
  try {
    await Produk.findByIdAndDelete(req.params.id);
    res.status(200).json("Produk Berhasil dihapus");
  } catch (error) {
    res.status(500).json(error);
  }
};

//  simpan produk
exports.simpanProduk = async (req, res) => {
  try {
    const simpan = await Produk.findByIdAndUpdate(
      req.params.id,
      { $push: { disimpan: req.body.userId } }, // userId harus dikirim dalam body request
      { new: true }
    );

    res.status(200).json({
      message: "Produk berhasil disimpan",
      simpan,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// unsave
exports.handleUnsave = async (req, res) => {
  try {
    const unsave = await Produk.findByIdAndUpdate(
      req.params.id,
      { $pull: { disimpan: req.body.userId } }, // userId harus dikirim dalam body request
      { new: true }
    );

    res.status(200).json({
      message: "Produl berhasil di unsave",
      unsave,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
