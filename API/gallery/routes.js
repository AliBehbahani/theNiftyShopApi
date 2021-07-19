//library imports
const express = require("express");
const multer = require("multer");
const passport = require("passport");
//components
const {
  fetchGallery,
  createGallery,
  createNft,
  galleryFetch,
} = require("./controllers");
//************************************************************************************* */

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

//Create gallery
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  createGallery
);

//Create nft
router.post(
  "/:galleryId/nfts",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  createNft
);

module.exports = router;
