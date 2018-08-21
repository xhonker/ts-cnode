module.exports = {
  moduleFileExtensions: ["ts", "js", "jsx", "json", "vue"],
  transform: {
    "^.+\\.vue$": "vue-jest",
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$":
      "jest-transform-stub",
    "^.+\\.ts?$": "ts-jest"
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  snapshotSerializers: ["jest-serializer-vue"],
  testMatch: [
    "<rootDir>/(tests/unit/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)|src/**/**/__test__/*.spec.(ts))"
  ]
};
