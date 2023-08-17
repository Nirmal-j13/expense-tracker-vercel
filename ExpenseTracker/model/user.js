const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

//Data modelling Schema

const userSchema = mongoose.Schema({
   fullname:{
    type:String,
    required:true
   },
   email:{
    type:String,
    required:true
   },
   password:{
    type:String,
    required:true
   },
   hascreatedaccount:{
    type:Boolean,
    required:false
   },
   accounts:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Account",
   }]
},
{
    timestamps:true,
    toJSON:{virtual:true},
}
);

//model
const User = mongoose.model("User",userSchema);

module.exports=User;
