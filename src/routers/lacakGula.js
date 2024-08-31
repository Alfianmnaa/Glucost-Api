const express = require("express");
const router = express.Router();
const lacakGulaController = require("../controllers/lacakGula");

// buat lacak
router.post("/create", lacakGulaController.buatLacakGula);

// get lacak
router.get("/get/:id", lacakGulaController.getSatuLacak);

// get lacak
router.get("/getall", lacakGulaController.getSemuaLacak);

// edit lacak gula
router.put("/update/:id", lacakGulaController.editLacak);

// hapus lacak
router.delete("/delete/:id", lacakGulaController.hapusLacakGula);

// Hapus produk dari Lacak Gula
router.put("/update/:id/hapusProduk/:produkId", lacakGulaController.hapusProdukDariLacak);

module.exports = router;
