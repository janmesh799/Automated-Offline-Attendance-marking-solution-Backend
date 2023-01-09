const Teacher = require('../../Models/TeacherSchema');

const findTeacher = (req, res) => {
    try {
        let { email } = req.params;
        email = email.toLowerCase();
        Teacher.findOne({
            email
        })
            .then(teacher => {
                res.json({ success: true, teacher: teacher });
            }
            )
            .catch(err => {
                res.json({ success: false, message: err.message });
            }
            );
    } catch (err) {
        res.json({ success: false, message: err.message });
    }

}

module.exports = findTeacher;