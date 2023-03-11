const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  const SubCategory = sequelize.define("subCategory", {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  SubCategory.associate = (models) => {
    SubCategory.belongsToMany(models.Product, { through: "product_subCategory" });
  };

  return SubCategory;
};
