const express = require('express');
const {createctrl,retriveallctrl} = require('../controllers/loanCtrl/loanCtrl');
const loanRoute = express.Router();

//POST/api/v1/accounts
loanRoute.post('/',createctrl);

//GET/api/v1/accounts/
loanRoute.get('/',retriveallctrl);

module.exports=loanRoute;