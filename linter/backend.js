const base = require('./base');

module.exports = {
    ...base,
    rules: {
        ...base.rules,
        ...require('./rules/base'),
        ...require('./rules/backend'),
    },
};
