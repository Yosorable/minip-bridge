import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/kysely/index.ts"],

  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
});
