const { DataTypes } = require("sequelize");
const sequelize = require("../db/seq");
const Article = require("./article.model");
const User = require("./user.model");
const Comment = sequelize.define(
  "Comment",
  {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "评论内容",
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "父评论id",
    },
    likeCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: "点赞数",
    },
    // userId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true, //为true则为匿名评论
    //   comment: "评论者",
    // },
  },
  {
    paranoid: true, //软删除
  }
);
Comment.belongsTo(Article);
Comment.belongsTo(User, {
  foreignKey: "userId",
});
Comment.sync();
module.exports = Comment;
