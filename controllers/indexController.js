const { catchasyncerrors } = require("../middlewares/catchasyncerrors");
const Student = require("../models/studentModel");
const errorHandeler = require("../utils/errorHandeler");
const { sendtoken } = require("../utils/sendtoken");

exports.homepage = catchasyncerrors(async (req, res, next)=>{
    res.json({ message: "secure homepage!" });  
  })

exports.currentUser = catchasyncerrors(async (req, res, next)=>{
    const student = await Student.findById(req.id).exec()
    res.json({ student });  
  })

exports.studentsignup = catchasyncerrors(async (req, res, next)=>{
    const student = await new Student(req.body).save()
    sendtoken(student, 201, res)
  })

exports.studentsignin = catchasyncerrors(async (req, res, next)=>{
    const student = await Student.findOne({email: req.body.email}).select("+password").exec()
    if(!student) return next(new errorHandeler("user not found with this email address", 404))

    const isMatch = student.comparepassword(req.body.password)
    if(!isMatch) return next(new errorHandeler("Wrong credentials", 500))
    
    sendtoken(student, 200, res)

  })

exports.studentsignout = catchasyncerrors(async (req, res, next)=>{
    res.clearCookie('token')
    res.json({message: "succesfully signout!"})
  })