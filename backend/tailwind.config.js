import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            // 1. IREO LOKO AVY AMIN'NY LOGO
            colors: {
                'ong-blue': '#3F4095',        // Manga (ONG Tsinjo Aina)
                'ong-green-light': '#76BC21', // Maitso tanora (Développement)
                'ong-green-dark': '#29B34B',  // Maitso matotra (Effort propre)
            },
            // 2. NY POLICE (FONTS)
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
        },
    },

    plugins: [forms],
};