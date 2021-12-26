const Router = require("koa-router");
const { register, login, changePassword, adminRegister } = require("../controller/user.controller");
const {
  userValidator,
  userVerify,
  cryptPassword,
  loginVerify,
  updatePasswordVerify,
} = require("../middleware/user.middleware");
const { auth, hadAdminPermission } = require("../middleware/auth.middleware");
const userRouter = new Router({ prefix: "/user" });
userRouter.post("/register", userValidator, userVerify, cryptPassword, register);
userRouter.post("/v_register", auth, hadAdminPermission, userValidator, userVerify, cryptPassword, adminRegister);
userRouter.post("/login", loginVerify, login);
userRouter.patch("/", auth, updatePasswordVerify, cryptPassword, changePassword);
module.exports = userRouter;
