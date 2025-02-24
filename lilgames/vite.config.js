import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js', 'resources/js/validations/validarPwd.js','resources/js/validations/fav.js','resources/js/validations/star.js'],
            refresh: true,
        }),
    ],
});
