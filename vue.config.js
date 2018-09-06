module.exports = {
  baseUrl: "./",
  assetsDir: "./",
  chainWebpack: config => {
    config.module
      .rule("images")
      .use("url-loader")
      .loader("url-loader")
      .options({
        limit: 8192,
        fallback: {
          loader: "file-loader",
          options: {
            name: "img/[name].[hash:8].[ext]"
          }
        }
      });
  }
};
