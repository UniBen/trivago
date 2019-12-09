const fs = require("fs");
const Writer = require('./writer');

module.exports = class HtmlWriter extends Writer {
    constructor(name, format, data, grouped = false) {
        super(name, format, data, grouped);
        this.grouped = grouped;
    }

    run(cb) {
        const data = this.data;

        let pageContent = "";
        if (this.grouped) {
            Object.keys(data).forEach(table => {
                pageContent += this.renderElement('h1', table);
                pageContent += this.renderTable(data[table]);
            });
        } else {
            pageContent += this.renderTable(data);
        }

        // Construct page
        const output = `<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"><meta http-equiv="X-UA-Compatible" content="ie=edge"><title>Trivago</title><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"></head><body><div class="container">${pageContent}</div></body></html>`

        // Write page to file
        fs.writeFile(`${this.name}.html`, output, () => cb());
    }

    renderTable(data) {
        // Construct table head
        let tableHeadCols = "";
        Object.keys(data[0]).map((key, index) => {
            tableHeadCols += this.renderElement('th', key);
        });
        let tableHead = this.renderElement('thead', this.renderElement('tr', tableHeadCols));

        // Construct table body
        let rows = "";
        data.forEach(row => {
            let columns = "";
            Object.keys(row).map((key, index) => {
                columns += this.renderElement('td', row[key]);
            });

            rows += this.renderElement('tr', columns);
        });
        let tableBody = this.renderElement('tableBody', rows);

        return this.renderElement('table', tableHead + tableBody, ['class="table table-striped"'])
    }

    renderElement(name, children, attributes) {
        return `<${name}${attributes ? ' ' + attributes.join(" ") : ''}>${children}</${name}>`;
    }
};