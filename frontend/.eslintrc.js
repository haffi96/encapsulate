module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: [
        'react',
    ],
    rules: {
        'react/prop-types': 0,
        'no-console': 'off',
        'no-alert': 'off',
        'react/jsx-indent': 'off',
        'react/jsx-indent-props': 'off',
        indent: 'off',
    },
};
