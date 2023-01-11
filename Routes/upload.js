const express = require('express')
const http = require('http');
const fs = require('fs');

const multer = require('multer');
const csv = require('fast-csv');
const parseCSVfile = require('../controller/parseCSVfile');
// const parseCSVfile = require('../controller/parseCSVfile');


const upload = multer({ dest: "/temp" })
const router = express.Router();

router.post('/', upload.single('file'), async function (req, res) {
    const fileRows = [];
    let ftemp = [];
    // const fileRows = parseCSVfile(req.file.path)
    csv.parseFile(req.file.path)
        .on("data", function (data) {
            fileRows.push(data[2]);
        })
        .on("end", function () {
            fs.unlinkSync(req.file.path);
            fileRows.shift();
            return res.json(fileRows)
        })
});



module.exports = router