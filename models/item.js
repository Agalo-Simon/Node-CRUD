const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, message: "Name is required",
    },
    description: {
      type: String,
      required: true, message: "Description is required",
    },
    price: {
      type: Number,  
      required: true, message: "Price is required", 
      default: 0,
      min: [0, "Price must be a positive number"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", itemSchema);