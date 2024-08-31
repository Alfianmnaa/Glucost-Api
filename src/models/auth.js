const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    namaLengkap: {
      type: String,
      default: "",
    },
    fotoProfil: {
      type: String,
      default: "",
    },
    jenisKelamin: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", User);
