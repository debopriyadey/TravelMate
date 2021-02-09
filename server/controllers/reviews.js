import ReviewModel from '../models/reviewModel.js'

export const getReviews = async (req, res) => {
    try {
        const review = await ReviewModel.find();
        res.status(200).json(review);

    } catch (error) {
        res.status(404).json({message: error.message });
    }
}

export const createReview = (req, res) => {
    const review = req.body;

    const newReview = new ReviewModel(review);

    try {
        newReview.save();
        res.status(200).json(newReview);
    } catch (error) {
        res.status(404).json({message: error.message });
    }
}

