const Student = require('../../Models/StudentSchema');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator')

const resetForgotPasswordStudent = async (req, res) => {
    try {
        // console.log(123)
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, newPassword } = req.body;
        const forgotToken = req.params.forgotToken;
        const student = await Student.findOne({ email }).select("+password").select("+forgotPasswordToken");
        if (!student) {
            return res.status(404).json({ success: false, message: "Wrong email" })
        }
        if (student.forgotPasswordToken.toString() !== forgotToken.toString()) {
            // console.log(student.forgotPasswordToken.toString(), )
            return res.status(403).json({ success: false, message: "unauthorised access" });
        }
        const newSecPassword = bcryptjs.hashSync(newPassword, 10);
        student.password = newSecPassword;
        student.forgotPasswordToken = "";
        await student.save().then(() => {
            return res.status(200).json({ success: true, message: "password changed successfully" })
        })

    } catch (err) {
        return res.status(500).json({ success: false, message: "Internal server Error", error: err.message });
    }
}

module.exports = resetForgotPasswordStudent;