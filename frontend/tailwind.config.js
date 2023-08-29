/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './App.{js,jsx,ts,tsx}',
        './screens/**/*.{js,jsx,ts,tsx}',
        './components/**/*.{js,jsx,ts,tsx}',
    ],
    // darkMode: 'class',
    theme: {
        extend: {
            colors: {
                purple: '#383A59',
                accent: '#BD93F9',
                customShadowDark: '#282A36',
                customAccentSecondary: '#c39df9',
                customBorderBottom: '#62669d',
                googleSignIn: '#4285F4',
            },
        },
        fontFamily: {
            roboto: ['Roboto', 'sans-serif'],
        },
    },
    plugins: ['nativewind/babel'],
};
