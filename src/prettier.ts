import type { Config } from 'prettier';

const config: Config = {
  arrowParens: 'avoid',
  bracketSpacing: true,
  jsxSingleQuote: true,
  printWidth: 100,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  plugins: ['@trivago/prettier-plugin-sort-imports'],

  // plugin sort imports:
  importOrderSortSpecifiers: true,
  importOrderSeparation: false,
  importOrder: [
    // builtin modules:
    '^node:', // @todo как быть с deno:, npm:, bun: и тд?

    // packages:
    '^react',
    '<THIRD_PARTY_MODULES>',

    // project aliases:
    '^#(.*)$',

    // any other relative/absolute path that are not styles
    '^[./]((?!.css$).)*$',

    // styles
    '\\.css$',
  ],
};

export default config;
