const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;

    // Check if URI is loaded properly
    if (!uri) {
      throw new Error("MONGO_URI environment variable is not defined.");
    }

    // Attempt connection
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`DB ERROR: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};


module.exports = connectDB;