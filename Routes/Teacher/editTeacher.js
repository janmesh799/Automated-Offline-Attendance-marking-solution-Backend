const jwt = require("jsonwebtoken");
const Teacher = require("../../Models/TeacherSchema.js");
const secretKey = process.env.SECRET_KEY;

const editTeacher = async (req, res) => {
    try {
        if (req.user.userType != "teacher") {
            return res.status(400).json({ success: false, message: "user is not a teacher" })
        }
        const userid = req.user.id;
        const updatedTeacher = await Teacher.findByIdAndUpdate(userid, req.body, { returnOriginal: false });
        return res.json({ success: true, message: "Teacher Updated Successfully" });

    }
    catch (err) {
        console.log(err);
        res.status(400).json({ success: false, msg: "Error in updating teacher details" });
    }
}

module.exports = editTeacher;