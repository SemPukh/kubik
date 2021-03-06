const DebugUtils = require('../utils/debug');

class LogicItem
{
    constructor(kind, location)
    {
        this._kind = kind;
        this._location = location;

        const Scope = require('./scope');
        this._scope = new Scope(this);

        this._nameFilters = [];
        this._labelFilters = [];
        this._annotationFilters = [];
        this._customFilters = [];
    }

    name(value)
    {
        this._nameFilters.push(value);
        return this;
    }

    label(key, value)
    {
        var filter = {};
        filter[key] = value;
        return this.labels(filter);
    }

    labels(value)
    {
        this._labelFilters.push(value);
        return this;
    }

    annotation(key, value)
    {
        var filter = {};
        filter[key] = value;
        return this.annotations(filter);
    }

    annotations(value)
    {
        this._annotationFilters.push(value);
        return this;
    }

    filter(value)
    {
        this._customFilters.push(value);
        return this;
    }

    descendant(kind)
    {
        return this._scope.descendant(kind);
    }
    
    child(kind)
    {
        return this._scope.child(kind);
    }

    resource(kind, apiGroup)
    {
        return this._scope.resource(kind, apiGroup);
    }

    debugOutput(indent)
    {
        if (!indent) {
            indent = 0;
        }
        var header = "  ".repeat(indent);

        console.log(header + '* LogicItem ' + this._kind)
        if (this._nameFilters.length > 0) {
            for(var filter of this._nameFilters)
            {
                console.log(header + '    - Name: ' + DebugUtils.stringify(filter));

            }
        }
        if (this._labelFilters.length > 0) {
            for(var filter of this._labelFilters)
            {
                console.log(header + '    - Label: ' + DebugUtils.stringify(filter));

            }
        }
        if (this._annotationFilters.length > 0) {
            for(var filter of this._annotationFilters)
            {
                console.log(header + '    - Annotation: ' + DebugUtils.stringify(filter));

            }
        }
        if (this._customFilters.length > 0) {
            for(var filter of this._customFilters)
            {
                console.log(header + '    - CustomFilter: ' + DebugUtils.stringify(filter));

            }
        }

        this._scope.debugOutput(indent + 1);
    }
}

module.exports = LogicItem;