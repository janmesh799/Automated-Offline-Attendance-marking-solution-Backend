const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        required: true,
        default: "student"
    },
    email: {
        type: String,
        required: true
    },
    batch: {
        type: String,
    },
    branch: {
        type: String,
    },
    rollno: {
        type: String,
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    courses: [{
        type: Schema.Types.ObjectId,
        ref: 'courses'
    }],
    forgotPasswordToken:{
        type:String,
        select:false
    }

});

module.exports = Student = mongoose.model('students', StudentSchema);