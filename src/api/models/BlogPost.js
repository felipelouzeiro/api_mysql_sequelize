const { DataTypes } = require('sequelize');

const attributes = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: { 
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  published: {
    type: DataTypes.DATE,
  },
  updated: {
    type: DataTypes.DATE,
  },
};

module.exports = (sequelize) => {
  const BlogPost = sequelize.define('BlogPost',
    attributes,
    {
      timestamps: false,
      tableName: 'BlogPosts',
      underscored: true,
    });

  return BlogPost;
};