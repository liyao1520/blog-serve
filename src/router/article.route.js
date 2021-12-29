const Router = require("koa-router");
const { add, findAll } = require("../controller/article.controller");
const { auth, hadAdminPermission } = require("../middleware/auth.middleware");
const { verifyArticleAdd } = require("../middleware/article.middleware");
const articleRouter = new Router({
  prefix: "/article",
});
articleRouter.post("/", auth, hadAdminPermission, verifyArticleAdd, add);
articleRouter.get("/", findAll);
module.exports = articleRouter;
