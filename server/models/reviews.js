import mongoose from 'mongoose';

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
    likes: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;