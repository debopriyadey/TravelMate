import Review from '../models/reviews.js'

export const getReviews = async (req, res) => {
    try {
        const review = await Review.find();
        res.status(200).json(review);

    } catch (error) {
        res.status(404).json({message: error.message });
    }
}

export const createReview = (req, res) => {
    const {place, review, creator, likes, tags} = req.body;
    if (!place || !review){
        return res.status(422).json({error: "add all the fields"});
    }
    console.log(req.users);
    const newReview = new Review({
        place,
        review,
        creator: req.users,
        tags,
        likes
    })
    newReview.save()
     .then((result) => {
        res.json({newReview: result})
    })
    .catch((err) => {
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