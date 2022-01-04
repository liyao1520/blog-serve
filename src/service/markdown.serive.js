const Markdown = require("../model/markdowm.model");

class MdSerive {
  async add({ name, content }) {
    try {
      return await Markdown.create({
        name,
        content,
      });
    } catch (e) {
      throw "添加失败，查看是否已有相同name";
    }
  }
  async update({ id, name, content }) {
    const res = await Markdown.update(
      { name, content },
      {
        where: { id },
      }
    );
    return Boolean(res[0]);
  }
  async getByName(name) {
    return await Markdown.findOne({ where: { name } });
  }
  async del(id) {
    const res = await Markdown.destroy({ where: { id } });
    return Boolean(res);
  }
}
module.exports = new MdSerive();
