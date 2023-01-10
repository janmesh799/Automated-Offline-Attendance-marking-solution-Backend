
const csv = require('fast-csv')
const fs = require('fs');

const parseCSVfile = (path) => {
    let fileRows = [];
    csv.parseFile(path)
        .on("data", function (data) {
            fileRows.push(data); // push each row
        })
        .on("end", function () {
            console.log(fileRows)
            return fileRows;
            fs.unlinkSync(path);   // remove temp file
            //process "fileRows" and respond
        })
    // return fileRows;
}

module.exports = parseCSVfile;