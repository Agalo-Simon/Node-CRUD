
const express = require("express");
const mongoose = require("mongoose");
// const itemRoutes = require("./route/itemRoutes");

const app = express();
const morgan = require("morgan");
const { result } = require("lodash");

//Connect to mongodb
// const dbURI = "mongodb+srv://galos:galos1234@cluster0.jetmcd6.mongodb.net/";
const dbURI =
  "mongodb+srv://galos:galos1234@node-tuts.fzpfjur.mongodb.net/node-tuts";
mongoose
  .connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

//register view engine
app.set("view engine", "ejs");

//middleware and static files
app.use(express.static("public"));
app.use(express.urlencoded());
app.use(morgan("dev"));

//--- routes ---
const itemRoutes = require("./route/itemRoutes");
app.use("/api/items", itemRoutes)
//404
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
