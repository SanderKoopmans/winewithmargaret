/** @type {import('@types/eslint').Linter.BaseConfig} */
module.exports = {
  extends: [
    "@remix-run/eslint-config",
    "@remix-run/eslint-config/node",
    "@remix-run/eslint-config/jest-testing-library",
    "prettier"
  ],
  env: {
    "cypress/globals": true
  },
  plugins: ["cypress"],
  // we're using vitest which has a very similar API to jest
  // (so the linting plugins work nicely), but it we have to explicitly
  // set the jest version.
  settings: {
    jest: {
      version: 28
    }
  },
  rules: {
    "semi-style": ["error", "last"],
    "indent": [2, 2, { SwitchCase: 1 }],
    "quotes": ["error", "double", { "avoidEscape": true }],
    "eol-last": ["error", "always"]
  },
};
