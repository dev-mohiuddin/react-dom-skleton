import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import fs from 'fs';
import path from 'path';

// Simple CSS plugin
const cssPlugin = {
  name: 'css-plugin',
  resolveId(id) {
    if (id.endsWith('.css')) {
      return path.resolve(id);
    }
  },
  load(id) {
    if (id.endsWith('.css')) {
      try {
        const content = fs.readFileSync(id, 'utf-8');
        return `export default ${JSON.stringify(content)};`;
      } catch (err) {
        console.warn(`Warning: Could not load CSS file ${id}`);
        return `export default '';`;
      }
    }
  }
};

const packageJson = JSON.parse(fs.readFileSync(path.resolve('./package.json'), 'utf8'));

const external = [
  ...Object.keys(packageJson.peerDependencies || {}),
  ...Object.keys(packageJson.dependencies || {}),
];

export default [
  // ESM and CJS builds
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.module,
        format: 'es',
        sourcemap: true,
      },
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
      },
    ],
    external,
    plugins: [
      cssPlugin,
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: 'dist',
      }),
    ],
  },
  // Type definitions
  {
    input: 'src/index.ts',
    output: {
      file: packageJson.types,
      format: 'es',
    },
    external,
    plugins: [cssPlugin, dts()],
  },
];
