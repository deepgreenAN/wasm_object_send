import { defineConfig } from 'vite';
import path from "path";

export default defineConfig({
    resolve: {
        alias: {
            "@src": path.resolve("./src"),
            //"@object_send_wasm": path.resolve("./src/object_send_wasm")
        }
    }
})