const { Gallery, Nft } = require("../../db/models");

exports.galleryFetch = async (galleryId, next) => {
  try {
    const gallery = await Gallery.findByPk(galleryId);
    return gallery;
  } catch (error) {
    next(error);
  }
};

exports.fetchGallery = async (req, res, next) => {
  try {
    const galleries = await Gallery.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: Nft,
        as: "nfts",
        attributes: ["id"],
      },
    });
    res.json(galleries);
  } catch (error) {
    next(error);
  }
};
exports.createGallery = async (req, res, next) => {
  try {
    const foundGallery = await Gallery.findOne({
      where: { userId: req.user.id },
    });
    if (foundGallery) {
      const error = new Error("you have a gallery bro");
      error.status = 400;
      return next(error);
    }

    if (req.file) req.body.image = `http://${req.get("host")}/${req.file.path}`;
    req.body.userId = req.user.id;

    const newGallery = await Gallery.create(req.body);
    res.status(201).json(newGallery);
  } catch (error) {
    next(error);
  }
};

exports.createNft = async (req, res, next) => {
  // const id = nfts.length + 1;
  // const slug = slugify(req.body.name, { lower: true });
  // const newNft = {
  //   id,
  //   slug,
  //   ...req.body,
  // };
  // nfts.push(newNft);
  try {
    if (req.user.id === req.gallery.userId) {
      if (req.file)
        req.body.image = `http://${req.get("host")}/${req.file.path}`;
      req.body.galleryId = req.gallery.id;
      const newNft = await Nft.create(req.body);
      res.status(201).json(newNft);
    } else {
      const error = new Error("no bro not ur gallery");
      error.status = 401;
      return next(error);
    }
  } catch (error) {
    // res.status(500).json({ message: error.message });
    next(error);
  }
};
