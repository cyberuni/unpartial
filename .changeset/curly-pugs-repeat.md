---
'unpartial': patch
---

Rebuild with tsdown instead of `tsc` + `buddy ts build cjs`.

The published paths are unchanged — `cjs/index.js`, `esm/index.js` and their
`.d.ts`/`.map` siblings are all still emitted at the same locations, and the tarball
file list is identical to 1.0.6. What changes is the emitted JavaScript: both builds
now target ES2022, where the CommonJS output was previously downlevelled to ES5.

`engines.node` moves from `>=6` to `>= 20` to match. The `>=6` value has been wrong
since this package became `"type": "module"` with an `exports` map, neither of which
Node 6 understands.
