const path = require('path');
const isUtf8 = require('is-utf8');
const validate = require("validate.js");
const Reader = require('../readers/csvReader');

// Custom validator used by test
validate.validators.isUtf8 = (value, options, key, attributes) => {
    if (typeof value !== "undefined") {
        let name = Buffer.from(value);
        return new isUtf8(name) === !!options ? null : 'string must be utf-8';
    }
};

describe("Basic CSV reader functionality test", () => {
    it("Should read file from path specified", async () => {
        try {
            await new Reader(path.join(__dirname, '..', 'hotels.csv'), {}, false, data => console.log(data));
        } catch (error) {
            return false;
        }
    })
});