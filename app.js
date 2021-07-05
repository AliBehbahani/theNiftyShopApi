//imports

const express = require("express");
let nfts = require("./nfts");
const cors = require("cors");

const app = express();

//Middleware
app.use(cors());

//Routes
app.get("/nfts", (req, res) => {
  res.json(nfts);
});

app.delete("/nfts/:nftId", (req, res) => {
  const { nftId } = req.params;
  const foundNft = nfts.find((nft) => nft.id !== +nftId);
  if (foundNft) {
    nfts = nfts.filter((nft) => nft.id !== +nftId);
    res.status(204).end();
  } else {
    res.status(404).json({ message: "nft not found" });
  }
});

app.listen(8000);
