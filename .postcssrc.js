module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 320,
      viewportUnit: "vw",
      selectorBlackList: [".ignore", ".hairlines",".toolBar",".navbar",".tabs"],
      minPixelValue: 1,
      mediaQuery: false
    }
  }
};
