const validate = require("validate.js");
const assert = require("assert");

describe("Check the register registers the isUtf8 rule found in the validator rules directory", () => {
    // registers handled in index.js
    require('../index');

    it("Should addthe rule to the validator.", () => {
        assert(typeof validate.validators.isUtf8, "function");
    });
});