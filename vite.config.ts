import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [react()],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
    },
    build: {
      // Output directory
      outDir: 'dist',
      // Clean output directory before build
      emptyOutDir: true,
      // Bundle optimization
      rollupOptions: {
        output: {
          // Let Vite handle chunking automatically for optimal bundle size
          // Optimize asset naming for caching
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name?.split('.') || []
            const ext = info[info.length - 1]
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
              return `assets/images/[name]-[hash][extname]`
            }
            if (/css/i.test(ext)) {
              return `assets/css/[name]-[hash][extname]`
            }
            return `assets/[name]-[hash][extname]`
          },
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
        },
        // Additional rollup optimizations
        external: [],
        treeshake: {
          moduleSideEffects: false,
          propertyReadSideEffects: false,
          unknownGlobalSideEffects: false,
        },
      },
      // Enable source maps for production debugging (disable for smaller builds)
      sourcemap: mode === 'development',
      // Optimize chunk size
      chunkSizeWarningLimit: 1000,
      // Enable minification
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: mode === 'production', // Remove console.log in production
          drop_debugger: true,
          pure_funcs: mode === 'production' ? ['console.log', 'console.info'] : [],
          passes: 2, // Multiple passes for better compression
        },
        mangle: {
          safari10: true,
        },
        format: {
          comments: false, // Remove comments in production
        },
      },
      // Target modern browsers for better optimization
      target: ['es2015', 'chrome58', 'firefox57', 'safari11'],
      // CSS code splitting
      cssCodeSplit: true,
      // Report compressed file sizes
      reportCompressedSize: true,
      // Optimize CSS
      cssMinify: true,
      // Asset inlining threshold
      assetsInlineLimit: 4096,
    },
    // Performance optimizations
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-hook-form', '@emailjs/browser'],
    },
    // Server configuration for development
    server: {
      // Optimize HMR
      hmr: {
        overlay: true,
      },
    },
    // Preview server configuration
    preview: {
      port: 4173,
      strictPort: true,
    },
  }
})