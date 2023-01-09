const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    serviceId: {
        type: String,
        required: true,
        unique: true,
        default: "xoxoxxo"
    },
    instructors: [{
        type: Schema.Types.ObjectId,
        ref: 'teachers'
    }],
    enrolledStudents: [
        {
            id: {
                type: Schema.Types.ObjectId,
                ref: 'students'
            },
            invitationStatus: {
                type: String,
                required: true,
                default: "Not Sent"
            },
            charId: {
                type: String,
                required: true,
                default: "oxoxoxoxo"
            },
            serviceId: {
                type: String,
                required: true,
                default: "oxoxoxoxo"
            }
        }
    ],
    courseCode: {
        type: String,
        required: true,
        unique: true,
        default: "N/A"
    },
    courseDescription: {
        type: String,
        required: true,
        default: "N/A"
    },
    courseCredits: {
        type: Number,
        required: true,
        default: 0
    },
    courseSemester: {
        type: Number,
        required: true,
        default: 0
    },
    courseYear: {
        type: Number,
        required: true,
        default: 2000
    },
    courseDepartment: {
        type: String,
        required: true,
        default: "N/A"
    },
    courseAttendance: [{
        date: {
            type: Date,
            required: true
        },
        attendanceRecord: [{
            student: {
                type: Schema.Types.ObjectId,
                ref: 'students'
            },
            present: {
                type: Boolean,
                required: true,
                default: false
            },
            logStatus: {
                type: String,
                required: true
            },
            tiimeOfAttendance: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            }
        }]
    }]


});

module.exports = Course = mongoose.model('courses', CourseSchema);