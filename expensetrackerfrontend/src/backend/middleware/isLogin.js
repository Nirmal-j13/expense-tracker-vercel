const { Apperr } = require('../utils/apperr');
const gettokenfromheader =require('../utils/gettokenfromheader');
const verifytoken = require('../utils/verifytoken');
const isLogin = (req,res,next)=>{
    //get token from req headers
    const token = gettokenfromheader(req);
    //verify
    const decoded = verifytoken(token);
    //save the user into req obj
    req.user = decoded.id;
    if(!decoded)
    {
        return next(new Apperr('Invalid/Expired Token,Please login again',401))
    }
    next();
};

module.exports=isLogin;