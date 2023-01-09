const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeacherSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        required: true,
        default: "teacher"
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    description: {
        type: String,
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

module.exports = Teacher = mongoose.model('teachers', TeacherSchema);
