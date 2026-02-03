import express from "express";

const router = express.Router();

/**
 * TEMP ADMIN LOGIN
 * (Later we replace with JWT)
 */
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "shalom" && password === "shalom2026") {
    return res.json({
      success: true,
      message: "Admin login successful"
    });
  }

  res.status(401).json({
    success: false,
    message: "Invalid admin credentials"
  });
});

export default router;
