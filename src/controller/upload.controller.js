const fs = require("fs");
const FormData = require("form-data");
const { SMMS_AUTH } = require("../app/config");

const axios = require("axios");
class uploadController {
  async uploadImg(ctx, next) {
    const file = ctx.request.files["img"];
    const stream = fs.createReadStream(file.path);
    const formData = new FormData();
    formData.append("smfile", stream);
    const formHeaders = formData.getHeaders();
    const res = await axios.post("https://sm.ms/api/v2/upload", formData, {
      headers: {
        Authorization: SMMS_AUTH,
        ...formHeaders,
      },
    });
    const { success, message, data } = res.data;
    console.log(res.data);
    if (success) {
      ctx.body = {
        code: 0,
        msg: message,
        result: data,
      };
    } else {
      ctx.body = {
        code: -1,
        msg: message,
      };
    }
  }
  async uploadImgHistory(ctx, next) {
    const { page } = ctx.request.query;
    const res = await axios({
      url: "https://sm.ms/api/v2/upload_history",
      headers: {
        Authorization: SMMS_AUTH,
      },
      params: { page },
    });
    const { success, message, data, CurrentPage, TotalPages } = res.data;
    if (success) {
      ctx.body = {
        code: 0,
        msg: message,
        result: data,
        CurrentPage,
        TotalPages,
      };
    } else {
      ctx.body = {
        code: -1,
        msg: message,
      };
    }
  }
  async DelImg(ctx, next) {
    const { hash } = ctx.request.params;
    const { data } = await axios({
      url: "https://sm.ms/api/v2/delete/" + hash,
      headers: {
        Authorization: SMMS_AUTH,
      },
    });
    const { success, message } = data;
    ctx.body = {
      code: success ? 0 : -1,
      msg: message,
      result: "",
    };
  }
}
module.exports = new uploadController();
