const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Gallery = sequelize.define("Gallery", {
    name: { type: DataTypes.STRING, allowNull: false },
    slug: { type: DataTypes.STRING, unique: true },
    image: { type: DataTypes.STRING },
  });
  SequelizeSlugify.slugifyModel(Gallery, { source: ["name"] });
  return Gallery;
};
