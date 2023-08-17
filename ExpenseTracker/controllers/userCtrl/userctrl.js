const bcrypt = require('bcryptjs');
const {Apperr} = require('../../utils/apperr'); 
const User = require("../../model/user");
const generatetoken = require('../../utils/generatetoken');

//Register
const registerctrl=async (req,res,next)=>{
    const {fullname,email,password} = req.body;
    try{
        //check if email exist
        const userfound = await User.findOne({email});
        if(userfound)
        {
            return next(new Error('Already User exist',400))
        }
        //check if fields are empty
        if(!email || !password || !fullname)
        {
            return next(new Error('Field required',400))
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password,salt);

        //create user
        const user = await User.create({
            fullname,
            email,
            password:hashpassword,
        });
        res.json({
            status:"Success",
            fullname:user.fullname,
            email:user.email,
            password:user.password,
            id:user._id,
        });
    }
    catch(err){
        next(new Apperr(err.message,500));
    }    
};

//Login
const loginctrl=async (req,res,next)=>{
    const {email,password}= req.body;
    try{
       //check email exist
    const userfound = await  User.findOne({email});
    if(!userfound)
    {
        return next(new Apperr("Invalid login Credentials",400));
    }
       //check for password validity
    const isPasswordMatch = await bcrypt.compare(password,userfound.password);
    if(!isPasswordMatch)
    {
        return next(new Apperr("Invalid login Credentials",400));
    }
        res.json({
           status:"success",
           id:userfound._id,
           fullname:userfound.fullname,
           token:generatetoken(userfound._id)
        });
    }
    catch(err){
       next(new Apperr(err,500));
    }    
}

//Profile
const profilectrl=async (req,res)=>{
    
   console.log(req.user);
    try{
       const user = await User.findById(req.user).populate({
        path:'accounts',
        populate:{
            path:"transactions",
            model:"Transaction"
        }
    });
       res.json(
        {user});
    }
    catch(err){
        next(new Apperr(err.message,500));
    }    
}

//Delete
const deletectrl=async (req,res)=>{
    try{
        await User.findByIdAndDelete(req.user);
        res.json({
            status:"Success",
            data:null
        });
    }
    catch(err){
       next(new Apperr(err.message,500));
    }    
}

//Update
const updatectrl=async (req,res,next)=>{
    try{
        //check email exist
        if(req.body.email)
        {
            const userfound = await User.findOne({email:req.body.email});
            if(userfound)
            {
                return next(new Apperr('Email is taken or already email taken',404))
            }
        }
        //check user changing the password
        if(req.body.password)
        {
            const salt = await bcrypt.genSalt(10);
            const hashpassword = await bcrypt.hash(req.body.password,salt);
            //update the user
            const user = await User.findByIdAndUpdate(req.user,
            {
                password:hashpassword
            },
            {
                new:true,
                runValidators:true
            }
            );   
          return res.status(200).json({
                status:"Success",
                data:user,
            });
        }
       
        
              //trying to update other properties
            const user = await User.findByIdAndUpdate(req.user,req.body,{
                new:true,
                runValidators:true,
             }) 
              res.status(200).json({
                status:"Success",
                data:user,
            })
        
        
    }
    catch(err){
      next(new Apperr(err.message,500));
    }    
}

module.exports={
    registerctrl,
    loginctrl,
    profilectrl,
    deletectrl,
    updatectrl
}