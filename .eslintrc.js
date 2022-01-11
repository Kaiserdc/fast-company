module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: ['plugin:react/recommended', 'standard'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 12,
        sourceType: 'module'
    },
    plugins: ['react'],
    rules: {
        indent: ['warn', 4],
        semi: ['error', 'never'],
        quotes: ['error', 'single'],
        'space-before-function-paren': [
            'error',
            {
                anonymous: 'always',
                named: 'never'
            }
        ],
        'object-curly-spacing': ['error', 'always'],
        'comma-dangle': ['error', 'only-multiline'],
        'no-unused-vars': ['warn'],
        'spaced-comment': ['off'],
        'no-trailing-spaces': ["error", { "skipBlankLines": true }]
        
    }
}
