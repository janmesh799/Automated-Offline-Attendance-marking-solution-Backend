const Teacher = require('../../Models/TeacherSchema');

const getTeacherbyId = async (req, res) => {
    try {
        let { id } = req.params;
        const teacher = await Teacher.findById(id);
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

module.exports = getTeacherbyId;