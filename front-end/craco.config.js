const path = require("path");

module.exports = {
  plugins: [
    {
      plugin: require("craco-alias"),
      options: {
        source: "tsconfig",
        tsConfigPath: "./tsconfig.json",
      },
    },
  ],
  devServer: {
    allowedHosts: "all",
  }
};
