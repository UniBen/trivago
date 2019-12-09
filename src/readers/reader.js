const fs = require("fs");

module.exports = class Reader {
    constructor(file, validator, firstRowAsKeys, callback, columnKeys = null) {
        // Default props
        this.data = [];

        // Set props
        this.path = file;
        this.validator = validator;
        this.firstRowAsKeys = firstRowAsKeys;
        this.callback = callback;
        this.columnKeys = columnKeys;

        // Read file
        if (this.path) {
             this.process();
        }
    }

    process() {
        this.handleDataFile();
    }

    handleData(data) {
        throw new Error('You have to implement the method handleData!');
    }

    read(row) {
        if (this.data && this.data[row]) {
            return this.data[row];
        }

        throw new Error(`Unable to read row ${row}`);
    }

    readAll() {

    }
}