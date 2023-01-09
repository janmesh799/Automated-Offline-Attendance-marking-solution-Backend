const { v4 } = require('uuid');
const Course = require('../../Models/CourseSchema')
const Teacher = require('../../Models/TeacherSchema')

const guid = async () => {
    let isUnique = false;
    let Id = "";
    while (!isUnique) {
        Id = v4();
        const temp = await Course.find({ serviceId: Id });
        // console.log(temp);
        if (temp.length === 0) {
            isUnique = true;
        }
    }
    return Id;
}

const createCourse = async (req, res) => {
    try {
        // console.log(req.user)
        if (req.user.userType !== 'teacher') {
            return res.status(400).json({ success: false, message: "You don't have access to create a course" })
        }
        const teacher = await Teacher.findById(req.user.id);
        if (!teacher) {
            return res.status(400).json({ success: false, message: "Teacher not verified" })
        }
        const course = req.body;
        course.serviceId = await guid();
        course.instructors = [teacher];
        const prevCourse = await Course.find({ $or: [{ courseCode: course.courseCode }] });
        if (prevCourse.length > 0) {
            return res.status(400).json({ success: false, message: "Course with same courseCode already exists" });
        }
        const newCourse = await Course.create(course);
        await newCourse.save().then((newCourse) => {
            teacher.courses.push(newCourse);
            teacher.save();
            return res.json({ success: true, message: "course Created Successfully", serviceId: course.serviceId })
        }).catch((err) => {
            return res.json({ success: false, message: "course creation failed", error: err.message })
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({ success: false, message: "Internal Server Error", error: err })
    }

}

module.exports = createCourse;