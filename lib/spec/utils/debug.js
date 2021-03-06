const Lodash = require('the-lodash');
const _ = Lodash.default;

module.exports.stringify = function(value)
{
    if (_.isFunction(value)) {
        return value.toString()
    }
    if (_.isObject(value)) {
        return JSON.stringify(value);
    }
    return value;
}