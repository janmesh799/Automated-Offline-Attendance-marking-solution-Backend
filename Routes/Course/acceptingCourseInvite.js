const Course = require("../../Models/CourseSchema");
const Student = require("../../Models/StudentSchema");

const isEnrolledFunction = (course, studentId) => {
    try {
        for (let i = 0; i < course.enrolledStudents.length; i++) {
            let element = course.enrolledStudents[i];

            if (element.studentId.toString() === studentId && element.invitationStatus === "sent") {
                if (element.invitationStatus === "sent") {
                    return ({ success: true });
                }
                else if (element.invitationStatus === "enrolled") {
                    return ({ success: false, message: "Already enrolled in the course" })
                }
            }
        }
        return ({ success: false, message: "Not found" });
    } catch (err) {
        return ({ success: false, message: "Error in isEnrolled function", error: err.message });
    }
}
const acceptInvite = async (course, studentId) => {
    try {
        for (let i = 0; i < course.enrolledStudents.length; i++) {
            let element = course.enrolledStudents[i];
            if (element.studentId.toString() === studentId) {
                course.enrolledStudents[i].invitationStatus = "enrolled";
                await course.save();
                return ({ success: true });
            }
        }
        return ({ success: false, message: "Not found" });

    } catch (err) {
        return ({ success: false, message: "Error in acceptInvite function", error: err.message });
    }
}

const getServiceId = (course, studentId) => {
    try {
        for (let i = 0; i < course.enrolledStudents.length; i++) {
            let element = course.enrolledStudents[i];
            if (element.studentId.toString() === studentId) {
                return { success: true, serviceId: element.serviceId };
            }
        }
        return ({ success: false, message: "Not found" });

    } catch (err) {
        return ({ success: false, message: "Error in acceptInvite function", error: err.message });
    }
}

const acceptingCourseInvite = async (req, res) => {
    try {
        const user = req.user;
        const courseId = req.headers.courseid;
        const student = await Student.findById(user.id);
        if (!student) {
            return res.status(404).json({ success: false, message: "Student not found" })
        }
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" })
        }
        const isEnrolled = isEnrolledFunction(course, student.id);
        if (isEnrolled.success == false) {
            return res.status(403).json({ success: false, message: `Student with studentId ${student.id} is not enrolled in the course`, error: isEnrolled.message });
        }
        const isAccepted = await acceptInvite(course, student.id);
        if (isAccepted.success == false) {
            return res.status(403).json({ success: true, message: "Some error in accepting the invite", error: isAccepted.error });
        }
        const serviceId = getServiceId(course, student.id).serviceId;
        return res.status(200).json({ success: true, message: "Course invite accepted successfully", serviceId: serviceId })

    } catch (err) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error: err.message })
    }
}

module.exports = acceptingCourseInvite;