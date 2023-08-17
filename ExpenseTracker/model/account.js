const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

//Data modelling Schema

const accountSchema = mongoose.Schema({
   fullname:{
    type:String,
    required:true
   },
   accounttype:{
    type:String,
    enum:[
        "Savings",
        "Investment",
        "Checking",
        "Credit Card",
        "Billing",
        "School",
        "Project",
        "utilities",
        "Travel",
        "Personal",
        "Groceries",
        "Entertainment",
        "Loan",
        "Cash Flow",
        "Uncategorized",
    ]
   },
   initialbalance:{
    type:Number,
    default:0
   },
   transactions:[
    {
    type:mongoose.Schema.Types.ObjectId,
    ref:"Transaction",
   }],
   createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
   },
   notes:{
    type:String,
    required:true
   },
},
{
    timestamps:true,
    toJSON:{virtual:true},
}
);

//model
const Account = mongoose.model("Account",accountSchema);

module.exports=Account;
