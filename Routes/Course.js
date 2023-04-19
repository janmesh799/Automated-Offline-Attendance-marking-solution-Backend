const express = require('express');
const multer = require('multer');
const createCourse = require('./Course/createCourse');
const editCourse = require('./Course/editCourse')
const fetchUser = require('../Middleware/fetchUser');
const getCourses = require('./Course/getCourses');
const getCourseDetails = require('./Course/getCourseDetails');
const deleteCourse = require('./Course/deleteCourse');
const addStudents = require('./Course/addStudents');
const acceptingCourseInvite = require('./Course/acceptingCourseInvite');
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

router.delete('/deleteCourse/:id', fetchUser, deleteCourse);

router.get('/getcoursedetails/:id', fetchUser, getCourseDetails);

router.post('/addStudents', fetchUser, addStudents)

router.get('/acceptingcourseinvite', fetchUser, acceptingCourseInvite)

// router.post('/addBulkStudents/:id', upload.single('file'), fetchUser, addBulkStudents);
module.exports = router;