const initialState = {  
    userInfo: JSON.parse(localStorage.getItem("users")) === null ? {} : JSON.parse(localStorage.getItem("users")),
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
                userInfo: action.payload,
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
                userInfo:action.payload,
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
            localStorage.setItem("users", JSON.stringify(userInfo))
            return {
                ...state,
                allreviews:reviews,
                userInfo:JSON.stringify(userInfo)
            };
        default:
            return state;
    }
}

export default review
