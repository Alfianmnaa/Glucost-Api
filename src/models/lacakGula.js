const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LacakGula = new Schema(
  {
    lacakGulaUid: {
      type: String,
      required: true,
      unique: true,
    },
    konsumsiProduk: {
      type: Array,
      default: [],
    },
    konsumsiGula: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Lacak Gula", LacakGula);
