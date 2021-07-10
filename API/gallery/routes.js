const express = require("express");
const {
  fetchGallery,
  createGallery,
  createNft,
  galleryFetch,
} = require("./controllers");
const multer = require("multer");
const router = express.Router();
//multer
const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});
const upload = multer({ storage });

//param middleware
router.param("galleryId", async (req, res, next, galleryId) => {
  const gallery = await galleryFetch(galleryId, next);
  if (gallery) {
    req.gallery = gallery;
    next();
  } else {
    const error = new Error("Gallery not found");
    error.status = 404;
    next(error);
  }
});

//List
router.get("/", fetchGallery);

//Create
router.post("/", upload.single("image"), createGallery);

router.post("/:galleryId/nfts", upload.single("image"), createNft);

module.exports = router;
