import a11y from "eslint-plugin-jsx-a11y";
import globals from "globals";
import nextPlugin from "@next/eslint-plugin-next";
import path from "path";
import prettierPlugin from "eslint-plugin-prettier";
import jseslint from "@eslint/js";
import tseslint from "typescript-eslint";
import jestPlugin from "eslint-plugin-jest";
import reactHooks from "eslint-plugin-react-hooks";
import tailwindcss from "eslint-plugin-tailwindcss";

export default [
  // -----------------------------
  // Global ignores
  // -----------------------------
  {
    ignores: [
      "node_modules/**",
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/.next/**",
      "**/out/**",
      "next-env.d.ts",
    ],
  },

  // -----------------------------
  // Backend (NestJS)
  // -----------------------------
  {
    files: ["apps/dogs-shelter-backend/**/*.ts"],

    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      parser: tseslint.parser,
      parserOptions: {
        project: path.resolve("./apps/dogs-shelter-backend/tsconfig.json"),
        tsconfigRootDir: path.resolve("./apps/dogs-shelter-backend"),
        ecmaVersion: 2023,
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      prettier: prettierPlugin,
      jest: jestPlugin,
      js: jseslint,
    },
    rules: {
      ...jseslint.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,

      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-floating-promises": "warn",
      "@typescript-eslint/no-unsafe-argument": "warn",

      "prettier/prettier": ["error", { endOfLine: "auto" }],
    },
  },

  // -----------------------------
  // Frontend (Next.js 16 – App Router)
  // -----------------------------
  {
    files: ["apps/dogs-shelter-frontend/**/*.{ts,tsx}"],

    settings: {
      next: {
        rootDir: "apps/dogs-shelter-frontend",
      },
    },

    languageOptions: {
      globals: globals.browser,
      parser: tseslint.parser,
      parserOptions: {
        project: path.resolve("./apps/dogs-shelter-frontend/tsconfig.json"),
        tsconfigRootDir: path.resolve("./apps/dogs-shelter-frontend"),
        ecmaVersion: 2023,
        sourceType: "module",
      },
    },

    plugins: {
      "@next/next": nextPlugin,
      "@typescript-eslint": tseslint.plugin,
      "jsx-a11y": a11y,
      prettier: prettierPlugin,
      jest: jestPlugin,
      js: jseslint,
      "react-hooks": reactHooks,
      tailwindcss: tailwindcss,
    },

    rules: {
      ...jseslint.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      ...tailwindcss.configs["flat/recommended"].rules,

      // Prettier
      "prettier/prettier": ["error", { endOfLine: "auto" }],

      // React fixes for Next.js 13–16
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",

      // Accessibility (recommended for Next.js)
      "jsx-a11y/alt-text": "warn",
      "jsx-a11y/anchor-is-valid": "warn",

      // Next.js Core Web Vitals and best practices
      "@next/next/google-font-display": "warn",
      "@next/next/google-font-preconnect": "warn",
      "@next/next/next-script-for-ga": "warn",
      "@next/next/no-assign-module-variable": "error",
      "@next/next/no-async-client-component": "error",
      "@next/next/no-before-interactive-script-outside-document": "warn",
      "@next/next/no-css-tags": "warn",
      "@next/next/no-document-import-in-page": "error",
      "@next/next/no-duplicate-head": "warn",
      "@next/next/no-head-element": "warn",
      "@next/next/no-head-import-in-document": "error",

      // 🔥 Required for Next.js 16 (App Router) → no pages/ directory
      "@next/next/no-html-link-for-pages": "off",

      "@next/next/no-img-element": "error",
      "@next/next/no-page-custom-font": "warn",
      "@next/next/no-script-component-in-head": "error",
      "@next/next/no-styled-jsx-in-document": "error",
      "@next/next/no-title-in-document-head": "error",
      "@next/next/no-typos": "warn",
      "@next/next/no-unwanted-polyfillio": "warn",

      // Next.js TypeScript adjustments
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/no-misused-promises": "off",
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/no-unused-vars": ["warn", { ignoreRestSiblings: true }],
      "@typescript-eslint/no-explicit-any": "off",
    },
  },

  // -----------------------------
  // Global JS / MJS / CJS support
  // (configs, scripts, next.config.mjs, tailwind.mjs, etc.)
  // -----------------------------
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": ["error", { endOfLine: "auto" }],
    },
  },
];
