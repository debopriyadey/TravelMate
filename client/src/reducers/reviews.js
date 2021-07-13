const initialState = {  
    userInfo: {},
    message:'',
    signupMessage:'',
    // reviews:[],
    createdReview:{},
    signupSuccess:false,
    loggedIn:false ,
    myreviews:[],
    allreviews:[],
    currentReview: null,
    Like:{"id":null},
}
 const  review =(state = initialState , action) => {
    switch (action.type) {
       
        case 'FETCH_ALL':
            return {
                ...state,
                allreviews:action.payload[1],
                myreviews:action.payload[0]
            };
        case 'SIGNUP':
            return{
                ...state,
                userInfo: [],
                signupSuccess:true
                
            };
        case 'SIGNUPFAILS':
            return{
                ...state,
                signupMessage: action.payload
            };
        case 'SIGNUPTOLOGIN':
            return{
                ...state,
                signupSuccess:false
            };
        case 'SIGNIN':
            return {
                ...state,
                loggedIn:true
            };
        case 'SIGNINFAILS':
            return {
                ...state,
                message: action.payload
            };
        case 'SET_CURRENT_USER':
            return {
                ...state,
                loggedIn:true
            };
        case 'LOGOUT':
            return {
                ...state,
                loggedIn:false
            };
        case 'CREATE_REVIEW':
            return {
                ...state,
                allreviews: [...state.allreviews, action.payload],
                myreviews: [ ...state.myreviews , action.payload]
            };
        case 'CURRENT_REVIEW':
            return { 
                ...state,
                currentReview: action.payload
            };
        case 'IncreaseLike':
            const reviews=[];
            const userInfo=JSON.parse(state.userInfo);
            // changing all reviews
            state.allreviews.map((review)=>{
                if(review._id===action.payload.postId){
                    if(action.payload.message==="Increase Like"){
                        userInfo.likes.push(review._id);
                        reviews.push({...review,"likes":review.likes+1});
                    }else if(action.payload.message==="Decrease Like"){
                        reviews.push({...review,"likes":review.likes-1});
                        userInfo.likes= userInfo.likes.filter((id)=> id!= review._id);
                    }else {
                        reviews.push(review);
                    }
                }else
                    reviews.push(review);
            });
            // chainging my reviews
            const newMyreviews=[]
            state.myreviews.map((review)=>{
                if(review._id===action.payload.postId){
                    if(action.payload.message==="Increase Like"){
                        newMyreviews.push({...review,"likes":review.likes+1});
                    }else if(action.payload.message==="Decrease Like"){
                        newMyreviews.push({...review,"likes":review.likes-1});
                    }else {
                        newMyreviews.push(review);
                    }
                }else
                newMyreviews.push(review);
            });
            localStorage.setItem("users", JSON.stringify(userInfo))
            return {
                ...state,
                allreviews:reviews,
                myreviews:newMyreviews,
                userInfo:JSON.stringify(userInfo),
            
            };
        default:
            return state;
    }
}

export default review
