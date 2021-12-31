const sequelize = require("../db/seq");
const Article = require("./article.model");
const Classify = require("./classify.model");
const Tag = require("./tag.model");
const User = require("./user.model");
const Comment = require("./comment.model");

// 关联
Article.belongsToMany(Tag, {
  through: "Article_Tag",
  as: "tags",
});
Tag.belongsToMany(Article, {
  through: "Article_Tag",
  as: "articles",
});
Article.belongsTo(Classify, {
  as: "classify",
});
Classify.hasMany(Article, {
  as: "articles",
});
Article.hasMany(Comment, {
  as: "comments",
});
Comment.belongsTo(Article);

User.hasMany(Comment, {
  as: "comments",
});
//同步

module.exports = sequelize;
