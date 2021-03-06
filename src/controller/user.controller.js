const jwt = require("jsonwebtoken");
const { createUser, updateById } = require("../service/user.service");
const { PRIVATE_KEY } = require("../app/config");
const User = require("../model/user.model");
class UserController {
  async register(ctx, next) {
    //1.获取数据
    const { user_name, password } = ctx.request.body;

    //2.操作数据库
    const res = await createUser(user_name, password);
    console.log(res);
    //3.返回结果
    ctx.body = {
      code: 0,
      msg: "用户注册成功！",
      result: Object.assign(res, { password: undefined }),
    };
  }
  async adminRegister(ctx, next) {
    //1.获取数据
    const { user_name, password } = ctx.request.body;

    //2.操作数据库
    const res = await createUser(user_name, password, 1);
    console.log(res);
    //3.返回结果
    ctx.body = {
      code: 0,
      msg: "用户注册成功！",
      result: Object.assign(res, { password: undefined }),
    };
  }

  async login(ctx, next) {
    // 认证成功进入这里
    //ctx.user为上一个中间件从数据库读取到的user信息
    const { user_name, id, is_admin } = ctx.state.user;
    const token = jwt.sign({ id, user_name, is_admin }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24 * 7, //7天
      algorithm: "RS256",
    });
    const userInfo = Object.assign(ctx.state.user, {
      password: undefined,
    });
    ctx.body = {
      code: 0,
      msg: "用户登录成功",
      result: {
        token,
        userInfo,
      },
    };
  }
  async changePassword(ctx, next) {
    //1.获取数据
    const id = ctx.state.user.id;
    const { password } = ctx.request.body;
    //2.操作数据库
    const result = await updateById({ id, password });
    if (result) {
      ctx.body = {
        code: 0,
        msg: "修改密码成功!",
      };
    } else {
      ctx.body = {
        code: -1,
        msg: "修改密码错误!",
      };
    }
  }
  async getUserList(ctx, next) {
    await ctx.findAll(User, {
      attributes: {
        exclude: ["password", "deletedAt"],
      },
    });
  }
}
module.exports = new UserController();
