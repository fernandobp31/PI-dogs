const { DataTypes } = require('sequelize');
//Cree el model Temperament, con los atributos requeridos en el README

module.exports = (sequelize) => {
  sequelize.define('Temperament', {

    name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
  });
};

//Identificar ID