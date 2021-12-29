module.exports = async function (ctx, next) {
  if (ctx.request.method === "GET") {
    ctx.getList = async function getList(Model, option) {
      if (Model === undefined) {
        throw "function getList  model is  undefined";
      }
      // pageFlag 0:不分页 1:分页
      const { pageSize, pageNum, pageFlag = 0 } = ctx.request.query;
      const limit = parseInt(pageSize);
      const offset = limit * (parseInt(pageNum) - 1);
      if (pageFlag) {
        // this 为ctx,
        const { count, rows } = await Model.findAndCountAll(option, offset, limit);
        ctx.body = {
          code: 0,
          msg: "查询成功",
          result: rows,
          count,
        };
      } else {
        const rows = await Model.findAll(option);
        ctx.body = {
          code: 0,
          msg: "查询成功",
          result: rows,
        };
      }
    };
  }
  await next();
};
