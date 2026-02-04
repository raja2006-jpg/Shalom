import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    type: {
      type: String,
      required: true,
      trim: true
    },

    price: {
      type: String,
      required: true,
      min: 0
    },

    description: {
      type: String,
      required: true,
      trim: true
    },

    availability: {
      type: String,
      enum: ["Available", "Out of Stock"],
      default: "Available"
    },

    image: {
      type: String, // base64 / cloud URL
      required: true
    }
  },
  {
    timestamps: true // automatically adds createdAt & updatedAt
  }
);

export default mongoose.model("Product", productSchema);
