//imports

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nftRoutes = require("./API/nft/routes");
const galleryRoutes = require("./API/gallery/routes");
const userRouter = require("./API/user/routes");
const passport = require("passport");
const { localStrat } = require("./middleware/passport");
const { jwtStrat } = require("./middleware/passport");

const db = require("./db/models/index");

const app = express();

//Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
passport.use(localStrat);
passport.use(jwtStrat);
//Routes
app.use("/nfts", nftRoutes);
app.use("/galleries", galleryRoutes);
app.use(userRouter);
app.use("/media", express.static("media"));

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
