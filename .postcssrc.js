module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 320,
      viewportUnit: "vw",
      selectorBlackList: [".ignore", ".hairlines", ".iconfont"],
      minPixelValue: 1,
      mediaQuery: false
    }
  }
};
