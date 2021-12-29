const Article = require("../model/article.model");
class ArticleService {
  async addArticle({ content, title, cover, canComment }) {
    const res = await Article.create({ content, title, cover, canComment });
    return res;
  }
  async updateArticle({ id, content, title, cover, canComment }) {
    const res = await Article.update(
      { content, title, cover, canComment },
      {
        where: {
          id,
        },
      }
    );
    return Boolean(res[0]);
  }
  async deleteArticle(id) {
    const res = await Article.destroy({
      where: { id },
    });
    return Boolean(res);
  }
  async getArticleById(id) {
    return await Article.findByPk(id);
  }
}
module.exports = new ArticleService();
