const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Nft = sequelize.define("Nft", {
    name: { type: DataTypes.STRING, allowNull: false },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
    price: { type: DataTypes.INTEGER, validate: { min: 0 }, defaultValue: 0 },
    description: { type: DataTypes.STRING },
    image: { type: DataTypes.STRING },
  });
  SequelizeSlugify.slugifyModel(Nft, { source: ["name"] });
  return Nft;
};
