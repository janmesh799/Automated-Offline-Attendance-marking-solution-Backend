const Teacher = require('../../Models/TeacherSchema')

const fetchTeacherbyAuthToken = async (req, res) => {
    try {
        const id = req.user.id;
        console.log(req.user)
        const reqTeacher = await Teacher.findById(id);
        console.log(reqTeacher)
        if (!reqTeacher) {
            return res.status(404).json({ success: false, message: "Teacher not found" });
        }
        return res.json({ success: true, teacher: reqTeacher });

    } catch (error) {
        return res.json({ success: false, message: err.message });
    }
}

module.exports = fetchTeacherbyAuthToken;