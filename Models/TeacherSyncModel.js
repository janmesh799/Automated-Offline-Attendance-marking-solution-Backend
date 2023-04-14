const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    userId:{
        type:string,
        required:true
    }
});

module.exports = TeacherSyncModel = mongoose.model('TeacherSync', CourseSchema);