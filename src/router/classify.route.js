const Router = require("koa-router");
const { add, findAll, del } = require("../controller/classify.controller");
const { verifyHadTagByName, verifyAdd } = require("../middleware/classify.middleware");
const { auth, hadAdminPermission } = require("../middleware/auth.middleware");
const classifyRouter = new Router({
  prefix: "/classify",
});
classifyRouter.post("/",auth, hadAdminPermission, verifyAdd, verifyHadTagByName, add);
classifyRouter.get("/", findAll);
classifyRouter.delete("/:id",auth, hadAdminPermission, del);
module.exports = classifyRouter;
