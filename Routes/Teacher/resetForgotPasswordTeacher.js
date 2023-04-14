const Teacher = require('../../Models/TeacherSchema');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator')

const resetForgotPasswordTeacher = async (req, res) => {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, newPassword } = req.body;
        const forgotToken = req.params.forgotToken;
        const teacher = await Teacher.findOne({ email }).select("+password").select("+forgotPasswordToken");
        if (!teacher) {
            return res.status(404).json({ success: false, message: "Wrong email" })
        }
        if (teacher.forgotPasswordToken.toString() === forgotToken.toString()) {
            // console.log(teacher.forgotPasswordToken);
            // console.log(forgotToken)
            return res.status(403).json({ success: false, message: "unauthorised access" });
        }
        const newSecPassword = bcryptjs.hashSync(newPassword, 10);
        teacher.password = newSecPassword;
        teacher.forgotPasswordToken = "";
        await teacher.save().then(() => {
            return res.status(200).json({ success: true, message: "password changed successfully" })
        })


    } catch (err) {
        return res.status(500).json({ success: false, message:"Internal server Error", error: err.message });
    }
}

module.exports = resetForgotPasswordTeacher;