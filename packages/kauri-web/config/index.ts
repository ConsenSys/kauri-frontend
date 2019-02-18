export const config = Object.assign(
  require("./default"),
  process.env.NODE_ENV === "test"
    ? require("./test")
    : process.env.NODE_ENV === "production"
    ? require("./production")
    : require("./development"),
  require("./custom-environment-variables"),
  require("./local")
);

export default config;
