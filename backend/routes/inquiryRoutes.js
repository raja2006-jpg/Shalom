import express from "express";
import Inquiry from "../models/Inquiry.js";

const router = express.Router();

/* ADD */
router.post("/", async (req, res) => {
  const inquiry = await Inquiry.create(req.body);
  res.json(inquiry);
});

/* GET ALL */
router.get("/", async (req, res) => {
  const inquiries = await Inquiry.find().sort({ createdAt: -1 });
  res.json(inquiries);
});

/* CLEAR ALL */
router.delete("/", async (req, res) => {
  await Inquiry.deleteMany();
  res.json({ success: true });
});

export default router;
