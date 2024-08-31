const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Riwayat = new Schema(
  {
    riwayatUid: {
      type: String,
      required: true,
      unique: true,
    },
    riwayatKonsumsi: {
      type: Array,
      default: [],
    },
    riwayatKonsumsiGula: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Riwayat", Riwayat);
