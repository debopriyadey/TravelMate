import mongoose from 'mongoose';
import Review from '../models/reviews.js'
import Users from '../models/users.js';

const ObjectId = mongoose.Types.ObjectId;
export const getReviews =  (req, res) => {
    
    let allPosts=[];
    Review.find({}).lean().then((posts)=>{
        allPosts= posts;
    let reviews= posts.map((post)=>{
       const totalLikes= Users.countDocuments({likes: post._id}).exec();
       return totalLikes;
    });
     return Promise.all(reviews);
   }).then((reviews)=>{
       
       reviews.forEach((review,index,reviews)=>{
         allPosts[index]={...allPosts[index],likes:review};
       });

       res.send(allPosts);
   })
   .catch((err)=>{ 
       throw err;
   })
}   


export const createReview = async (req, res) => {
    
    const {title, review, tags, likes, creator, creatorName, selectedFile} = req.body;
    if (!title || !review){
        return res.status(412).json({message: "add all the fields"});
    }
    const  tagsArray=tags.split(",");
    const newReview = new Review({
        title,
        review,
        tags:tagsArray,
        selectedFile,
        likes,
        creator,
        creatorName,
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
    Review.find({creator: req.users})
     .then((myReviews) => {
         res.json({myReviews})
     })
     .catch((err) => {
         console.log(err);
     })
}

export const searchReview=( req,res)=>{
    const reg=new RegExp('^' + req.body.tags,'i')
    Review.find({ tags: {$all: reg} }, { tags:1 , _id: 0})
    .then((Reviews) => {
        let data=[]
        Reviews.forEach(element => {
            element.tags.forEach(tag => {
                if(reg.test(tag))data.push(tag);
            });

        });
        data.sort();
        let alltags=[]
        if(data.length>0){
            alltags.push(data[0])
            for(let i=1;i<data.length;i++){
                if( alltags[alltags.length-1]!==data[i] )alltags.push(data[i]);
            }
        }
        console.log(alltags);
        res.send(alltags);
    }) 
    .catch((err) => {
        console.log(err);
    })
}


export const getPostByTag=(req,res)=>{
    const reg=new RegExp('^' + req.body.tags,'i')
   
    Review.find({ tags: {$all: [req.body.tags]} })
    .then((Reviews) => {
        res.json({Reviews});
    }) 
    .catch((err) => {
        console.log(err);
    })

}

export const currentReview = async (req, res) => {
    try {
        const review = await Review.findOne({_id: req.params.id});
        res.status(200).json(review);

    } catch (error) {
        res.json({message: error.message });
    }
}

export const increaseLike= (req, res)=>{
    const {placeId, userId}= req.body;
    Users.findOne({_id: userId})
    .then((user) => {
        if(user.likes.includes(ObjectId(placeId))){
            user.likes= user.likes.filter(item=> !(ObjectId(placeId).equals(item)));
            user.save()
            .then((user)=>{
                res.json({message:"Decrease Like","postId":placeId});
            }).catch((err)=>{
                console.log(err);
            })
            
        }else {

            user.likes.push(ObjectId(placeId));
            user.save()
            .then((user)=>{
                res.json({message:"Increase Like","postId":placeId});
            }).catch((err)=>{
                console.log(err);
            })
        }
    })
    .catch((err) => {
        console.log(err);
    })
}

export const updateReview = async (req, res) => {
    try {
        const id = req.params.id
        const {title, review, tags} = req.body;
        const updateReview = {
            title,
            review,
            tags
        }

        await Review.findOneAndUpdate({ _id: id }, updateReview);
        return res.json({ msg: "Data updated Successfully" });

    } catch (error) {
        return res.status(400).json(error)
    }
}

export const deleteReview = async (req, res) => {
    try {
        const { id } = req.params
        await Review.findByIdAndRemove(id)
        res.json({message: `review deleted with id: ${id}`})
    } catch (error) {
        res.json(error)   
    }

}