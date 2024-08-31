const User = require("../models/auth");
// hash password
const bcrypt = require("bcrypt");
// token jwt
const jwt = require("jsonwebtoken");

exports.userRegistrasi = async (req, res) => {
  try {
    const { username, email, password, namaLengkap, fotoProfil, jenisKelamin } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);
    const userBaru = new User({ username, email, password: hashedPassword, namaLengkap, fotoProfil, jenisKelamin });
    const simpanUser = await userBaru.save();
    res.status(200).json({
      message: "user berhasil registrasi",
      simpanUser,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// user masuk
exports.userMasuk = async (req, res) => {
  try {
    const temukanUser = await User.findOne({ username: req.body.username });
    if (!temukanUser) {
      return res.status(404).json("User not found!");
    }

    const match = await bcrypt.compare(req.body.password, temukanUser.password);
    if (!match) {
      return res.status(401).json("Wrong credentials!");
    }

    const token = jwt.sign({ _id: temukanUser._id, username: temukanUser.username, email: temukanUser.email }, process.env.SECRET, { expiresIn: "3d" });
    const { password, ...info } = temukanUser._doc;
    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true, // Hanya diaktifkan di mode produksi (HTTPS)
      })
      .status(200)
      .json(info);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// user keluar
exports.userLogout = async (req, res) => {
  try {
    res.clearCookie("token", { sameSite: "none", secure: true }).status(200).send("User logged out successfully!");
  } catch (err) {
    res.status(500).json(err);
  }
};

// user refetch
exports.userRefetch = (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Token not found. Please log in." });
  }

  jwt.verify(token, process.env.SECRET, {}, (err, data) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token." });
    }
    res.status(200).json(data);
  });
};
