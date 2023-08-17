const Account = require("../../model/account");
const Transaction = require("../../model/transaction");
const User = require("../../model/user");
const { Apperr } = require("../../utils/apperr");

//Create
const createctrl=async (req,res,next)=>{
   const{fullname,amount,notes,transactiontype,account,category,color}=req.body;
    try{
        //1.Find the user
        const userfound = await User.findById(req.user);
        if(!userfound)
        {
            next(new Apperr("User not found",404));
        }
        //2.Find the Account
        const accountfound = await Account.findById(account);
        if(!accountfound)
        {
            next(new Apperr("Account not found",404));
        }
        //3.Create the transactions
        const transaction = await Transaction.create({
            fullname,
            amount,
            notes,
            color,
            transactiontype,
            account,
            category,
            createdBy:req.user,
        })
        //4.Push the transcaction to the account
        accountfound.transactions.push(transaction._id);
        //5.resave the account
        await accountfound.save();
        res.json({
           status:"success",
           data:transaction
        });
    }
    catch(err){
       next(new Apperr(err,404));
    }    
}

//Retrive
const retrivectrl=async (req,res)=>{
    try{
        const transaction = await Transaction.find();
        res.json({
            status:"Success",
            data:transaction
        });
    }
    catch(err){
        next(new Apperr(err,404));
    }    
}

//Retrive one
const retriveonectrl=async (req,res)=>{
    try{
        const {id} = req.params;
        const transactionone = await Transaction.findById(id);
        res.json({
            status:"Success",
            data:transactionone
        });
    }
    catch(err){
        next(new Apperr(err,404));
    }    
}

//Delete 
const deletectrl=async (req,res)=>{
    const {id} = req.params;
    await Transaction.findByIdAndDelete(id);
    try{
        res.json({
           status:"Success",
           data:null
        });
    }
    catch(err){
        next(new Apperr(err,404));
    }    
}

//Update
const updatectrl=async (req,res)=>{
    
    try{
        const {id}=req.params;
        const transaction = await Transaction.findByIdAndUpdate(id,req.body,{
            new:true,
            runValidators:true,
         }) 
        res.json({
            status:"Success",
            data:transaction
        });
    }
    catch(err){
        next(new Apperr(err,404));
    }    
}

module.exports={
    createctrl,
    retrivectrl,
    retriveonectrl,
    deletectrl,
    updatectrl
}