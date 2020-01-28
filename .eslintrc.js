module.exports = {
  "extends": [
    "eslint:recommended",
    "prettier",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  "plugins": [
    "@typescript-eslint",
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "sourceType": "module",
    "project": "./tsconfig.json",
    "ecmaFeatures": {
    }
  },
  overrides: [
    {
      "files": ["src/**/*.ts",],
    }
  ],
  "env": {
    "node": true
  }
};
