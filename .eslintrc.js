module.exports = {
    "parser": "babel-eslint",
    "extends": ["standard", "standard-preact"],
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
    },
    "globals": {
        "System": true
    }
};
