let nfts = require("../../nfts");
const slugify = require("slugify");

exports.fetchNft = (req, res) => {
  res.json(nfts);
};

exports.deleteNft = (req, res) => {
  const { nftId } = req.params;
  const foundNft = nfts.find((nft) => nft.id === +nftId);
  if (foundNft) {
    nfts = nfts.filter((nft) => nft.id !== +nftId);
    res.status(204).end();
  } else {
    res.status(404).json({ message: "nft not found" });
  }
};

exports.createNft = (req, res) => {
  const id = nfts.length + 1;
  const slug = slugify(req.body.name, { lower: true });
  const newNft = {
    id,
    slug,
    ...req.body,
  };
  nfts.push(newNft);
  res.status(201).json(newNft);
};

exports.updateNft = (req, res) => {
  const { nftId } = req.params;
  const foundNft = nfts.find((nft) => nft.id === +nftId);
  if (foundNft) {
    for (const key in req.body) foundNft[key] = req.body[key];
    foundNft.slug = slugify(foundNft.name, { lower: true });
    res.status(204).end();
  } else {
    res.status(404).json({ message: "nft not found" });
  }
};
