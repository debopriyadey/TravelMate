const express=require('express');
const route=express.Router();

const controller = require('../controllers/auth')

route.post('/signin', controller.signin);
route.post('/signup', controller.signup);

module.exports=route;


