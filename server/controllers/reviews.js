import Review from '../models/reviews.js'
import Users from '../models/users.js';

// export const getReviews = async (req, res) => {
//     try {
//         const review = await Review.find();
//         res.status(200).json(review);

//     } catch (error) {
//         res.status(402).json({message: error.message });
//     }
// }


export const getReviews =  (req, res) => {
    Review.find({},{selectedFile:0,tags:0,creator:0,review:0,createdAt:0}).lean().then((posts)=>{
     posts.forEach((post,index)=>{
        Users.find({likes: post._id.toString()}).then((doc)=>{
            console.log(post._id, doc.length);
            // posts[index].likes=doc.length;
            // review.push(post);
            // console.log(review);
            // query inside for loop in mongoose?
            // https://stackoverflow.com/questions/44499299/mongoose-findone-inside-loop
        }).catch((err)=>{
            throw err;
        })
     })
     console.log(posts);
     res.send(posts);
   }).catch((err)=>{
       throw err;
   })
}   

export const createReview = async (req, res) => {

    const {title, review, tags, likes, creator,selectedFile} = req.body;
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
        creator
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
        // res.json({myReviews})
        // console.log(myReviews);
        let data=[]
        Reviews.forEach(element => {
            element.tags.forEach(tag => {
                if(reg.test(tag))data.push(tag);
            });

        });
        // console.log(data);
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

export const increaseLike= (req, res)=>{
    const {placeId, userId}= req.body;
    console.log(req.body);
    Users.findOne({_id: userId})
    .then((user) => {
        console.log(user);
        if(user.likes.includes(placeId)){
            user.likes= user.likes.filter(item=> item!==placeId);
            console.log(" decrease ", user.likes);
            user.save()
            .then((user)=>{
                res.json({message:"Decrease Like","postId":placeId});
            }).catch((err)=>{
                console.log(err);
            })
            
        }else {

            user.likes.push(placeId);
            user.save()
            .then((user)=>{
                console.log(" increase ",user.likes);
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