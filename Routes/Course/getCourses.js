const Teacher = require('../../Models/TeacherSchema')
const Student = require('../../Models/StudentSchema')

const getCourses = async (req, res) => {
    try {
        const { id, userType } = req.user;
        if (userType == 'teacher') {
            const teacher = await Teacher.findById(id);
            if (!teacher) {
                return res.status(400).json({ success: false, message: "User Not Found" });
            }
            res.json({ success: true, courses: teacher.courses });
        }
        else if (userType == 'student') {
            const student = await Student.findById(id);
            if (!student) {
                return res.status(400).json({ success: false, message: "User Not Found" });
            }
            return res.json({ success: false, Courses: student.courses })
        }


    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}

module.exports = getCourses;