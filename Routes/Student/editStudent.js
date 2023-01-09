
const Student = require('../../Models/StudentSchema.js');



const editStudent = async (req, res) => {
    try {
        let { name, email, password, batch, branch, rollno, } = req.body;
        const authToken = req.header('authToken');
        if (email) email = email.toLowerCase();
        // console.log(req)
        const student = await Student.findById(req.user.id);
        if (student) {
            updatedStudent = await Student.findByIdAndUpdate(req.user.id, { name, email, password, batch, branch, rollno });
            res.status(200).json({ success: true, message: "Student updated" });
        }
        else {
            res.status(400).json({ success: false, message: "Student not found" });
        }

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

module.exports = editStudent;