const Teacher = require('../../Models/TeacherSchema');

const findTeacher = async (req, res) => {
    try {
        let { email } = req.params;
        email = email.toLowerCase();
        const teacher = await Teacher.findOne({ email });
        if (teacher) {
            return res.json({ success: true, teacher: teacher });
        }
        else {
            return res.status(400).json({ success: false, message: "Teacher Not Found" });
        }

    } catch (err) {
        res.json({ success: false, message: err.message });
    }

}

module.exports = findTeacher;