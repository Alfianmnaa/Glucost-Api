const User = require("../models/auth");

// get one
exports.getUser = async (req, res) => {
  try {
    const getOneUser = await User.findById(req.params.id);
    res.status(200).json(getOneUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

// get all
exports.getAllUsers = async (req, res) => {
  try {
    const getAll = await User.find();
    res.status(200).json(getAll);
  } catch (error) {
    res.status(500).json(error);
  }
};

// update user
exports.updateUser = async (req, res) => {
  try {
    const temukanDanUpdate = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(temukanDanUpdate);
  } catch (error) {
    res.status(500).json(error);
  }
};

// delete account
exports.hapusAkun = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User Berhasil Dihapus");
  } catch (error) {
    res.status(500).json(error);
  }
};
