const express = require('express');
const {createctrl,retriveonectrl,retriveallctrl,deletectrl,updatectrl} = require('../controllers/accountCtrl/accountCtrl');
const isLogin = require('../middleware/isLogin');
const accountRoute = express.Router();

//POST/api/v1/accounts
accountRoute.post('/',isLogin,createctrl);

//GET/api/v1/accounts/:id
accountRoute.get('/:id',retriveonectrl);

//GET/api/v1/accounts/
accountRoute.get('/',retriveallctrl);

//DELETE/api/v1/accounts/:id
accountRoute.delete('/:id',deletectrl);

//PUT/api/v1/accounts/:id
accountRoute.put('/:id',updatectrl);


module.exports=accountRoute;