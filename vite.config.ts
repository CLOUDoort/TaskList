import { defineConfig, loadEnv } from 'vite';

import path from 'path';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');
  return {
    // vite config
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 5173,
    },
    build: {
      sourcemap: true,

      rollupOptions: {
        onLog(level, log: any, handler) {
          if (log.cause && log.cause.message === `Can't resolve original location of error.`) {
            return;
          }
          handler(level, log);
        },
      },
    },
  };
});
