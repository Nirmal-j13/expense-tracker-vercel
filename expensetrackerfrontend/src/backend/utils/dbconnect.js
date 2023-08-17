const mongoose = require('mongoose');

//connect to database

//check the connections
const dbconnect = async (req,res)=>{
    try 
    {
       await  mongoose.connect("mongodb+srv://nirmalnj2003:Nirmal123@cluster0.gaxia06.mongodb.net/?retryWrites=true&w=majority");
       console.log("Db Connected")
    }
    catch(err)
    {
        console.log(err);
    }
}

dbconnect();