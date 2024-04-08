const express = require('express');
const router = express.Router();
const { homepage, studentsignup, studentsignin, studentsignout, currentUser } = require('../controllers/indexController');
const { isAuthenticated } = require('../middlewares/auth');

// get /
router.get('/' ,homepage)

// get /student
router.post('/student', isAuthenticated ,currentUser)

// Post /student/signup
router.post('/student/signup', studentsignup)

// Post /student/signin
router.post('/student/signin', studentsignin)

// Post /student/signout
router.get('/student/signout', isAuthenticated ,studentsignout)

module.exports = router