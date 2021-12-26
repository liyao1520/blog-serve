const fs = require("fs");

module.exports = function (app) {
  fs.readdirSync(__dirname).forEach((filename) => {
    if (filename === "index.js") return;
    const router = require("./" + filename);
    app.use(router.routes());
    app.use(router.allowedMethods());
  });
  console.log("动态加载所有路由完成~");
};
