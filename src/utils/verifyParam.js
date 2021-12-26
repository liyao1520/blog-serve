//配合koa-parameter
const parameter = require("koa-parameter");

async function verifyParam(ctx, next) {
  try {
    await next();
  } catch (err) {
    if (err.code === "INVALID_PARAM") {
      ctx.app.emit(
        "error",
        (ctx.body = {
          code: -1,
          msg: "无效参数",
          result: "",
          params: err.params,
          errors: err.errors,
        }),
        ctx
      );
      return;
    }
    throw err;
  }
}
module.exports = (app) => {
  //参数校验
  parameter(app);
  return verifyParam;
};
