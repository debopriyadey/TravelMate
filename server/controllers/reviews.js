import Review from '../models/reviews.js'

export const getReviews = async (req, res) => {
    try {
        const review = await Review.find();
        res.status(200).json(review);

    } catch (error) {
        res.status(402).json({message: error.message });
    }
}

export const createReview = async (req, res) => {

    const {title, review, tags, likes, creator} = req.body;
    if (!title || !review){
        return res.status(412).json({message: "add all the fields"});
    }
    console.log(req.users);
    const newReview = new Review({
        title,
        review,
        tags,
        creator: req.users,
        likes
    })
    newReview.save()
     .then((result) => {
        res.json({newReview: result})
    })
    .catch((err) => {
        res.json({err})
        console.log(err);
    })
}
export const myReviews = (req, res) => {
    Review.find({creator: req.users._id})
     .then((myReviews) => {
         res.json({myReviews})
     })
     .catch((err) => {
         console.log(err);
     })
}