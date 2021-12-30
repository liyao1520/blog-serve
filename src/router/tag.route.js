const Router = require("koa-router");
const { add, findAll, del } = require("../controller/tag.controller");
const { verifyHadTagByName, verifyAdd } = require("../middleware/tag.middleware");
const tagRouter = new Router({
  prefix: "/tag",
});
tagRouter.post("/", verifyAdd, verifyHadTagByName, add);
tagRouter.get("/", findAll);
tagRouter.delete("/:id", del);
module.exports = tagRouter;
