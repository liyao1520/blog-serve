const sequelize = require("sequelize");
const Tag = require("../model/tag.model");
const { addTag, delTag } = require("../service/tag.service");

class TagController {
  async add(ctx, next) {
    const { name } = ctx.request.body;
    const res = await addTag(name);
    console.log(res);
    ctx.body = {
      code: 0,
      msg: "添加成功",
      result: res,
    };
  }
  async findAll(ctx) {
    await ctx.findAll(Tag, {
      attributes: {
        include: [
          [
            sequelize.literal(`(
              SELECT COUNT(*) FROM article_tag AS at LEFT JOIN articles ar ON at.articleId = ar.id WHERE  ar.deletedAt is null and at.tagId = tag.id
      )`),
            "count",
          ],
        ],
      },
    });
  }
  async del(ctx) {
    const res = await delTag(ctx.request.params.id);
    if (res) {
      ctx.body = {
        code: 0,
        msg: "删除成功",
      };
    } else {
      ctx.body = {
        code: 0,
        msg: "删除失败",
      };
    }
  }
}
module.exports = new TagController();
