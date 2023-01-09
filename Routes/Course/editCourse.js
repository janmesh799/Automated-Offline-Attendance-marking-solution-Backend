const Teacher = require("../../Models/TeacherSchema");
const Course = require("../../Models/CourseSchema");

const verifyInstructor = async (instructors, teacher) => {
    // console.log(instructors[0])
    // console.log(teacher._id);

    for (let i = 0; i < instructors.length; i++) {
        const instructor = await  Teacher.findById(instructors[i]);
        if (instructor === teacher) return true;
    }
    return false;
}

const editCourse = async (req, res) => {
    try {
        const givenCourse = req.body;
        if (req.user.userType !== 'teacher') {
            return res.status(400).json({ success: false, message: "You don't have access to edit courses." });
        }
        const teacher = await Teacher.findById(req.user.id);
        if (!teacher) {
            return res.status(400).json({ success: false, message: "Teacher not verified" });
        }
        const course = await Course.findById(givenCourse.id);
        if (!course) {
            return res.status(400).json({ success: false, message: "Course not found" });
        }
        if (!verifyInstructor(course.instructors, teacher)) {
            return res.status(400).json({ success: false, message: "You don't have access to edit this course" });
        }
        Course.findByIdAndUpdate(givenCourse.id, givenCourse, { returnOriginal: true }).then(() => {
            res.json({ success: true, message: "Course Updated!" })
        }).catch((err) => {
            res.status(400).json({ success: false, message: err.message })
        })

    } catch (err) {
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }

}

module.exports = editCourse;