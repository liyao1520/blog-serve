const { DataTypes } = require("sequelize");
const sequelize = require("../db/seq");
const BlogArticle = sequelize.define(
  "Article",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "文章标题",
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "文章内容",
    },
    cover: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "封面",
    },
    likeCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: "点赞数",
    },
    canComment: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1,
      comment: "是否开启评论",
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: "浏览量",
    },
  },
  {
    paranoid: true, //软删除
  }
);
BlogArticle.sync();
module.exports = BlogArticle;
