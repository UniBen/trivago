const validate = require("validate.js");
const Rule = require("../lib/rule");
const ModuleRegister = require("../lib/moduleRegister");

module.exports = class ValidatorRegister extends ModuleRegister {
    constructor() {
        super();
        this.type = 'validator';
    }

    check(module, path) {
        if (module instanceof Rule) throw new Error(`The file located at ${path} did not export a validator rule object`);
        return true;
    }

    handle(module) {
        validate.validators[module.name] = module.run;
    }
};