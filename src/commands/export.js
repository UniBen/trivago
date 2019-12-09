const _ = require("lodash");
const inquirer = require("inquirer");
const Command = require("../lib/command");
const Reader = require("../readers/csvReader");
const defaultRules = require("../validator/default.json");

module.exports = class Export extends Command {
    constructor() {
        super();

        this.name = 'export';
        this.alias = ['e'];
        this.description = 'Export an input csv to one of the available formats.';
        this.help = 'Run the command export and follow the instructions';
    }

    run() {
        const outputs = new Map([
           ["html", require('../writers/htmlWriter')],
           ["json", require('../writers/jsonWriter')]
        ]);

        const questions = [
            {
                type: 'fuzzypath',
                name: 'input',
                pathFilter: (isDirectory, nodePath) => !isDirectory && nodePath.match('([a-zA-Z0-9\\s_\\\\.\\-\\(\\):])+(.csv)$'),
                message: 'Select the CSV file you want to convert. (Must have the extension ".csv"):',
                suggestOnly: false,
            },
            {
                name: 'format',
                type: 'list',
                message: 'Select what format you want to convert to',
                choices: Array.from(outputs.keys())
            },
            {
                type: 'input',
                name: 'output',
                message: 'Specify the name of the output file (Do not include file extension)',
                validate: (value) => value === "" ? "Can not be empty" : true
            },
            {
                name: 'order',
                type: 'list',
                message: 'Choose which order the data should be exported in.',
                choices: [
                    'name: ASC',
                    'name: DESC',
                    'stars: ASC',
                    'stars: DESC',
                ]
            },
            {
                name: 'group',
                type: 'list',
                message: 'Choose how you would like to group data.',
                choices: [
                    'Do not group',
                    'name',
                    'contact',
                    'address',
                    'stars',
                    'phone',
                ]
            },
            {
                name: 'customValidator',
                type: 'list',
                message: 'Would you like to use a custom validator to check the csv file?',
                choices: ['Yes', 'No'],
                default: 'No'
            }
        ];

        inquirer
            .prompt(questions)
            .then(options => {
                const fileOptions = options;

                if (fileOptions.customValidator === 'Yes') {
                    inquirer.prompt([
                        {
                            name: 'customValidatorRules',
                            type: 'editor',
                            message: 'Please enter your json object of custom validation rules. See https://validatejs.org/ for list of available rules.'
                        }
                    ])
                    .then(options => new Reader(fileOptions.input, options.customValidatorRules, true, data => exportToFile(fileOptions.output, fileOptions.format, fileOptions.order, fileOptions.group, data)));
                } else  {
                    new Reader(fileOptions.input, defaultRules, true, data => exportToFile(fileOptions.output, fileOptions.format, fileOptions.order, fileOptions.group, data));
                }
            });

        function exportToFile(name, format, order, group, data) {
            const fileName = `${name}.${format}`;
            const shouldGroup = group !== 'Do not group';

            const include = outputs.get(format);

            // Sorting
            data.sort((a, b) => {
                // Get column and direction
                const split = order.replace(" ", "").split(":");
                const orderColumn = split[0];
                const orderDirection = split[1].toLowerCase() === 'asc';

                // Get column data
                const valA = a[orderColumn].toUpperCase();
                const valB = b[orderColumn].toUpperCase();

                // Sort
                if (valA > valB) return orderDirection ? 1 : -1;
                else if (valA < valB) return !orderDirection ? 1 : -1;
                else return 0;
            });

            // Grouping
            if (shouldGroup) {
                data = _.mapValues(_.groupBy(data, group), row => row.map(column => _.omit(column, group)));
            }

            try {
                const writer = new include(name, format, data, shouldGroup);
                console.log(`Creating ${fileName}`);
                writer.run(() => {
                    console.log('File created.');
                });
            } catch (error) {
                throw error;
            }
        }
    }
};
