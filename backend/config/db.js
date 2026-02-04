import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://rajasiddharthrajasiddharth_db_user:rajasiddharth2006@cluster0.jajcrhl.mongodb.net/shalom_systems"
    );
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ DB Error:", err.message);
  }
};
