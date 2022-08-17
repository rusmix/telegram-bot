module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    settings: {
        'import/resolver': {
            'node': {
                'paths': ['src'],
            },
        },
    },
    ignorePatterns: [
        '/node_modules',
        '/public',
        '/build',
        '**/*.js',
    ],
    plugins: [
        '@typescript-eslint',
        'simple-import-sort',
        'justinanastos',
        'modules-newline',
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
    ],
    rules: {

    },
};
