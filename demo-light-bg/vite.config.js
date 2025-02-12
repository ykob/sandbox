import { resolve } from 'path';
import { defineConfig } from "vite";
import glsl from "vite-plugin-glsl";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [glsl()],
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src'),
    },
  },
  server: {
    host: true,
    port: 3000,
  },
});
