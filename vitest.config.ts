import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    includeSource: ['src/**/*.{js,ts}'],
    // snapshotFormat: {
    //   printBasicPrototype: true
    // }
  },
  // production build remove the is-source test
  define: {
    'import.meta.vitest': 'undefined'
  },
})
