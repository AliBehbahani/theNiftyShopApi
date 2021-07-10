const express = require("express");
const { fetchNft, deleteNft, updateNft, nftFetch } = require("./controllers");
const multer = require("multer");

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
//multer
const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});
const upload = multer({ storage });

//crud routes
router.get("/", fetchNft);
router.delete("/:nftId", deleteNft);
router.put("/:nftId", upload.single("image"), updateNft);

module.exports = router;
