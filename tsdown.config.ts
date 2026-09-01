import { writeFile } from 'node:fs/promises'
import { defineConfig } from 'tsdown'

const entry = ['ts/index.ts']

// Two outputs, each pinned to the path this package already publishes at, so
// replacing `tsc` + `buddy ts build cjs` with tsdown stays invisible to consumers:
//   esm/ — the ESM build plus its .d.ts
//   cjs/ — the CommonJS build, marked commonjs by its own package.json
export default defineConfig([
	{
		entry,
		format: 'esm',
		outDir: 'esm',
		// Without this the output is .mjs / .d.mts, which moves published paths.
		outExtensions: () => ({ js: '.js', dts: '.d.ts' }),
		dts: true,
		sourcemap: true,
		// Mirror the source tree rather than bundling, so the ESM output keeps the
		// per-module shape tsc used to emit and stays tree-shakeable downstream.
		unbundle: true,
		target: 'es2022'
	},
	{
		entry,
		format: 'cjs',
		outDir: 'cjs',
		outExtensions: () => ({ js: '.js', dts: '.d.ts' }),
		dts: true,
		sourcemap: true,
		target: 'es2022',
		hooks: {
			// The package root is `"type": "module"`, so cjs/index.js is only read as
			// CommonJS because of this marker. tsdown's `copy` treats `to` as a
			// directory, which is why this is written rather than copied.
			'build:done': () => writeFile('cjs/package.json', '{ "type": "commonjs" }\n')
		}
	}
])
