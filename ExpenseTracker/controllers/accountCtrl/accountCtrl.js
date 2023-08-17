
const Account = require("../../model/account");
const User = require("../../model/user");
const { Apperr } = require("../../utils/apperr");

//Create
const createctrl=async (req,res,next)=>{
   const {fullname,initialbalance,accounttype,notes,transactions}=req.body;
    try{
        //1.Find the logged in user
        const userfound = await User.findById(req.user);
        if(!userfound)
        {
            return next(new Apperr("User not found",404));
        }
        //2.Create the account
        const account = await Account.create({
            fullname,
            initialbalance,
            accounttype,
            notes,
            createdBy:req.user,
            transactions,
            
        })
        //3.push the accounts into users accounts fields
          userfound.accounts.push(account._id);
        //4.Resave the user 
          await userfound.save();
        res.json({
            status:"Success",
            data:account,
        });
    }
    catch(err){
        return next(err);
    }    
};

//Retriveone
const retriveonectrl=async (req,res)=>{
    const {id}=req.params;
    const account = await Account.findById(id).populate('transactions');
    try{
        res.json({
            status:"success",
            data:account
           });
    }
    catch(err){
       res.json(err);
    }    
}

//Retriveall
const retriveallctrl=async (req,res)=>{
    try{
        const accounts = await Account.find().populate('transactions');
        res.json(accounts);
    }
    catch(err){
       res.json(err);
    }    
}

//delete
const deletectrl=async (req,res,next)=>{
    try{
        const {id} = req.params; 
        await Account.findByIdAndDelete(id);
        res.status(200).json({
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
        const {id}=req.params;
        const account = await Account.findByIdAndUpdate(id,req.body,{
            new:true,
            runValidators:true,
         }) 
        res.json({
           status:"Success",
           data:account
        });
    }
    catch(err){
       next(new Apperr(err.message,500));
    }    
}


module.exports={
    createctrl,
    retriveonectrl,
    deletectrl,
    updatectrl,
    retriveallctrl
}