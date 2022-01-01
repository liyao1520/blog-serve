const Router = require("koa-router");
const { uploadImg, uploadImgHistory, DelImg } = require("../controller/upload.controller");
const { auth, hadAdminPermission } = require("../middleware/auth.middleware");
const uploadRouter = new Router({
  prefix: "/upload",
});
uploadRouter.post("/img", auth, hadAdminPermission, uploadImg);
uploadRouter.get("/img", uploadImgHistory);
uploadRouter.delete("/img/:hash", DelImg);
module.exports = uploadRouter;
