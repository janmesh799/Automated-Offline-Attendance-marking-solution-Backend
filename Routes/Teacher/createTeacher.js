const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator')
const Teacher = require('../../Models/TeacherSchema');

const secretKey = process.env.SECRET_KEY;

// return data
// token

const createTeacher = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let { name, email, password, description, deviceType } = req.body;
        email = email.toLowerCase();
        const secPassword = bcrypt.hashSync(password, 10);
        const teacher = new Teacher({
            name,
            email,
            password: secPassword,
            description,
        });
        await teacher.save()
            .then(teacher => {
                const user = { id: teacher.id, userType: teacher.userType, deviceType }
                const token = jwt.sign(user, secretKey);
                res.json({ success: true, authToken: token });
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

module.exports = createTeacher;