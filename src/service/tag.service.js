const Tag = require("../model/tag.model");
class TagService {
  async addTag(name) {
    const res = await Tag.create({ name });
    return res;
  }
  async findBy(key, value) {
    return await Tag.findOne({
      where: {
        [key]: value,
      },
    });
  }
  async delTag(id) {
    return await Tag.destroy({
      where: { id },
    });
  }
}
module.exports = new TagService();
