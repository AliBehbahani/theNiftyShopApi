const express = require("express");
const {
  fetchNft,
  deleteNft,
  createNft,
  updateNft,
  nftFetch,
} = require("./controllers");
const router = express.Router();

//param middleware
router.param("nftId", async (req, res, next, nftId) => {
  const nft = await nftFetch(nftId, next);
  if (nft) {
    req.nft = nft;
    next();
  } else {
    const error = new Error("Nft not found");
    error.status = 404;
    next(error);
  }
});

//crud routes
router.get("/", fetchNft);
router.delete("/:nftId", deleteNft);
router.post("/", createNft);
router.put("/:nftId", updateNft);

module.exports = router;
