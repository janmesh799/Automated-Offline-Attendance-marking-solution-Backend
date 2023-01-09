const express = require('express');
const { body } = require('express-validator');
const fetchUser = require("../Middleware/fetchUser")
const createTeacher = require('./Teacher/createTeacher');
const loginTeacher = require('./Teacher/loginTeacher');
const findTeacher = require('./Teacher/findTeacher');
const editTeacher = require('./Teacher/editTeacher');
const forgotPasswordTeacher = require('./Teacher/forgotPasswordTeacher');
const router = express.Router();

//@route POST api/teacher/createTeacher
//@desc Create a new teacher
//@access Public
//data {name, email, password, username,  UUId, bluetooth}
router.post('/createTeacher', body('email').isEmail(), body('password').isStrongPassword(), createTeacher);

//@route POST api/teacher/login
//@desc Login a teacher
//@access Public
//data {email, password}
router.post('/login', body('email').isEmail(), loginTeacher);

//@route GET api/fetchTeacher/:email
//@desc Get the details of a teacher by email
//@access logged in users only
//params {email}
router.get('/findTeacher/:email', fetchUser, findTeacher);

//@route GET api/editTeacher
//@desc Edit the details of a teacher
//@access Private
//data {name, email, password, username,course, UUId, bluetooth}
router.put('/editTeacher', body('email').isEmail(), body('password').isStrongPassword(), fetchUser, editTeacher);

router.post('/forgotPassword', body('email').isEmail(), forgotPasswordTeacher);


module.exports = router;