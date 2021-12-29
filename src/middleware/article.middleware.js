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
module.exports = { verifyArticleAdd };
