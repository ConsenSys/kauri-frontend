const babelConfig = require("../kauri-web/babel.config.js");
const index = babelConfig.plugins.indexOf("react-hot-loader/babel");
if (index > -1) {
  babelConfig.plugins.splice(index, 1);
}
module.exports = babelConfig;
