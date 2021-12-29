const { getArticleById } = require("../service/article.service");
const verifyArticleAdd = async (ctx, next) => {
  ctx.verifyParams({
    content: {
      type: "string",
      min: 1,
    },
    title: {
      type: "string",
      min: 1,
    },
    cover: "string",
    canComment: [0, 1],
  });
  await next();
};
const verifyArticleUpdate = async (ctx, next) => {
  ctx.verifyParams({
    id: "number",
    content: {
      type: "string",
      min: 1,
    },
    title: {
      type: "string",
      min: 1,
    },
    cover: "string",
    canComment: [0, 1],
  });
  await next();
};
const HadArticleById = async (ctx, next) => {
  let id;
  if (ctx.request.method === "DELETE" || ctx.request.method === "GET") {
    id = ctx.request.params.id;
  } else {
    id = ctx.request.body.id;
  }
  const article = await getArticleById(id);
  if (!article) {
    return ctx.app.emit(
      "error",
      {
        code: -1,
        msg: "没有此id的文章",
      },
      ctx
    );
  }
  ctx.state.article = article;
  await next();
};
module.exports = { verifyArticleAdd, verifyArticleUpdate, HadArticleById };
