# Ben Watson
Trivago Tech Camp 2018 Challenge

## Requirements

- node
- npm

## Running the project

To run the project simply run these two commands:
```
npm install
npm link
```

You should now be able to run the command `trivago export` from any directory.

## Commands

- `trivago export` This command can be run anywhere once linked. Follow the CLI instructions to use the command.
    
    The CLI will require you to input a filename for the file to be exported, select what format you want to export to along with order and grouping options for the export, and allow you to add a custom validator for incoming data and so on. (Will launch proffered editor for custom rule input)
    
    `PLEASE NOTE: THE FUZZY SEARCH FOR SELECTING A FILE TO IMPORT WILL ONLY LOOK IN YOUR CURRENT DIRECTIORY AND SUB-DIRECTORIES.`
    - `--help` Shows help for the command.
    - `--version` Shows the version of the command.
- `npm run test` Will run the unit tests for this project.

## Architecture

The index.js for the project simply contains application bootstrapping logic. The main method of bootstrapping a module is through the use of what I call registers.

### Registers

Registers are stored in the `/src/registers` directory of the project. Their purpose of a register is to find, track and register modules. Registers are run asynchronously on boot. At the moment there is only two registers; the command register and the validator rules register. 

All registers extend an abstract register class (`ModuleRegister`) and must implement a run method which tells the register how to deal with modules it finds.

### Commands

At the moment there is only one command however, adding a new one to the command register is really simple and only requires you to duplicate an existing command and modify the name and the run method.

The export command makes use of the inquirer node module to allow the user to interact with the application via an interactive user interface. You can find out more [here](https://github.com/SBoudrias/Inquirer.js)

#### The export command

The export command is really simple. When run, the user is prompted to provide details for the file they want to export to. Once done a `CsvReader` object is instantiated which creates a `Writer` object using the data that has been sorted and grouped based on the users input. The writer object then creates the file and the process finishes.

## Questions

If you have any more questions about this project  or why I was stupid enough to go with node (Usually write PHP/Java) please feel free to ask :D