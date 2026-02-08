import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
    resolve: {
        alias: {
            "@": path.resolve(process.cwd(), "src"),
            "@css": path.resolve(process.cwd(), "src/css")
        }
    }
});
