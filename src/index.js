#!/usr/bin/env node

// Node Modules
const program = require("commander");
const inquirer = require("inquirer");

/**
 * Set up inquirer.
 */

inquirer.registerPrompt('fuzzypath', require('inquirer-fuzzy-path'));

/**
 * Define the program.
 */

program.version('1.0.0');

/**
 * Define application registers.
 */

const registers = [
    { register: require(`${__dirname}/registers/validatorRegiter`), directories: ['validator/rules']},
    { register: require(`${__dirname}/registers/commandRegister`), directories: ['commands' ]}
];

/**
 * Create register promises.
 */

const registerPromises = [];
registers.forEach(register => {
    const initRegister = new register.register;
    register.directories.forEach(directory => {
        registerPromises.push(
            new Promise(resolve => {
                initRegister.registerDirectory(`${__dirname}/${directory}`, resolve);
            })
        );
    });
});

/**
 * Resolve register promises and start application.
 */

Promise.all(registerPromises).then(() => {
    program.parse(process.argv)
});

