import express from "express";
import Inquiry from "../models/Inquiry.js";
import nodemailer from "nodemailer";

const router = express.Router();

/* EMAIL CONFIG */
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

/* VERIFY SMTP */
transporter.verify((error, success) => {
  if (error) {
    console.log("Email config error:", error);
  } else {
    console.log("Email server ready");
  }
});

/* ADD */
router.post("/", async (req, res) => {
  try {
    const inquiry = await Inquiry.create(req.body);

    try {
      await transporter.sendMail({
        from: `"Shalom Website" <${process.env.EMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL,
        subject: "📩 New Inquiry Received",
        html: `
          <h3>New Inquiry Received</h3>
          <p><b>Name:</b> ${req.body.name}</p>
          <p><b>Phone:</b> ${req.body.phone}</p>
          <p><b>Product:</b> ${req.body.product}</p>
          <p><b>Message:</b> ${req.body.message || "No message"}</p>
        `
      });

      console.log("Email sent successfully");

    } catch (mailErr) {
      console.log("Email failed but inquiry saved:", mailErr.message);
    }

    res.json(inquiry);

  } catch (err) {
    console.error("Inquiry Error:", err);
    res.status(500).json({ error: "Failed to save inquiry" });
  }
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
