const addStudent = require('../../controller/addStudent');
const Course = require('../../Models/CourseSchema');
const Teacher = require('../../Models/TeacherSchema');

const verifyInstructor = async (instructors, teacher) => {
    // console.log(instructors[0])
    // console.log(teacher._id);

    for (let i = 0; i < instructors.length; i++) {
        const instructor = await Teacher.findById(instructors[i]);
        if (instructor === teacher) return true;
    }
    return false;
}

const addStudents = async (req, res) => {

    try {
        const { students_email, courseCode } = req.body;
        // console.log(students_email, courseCode)
        const teacher_id = req.user.id;
        if (req.user.userType == 'student') {
            return res.status(400).json({ success: false, message: "You don't have access to add students" });
        }
        const course = await Course.findOne({ courseCode });
        if (!course) {
            return res.status(404).json({ success: false, message: "Course Not Found" });
        }
        const teacher = await Teacher.findById(teacher_id);
        if (!teacher) {
            return res.status(400).json({ success: false, message: "Teacher not found" });
        }
        const isValidTeacher = verifyInstructor(course.instructors, teacher);
        if (!isValidTeacher) {
            res.status(400).json({ success: false, message: "You don't have access to add students." });
        }
        for (let i = 0; i < students_email.length; i++) {
            addStudent(students_email[i], course._id);
        }
        return res.json({ success: true, message: "Students added successfully" });


    } catch (err) {
        console.log(err.message);
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}
module.exports = addStudents;