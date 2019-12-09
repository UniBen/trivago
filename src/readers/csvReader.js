const fs = require("fs");
const csv = require("fast-csv");

const Reader = require("./reader");

const validate = require("validate.js");
const defaultValidatorRules = require('../validator/default.json');

module.exports = class csvReader extends Reader {
    constructor(file, validator, firstRowAsKeys, callback, columnKeys = null) {
        super(file, validator, firstRowAsKeys, callback, columnKeys);
        this.callback = callback;
    }

    handleDataFile() {
        // Create data stream to file using path passed to method.
        let stream = fs.createReadStream(`${this.path}`);

        // Parse csv file using reader settings and validate using validator passed to reader or default validator if one was not specified.
        csv
            .fromStream(stream, { headers : this.firstRowAsKeys ? true : this.columnKeys })
            .validate(value => validate(value, this.validator && this.validator !== {} ? this.validator : defaultValidatorRules))
            .on("data", data => this.data.push(data))
            .on("end", () => this.callback(this.data));
    }
};