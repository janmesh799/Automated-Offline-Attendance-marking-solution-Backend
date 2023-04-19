const express = require('express');
const { body, param } = require('express-validator')
const createStudent = require('./Student/createStudent');
const loginStudent = require('./Student/loginStudent');
const editStudent = require('./Student/editStudent');
const fetchUser = require('../Middleware/fetchUser');
const getStudetnDetails = require('./Student/getStudentDetails');
const forgotPasswordStudent = require('./Student/forgotPasswordStudent');
const resetForgotPasswordStudent = require('./Student/resetForgotPasswordStudent');

const router = express.Router();

// @route POST api/student/createStudent
// @desc Create a new student
// @access Public
//data {name, email, password, username}
router.post("/createStudent", body('email').isEmail(), body('password').isStrongPassword(), createStudent);

// @route POST api/student/loginStudent
// @desc Login a student
// @access Public
//data {email, password}
router.post("/login", body('email').isEmail(), loginStudent);

// @route POST api/student/editStudent
// @desc Edit a student
// @access Private
//data {name, email, username, batch, branch, rollno,UUId,bluetooth}
router.put("/editStudent", fetchUser, editStudent);

router.get('/getStudentDetails/:email', param('email').isEmail(), fetchUser, getStudetnDetails);

router.post('/forgotpassword', body('email').isEmail(), forgotPasswordStudent);


router.post('/resetforgotpassword/:forgotToken', body('email').isEmail(), body('newPassword').isStrongPassword() ,resetForgotPasswordStudent)
module.exports = router;