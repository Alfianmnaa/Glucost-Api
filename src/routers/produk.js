const express = require("express");
const router = express.Router();
const produkController = require("../controllers/produk");

// create
router.post("/create", produkController.buatProduk);

// get semua produk
router.get("/getsemua", produkController.getAllProduk);

// get semua produk
router.get("/getall", produkController.getSemuaProduk);

// get satu produk
router.get("/get/:id", produkController.getSatuProduk);

// edit produk
router.put("/update/:id", produkController.editProduk);

// hapus produk
router.delete("/delete/:id", produkController.hapusProduk);

// simpan produk
router.patch("/save/:id", produkController.simpanProduk);

// unsave
router.patch("/unsave/:id", produkController.handleUnsave);

module.exports = router;
