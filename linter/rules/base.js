module.exports = {
    // Common structure
    '@typescript-eslint/brace-style': ['error', '1tbs'],
    '@typescript-eslint/indent': ['error', 4, {
        'SwitchCase': 1,
    }],
    'max-statements-per-line': ['error', {'max': 1}],
    'quotes': ['error', 'single'],
    'eol-last': ['error', 'always'],
    'no-multiple-empty-lines': ['error', {
        'max': 1,
        'maxBOF': 0,
        'maxEOF': 0
    }],
    'semi': ['error', 'always'],
    'semi-spacing': ['error', {'before': false, 'after': true}],
    'space-in-parens': ['error', 'never'],
    'no-multi-spaces': ['error'],
    '@typescript-eslint/no-explicit-any': ['off'],
    'no-trailing-spaces': ['warn'],
    'padding-line-between-statements': ['error',
        {'blankLine': 'always', 'prev': 'if', 'next': '*'},
        {'blankLine': 'never', 'prev': 'if', 'next': 'if'},
        {'blankLine': 'always', 'prev': '*', 'next': 'return'},
        {'blankLine': 'never', 'prev': 'if', 'next': 'break'},

        {'blankLine': 'always', 'prev': '*', 'next': 'switch'},
        {'blankLine': 'always', 'prev': 'switch', 'next': '*'},

        {'blankLine': 'always', 'prev': '*', 'next': 'try'},
        {'blankLine': 'always', 'prev': 'try', 'next': '*'},

        {'blankLine': 'always', 'prev': '*', 'next': 'const'},
        {'blankLine': 'always', 'prev': 'const', 'next': '*'},
        {'blankLine': 'always', 'prev': '*', 'next': 'let'},
        {'blankLine': 'always', 'prev': 'let', 'next': '*'},
        {'blankLine': 'any', 'prev': 'const', 'next': 'let'},
        {'blankLine': 'any', 'prev': 'let', 'next': 'const'},
        {'blankLine': 'any', 'prev': 'const', 'next': 'const'},
        {'blankLine': 'any', 'prev': 'let', 'next': 'let'},

        {'blankLine': 'always', 'prev': '*', 'next': 'while'},
        {'blankLine': 'always', 'prev': 'while', 'next': '*'},

        {'blankLine': 'always', 'prev': '*', 'next': 'for'},
        {'blankLine': 'always', 'prev': 'for', 'next': '*'},

        {'blankLine': 'never', 'prev': '*', 'next': 'case'},
        {'blankLine': 'never', 'prev': 'case', 'next': '*'},

        {'blankLine': 'never', 'prev': '*', 'next': 'default'},
        {'blankLine': 'never', 'prev': 'default', 'next': '*'},

        {'blankLine': 'always', 'prev': '*', 'next': 'class'},
        {'blankLine': 'always', 'prev': 'class', 'next': '*'},

        {'blankLine': 'always', 'prev': '*', 'next': 'function'},
        {'blankLine': 'always', 'prev': 'function', 'next': '*'},
    ],

    // Imports
    'import/newline-after-import': ['error', {
        'count': 1,
    }],
    'no-duplicate-imports': ['error'],
    'modules-newline/import-declaration-newline': ['error'],

    // Variables
    '@typescript-eslint/naming-convention': [
        'error',
        {
            'selector': ['variable'],
            'format': ['PascalCase', 'camelCase', 'UPPER_CASE']
        },
        {
            'selector': ['function'],
            'format': ['camelCase']
        },
        {
            'selector': ['parameter', 'classProperty', 'objectLiteralProperty', 'objectLiteralMethod', 'typeProperty', 'typeMethod'],
            'format': ['camelCase', 'UPPER_CASE'],
            'leadingUnderscore': 'allow',
            'filter': {
                'regex': '.*_id.*',
                'match': false,
            },
        },
        {
            'selector': ['enum', 'enumMember'],
            'format': ['UPPER_CASE'],
        },
        {
            'selector': ['class'],
            'format': ['PascalCase'],
        },
        {
            'selector': ['interface', 'typeAlias', 'typeParameter'],
            'format': ['PascalCase'],
            'custom': {
                'regex': '^I\\w+$',
                'match': true
            }
        }
    ],
    '@typescript-eslint/no-unused-vars': ['warn', {
        'argsIgnorePattern': '_',
    }],
    '@typescript-eslint/space-infix-ops': ['error'],
    'one-var': ['error', 'never'],
    'camelcase': ['error', {
        'properties': 'always',
    }],
    'init-declarations': ['error', 'always'],

    // Interfaces
    '@typescript-eslint/method-signature-style': ['error', 'method'],
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    '@typescript-eslint/type-annotation-spacing': ['error'],
    '@typescript-eslint/member-delimiter-style': ['error'],
    '@typescript-eslint/no-empty-interface': ['warn', {
        'allowSingleExtends': true,
    }],

    // Enums
    '@typescript-eslint/prefer-enum-initializers': ['error'],
    '@typescript-eslint/prefer-literal-enum-member': ['error'],

    // Objects
    'object-shorthand': ['error', 'always'],
    'object-property-newline': ['error'],
    'key-spacing': ['error', {'mode': 'strict'}],
    '@typescript-eslint/object-curly-spacing': ['error', 'never'],
    'comma-dangle': ['error', {
        'arrays': 'always-multiline',
        'objects': 'always-multiline',
        'imports': 'always-multiline',
        'exports': 'always-multiline',
        'functions': 'never'
    }],
    'comma-spacing': ['error', {'before': false, 'after': true}],
    'comma-style': ['error', 'last', {'exceptions': {'ObjectPattern': false}}],
    'object-curly-newline': ['error', {
        'ObjectExpression': {
            'multiline': true,
            'consistent': true,
        },
        'ObjectPattern': {
            'multiline': true,
            'consistent': true,
        },
        'ImportDeclaration': {
            'multiline': true,
            'consistent': true,
        },
        'ExportDeclaration': 'never',
    }],

    // Arrays
    'array-bracket-spacing': ['error', 'never'],
    'array-bracket-newline': ['error', 'consistent'],

    // Functions
    'arrow-parens': ['error', 'always'],
    'space-before-function-paren': ['error', {
        'named': 'never',
        'anonymous': 'never',
        'asyncArrow': 'always',
    }],
    'function-call-argument-newline': ['error', 'consistent'],
    'func-call-spacing': ['error', 'never'],
    'arrow-spacing': ['error', {'before': true, 'after': true}],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-empty-function': ['warn'],

    // Syntax structure
    'operator-linebreak': ['error', 'after'],
    'keyword-spacing': ['error', {'before': true, 'after': true}],
    'space-before-blocks': ['error', 'always'],
    'newline-per-chained-call': ['error'],
    'padded-blocks': ['error', 'never'],
    'justinanastos/switch-braces': ['error'],

    // Other

    '@typescript-eslint/ban-ts-comment': 'off',
};
