const path = require("path");
const Koa = require("koa");
const koaBody = require("koa-body");
const static = require("koa-static");
const useRoutes = require("../router/index");
const verifyParam = require("../utils/verifyParam");
const findAll = require("../utils/findAll");
const sequelize = require("../model/index");
sequelize.sync();
const app = new Koa();

//获取所有,分页中间件
app.use(findAll);
app.use(static(path.resolve(__dirname, "../upload")));
app.use(
  koaBody({
    multipart: true,
    formidable: {
      // uploadDir: path.resolve(__dirname, "../upload"),
      keepExtensions: true, //保存扩展名
      maxFileSize: 200 * 1024 * 1024, // 设置上传文件大小最大限制，默认2M
    },
  })
);
//验证参数
app.use(verifyParam(app));
//动态加载所有路由
useRoutes(app);
//同意错误处理
app.on("error", (err, ctx) => {
  console.error(err);
  if (err.code === "INVALID_PARAM") {
    ctx.body = {
      code: -1,
      msg: "参数错误",
      result: 123,
    };
  } else {
    ctx.body = err;
  }
});
module.exports = app;
