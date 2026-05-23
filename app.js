require('node:dns/promises').setServers(['1.1.1.1', '8.8.8.8']);
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const itemRoutes = require("./route/itemRoutes");

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// View engine
app.set("view engine", "ejs");

// Static Assets
app.use("/css", express.static("node_modules/bootstrap/dist/css"));
app.use(express.static("public"));

// Database Connection
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Connected to MongoDB");
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
}).catch((err) => {
  console.error("Error connecting to MongoDB:", err);
});

// App Entry Routes
app.use("/items", itemRoutes);

// Root redirect to /items path automatically
app.get("/", (req, res) => res.redirect("/items"));