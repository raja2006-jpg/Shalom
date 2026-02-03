import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import productRoutes from "./routes/productRoutes.js";
import inquiryRoutes from "./routes/inquiryRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

/* ================= LOAD ENV ================= */
dotenv.config();

/* ================= APP ================= */
const app = express();

/* ================= DEBUG ENV (REMOVE LATER) ================= */
console.log("MONGO_URI =", process.env.MONGO_URI);

/* ================= MIDDLEWARE ================= */
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001"
    ], // Next.js dev ports
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));

/* ================= HEALTH CHECK ================= */
app.get("/", (req, res) => {
  res.status(200).send("🚀 Shalom Backend Running");
});

/* ================= API ROUTES ================= */
app.use("/api/products", productRoutes);
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/admin", adminRoutes);

/* ================= START SERVER ================= */
const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing in .env file");
    }

    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000
    });

    console.log("✅ MongoDB Connected Successfully");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
}

startServer();
