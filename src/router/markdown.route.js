const Router = require("koa-router");
const mdRouter = new Router({ prefix: "/md" });
const { del, update, findAll, getByName, add } = require("../controller/markdown.controller");
mdRouter.get("/name", getByName);
mdRouter.get("/", findAll);
mdRouter.delete("/:id", del);
mdRouter.post("/", add);
mdRouter.put("/", update);
module.exports = mdRouter;
