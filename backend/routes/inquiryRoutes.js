import express from "express";
import Inquiry from "../models/Inquiry.js";
import nodemailer from "nodemailer";

const router = express.Router();

/* EMAIL CONFIG (Render-friendly) */
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

/* ADD */
router.post("/", async (req, res) => {
  try {
    // Save inquiry
    const inquiry = await Inquiry.create(req.body);

    // Send email
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

export default router;
