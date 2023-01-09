require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator')
const Teacher = require('../../Models/TeacherSchema');

const secretKey = process.env.SECRET_KEY;

const loginTeacher = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let { email, password, deviceType } = req.body;
        email = email.toLowerCase();
        const teacher = await Teacher.findOne({
            email
        }).select('+password');
        if (!teacher) {
            return res.json({ success: false, message: 'Please Enter correct Credentials' });
        }
        const isMatch = await bcrypt.compare(password, teacher.password);
        if (!isMatch) {
            return res.json({ success: false, message: 'Please Enter correct Credentials' });
        }
        const user = { id: teacher.id, userType: teacher.userType, deviceType }
        const token = jwt.sign(user, secretKey);
        res.json({ success: true, authToken: token, });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
}
module.exports = loginTeacher;