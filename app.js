//imports

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nftRoutes = require("./API/nft/routes");

const db = require("./db/models/index");
const app = express();

//Middleware
app.use(cors());
app.use(bodyParser.json());
// app.use((req, res, next) => {
//   next();
// });

//Routes
app.use("/nfts", nftRoutes);

//path middleware
app.use((req, res, next) => {
  res.status(404).json({ message: "path not found" });
  next();
});
//error handling middleware  (order is imp)
app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal server error" });
});

const run = async () => {
  try {
    await db.sequelize.sync({ alter: true });
    console.log("connected to database");
    app.listen(8000);
  } catch (error) {
    console.error(error);
  }
};

run();
