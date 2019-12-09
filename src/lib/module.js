/**
 * Module - A module is something that can be loaded by the moduleRegister and run. A basic module should have a name
 *          and a run method that is invoked by the module register.
 *
 * @type {module.Module}
 */
module.exports = class Module {
    constructor() {
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