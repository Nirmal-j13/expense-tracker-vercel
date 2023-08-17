const express = require('express');
const usersRoute = require('./routes/userRoute');
const accountRoute = require('./routes/accountRoute');
const transactionRoute = require('./routes/transactionRoute');
const dbconnect = require('./utils/dbconnect');
const globalhandler=require('./middleware/globalhandler');
const cors = require('cors');
const app = express();

//middleware
app.use(express.urlencoded({extended:true}));

//cors middleware
app.use(cors());

//incoming json data
app.use(express.json()); 

//User routes
app.use('/api/v1/users',usersRoute);

//account routes
app.use('/api/v1/accounts',accountRoute);

//transcation routes
app.use('/api/v1/transactions',transactionRoute);

//Error handlers
app.use(globalhandler);

//listen to the port
app.listen(9000,()=>{
    console.log("Server is up and running");
});

