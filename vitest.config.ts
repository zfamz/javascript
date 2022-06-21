import { defineConfig } from "vitest/config";
import { resolve } from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': `${resolve(__dirname, 'src')}`,
      '@arr': `${resolve(__dirname, 'src/array')}`,
    },
  },
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
