const csv = require('fast-csv');
const fs = require('fs');
const addStudent = require('../../controller/addStudent');
const Courses = require('../../Models/CourseSchema');

const response = [];


const addBulkStudents = async (req, res) => {
    try {
        const id = req.params.id;
        const fileRows = [];
        csv.parseFile(req.file.path)
            .on("data", function (data) {
                fileRows.push(data[2]);
            })
            .on("end", function () {
                fs.unlinkSync(req.file.path);
                fileRows.shift();
                for (let i = 0; i < fileRows.length; i++) {
                    addStudent(fileRows[i], id);
                }

            })
        res.json({ success: true, mesaage: "All Students added in the course" });


    } catch (err) {
        return res.status(500).json({ success: false, message: err.message })
    }
}

module.exports = addBulkStudents;