const Student = require('../Models/StudentSchema');
const Course = require("../Models/CourseSchema");
const { v4 } = require('uuid');

const charGuid = async () => {
    let isUnique = false;
    let Id = "";
    while (!isUnique) {
        Id = v4();
        const temp = await Course.find({ enrolledStudents: [{ charId: Id }] });
        // console.log(temp);
        if (temp.length === 0) {
            isUnique = true;
        }
    }
    return Id;
}
const serviceGuid = async () => {
    let isUnique = false;
    let Id = "";
    while (!isUnique) {
        Id = v4();
        const temp = await Course.find({ enrolledStudents: [{ serviceId: Id }] });
        if (temp.length === 0) {
            isUnique = true;
        }
    }
    return Id;
}


const addStudent = async (email, id) => {
    try {
        const student = await Student.findOne({ email });
        if (!student) {
            return;
        }
        const course = await Course.findById(id);
        for (let i = 0; i < course.enrolledStudents.length; i++) {
            const elem = course.enrolledStudents[i];
            if (elem.studentId.toHexString() === student._id.toHexString()) return;
        }
        const charId = await charGuid();
        const serviceId = await serviceGuid();
        const newStudent = {
            studentId: student.id,
            invitationStatus: "Not Sent",
            charId: charId,
            serviceId: serviceId
        }
        course.enrolledStudents.push(newStudent);
        await course.save();
        student.courses.push(course);
        await student.save();
        return newStudent;


    } catch (err) {
        console.log({ error: err.message })
    }
}

module.exports = addStudent;