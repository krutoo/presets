# Presets

Set of presets for format/lint/test/build etc.

## Install

```sh
npm add @krutoo/presets
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

```json
// .prettierrc.json
"@krutoo/presets/prettier"
```

### TypeScript

For static analysis in your editor/IDE and for `tsc -p . --noEmit`:

```json
// tsconfig.json
{
  "extends": "@krutoo/presets/tsconfig.check.json",
  "compilerOptions": {
    "rootDir": "."
  }
}
```

For build your package via `tsc -p tsconfig.build.json`:

```json
// tsconfig.build.json
{
  "extends": "@krutoo/presets/tsconfig.build.json",
  "compilerOptions": {
    "rootDir": "src",
    "outDir": "dist"
  },
  "include": "src"
}
```
