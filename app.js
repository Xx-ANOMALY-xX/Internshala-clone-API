require('dotenv').config({path: "./.env"});
const express = require('express');
const app = express();

//db connection
require("./models/database").connectdDatabase()

//logger
const logger =  require('morgan');
app.use(logger('tiny'));

//bodyparser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//session and cookie
const session = require('express-session')
const cookieparser = require("cookie-parser")
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.EXPRESS_SESSION_SECRET
}))
app.use(cookieparser())

//Routes
app.use('/', require('./routes/indexRoutes'));

//error handling
const errorHandeler = require('./utils/errorHandeler');
const { generatedErrors } = require('./middlewares/errors');
app.all('*', (req, res, next)=>{
    next(new errorHandeler(`Requested URL Not Found ${req.url}`, 404));
});
app.use(generatedErrors);

app.listen(process.env.PORT, console.log(`server running om port ${process.env.PORT}`));