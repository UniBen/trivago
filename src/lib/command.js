const Module = require("./module");

/**
 * Command - Registered by the module.CommandRegister.
 *
 * @type {module.Command}
 */
module.exports = class Command extends Module {
    constructor() {
        super();

        this.name = null;
        this.alias = null;
        this.description = null;
        this.help = null;
    }

    /**
     * run
     *
     * @abstract
     */
    run() {
        throw new Error("The run method needs to be implemented");
    }
}