const Markdown = require("../model/markdowm.model");
const { getByName, update, add, del } = require("../service/markdown.serive");

class MdController {
  async getByName(ctx) {
    const { name } = ctx.request.query;
    const res = await getByName(name);
    ctx.body = {
      code: 0,
      msg: "查询成功",
      result: res,
    };
  }
  async update(ctx) {
    const { id, name, content } = ctx.request.body;
    const res = await update({ id, name, content });
    if (res) {
      ctx.body = {
        code: 0,
        msg: "修改成功",
        result: "",
      };
    }
  }
  async add(ctx) {
    const { name, content } = ctx.request.body;
    try {
      const res = await add({ name, content });
      ctx.body = {
        code: 0,
        msg: "添加成功",
        result: res,
      };
    } catch (e) {
      ctx.app.emit("error", { code: -1, msg: e }, ctx);
    }
  }
  async del(ctx) {
    const { id } = ctx.request.params;
    const res = await del(id);

    if (res) {
      ctx.body = {
        code: 0,
        msg: "删除成功",
        result: "",
      };
    } else {
      ctx.body = {
        code: -1,
        msg: "删除失败",
        result: "",
      };
    }
  }
  async findAll(ctx) {
    await ctx.findAll(Markdown);
  }
}
module.exports = new MdController();
