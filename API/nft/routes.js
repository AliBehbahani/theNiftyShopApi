const express = require("express");
const { fetchNft, deleteNft, createNft, updateNft } = require("./controllers");
const router = express.Router();

router.get("/", fetchNft);
router.delete("/:nftId", deleteNft);
router.post("/", createNft);
router.put("/:nftId", updateNft);

module.exports = router;
