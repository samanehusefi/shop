import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import type { Plugin } from "vite";

function replaceAssetsPlugin(): Plugin {
    return {
        name: "replace-assets",

        closeBundle() {
            const distDir = path.resolve("dist");

            const walk = (dir: string): void => {
                for (const file of fs.readdirSync(dir)) {
                    const fullPath = path.join(dir, file);

                    if (fs.statSync(fullPath).isDirectory()) {
                        walk(fullPath);
                        continue;
                    }

                    if (!/\.(html|js|css|json)$/.test(file))
                        continue;

                    let content = fs.readFileSync(fullPath, "utf8");

                    content = content.replace(
                        /(?:\.\/)?src\/assets\//g,
                        "./assets/"
                    );

                    fs.writeFileSync(fullPath, content);
                }
            };

            walk(distDir);
        }
    };
}

export default defineConfig(({  }) => {
   // const env = loadEnv(mode, process.cwd(), "");

    return {
        plugins: [
            tailwindcss(),
            replaceAssetsPlugin()
        ],

     // base: "./",

         base: "/shop-ts/",

        resolve: {
            alias: {
                "@": path.resolve(__dirname, "src"),
                "@css": path.resolve(__dirname, "src/css")
            }
        }
    };
});