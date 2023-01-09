const sendEmail = require("../../controller/sendEmail");
const Teacher = require("../../Models/TeacherSchema")
const jwt = require("jsonwebtoken");
const { validationResult } = require('express-validator')
const secretKey = process.env.SECRET_KEY;

const forgotPasswordTeacher = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let { email } = req.body;
        if (email) { email = email.toLowerCase(); }
        else {
            res.status(400).json({ success: false, token: "not a valid email" })
        }
        const teacher = await Teacher.findOne({ email });
        if (!teacher) {
            return res.status(400).json({ success: false, message: "No Teacher Found with this email" });
        }
        const user = {
            id: teacher.id,
            email: email
        }
        const token = jwt.sign(user, secretKey, { expiresIn: 3600 });
        await Teacher.findByIdAndUpdate(teacher.id, { forgotPasswordToken: token });
        sendEmail(email, token);
        res.json({ success: true, message: "Forgot Password mail sent successfull"});

    } catch (err) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error: err.message })
    }
}

module.exports = forgotPasswordTeacher;