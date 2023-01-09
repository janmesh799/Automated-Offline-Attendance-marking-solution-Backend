const Course = require('../../Models/CourseSchema');

const getCourseDetails = async (req, res) => {
    try {
        const courseId = req.params.id;
        console.log(courseId)
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ success: false, message: "Course Not Found" });
        }
        return res.json({ success: true, course:course });

    } catch (err) {
        return res.status(500).json({ success: false, message: err.message })
    }
}

module.exports = getCourseDetails;