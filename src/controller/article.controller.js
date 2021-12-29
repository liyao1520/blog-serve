const { addArticle } = require("../service/article.service");
const Article = require("../model/article.model");
class ArticleController {
  async add(ctx, next) {
    const { content, title, cover, canComment } = ctx.request.body;
    const res = await addArticle({ content, title, cover, canComment });
    ctx.body = {
      code: 0,
      msg: "新增成功",
      result: res,
    };
  }
  async findAll(ctx) {
    //ctx.getList 已经帮助处理了
    await ctx.getList(Article);
  }
}
module.exports = new ArticleController();
