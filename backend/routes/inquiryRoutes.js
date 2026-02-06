import express from "express";
import Inquiry from "../models/Inquiry.js";
import { Resend } from "resend";

const router = express.Router();

const resend = new Resend(process.env.RESEND_API_KEY);

/* ADD */
router.post("/", async (req, res) => {
  try {
    // Save inquiry first
    const inquiry = await Inquiry.create(req.body);

    try {
      await resend.emails.send({
        from: "Shalom Website <onboarding@resend.dev>",
        to: process.env.ADMIN_EMAIL,
        subject: "New Inquiry Received - Shalom Website",
        html: `
          <h2>New Customer Inquiry</h2>

          <p><b>Name:</b> ${req.body.name}</p>
          <p><b>Phone:</b> ${req.body.phone}</p>
          <p><b>Product:</b> ${req.body.product}</p>
          <p><b>Message:</b> ${req.body.message || "No message"}</p>
          <p><b>Price:</b> ₹${req.body.price}</p>
          


          ${
            req.body.image
              ? `
                <h3>Selected Product</h3>
                <img src="${req.body.image}" 
                     alt="Product Image" 
                     style="width:250px;border-radius:10px;border:1px solid #ddd;" />
              `
              : ""
          }
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
