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
const verifyFIndAllparams = async (ctx, next) => {
  ctx.verifyParams({
    str: {
      type: "string",
      required: false,
    },
    title: {
      type: "string",
      required: false,
    },
    content: {
      type: "string",
      required: false,
    },
    sort: {
      type: "string",
      require: false,
    },
  });
};
module.exports = {
  verifyHadTagByName,
  verifyAdd,
  verifyFIndAllparams,
};
