const express = require("express");
const router = express.Router();
const riwayatController = require("../controllers/riwayat");
const riwayat = require("../models/riwayat");

// buat riwayat
router.post("/create", riwayatController.buatRiwayat);

// get semua riwayat
router.get("/getall", riwayatController.getSemuaRiwayat);

// get satu riwayat
router.get("/get/:id", riwayatController.getSatuRiwayat);

// edit riwayat
router.put("/update/:id", riwayatController.editRiwayat);

module.exports = router;
