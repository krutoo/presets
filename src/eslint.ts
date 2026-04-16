import { fileURLToPath } from 'node:url';
import { includeIgnoreFile } from '@eslint/compat';
import pluginJs from '@eslint/js';
import confusingBrowserGlobals from 'confusing-browser-globals';
import pluginJSDoc from 'eslint-plugin-jsdoc';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import { type Config, defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

// @todo сделать namespace с отдельными config'ами чтобы можно было точечно подключать?
// @todo сделать функцию с настройками вроде preset({ gitignore: false, react: false })?

const gitignorePath = fileURLToPath(new URL('.gitignore', import.meta.url));

const configs: Config[] = defineConfig([
  // Global ignores
  includeIgnoreFile(gitignorePath, 'Imported .gitignore patterns'),

  // Basics
  {
    files: ['**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}'],
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  pluginJs.configs.recommended,
  tseslint.configs.recommended,
  {
    rules: {
      'object-shorthand': 'error',
      'no-console': 'error',
      eqeqeq: 'error',
      'no-param-reassign': 'error',
      'no-restricted-globals': ['error', { globals: confusingBrowserGlobals }],
      '@typescript-eslint/no-explicit-any': 'off',
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/no-empty-object-type': [
        'error',
        {
          allowInterfaces: 'always',
        },
      ],
    },
  },

  // CommonJS
  {
    files: ['**/*.{cjs,cts}'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },

  // React
  pluginReact.configs.flat.recommended!,
  pluginReact.configs.flat['jsx-runtime']!,
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'react/prop-types': 'off',
      'react/jsx-curly-brace-presence': 'warn',
    },
  },

  // React hooks
  pluginReactHooks.configs.flat['recommended-latest'],
  {
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': [
        'warn',
        {
          additionalHooks: '(useIsomorphicLayoutEffect)',
        },
      ],

      // следующие правила отключены тк не позволяют удобно писать хуки
      'react-hooks/refs': 'off',
      'react-hooks/set-state-in-effect': 'off',
    },
  },

  // JSDoc
  pluginJSDoc.configs['flat/recommended'],
  {
    rules: {
      'jsdoc/require-description-complete-sentence': 'warn',
      'jsdoc/require-param': [
        'warn',
        {
          checkDestructured: false,
        },
      ],
      'jsdoc/check-param-names': [
        'warn',
        {
          checkDestructured: false,
        },
      ],
      'jsdoc/require-param-type': 'off',
      'jsdoc/require-property-type': 'off',
      'jsdoc/require-returns-type': 'off',
      'jsdoc/require-yields-type': 'off',
      'jsdoc/require-throws-type': 'off',
      'jsdoc/tag-lines': 'off',
      'jsdoc/require-jsdoc': 'error',
    },
  },
  {
    files: ['**/*.{test,spec}.{js,mjs,cjs,ts,jsx,tsx}'],
    rules: {
      'jsdoc/require-jsdoc': 'off',
    },
  },
]);

export default configs;
