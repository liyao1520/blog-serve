const { addArticle, updateArticle, deleteArticle } = require("../service/article.service");
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
  async update(ctx) {
    const { content, title, cover, canComment, id } = ctx.request.body;
    const res = await updateArticle({ content, title, cover, canComment, id });
    if (res) {
      ctx.body = {
        code: 0,
        msg: "更新成功",
        result: "",
      };
    }
  }
  async del(ctx) {
    const { id } = ctx.request.params;
    const res = await deleteArticle(id);
    if (res) {
      ctx.body = {
        code: 0,
        msg: "删除成功",
      };
    }
  }
  async getById(ctx) {
    const article = ctx.state.article;
    ctx.body = {
      code: 0,
      msg: "查询成功",
      result: article,
    };
  }
}
module.exports = new ArticleController();
