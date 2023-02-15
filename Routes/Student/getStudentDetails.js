const { validationResult } = require('express-validator')
const Student = require('../../Models/StudentSchema')
const getStudetnDetails = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() })
        }
        let { email } = req.params;
        email = email.toLowerCase();
        const student = await Student.findOne({ email });
        if (!student) {
            return res.status(404).json({ success: false, message: "Student not found" });
        }
        return res.json({ success: true, student });
    } catch (err) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

module.exports = getStudetnDetails;