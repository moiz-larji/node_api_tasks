const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Company = sequelize.define('Company', {
  companyId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  companyName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Company;
