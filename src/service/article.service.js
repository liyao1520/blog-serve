const Article = require("../model/article.model");
const Classify = require("../model/classify.model");
const Tag = require("../model/tag.model");
class ArticleService {
  async addArticle({ content, title, cover, canComment, tags = [], classifies = [] }) {
    const article = await Article.create({
      content,
      title,
      cover,
      canComment,
    });
    //添加tag
    let tags_result = await Tag.findAll({
      where: {
        id: tags,
      },
    });
    const res1 = await article.setTags(tags_result);
    //添加classifies
    const classifies_result = await Classify.findAll({
      where: {
        id: classifies,
      },
    });
    const res2 = await article.setClassifies(classifies_result);
    console.log(res2);
    return res1 && res2;
  }
  async updateArticle({ id, content, title, cover, canComment, tags, classifies }) {
    const article = await Article.findByPk(id);
    const res1 = await article.update({ content, title, cover, canComment });
    const tags_res = await Tag.findAll({
      where: {
        id: tags,
      },
    });
    const classifies_res = await Classify.findAll({
      where: { id: classifies },
    });
    const res2 = await article.setTags(tags_res);
    const res3 = await article.setClassifies(classifies_res);
    return res1 && res2 && res3;
  }
  async deleteArticle(id) {
    const res = await Article.destroy({
      where: { id },
    });
    return Boolean(res);
  }
  async getArticleById(id) {
    return await Article.findByPk(id, {
      include: ["tags", "classifies"],
    });
  }
  async addArticleCount(id) {
    const article = await Article.findByPk(id);
    const res = await article.increment("count");
    return Boolean(res);
  }
}
module.exports = new ArticleService();
