const jwt = require("jsonwebtoken");
const { PUBLIC_KEY } = require("../app/config");
const { TokenExpiredError, JsonWebTokenError, HasNotAdminPermission } = require("../constants/err.type");
const auth = async (ctx, next) => {
  const { authorization = "" } = ctx.request.header;
  const token = authorization.replace("Bearer ", "");
  try {
    const user = jwt.verify(token, PUBLIC_KEY);
    ctx.state.user = user;
  } catch (e) {
    switch (e.name) {
      case "TokenExpiredError":
        return ctx.app.emit("error", TokenExpiredError, ctx);
      case "JsonWebTokenError":
        return ctx.app.emit("error", JsonWebTokenError, ctx);
      default:
        return ctx.app.emit("error", JsonWebTokenError, ctx);
    }
  }

  await next();
};
//是否有管理员权限
const hadAdminPermission = async (ctx, next) => {
  const { is_admin } = ctx.state.user;
  console.log(ctx.state.user);
  if (!is_admin) {
    console.error("没有管理员权限");
    return ctx.app.emit("error", HasNotAdminPermission, ctx);
  }
  await next();
};
module.exports = {
  auth,
  hadAdminPermission,
};
