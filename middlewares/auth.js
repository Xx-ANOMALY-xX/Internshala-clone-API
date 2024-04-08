const jwt = require("jsonwebtoken")
const errorHandeler = require("../utils/errorHandeler")
const { catchasyncerrors } = require("../middlewares/catchasyncerrors");


exports.isAuthenticated = catchasyncerrors(async(req, res, next) => {
    const {token} = req.cookies;
    if(!token) {
        return next(new errorHandeler("please login to access the resource", 401))
    }
    const { id } = jwt.verify(token, process.env.JWT_SECRET)
    req.id = id;
    next();
})