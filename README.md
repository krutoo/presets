# Presets

Set of presets for format/lint/test/build etc.

## Install

```sh
npm add -D @krutoo/presets
```

## Usage

### ESLint

```ts
// eslint.config.{js,ts}
import preset from '@krutoo/presets/eslint';

export default [
  ...preset,
  // ...optionally your overrides and other configs
];
```

### Prettier

When using JS/TS:

```ts
// prettier.config.{js,ts}
export { default } from '@krutoo/presets/prettier';
```

When using JSON:

```jsonc
// .prettierrc.json
"@krutoo/presets/prettier"
```

### TypeScript

For static analysis in your editor/IDE and for `tsc -p . --noEmit`:

```jsonc
// tsconfig.json
{
  "extends": "@krutoo/presets/tsconfig.check.json",
}
```

This preset will check all files in your project root, where `tsconfig.json` placed.

---

For build your package via `tsc -p tsconfig.build.json`:

```jsonc
// tsconfig.build.json
{
  "extends": "@krutoo/presets/tsconfig.build.json",
}
```

This preset will try to build from `src` folder to `dist` folder.

### To Do

- `bin` to use like `npx presets --init --all` for automatically create config files
