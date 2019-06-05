module.exports = {
  "extends": "airbnb",
  "globals": {
    "SERVER_API_BASEURL": true,
    "React": true,
    "shallow": true,
    "render": true,
    "mount": true,
  },
  "rules": {
    "global-require": 0,
    "no-console": 0,
    "no-param-reassign": 0,
  },
  "env": {
    "browser": true,
    "jest": true,
  },
  "parser": "babel-eslint",
};