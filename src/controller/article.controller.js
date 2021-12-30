const sequelize = require("sequelize");
const { Op } = sequelize;
const { addArticle, updateArticle, deleteArticle, addArticleCount } = require("../service/article.service");
const Article = require("../model/article.model");
class ArticleController {
  async add(ctx, next) {
    const { content, title, cover, canComment, tags, classifies } = ctx.request.body;
    const res = await addArticle({ content, title, cover, canComment, tags, classifies });
    if (res) {
      ctx.body = {
        code: 0,
        msg: "新增成功",
        result: "",
      };
    }
  }
  async findAll(ctx) {
    //处理参数
    const { str, title, content, sort } = ctx.request.query;
    console.log(ctx.request.query);
    const whereOpt = {};
    //1.str title content 三选一
    if (str) {
      // 同时匹配content和title
      Object.assign(whereOpt, {
        [Op.or]: [
          {
            title: {
              [Op.like]: "%" + str + "%",
            },
          },
          {
            content: {
              [Op.like]: "%" + str + "%",
            },
          },
        ],
      });
    } else if (title) {
      Object.assign(whereOpt, {
        title: {
          [Op.like]: "%" + title + "%",
        },
      });
    } else if (content) {
      Object.assign(whereOpt, {
        content: {
          [Op.like]: "%" + content + "%",
        },
      });
    }
    // 2. sort hot new
    const orderOpt = [];
    if (sort == "hot") {
      orderOpt.push(["count", "DESC"]);
    }
    if (sort == "new") {
      orderOpt.push(["updatedAt", "DESC"]);
    }

    console.log({ include: ["tags", "classifies"], orderOpt, whereOpt });
    await ctx.findAll(Article, {
      include: ["tags", "classifies"],
      order: orderOpt,
      where: whereOpt,
      distinct: true,
    });
  }
  async update(ctx) {
    const { content, title, cover, canComment, id, classifies, tags } = ctx.request.body;
    const res = await updateArticle({ id, content, title, cover, canComment, classifies, tags });

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
  //增加浏览量
  async addCount(ctx) {
    const res = await addArticleCount(ctx.request.params.id);
    if (res) {
      ctx.body = {
        code: 0,
        msg: "浏览量+1",
      };
    }
  }
}
module.exports = new ArticleController();
