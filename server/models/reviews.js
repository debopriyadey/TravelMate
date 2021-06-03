import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema({
    title: String,
    review: String,
    tags: [String],
    
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    selectedFile: String,

    createdAt: {
        type: Date,
        default: new Date()
    }
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;