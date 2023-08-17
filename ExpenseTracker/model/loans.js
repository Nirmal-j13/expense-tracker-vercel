const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

//Data modelling Schema

const loanSchema = mongoose.Schema({
   type:{
    type:String,
   },
   Minimumage:{
    type:String,
   },
  Maximumage:{
    type:String,
   },
  MinimumIncome:
    {
    type:String,
   },
   createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
   },
   Loanamount:{
    type:String,
   },
   LoanTenure:{
    type:String,
   },
},
{
    timestamps:true,
    toJSON:{virtual:true},
}
);

//model
const Loan= mongoose.model("Loan",loanSchema);

module.exports=Loan;
