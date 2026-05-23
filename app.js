require('node:dns/promises').setServers(['1.1.1.1', '8.8.8.8']);
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const itemRoutes = require("./route/itemRoutes");
const path = require("path");



const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");

app.use(
  "/css",
  express.static(
    path.join(__dirname, "node_modules/bootstrap/dist/css")
  )
);

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Connected to MongoDB")
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
  })
}).catch((err) => {
  console.error("Error connecting to MongoDB:", err);
});

//--- routes ---
app.use("/api/items", itemRoutes)
