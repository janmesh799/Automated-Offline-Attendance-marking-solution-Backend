const sendEmail = require("../../controller/sendEmail");
const Student = require('../../Models/StudentSchema')
const jwt = require("jsonwebtoken");
const { validationResult } = require('express-validator')
const secretKey = process.env.SECRET_KEY;


const forgotPasswordStudent = async (req, res) => {
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
        const student = await Student.findOne({ email });
        if (!student) {
            return res.status(400).json({ success: false, message: "No Student Found with this email" });
        }
        const user = {
            id: student.id,
            email: email
        }
        const token = jwt.sign(user, secretKey, { expiresIn: 3600 });
        await Student.findByIdAndUpdate(student.id, { forgotPasswordToken: token });
        sendEmail(email, token, "student");
        res.json({ success: true, message: "Forgot Password mail sent successfull" });

    } catch (err) {
        res.status(500).json({ success: false, message: "Internal Server error", error: err.message })
    }
}
module.exports = forgotPasswordStudent