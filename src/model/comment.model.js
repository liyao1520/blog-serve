const { DataTypes } = require("sequelize");
const sequelize = require("../db/seq");
const Comment = sequelize.define(
  "comment",
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
  },
  {
    paranoid: true, //软删除
  }
);
// Comment.belongsTo(Article);
// Comment.belongsTo(User, {
//   foreignKey: "userId",
// });
// Comment.sync();
module.exports = Comment;
