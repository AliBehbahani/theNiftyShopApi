const { Nft } = require("../../db/models");
// const slugify = require("slugify");

exports.nftFetch = async (nftId, next) => {
  try {
    const nft = await Nft.findByPk(nftId);
    return nft;
  } catch (error) {
    next(error);
  }
};

exports.fetchNft = async (req, res, next) => {
  try {
    const nfts = await Nft.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(nfts);
  } catch (error) {
    // res.status(500).json({ message: error.message });
    next(error);
  }
};

exports.deleteNft = async (req, res, next) => {
  const { nftId } = req.params;
  // const foundNft = nfts.find((nft) => nft.id === +nftId);
  try {
    await req.nft.destroy();

    // const foundNft = await fetchNft(nftId, next);
    // if (foundNft) {
    // nfts = nfts.filter((nft) => nft.id !== +nftId);
    // foundNft.destroy();
    res.status(204).end();
    //  else {
    // res.status(404).json({ message: "nft not found" });
    // const error = new Error("Nft not found");
    // error.status = 404;
    // next(error);
  } catch (error) {
    // res.status(500).json({ message: error.message });
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
    const newNft = await Nft.create(req.body);
    res.status(201).json(newNft);
  } catch (error) {
    // res.status(500).json({ message: error.message });
    next(error);
  }
};

exports.updateNft = async (req, res, next) => {
  // const { nftId } = req.params;
  // const foundNft = nfts.find((nft) => nft.id === +nftId);
  try {
    await req.nft.update(erq.body);
    // const foundNft = await fetchNft(nftId, next);
    // if (foundNft) {
    //   await foundNft.update(req.body);
    // for (const key in req.body) foundNft[key] = req.body[key];
    // foundNft.slug = slugify(foundNft.name, { lower: true });
    res.status(204).end();
    //  else {
    // res.status(404).json({ message: "nft not found" });
    // const error = new Error("Nft not found");
    // error.status = 404;
    // next(error);
  } catch (error) {
    // res.status(500).json({ message: error.message });
    next(error);
  }
};
