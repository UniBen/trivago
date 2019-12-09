const isUtf8 = require("is-utf8");
const Rule = require("../../lib/rule");

module.exports = class isUtf8 extends Rule {
    constructor() {
        super();
        this.name = "isUtf8";
    }

    run(value, options, key, attributes) {
        if (typeof value !== "undefined") {
            let name = Buffer.from(value);
            return new isUtf8(name) === !!options ? null : 'string must be utf-8';
        }
    }
};
