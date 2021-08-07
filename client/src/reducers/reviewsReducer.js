/*const initialState = {  
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
*/

import { ADD_MY_NEW_REVIEW, ALL_REVIEWS_FAIL, ALL_REVIEWS_REQUEST, ALL_REVIEWS_SUCCESS, CHANGE_LIKE_FAIL, CHANGE_LIKE_IN_SEARCH_REVIEW, CHANGE_LIKE_REQUEST, CHANGE_LIKE_SUCCESS, CLEAR_CREATE_REVIEW, CLEAR_MY_REVIEW, CREATE_REVIEW_FAIL, CREATE_REVIEW_REQUEST, CREATE_REVIEW_SUCCESS, SEARCH_REVIEW_FAIL, SEARCH_REVIEW_REQUEST, SEARCH_REVIEW_SUCCESS } from "../constents";


// Reducer for working with all the Reviews including user's Reviews
const allReviewsReducer = (state = { allReviews: [], myReviews: [] }, action) => {

    switch (action.type) {
        case ALL_REVIEWS_REQUEST:
            return {
                ...state,
                error: false,
                loading: true,
            };

        case ALL_REVIEWS_SUCCESS:
            return {
                ...state,
                error: false,
                loading: false,
                allReviews: action.payload[1],
                myReviews: action.payload[0]
            }

        case ALL_REVIEWS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }

        case ADD_MY_NEW_REVIEW:
            return {
                ...state,
                allReviews: [...state.allReviews, action.payload],
                myReviews: [...state.myReviews, action.payload]
            }

        case CLEAR_MY_REVIEW:
            return {
                ...state,
                myReviews: []
            }

        case CHANGE_LIKE_REQUEST:
            return {
                ...state,
                changeLikeError: false,
            }

        case CHANGE_LIKE_SUCCESS:
            const reviews = [];
            // Changing all reviews
            state.allReviews.map((review) => {
                if (review._id === action.payload.postId) {
                    if (action.payload.message === "Increase Like") {
                        reviews.push({ ...review, "likes": review.likes + 1 });
                    } else if (action.payload.message === "Decrease Like") {
                        reviews.push({ ...review, "likes": review.likes - 1 });
                    } else {
                        reviews.push(review);
                    }
                } else
                    reviews.push(review);
            });
            // Changing my reviews
            const newMyreviews = []
            state.myReviews.map((review) => {
                if (review._id === action.payload.postId) {
                    if (action.payload.message === "Increase Like") {
                        newMyreviews.push({ ...review, "likes": review.likes + 1 });
                    } else if (action.payload.message === "Decrease Like") {
                        newMyreviews.push({ ...review, "likes": review.likes - 1 });
                    } else {
                        newMyreviews.push(review);
                    }
                } else
                    newMyreviews.push(review);
            });
            return {
                ...state,
                allReviews: reviews,
                myReviews: newMyreviews,
            };

        case CHANGE_LIKE_FAIL:
            return {
                ...state,
                changeLikeError: action.payload
            }

        default:
            return state

    }

}

// createReviews
const createReviewReducer = (state = { message: "" }, action) => {

    switch (action.type) {
        case CREATE_REVIEW_REQUEST:
            return {
                loading: true,
            }

        case CREATE_REVIEW_SUCCESS:
            return {
                loading: false,
                message: action.payload
            }

        case CREATE_REVIEW_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_CREATE_REVIEW:
            return {
                message: ""
            }
        default:
            return state;
    }
}


// search Review 
const searchReviewReducer = (state = { reviews: [] }, action) => {
    switch (action.type) {
        case SEARCH_REVIEW_REQUEST:
            return { searchLoading: true }
        case SEARCH_REVIEW_SUCCESS:
            return { reviews: action.payload, searchLoading: false }
        case SEARCH_REVIEW_FAIL:
            return { error: action.payload , searchLoading: false}
        case CHANGE_LIKE_IN_SEARCH_REVIEW:
            const newReviews = [];
            // Changing all reviews
            state.reviews.map((review) => {
                if (review._id === action.payload.postId) {
                    if (action.payload.message === "Increase Like") {
                        newReviews.push({ ...review, "likes": review.likes + 1 });
                    } else if (action.payload.message === "Decrease Like") {
                        newReviews.push({ ...review, "likes": review.likes - 1 });
                    } else {
                        newReviews.push(review);
                    }
                } else
                    newReviews.push(review);
            });

            return { reviews: newReviews }
        default:
            return state;

    }
}

export { allReviewsReducer, createReviewReducer, searchReviewReducer }

/*
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
*/