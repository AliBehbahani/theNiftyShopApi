//imports

const express = require("express");

const cors = require("cors");
const bodyParser = require("body-parser");

const nftRoutes = require("./API/nft/routes");

const app = express();

//Middleware
app.use(cors());
app.use(bodyParser.json());
//Routes
app.use("/nfts", nftRoutes);

app.listen(8000);
