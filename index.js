const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./src/routers/auth");
const userRoutes = require("./src/routers/user");
const jenisRoutes = require("./src/routers/jenisKategori");
const produkRoutes = require("./src/routers/produk");
const lacakGulaRoutes = require("./src/routers/lacakGula");
const riawayatRoutes = require("./src/routers/riwayat");

// konfigurasi library
dotenv.config();
app.use(bodyParser.json());
app.use(express.json());

const corsOption = {
  origin: ["https://glucostdashboard.netlify.app", "https://glucostdashboard.netlify.app/", "http://localhost:5173", "http://localhost:3000", "http://localhost:4000"],
  credentials: true,
};

app.use(cors(corsOption));
app.use(cookieParser());

// konfigurasi router
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/jenis", jenisRoutes);
app.use("/produk", produkRoutes);
app.use("/lacak", lacakGulaRoutes);
app.use("/riwayat", riawayatRoutes);

// Import cron jobs
require("./src/utils/cronJobs");

app.get("/", (req, res) => {
  res.send("hallo from " + req.path);
});

const PORT = process.env.PORT;
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("Berhasil terhubung ke glucost mongo"))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log("server running on port " + PORT);
});
