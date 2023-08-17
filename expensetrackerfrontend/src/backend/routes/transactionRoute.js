const express = require('express');
const {createctrl,retrivectrl,retriveonectrl,deletectrl,updatectrl} = require('../controllers/transactionCtrl/transactionCtrl');
const isLogin = require('../middleware/isLogin');
const transactionRoute = express.Router();

//POST/api/v1/transactions/:id
transactionRoute.post('/:id',isLogin,createctrl);

//GET/api/v1/transactions
transactionRoute.get('/',retrivectrl);

//GET/api/v1/transactions/:id
transactionRoute.get('/:id',retriveonectrl);

//DELETE/api/v1/transactions/:id
transactionRoute.delete('/:id',deletectrl);

//PUT/api/v1/transactions/:id
transactionRoute.put('/:id',updatectrl);


module.exports=transactionRoute;