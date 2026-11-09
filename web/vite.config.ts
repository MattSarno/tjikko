import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vitest/config";

const timeZones = ["America/Denver", "Pacific/Kiritimati"];

export default defineConfig({
  plugins: [svelte()],
  server: {
    proxy: { "/api": "http://localhost:8080" },
  },
  test: {
    projects: timeZones.map((TZ) => ({
      test: { name: TZ, include: ["tests/**/*.test.ts"], env: { TZ } },
    })),
  },
});
