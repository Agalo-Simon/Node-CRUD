require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
// const itemRoutes = require("./route/itemRoutes");


const app = express();
app.use(express.urlencoded({ extended: true }));


mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Connected to MongoDB")
}).catch((err) => {
  console.error("Error connecting to MongoDB:", err);
});

//--- routes ---
const itemRoutes = require("./route/itemRoutes");
app.use("/api/items", itemRoutes)

