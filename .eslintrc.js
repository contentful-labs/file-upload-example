module.exports = {
    "parser": "babel-eslint",
    "extends": ["standard", "standard-react"],
    "installedESLint": true,
    "parserOptions": {
      "ecmaFeatures": {
        "modules": true,
        "jsx": true
      }
    },
    "plugins": [
        "standard",
        "babel",
        "react"
    ],
    "settings": {
        "react": {
            "pragma": "h"
        }
    }
};
