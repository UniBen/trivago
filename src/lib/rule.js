const Module = require("./module");

/**
 * Command - Registered by the module.CommandRegister.
 *
 * @type {module.Command}
 */
module.exports = class Rule extends Module {
    constructor() {
        super();
        this.name = null;
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