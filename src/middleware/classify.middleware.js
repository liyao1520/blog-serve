const { findBy } = require("../service/classify.service");

const verifyHadTagByName = async (ctx, next) => {
  const { name } = ctx.request.body;
  const res = await findBy("name", name);
  if (res) {
    return ctx.app.emit(
      "error",
      {
        code: "-1",
        msg: `分类 '${name}'已经存在`,
        result: "",
      },
      ctx
    );
  }
  await next();
};
const verifyAdd = async (ctx, next) => {
  ctx.verifyParams({
    name: "string",
  });
  await next();
};

module.exports = {
  verifyHadTagByName,
  verifyAdd,
};
