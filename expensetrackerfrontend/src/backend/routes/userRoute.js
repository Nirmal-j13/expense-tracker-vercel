const express = require('express');
const {registerctrl,
       loginctrl,
       profilectrl,
       deletectrl,
       updatectrl}=require('./controllers/userCtrl/userctrl');
const isLogin = require('../middleware/isLogin');
const usersRoute = express.Router();

//POST/api/v1/users/register
usersRoute.post('/register',registerctrl);

//POST/api/v1/users/login
usersRoute.post('/login',loginctrl);

//GET/api/v1/users/profile/:id
usersRoute.get('/profile/',isLogin,profilectrl);

//DELETE/api/v1/users/
usersRoute.delete('/',isLogin,deletectrl);

//PUT/api/v1/users/profile
usersRoute.put('/',isLogin,updatectrl);

module.exports=usersRoute;