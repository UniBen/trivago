const fs = require("fs");
const Writer = require('./writer');

module.exports = class JsonWriter extends Writer {
    run(cb) {
        fs.writeFile(`${this.name}.json`, JSON.stringify(this.data), () => cb());
    }
};