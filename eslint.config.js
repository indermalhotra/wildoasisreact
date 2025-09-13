import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        browser: true,
        node: true,
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
    },
    rules: {
      // General rules
      "no-unused-vars": "warn",
      "semi": ["error", "always"],
      "quotes": ["error", "double"],

      // React-specific
      "react/react-in-jsx-scope": "off", // Not needed in React 17+
      "react/prop-types": "off",        // Disable if you use TypeScript
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
