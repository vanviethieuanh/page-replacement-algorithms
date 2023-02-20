import { defineConfig } from "vite"
import { svelte } from "@sveltejs/vite-plugin-svelte"
import tsconfigPaths from "vite-tsconfig-paths"

// https://vitejs.dev/config/
export default defineConfig({
    base: "/page-replacement-algorithms/",
    plugins: [svelte(), tsconfigPaths()],
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: '@use "src/variables.scss" as *;',
            },
        },
    },
})
