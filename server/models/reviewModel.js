import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema({
    place: String,
    review: String,
    creator: String,
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

const ReviewModel = mongoose.model('ReviewModel', reviewSchema);

export default ReviewModel;