module.exports = {
    // Imports

    'simple-import-sort/imports': ['error', {
        'groups': [
            ['^\\u0000'],
            ['.*types.*'],
            ['^\\w'],
            ['^config'],
            ['^tools\/.'],
            ['^helpers\/.'],
            ['^instances\/.'],
            ['../'],
            ['./'],
        ],
    }],
};
