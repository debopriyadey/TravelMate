import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema({
    place: String,
    review: String,
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    selectedFile: String,
    tags: [String],
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