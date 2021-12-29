const Router = require("koa-router");
const { uploadImg, uploadImgHistory } = require("../controller/upload.controller");
const uploadRouter = new Router({
  prefix: "/upload",
});
uploadRouter.post("/img", uploadImg);
uploadRouter.get("/img", uploadImgHistory);
module.exports = uploadRouter;
