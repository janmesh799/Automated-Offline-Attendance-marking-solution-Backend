const fs = require('fs');

const addStudent = require('../../controller/addStudent');
const Courses = require('../../Models/CourseSchema');


const addBulkStudents = async (req, res) => {
    try {
        const id = req.params.id;
        const file = fs.readFile(req.file.path, function (err, data) {
            if (err) {
                res.json({ message: "error appears", error: err.message })
            }
            data = data.toString();
            let arr = data.split('\n');
            for (let i = 1; i < arr.length - 1; i++) {
                let temp = arr[i].split(',');
                addStudent(temp[2], id);
            }
        })
        res.json({ success: true, message: "Students added successfully " })

    } catch (err) {
        return res.status(500).json({ success: false, message: err.message })
    }
}

module.exports = addBulkStudents;