const { DataTypes } = require("sequelize");
const sequelize = require("../db/seq");
const Article = require("./article.model");
const Tag = sequelize.define("tag", {
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    comment: "标签",
  },
});
Tag.belongsTo(Article);
Tag.sync();
module.exports = Tag;
