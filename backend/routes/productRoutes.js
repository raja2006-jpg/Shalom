import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

/* GET ALL */
router.get("/", async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
});

/* ADD */
router.post("/", async (req, res) => {
  const product = await Product.create(req.body);
  res.json(product);
});

/* DELETE */
router.delete("/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

export default router;
