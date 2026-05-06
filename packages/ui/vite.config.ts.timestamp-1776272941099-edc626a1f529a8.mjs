// vite.config.ts
import { defineConfig } from "file:///C:/Users/Admin/Desktop/frontend-engineer-challenge/frontend-engineer-challenge/node_modules/.pnpm/vite@5.4.21_@types+node@25.5.2/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/Admin/Desktop/frontend-engineer-challenge/frontend-engineer-challenge/node_modules/.pnpm/@vitejs+plugin-vue@5.2.4_vite@5.4.21_vue@3.5.32/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { createSvgIconsPlugin } from "file:///C:/Users/Admin/Desktop/frontend-engineer-challenge/frontend-engineer-challenge/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@5.4.21/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import path from "path";
var __vite_injected_original_dirname = "C:\\Users\\Admin\\Desktop\\frontend-engineer-challenge\\frontend-engineer-challenge\\packages\\ui";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(__vite_injected_original_dirname, "src/assets/icons")],
      symbolId: "icon-[dir]-[name]",
      inject: "body-last"
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "src")
    }
  },
  build: {
    lib: {
      entry: path.resolve(__vite_injected_original_dirname, "src/index.ts"),
      name: "OrbittoUI",
      formats: ["es", "cjs"],
      fileName: (format) => format === "es" ? "index.mjs" : "index.cjs"
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue"
        }
      },
      input: {
        index: resolve(__vite_injected_original_dirname, "src/index.ts")
      }
    },
    outDir: "dist",
    emptyOutDir: true
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxBZG1pblxcXFxEZXNrdG9wXFxcXGZyb250ZW5kLWVuZ2luZWVyLWNoYWxsZW5nZVxcXFxmcm9udGVuZC1lbmdpbmVlci1jaGFsbGVuZ2VcXFxccGFja2FnZXNcXFxcdWlcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXEFkbWluXFxcXERlc2t0b3BcXFxcZnJvbnRlbmQtZW5naW5lZXItY2hhbGxlbmdlXFxcXGZyb250ZW5kLWVuZ2luZWVyLWNoYWxsZW5nZVxcXFxwYWNrYWdlc1xcXFx1aVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvQWRtaW4vRGVza3RvcC9mcm9udGVuZC1lbmdpbmVlci1jaGFsbGVuZ2UvZnJvbnRlbmQtZW5naW5lZXItY2hhbGxlbmdlL3BhY2thZ2VzL3VpL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJztcclxuaW1wb3J0IHsgY3JlYXRlU3ZnSWNvbnNQbHVnaW4gfSBmcm9tICd2aXRlLXBsdWdpbi1zdmctaWNvbnMnO1xyXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW1xyXG4gICAgdnVlKCksXHJcbiAgICBjcmVhdGVTdmdJY29uc1BsdWdpbih7XHJcbiAgICAgIGljb25EaXJzOiBbcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9hc3NldHMvaWNvbnMnKV0sXHJcbiAgICAgIHN5bWJvbElkOiAnaWNvbi1bZGlyXS1bbmFtZV0nLFxyXG4gICAgICBpbmplY3Q6ICdib2R5LWxhc3QnLFxyXG4gICAgfSksXHJcbiAgXSxcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczoge1xyXG4gICAgICAnQCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBidWlsZDoge1xyXG4gICAgbGliOiB7XHJcbiAgICAgIGVudHJ5OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2luZGV4LnRzJyksXHJcbiAgICAgIG5hbWU6ICdPcmJpdHRvVUknLFxyXG4gICAgICBmb3JtYXRzOiBbJ2VzJywgJ2NqcyddLFxyXG4gICAgICBmaWxlTmFtZTogKGZvcm1hdCkgPT4gZm9ybWF0ID09PSAnZXMnID8gJ2luZGV4Lm1qcycgOiAnaW5kZXguY2pzJyxcclxuICAgIH0sXHJcbiAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgIGV4dGVybmFsOiBbJ3Z1ZSddLFxyXG4gICAgICBvdXRwdXQ6IHtcclxuICAgICAgICBnbG9iYWxzOiB7XHJcbiAgICAgICAgICB2dWU6ICdWdWUnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICAgIGlucHV0OiB7XHJcbiAgICAgICAgaW5kZXg6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2luZGV4LnRzJyksXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgb3V0RGlyOiAnZGlzdCcsXHJcbiAgICBlbXB0eU91dERpcjogdHJ1ZSxcclxuICB9LFxyXG59KTsiXSwKICAibWFwcGluZ3MiOiAiO0FBQWdkLFNBQVMsb0JBQW9CO0FBQzdlLE9BQU8sU0FBUztBQUNoQixTQUFTLDRCQUE0QjtBQUNyQyxPQUFPLFVBQVU7QUFIakIsSUFBTSxtQ0FBbUM7QUFLekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLElBQ0oscUJBQXFCO0FBQUEsTUFDbkIsVUFBVSxDQUFDLEtBQUssUUFBUSxrQ0FBVyxrQkFBa0IsQ0FBQztBQUFBLE1BQ3RELFVBQVU7QUFBQSxNQUNWLFFBQVE7QUFBQSxJQUNWLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxLQUFLO0FBQUEsSUFDcEM7QUFBQSxFQUNGO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxLQUFLO0FBQUEsTUFDSCxPQUFPLEtBQUssUUFBUSxrQ0FBVyxjQUFjO0FBQUEsTUFDN0MsTUFBTTtBQUFBLE1BQ04sU0FBUyxDQUFDLE1BQU0sS0FBSztBQUFBLE1BQ3JCLFVBQVUsQ0FBQyxXQUFXLFdBQVcsT0FBTyxjQUFjO0FBQUEsSUFDeEQ7QUFBQSxJQUNBLGVBQWU7QUFBQSxNQUNiLFVBQVUsQ0FBQyxLQUFLO0FBQUEsTUFDaEIsUUFBUTtBQUFBLFFBQ04sU0FBUztBQUFBLFVBQ1AsS0FBSztBQUFBLFFBQ1A7QUFBQSxNQUNGO0FBQUEsTUFDQSxPQUFPO0FBQUEsUUFDTCxPQUFPLFFBQVEsa0NBQVcsY0FBYztBQUFBLE1BQzFDO0FBQUEsSUFDRjtBQUFBLElBQ0EsUUFBUTtBQUFBLElBQ1IsYUFBYTtBQUFBLEVBQ2Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
