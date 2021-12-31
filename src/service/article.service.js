const Article = require("../model/article.model");
const Classify = require("../model/classify.model");
const Tag = require("../model/tag.model");
class ArticleService {
  async addArticle({ content, title, cover, canComment, tags = [], classify }) {
    const article = await Article.create({
      content,
      title,
      cover,
      canComment,
      classifyId: classify,
    });
    //添加tag
    let tags_result = await Tag.findAll({
      where: {
        id: tags,
      },
    });
    const res = await article.setTags(tags_result);
    return res;
  }
  async updateArticle({ id, content, title, cover, canComment, tags, classify }) {
    const article = await Article.findByPk(id);
    const res1 = await article.update({ content, title, cover, canComment, classifyId: classify });
    const tags_res = await Tag.findAll({
      where: {
        id: tags,
      },
    });
    const res2 = await article.setTags(tags_res);
    return res1 && res2;
  }
  async deleteArticle(id) {
    const res = await Article.destroy({
      where: { id },
    });
    return Boolean(res);
  }
  async getArticleById(id) {
    return await Article.findByPk(id, {
      include: ["tags", "classify"],
    });
  }
  async addArticleCount(id) {
    const article = await Article.findByPk(id);
    const res = await article.increment("count");
    return Boolean(res);
  }
}
module.exports = new ArticleService();
