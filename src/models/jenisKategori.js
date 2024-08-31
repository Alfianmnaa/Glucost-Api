const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Jenis = new Schema(
  {
    namaJenis: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Jenis", Jenis);
