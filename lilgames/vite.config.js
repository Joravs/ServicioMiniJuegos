import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js', 
                'resources/js/validations/validarPwd.js','resources/js/show/fav.js','resources/js/show/star.js','resources/js/validations/validarUsuario.js',
                'resources/js/forms/authForms.js', 'resources/js/show/stats.js'],
            refresh: true,
        }),
    ],
});
