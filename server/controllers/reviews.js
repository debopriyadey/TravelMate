const mongoose = require('mongoose');
const Review = require('../models/reviews.js');
const Users = require('../models/users.js');


const ObjectId = mongoose.Types.ObjectId;
const getReviews = (req, res) => {

    let allPosts = [];
    Review.find({}).lean().then((posts) => {
        allPosts = posts;
        let reviews = posts.map((post) => {
            const totalLikes = Users.countDocuments({ likes: post._id }).exec();
            return totalLikes;
        });
        return Promise.all(reviews);
    }).then((reviews) => {

        reviews.forEach((review, index, reviews) => {
            allPosts[index] = { ...allPosts[index], likes: review };
        });
        res.send(allPosts.sort(function (a, b) {
            var keyA = new Date(a.likes),
                keyB = new Date(b.likes);
            // Compare the 2 dates
            if (keyA < keyB) return 1;
            if (keyA > keyB) return -1;
            return 0;
        }));
    })
        .catch((err) => {
            console.log(err.message);
            next(err);
        })
}

const getRecentReview = (req, res) => {
    let allPosts = [];
    Review.find({}).limit(5).sort({ date: -1 }).lean().then((posts) => {
        allPosts = posts;
        let reviews = posts.map((post) => {
            const totalLikes = Users.countDocuments({ likes: post._id }).exec();
            return totalLikes;
        });
        return Promise.all(reviews);
    }).then((reviews) => {

        reviews.forEach((review, index, reviews) => {
            allPosts[index] = { ...allPosts[index], likes: review };
        });
        res.send(allPosts);
    })
        .catch((err) => {
            throw err;
        })
}


const createReview = async (req, res) => {

    const { title, review, tags, likes, creator, creatorName, selectedFile } = req.body;
    if (!title || !review) {
        return res.status(412).json({ error: "Title and Review both Required" });
    }
    const tagsArray = tags.split(",");
    const newReview = new Review({
        title,
        review,
        tags: tagsArray,
        selectedFile,
        likes,
        creator,
        creatorName,
    })
    newReview.save()
        .then((result) => {
            res.json({ newReview: result })
        })
        .catch((err) => {
            next(err);
        })
}

const myReviews = (req, res, next) => {
    Review.find({ creator: req.users })
        .then((myReviews) => {
            res.json({ myReviews })
        })
        .catch((err) => {
            next(err)
        })
}

const getAllReviewTags = (req, res, next) => {
    const reg = new RegExp('^' + req.body.tags, 'i')
    Review.find({ tags: { $all: reg } }, { tags: 1, _id: 0 })
        .then((Reviews) => {
            let data = []
            Reviews.forEach(element => {
                element.tags.forEach(tag => {
                    if (reg.test(tag)) data.push(tag);
                });

            });
            data.sort();
            let alltags = []
            if (data.length > 0) {
                alltags.push(data[0])
                for (let i = 1; i < data.length; i++) {
                    if (alltags[alltags.length - 1] !== data[i]) alltags.push(data[i]);
                }
            }
            res.send(alltags);
        })
        .catch((err) => {
            next(err);
        })
}


const getPostsByTag=(req,res, next)=>{
    const reg=new RegExp('^' + req.body.tags,'i')
    Review.find({ tags: {$all: [reg]} }).lean().exec()
    .then((posts) => {
        return Promise.all(posts.map((post,index) => {
            return Users.countDocuments({ likes: post._id }).exec().then((totalLikes)=> {
              return posts[index]= {...post, likes:totalLikes}
            })
        }));
    }).then((Reviews) => {
        res.send({Reviews});
    }) 
    .catch((err) => {
        next(err)
    })



}

const currentReview = async (req, res, next) => {
    try {
        const review = await Review.findOne({ _id: req.params.id });
        res.status(200).json(review);

    } catch (error) {
        next(error)
    }
}

const increaseLike = (req, res, next ) => {
    const { placeId, userId } = req.body;
    Users.findOne({ _id: userId })
        .then((user) => {
            if (user.likes.includes(ObjectId(placeId))) {
                user.likes = user.likes.filter(item => !(ObjectId(placeId).equals(item)));
                user.save()
                    .then((user) => {
                        res.json({ message: "Decrease Like", "postId": placeId });
                    }).catch((err) => {
                        next(err)
                    })

            } else {

                user.likes.push(ObjectId(placeId));
                user.save()
                    .then((user) => {
                        res.json({ message: "Increase Like", "postId": placeId });
                    }).catch((err) => {
                        next(err)
                    })
            }
        })
        .catch((err) => {
            next(err);
        })
}

const updateReview = async (req, res, next) => {
    try {
        const id = req.params.id
        const { title, review, tags } = req.body;
        const tagsArray = tags.split(",");
        const updateReview = {
            title,
            review,
            tags: tagsArray
        }

       const result = await Review.findOneAndUpdate({ _id: id, creator: req.user._id }, updateReview);
       if(result === null){
           return res.status(422).json({ msg: "Either Client is not creator of the post Or the post doesn't exist" });
       }
       return res.json({ msg: "Data updated Successfully" });

    } catch (error) {
        next(error)
    }
}

const deleteReview = async (req, res, next) => {
    try {
        const { id } = req.params
        const result = await Review.deleteOne({_id: id, creator: req.user._id })
        if(result.deleteCount===0){
           return res.status(422).json({ msg: "Either Client is not creator of the post Or the post doesn't exist" });
        }
        return   res.json({ message: `review deleted with id: ${id}` })
    } catch (error) {
        next(error)
    }

}

module.exports = {
    getReviews,
    getRecentReview,
    createReview,
    myReviews,
    getAllReviewTags,
    getPostsByTag,
    currentReview,
    increaseLike,
    updateReview,
    deleteReview
}