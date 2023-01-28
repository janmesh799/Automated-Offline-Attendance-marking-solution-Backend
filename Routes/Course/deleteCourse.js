const Course = require("../../Models/CourseSchema");
const Teacher = require("../../Models/TeacherSchema");
const Student = require("../../Models/StudentSchema")

const authTeacher = (teacher, instructors) => {
    for (let i = 0; i < instructors.length; i++) {
        if (teacher.id == instructors[i].toHexString()) {
            return true;
        }
    }
    return false;
}

const deleteCourse = async (req, res) => {
    try {
        const id = req.params.id;
        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({ success: false, message: "Course Not Found" });
        }
        const teacher = await Teacher.findById(req.user.id);
        if (!teacher) {
            return res.status(400).json({ success: false, message: "Teacher Not Found" });
        }
        const students = await Student.find({ courses: [course] });
        for (let i = 0; i < students.length; i++) {
            let remaining = [];
            for (let j = 0; j < students[i].length; i++) {
                if (students[i].courses[j] == id) continue;
                remaining.push(students[i].courses[j]);
            }
            students[i].courses = remaining;
            students[i].save();
        }
        const instructors = course.instructors;
        const isAuthTeacher = authTeacher(teacher, instructors);
        if (!isAuthTeacher) {
            return res.status(400).json({ success: false, message: "Teacher doesn't have access to delete this course" });
        }
        let remainingCourses = [];
        for (let i = 0; i < teacher.courses.length; i++) {
            if (teacher.courses[i] == id) continue;
            remainingCourses.push(teacher.courses[i]);
        }

        teacher.courses = remainingCourses;
        await teacher.save();
        const del = await Course.findByIdAndDelete(id);
        res.json({ success: true, message: "Course Deleted Successfully" });

    } catch (err) {
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }

}

module.exports = deleteCourse;