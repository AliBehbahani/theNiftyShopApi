module.exports = (sequelize, DataTypes) => {
  return sequelize.define("OrderItem", {
    quantity: {
      type: DataTypes.INTEGER,
      validate: { min: 1 },
      allowNull: false,
    },
  });
};
