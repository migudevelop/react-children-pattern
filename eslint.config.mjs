import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

const ESLINT_OPTION = {
  ERROR: "error",
  WARN: "warn",
  OFF: "off",
};

export default tseslint.config(
  { files: ["**/*.ts"] },
  {
    ignores: ["**/node_modules/**", "**/dist/**"],
  },
  { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  { languageOptions: { globals: globals.node } },
  {
    files: ["**/*.ts"],
    extends: [pluginJs.configs.recommended, ...tseslint.configs.recommended],
    rules: {
      "no-console": ESLINT_OPTION.WARN,
      "@typescript-eslint/no-unused-vars": ESLINT_OPTION.ERROR,
    },
  },
  {
    files: ["src/**/*.{js,mjs,ts}"],
    extends: [eslintPluginPrettierRecommended],
    rules: {
      ...eslintPluginPrettierRecommended.rules,
      "prettier/prettier": [
        ESLINT_OPTION.ERROR,
        {
          singleQuote: false,
          semi: true,
          trailingComma: "es5",
          tabWidth: 2,
        },
      ],
    },
  }
);
