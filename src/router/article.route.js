const Router = require("koa-router");
const { add, findAll, del, update, getById, addCount } = require("../controller/article.controller");
const { auth, hadAdminPermission } = require("../middleware/auth.middleware");
const { verifyArticleAdd, verifyArticleUpdate, HadArticleById } = require("../middleware/article.middleware");
const articleRouter = new Router({
  prefix: "/article",
});
articleRouter.post("/", auth, hadAdminPermission, verifyArticleAdd, add);
articleRouter.get("/", findAll);
articleRouter.put("/",auth, hadAdminPermission, verifyArticleUpdate, HadArticleById, update);
articleRouter.delete("/:id",auth, hadAdminPermission, HadArticleById, del);
articleRouter.get("/:id", HadArticleById, getById);
articleRouter.get("/count/:id", addCount);
module.exports = articleRouter;
