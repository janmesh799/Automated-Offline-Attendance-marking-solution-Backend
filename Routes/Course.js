const express = require('express');
const multer = require('multer');
const createCourse = require('./Course/createCourse');
const editCourse = require('./Course/editCourse')
const fetchUser = require('../Middleware/fetchUser');
const getCourses = require('./Course/getCourses');
const getCourseDetails = require('./Course/getCourseDetails');
// const addBulkStudents = require('./Course/addBulkStudents');



// const upload = multer({ dest: 'tmp/csv/' });
const router = express.Router();

// @route POST api/course/createCourse
// @desc Create a new course
// @access teacher
//data {name, courseCode, }
router.post('/createCourse', fetchUser, createCourse);

// @route PUT api/course/editCourse
// @desc Edit a course
// @access teacher which is a instructor in that course
router.put('/editCourse', fetchUser, editCourse);

router.get('/getcourses', fetchUser, getCourses);


router.get('/getcoursedetails/:id', fetchUser, getCourseDetails);

// router.post('/addBulkStudents/:id', upload.single('file'), fetchUser, addBulkStudents);
module.exports = router;