const express=require('express');
const route=express.Router();
const requiredLogin = require('../middleware/requireAuth');

const controller = require('../controllers/reviews')

route.get('/fetchreviews', controller.getReviews);
route.post('/createreviews', requiredLogin, controller.createReview);
route.get('/myreviews', requiredLogin, controller.myReviews);
route.post('/searchreview', controller.searchReview);
route.post('/getpostbytag', controller.getPostByTag);
route.post('/increaseLike', requiredLogin, controller.increaseLike);
route.post('/currentreview',  requiredLogin, controller.currentReview);
route.delete('/delete/:id', requiredLogin, controller.deleteReview);
route.patch('/update/:id', requiredLogin, controller.updateReview);

module.exports=route;
