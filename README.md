# Movies

¿How does that work?

Require Node.js v18.15.0

* `npm install` to install the dependencies
* `npm run dev` to run development mode app
* `npm start` to build production


## ESLint
Quick start `npm init @eslint/config`

Install dependencies:

`npm i eslint-config-standard-with-typescript -D -E`

https://www.npmjs.com/package/eslint-config-standard-with-typescript


`.eslintrc.cjs`
```json
"extends": [
  "eslint-config-standard-with-typescript",
],
"parserOptions": {
  "project": "./tsconfig.json"
},
```