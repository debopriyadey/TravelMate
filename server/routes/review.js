const express=require('express');
const route=express.Router();
const requiredLogin = require('../middleware/requireAuth');

const controller = require('../controllers/reviews')

route.get('/fetchreviews', controller.getReviews);
route.get('/recentreviews', controller.getReviews);
route.get('/myreviews', requiredLogin, controller.myReviews);
route.get('/currentreview/:id', controller.currentReview);
route.post('/createreviews', requiredLogin, controller.createReview);
route.post('/getallreviewtags', controller.getAllReviewTags);
route.post('/getpostsbytag', controller.getPostsByTag);
route.post('/increaseLike', requiredLogin, controller.increaseLike);
route.delete('/delete/:id', requiredLogin, controller.deleteReview);
route.patch('/update/:id', requiredLogin, controller.updateReview);

module.exports=route;
