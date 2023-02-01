const { DataTypes} = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("category", {

    name: {
      type: DataTypes.ENUM,
      values: ['Ferreteria', 'Elementos de proteccion personal', 'Alquiler de equipos para construccion', 'Venta de refacciones'],
      allowNull: false,
    },
  });
};