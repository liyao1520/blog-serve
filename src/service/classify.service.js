const Classify = require("../model/classify.model");
class ClassifyService {
  async addClassify({ name, describe }) {
    return await Classify.create({ name, describe });
  }
  async delClassify(id) {
    return await Classify.destroy({
      where: { id },
    });
  }
  async findBy(key, value) {
    return await Classify.findOne({
      where: {
        [key]: value,
      },
    });
  }
}
module.exports = new ClassifyService();
