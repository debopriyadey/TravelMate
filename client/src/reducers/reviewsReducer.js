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

import { ADD_MY_NEW_REVIEW, ALL_REVIEWS_FAIL, ALL_REVIEWS_REQUEST, ALL_REVIEWS_SUCCESS, CHANGE_LIKE_FAIL, CHANGE_LIKE_IN_SEARCH_REVIEW, CHANGE_LIKE_REQUEST, CHANGE_LIKE_SUCCESS, CLEAR_CREATE_REVIEW, CLEAR_MY_REVIEW, CREATE_REVIEW_FAIL, CREATE_REVIEW_REQUEST, CREATE_REVIEW_SUCCESS, DELETE_A_REVIEW, GET_RECENT_REVIEW_FAIL, GET_RECENT_REVIEW_REQUEST, GET_RECENT_REVIEW_SUCCESS, SEARCH_REVIEW_FAIL, SEARCH_REVIEW_REQUEST, SEARCH_REVIEW_SUCCESS, UPDATE_REVIEW_FAIL, UPDATE_REVIEW_REQUEST, UPDATE_REVIEW_SUCCESS } from "../constents";


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
                allReviews: [action.payload,...state.allReviews, ],
                myReviews: [action.payload, ...state.myReviews, ]
            }

        case CLEAR_MY_REVIEW:
            return {
                ...state,
                myReviews: []
            }
        case UPDATE_REVIEW_REQUEST:
            return {
                ...state,
                 updateReviewLoading: true
            }
        case UPDATE_REVIEW_SUCCESS:
            const newallReviews = [];
            state.allReviews.map((review) => {
                if(action.payload._id===review._id)newallReviews.push(action.payload);
                else newallReviews.push(review)
            })
            const newmyReview = [];
            state.myReviews.map((review) => {
                if(action.payload._id=== review._id) newmyReview.push(action.payload)
                else newmyReview.push(review);
            })
         return {
             ...state,
             updateReviewLoading: false,
             myReviews: newmyReview,
             allReviews: newallReviews,
         }
        
        case UPDATE_REVIEW_FAIL:
            return {
                ...state, 
                updateReviewError: action.payload
            }
        case DELETE_A_REVIEW:
            const newAllReviews = state.allReviews.filter((review)=> review._id !== action.payload)
            const newMyReview = state.myReviews.filter ((review) => review._id !== action.payload)
            return {
                ...state,
                allReviews: newAllReviews,
                myReviews: newMyReview
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

// RecentReviewReducer 
const recentReviewReducer = (state = {}, action) => {
    switch(action.type){
        case GET_RECENT_REVIEW_REQUEST:
            return {
                loading: true
            }
        case GET_RECENT_REVIEW_SUCCESS:
            return {
                loading:false,
                recentReviews: action.payload
            }
        case GET_RECENT_REVIEW_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case ADD_MY_NEW_REVIEW: 
            return {
                recentReviews: [action.payload, ...state.recentReviews]
            }
        case UPDATE_REVIEW_SUCCESS: 
            const newrecentReview = [];
            state.recentReviews.map((review) => {
                if(review._id===action.payload._id)newrecentReview.push(action.payload)
                else newrecentReview.push(review)
            })
            return {
                ...state, 
                recentReviews: newrecentReview
            }
        case CHANGE_LIKE_IN_SEARCH_REVIEW:
            const newRecentReview = [];
            state.recentReviews.map((review) => {
                if (review._id === action.payload.postId) {
                    if (action.payload.message === "Increase Like") {
                        newRecentReview.push({ ...review, "likes": review.likes + 1 });
                    } else if (action.payload.message === "Decrease Like") {
                        newRecentReview.push({ ...review, "likes": review.likes - 1 });
                    } else {
                        newRecentReview.push(review);
                    }
                } else
                    newRecentReview.push(review);
            });
            return {
                recentReviews: newRecentReview
            }
        case DELETE_A_REVIEW:
            const newRecentReviews = state.recentReviews.filter((review)=> review._id!==action.payload)
            return {
                recentReviews: newRecentReviews
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
        case UPDATE_REVIEW_SUCCESS:
            const newSearchReviews = [];
            state.reviews.map((review) => {
                if(review._id === action.payload._id) newSearchReviews.push(action.payload)
                else newSearchReviews.push(review)
            })
            return {
                ...state, 
                reviews: newSearchReviews
            }

        default:
            return state;

    }
}

export { allReviewsReducer, createReviewReducer, searchReviewReducer,recentReviewReducer }
