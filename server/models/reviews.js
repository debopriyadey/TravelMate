const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    title: String,
    review: String,
    tags: [String],
    
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    creatorName: {
        type: String,
        ref: "users"
    },
    selectedFile: String,

    createdAt: {
        type: Date,
        default: new Date()
    }
},{ strict: false });

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;