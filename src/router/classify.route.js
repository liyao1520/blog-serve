const Router = require("koa-router");
const { add, findAll, del } = require("../controller/classify.controller");
const { verifyHadTagByName, verifyAdd, verifyFIndAllparams } = require("../middleware/classify.middleware");
const classifyRouter = new Router({
  prefix: "/classify",
});
classifyRouter.post("/", verifyAdd, verifyHadTagByName, add);
classifyRouter.get("/", verifyFIndAllparams, findAll);
classifyRouter.delete("/:id", del);
module.exports = classifyRouter;
