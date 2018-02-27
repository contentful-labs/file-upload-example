module.exports = {
    "parser": "babel-eslint",
    "extends": ["standard", "standard-preact", "plugin:jest/recommended"],
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
    },
    "rules": {
        "jest/prefer-to-be-null": "warn",
        "jest/prefer-to-be-undefined": "warn"
    }
};
