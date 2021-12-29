const Article = require("../model/article.model");
class ArticleService {
  async addArticle({ content, title, cover, canComment }) {
    const res = await Article.create({ content, title, cover, canComment });
    return res;
  }
}
module.exports = new ArticleService();
