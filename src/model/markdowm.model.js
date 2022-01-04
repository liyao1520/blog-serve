const { DataTypes } = require("sequelize");
const sequelize = require("../db/seq");
const Markdown = sequelize.define("markdown", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: "唯一名",
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "markdown内容",
  },
});

module.exports = Markdown;
