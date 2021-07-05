const express = requires;
app.get("/nfts", (req, res) => {
  res.json(nfts);
});

app.delete("/nfts/:nftId", (req, res) => {
  const { nftId } = req.params;
  const foundNft = nfts.find((nft) => nft.id === +nftId);
  if (foundNft) {
    nfts = nfts.filter((nft) => nft.id !== +nftId);
    res.status(204).end();
  } else {
    res.status(404).json({ message: "nft not found" });
  }
});
app.post("/nfts", (req, res) => {
  const id = nfts.length + 1;
  const slug = slugify(req.body.name, { lower: true });
  const newNft = {
    id,
    slug,
    ...req.body,
  };
  nfts.push(newNft);
  res.status(201).json(newNft);
});
app.put("/nfts/:nftId", (req, res) => {
  const { nftId } = req.params;
  const foundNft = nfts.find((nft) => nft.id === +nftId);
  if (foundNft) {
    for (const key in req.body) foundNft[key] = req.body[key];
    foundNft.slug = slugify(foundNft.name, { lower: true });
    res.status(204).end();
  } else {
    res.status(404).json({ message: "nft not found" });
  }
});
