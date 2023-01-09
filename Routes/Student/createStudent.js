const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require('express-validator')
const Student = require("../../Models/StudentSchema.js");

const secretKey = process.env.SECRET_KEY;

const createStudent = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() })
        }
        let { name, email, password, batch, branch, rollno, deviceType } = req.body;
        email = email.toLowerCase();
        const secPass = bcrypt.hashSync(password, 10);
        const student = new Student({
            name,
            email,
            password: secPass,
            batch,
            branch,
            rollno
        });
        await student.save().then((student) => {
            const user = {
                id: student._id,
                userType: student.userType,
                deviceType
            }
            const authToken = jwt.sign(user, secretKey);
            res.status(200).json({ success: true, authToken })
        }).catch((err) => {
            res.json({ success: false, message: err.message });
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Internal server error" });

    }
}

module.exports = createStudent;