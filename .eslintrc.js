module.exports = {
  "parser": "babel-eslint",
  "env": {
    "browser": true
  },
  "extends": ["eslint:recommended", "plugin:react/recommended"],
  "plugins": [
    "react"
  ],
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "rules": {
    "semi": [2, "never"],
    "no-console": 0,
    "no-unused-vars": [2, { "varsIgnorePattern": "^_$" }]
  },
}
