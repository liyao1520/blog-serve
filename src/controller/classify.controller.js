const sequelize = require("sequelize");
const { addClassify, delClassify } = require("../service/classify.service");
const Classify = require("../model/classify.model");

class ClassifyController {
  async add(ctx, next) {
    const { name, describe } = ctx.request.body;
    const res = await addClassify({
      name,
      describe,
    });
    ctx.body = {
      code: 0,
      msg: "添加成功",
      result: res,
    };
  }
  async findAll(ctx) {
    await ctx.findAll(Classify, {
      attributes: {
        include: [
          [
            sequelize.literal(`(
          SELECT COUNT(*)
          FROM articles AS art
          WHERE
              art.classifyId = classify.id and art.deletedAt is  null
      )`),
            "count",
          ],
        ],
      },
    });
  }
  async del(ctx) {
    const res = await delClassify(ctx.request.params.id);
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
module.exports = new ClassifyController();
