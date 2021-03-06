const { DataTypes } = require('sequelize');

const attributes = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  displayName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
};

module.exports = (sequelize) => {
  const User = sequelize.define('User',
    attributes,
    {
      timestamps: false,
      tableName: 'Users',
      underscored: true,
    });

  return User;
};