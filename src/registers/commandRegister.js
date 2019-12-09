const program = require("commander");
const Command = require("../lib/command");
const ModuleRegister = require("../lib/moduleRegister");

module.exports = class CommandRegister extends ModuleRegister {
    constructor() {
        super();
        this.type = 'command';
    }

    check(module, path) {
        if (!module instanceof Command) console.log(`The file located at ${path} did not export a validator rule object`);
        return true;
    }

    handle(command) {
        program
            .command(command.name)
            .alias(command.alias)
            .description(command.description)
            .action(() => command.run())
            .on('--help', () => command.help);
    }
};