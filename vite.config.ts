import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite-plus";

export default defineConfig({
  base: "/dmz-fob-upgrade-tracker/",
  plugins: [vue()],
  fmt: {},
  lint: {
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
    rules: { "vite-plus/prefer-vite-plus-imports": "error" },
    options: { typeAware: true, typeCheck: true },
  },
  staged: {
    "*.{ts,tsx,js,jsx,vue}": ["vp check --fix"],
  },
});
