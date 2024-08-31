const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Produk = new Schema(
  {
    namaProduk: {
      type: String,
      required: true,
    },
    fotoProduk: {
      type: String,
      required: true,
    },
    kategori: {
      type: String,
      required: true,
    },
    volumeBerat: {
      type: Number,
      required: true,
    },
    takaranSaji: {
      type: Number,
      required: true,
    },
    gula: {
      type: Number,
      required: true,
    },
    totalGula: {
      type: Number,
      required: true,
    },
    rasioGula: {
      type: Number,
      required: true,
    },
    disimpan: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Produk", Produk);
