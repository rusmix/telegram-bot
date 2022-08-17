module.exports = {
    // Imports

    'simple-import-sort/imports': ['error', {
        'groups': [
            ['.*types.*'],
            ['^[\\w@]+.'],
            ['^config'],
            ['^tools/.'],
            ['^helpers/.'],
            ['^instances/.'],
            ['^components/.'],
            ['^../[A-Z]+'],
            ['^./[A-Z]+'],
            ['../'],
            ['./'],
            ['.*(png|svg|jpg)'],
            ['.*scss$'],
            ['^\\u0000'],
        ],
    }],

    // React

    'react/prop-types': 'off',
    'react/jsx-boolean-value': ['error', 'always'],
    'react/jsx-closing-bracket-location': ['error'],
    'react/jsx-closing-tag-location': ['error'],
    'react/jsx-curly-newline': ['error', 'consistent'],
    'react/jsx-curly-spacing': ['error', {
        'when': 'never',
    }],
    'react/jsx-equals-spacing': ['error', 'never'],
    'react/jsx-first-prop-new-line': ['error', 'multiline-multiprop'],
    'react/jsx-fragments': ['error', 'syntax'],
    'react/jsx-max-props-per-line': ['error', {
        'maximum': 1,
        'when': 'multiline',
    }],
    'react/jsx-no-useless-fragment': ['error'],
    'react/jsx-one-expression-per-line': ['error', {
        'allow': 'literal',
    }],
    'react/jsx-pascal-case': ['error', {
        'allowAllCaps': true,
    }],
    'react/jsx-props-no-multi-spaces': ['error'],
    'react/jsx-tag-spacing': ['error', {
        'closingSlash': 'never',
        'beforeSelfClosing': 'never',
        'afterOpening': 'never',
        'beforeClosing': 'never',
    }],
    'react-hooks/exhaustive-deps': 'off',
    'react/jsx-curly-brace-presence': ['error', {
        'props': 'always',
        'children': 'never',
    }],
    'react/display-name': 'off',
};
