const Router = require("koa-router");
const { add, findAll, del } = require("../controller/tag.controller");
const { verifyHadTagByName, verifyAdd } = require("../middleware/tag.middleware");
const { auth, hadAdminPermission } = require("../middleware/auth.middleware");
const tagRouter = new Router({
  prefix: "/tag",
});
tagRouter.post("/",auth, hadAdminPermission, verifyAdd, verifyHadTagByName, add);
tagRouter.get("/", findAll);
tagRouter.delete("/:id",auth, hadAdminPermission, del);
module.exports = tagRouter;
