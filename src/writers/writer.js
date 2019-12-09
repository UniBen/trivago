module.exports = class Writer {
    constructor(name, format, data) {
        this.name = name;
        this.format = format;
        this.data = data;
    }

    run(cb) {
        throw new Error("The method run needs to be implemented");
    }
}