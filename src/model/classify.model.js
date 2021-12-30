const { DataTypes } = require("sequelize");
const sequelize = require("../db/seq");
const Classify = sequelize.define("Classify", {
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    comment: "分类名",
  },
  describe: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "描述",
  },
});
// Classify.belongsTo(Article);
// Classify.sync();
module.exports = Classify;
