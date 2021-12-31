const { Sequelize } = require("sequelize");
const { MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE, MYSQL_HOST } = require("../app/config");
const sequelize = new Sequelize(MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, {
  host: MYSQL_HOST,
  dialect: "mysql",
  // 添加这个配置
  dialectOptions: {
    dateStrings: true,
    typeCast: true,
  },
});
(async () => {
  try {
    await sequelize.authenticate();
    console.log("数据库连接成功！");
  } catch (e) {
    console.log("数据库连接失败！");
  }
})();
module.exports = sequelize;
