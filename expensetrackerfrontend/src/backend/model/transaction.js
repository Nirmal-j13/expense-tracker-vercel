const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

//Data modelling Schema

const transactionSchema = mongoose.Schema({
   fullname:{
    type:String,
    required:true
   },
   transactiontype:{
    type:String,
    enum:["Income","Expenses"],
    required:true,
   },
   amount:{
    type:Number,
    required:true
   },
   category:{
    type: String,
    enum: [
        "Food",
        "Transportation",
        "Entertainment",
        "Shopping",
        "Utilities",
        "Health",
        "Travel",
        "Education",
        "Personal",
        "Grocercies",
        "Bills",
        "Uncategorized", 
        "Building",
    ],
    required:true
   },
   color:{
    type:String
   },
   createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
   },
   date:{
    type:Date,
    default:Date.now(),
   },
   notes:{
    type:String,
    required:true
   }
},
{
    timestamps:true,
    toJSON:{virtual:true},
}
);

//model
const Transaction = mongoose.model("Transaction",transactionSchema);

module.exports=Transaction;
