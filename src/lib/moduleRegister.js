const config = require("../config.json");
const fileUtils = require("./fileUtils");

/**
 * ModuleRegister
 * Handles adding modules to the application and running them.
 *
 * @abstract
 * @type {module.ModuleRegister}
 */
module.exports = class ModuleRegister {
    constructor(logger = () => {}) {
        this.register = new Map();
    }

    /**
     * getRegister
     * Returns the register store.
     *
     * @returns {Map}
     */
    getRegister() {
        return this.register;
    }

    /**
     * registerDirectory
     * Registers modules found in directory and it's sub-directories. Calls registerFile on each file found in directory.
     *
     * @param path
     * @param cb
     * @returns {Promise.<void>}
     */
    async registerDirectory(path, cb) {
        const files = await fileUtils.asyncRecursiveReadDir(path);

        if (config.debug) console.log(`Attempting to load ${files.length} ${this.type || this.name || 'module'}${files.length > 1 ? 's' : ''}:`);
        files.forEach(file => this.registerFile(file));

        cb();
    }

    /**
     * registerFile
     * Calls check which should be implemented by classes that extend and adds module to register if there are no
     * errors.
     *
     * @param path
     */
    registerFile(path) {
        if (module.name === null) {
            console.log("The module does not have a name");
            return;
        }

        try {
            const module = require(path);

            if (this.check(module, path)) {
                let initModule = new module;

                // Add module to register
                this.register.set(initModule.name, initModule);

                // Handle the newly registered module
                this.handle(initModule);

                if (config.debug) console.log(` - "${initModule.name}" has been added to the module register.`);
            }
        } catch (error) {
            console.log(error.stack);
        }
    }

    /**
     * check
     * Called by registerFile before a module is added to the module register.
     *
     * @abstract
     * @param module
     * @param path
     */
    check(module, path) {
        throw new Error("The check method needs to be implemented.");
    }

    /**
     * handle
     * Called by register file.
     *
     * @abstract
     * @param module
     */
    handle(module) {
        throw new Error("The handle method needs to be implemented.");
    }
}