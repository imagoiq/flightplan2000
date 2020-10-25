module.exports = {
  root: true,
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@babel/eslint-parser",
    ecmaVersion: 2020,
    sourceType: "module"
  },
  plugins: [
    "@babel"
  ],
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: ["plugin:vue/essential", "eslint:recommended"],

  rules: {
    semi: [2, "always"],
    "object-curly-spacing": ["error", "always"]
  }
};
