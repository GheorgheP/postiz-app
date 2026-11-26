import react from '@vitejs/plugin-react';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import tsconfigPaths from 'vite-tsconfig-paths';
import { localUploads, runtimeConfig } from './custom-vite-plugins';

export default defineConfig(({ mode }) => ({
  plugins: [
    // must come before react()
    tanstackRouter({
      target: 'react',
      routesDirectory: './src/app',
      generatedRouteTree: './src/routeTree.gen.ts',
      autoCodeSplitting: true,
    }),
    tsconfigPaths(),
    react(),
    // Next.js shipped browser versions of the Node.js modules and the Buffer /
    // process globals, the wallet login (@postiz/wallets) depends on them
    nodePolyfills(),
    runtimeConfig(),
    localUploads(),
  ],
  // Same as Next.js: NEXT_PUBLIC_* variables are inlined at build time and any
  // other process.env read in browser code is undefined. Settings that must
  // change without a rebuild go through runtime.config.mjs instead.
  define: {
    ...Object.fromEntries(
      Object.entries(process.env)
        .filter(([key]) => key.startsWith('NEXT_PUBLIC_'))
        .map(([key, value]) => [`process.env.${key}`, JSON.stringify(value)])
    ),
    'process.env.NODE_ENV': JSON.stringify(mode),
    'process.env': '{}',
  },
  server: {
    port: 4200,
  },
  preview: {
    port: 4200,
  },
}));
