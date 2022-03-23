const config = require("../../config/config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  // operatorsAliases: 0, // https://sequelize.org/v4/manual/tutorial/querying.html#operators-aliases;
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.User = require("./User")(sequelize, Sequelize);
db.Category = require("./Category")(sequelize, Sequelize);
db.BlogPost = require("./BlogPost")(sequelize, Sequelize);
// associações
db.User.hasMany(db.BlogPost, { as: "post" });
db.BlogPost.belongsTo(db.User, { foreignKey: "user_id", as: "user" });

db.BlogPost.belongsToMany(db.Category, {
  as: "categories",
  through: "PostCategories", // gera uma model intermediaria automaticamente;
  foreignKey: "postId",
  otherKey: "categoryId"
});
db.Category.belongsToMany(db.BlogPost, {
  as: "blogposts",
  through: "PostCategories",
  foreignKey: "categoryId",
  otherKey: "postId"
});
module.exports = db;