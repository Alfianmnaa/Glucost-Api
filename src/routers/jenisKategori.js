const express = require("express");
const router = express.Router();
const jenisController = require("../controllers/jenisKategori");

router.post("/create", jenisController.buatJenis);
router.get("/get/:id", jenisController.getSatuJenis);
router.get("/getall", jenisController.getSemuaJenis);
router.put("/update/:id", jenisController.editJenis);
router.delete("/delete/:id", jenisController.hapusJenis);

module.exports = router;
