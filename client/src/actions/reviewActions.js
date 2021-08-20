import * as api from '../api';
import { ADD_MY_NEW_REVIEW, ALL_REVIEWS_FAIL, ALL_REVIEWS_REQUEST, ALL_REVIEWS_SUCCESS, CHANGE_LIKE_FAIL, CHANGE_LIKE_IN_RECENT_REVIEW, CHANGE_LIKE_IN_SEARCH_REVIEW, CHANGE_LIKE_IN_USER_DATA, CHANGE_LIKE_REQUEST, CHANGE_LIKE_SUCCESS, CREATE_REVIEW_FAIL, CREATE_REVIEW_REQUEST, CREATE_REVIEW_SUCCESS, DELETE_A_REVIEW, GET_RECENT_REVIEW_FAIL, GET_RECENT_REVIEW_REQUEST, GET_RECENT_REVIEW_SUCCESS, SEARCH_REVIEW_FAIL, SEARCH_REVIEW_REQUEST, SEARCH_REVIEW_SUCCESS, UPDATE_REVIEW_FAIL, UPDATE_REVIEW_REQUEST, UPDATE_REVIEW_SUCCESS } from '../constents';
import store from '../store'

// for getting all Reviews and adding that in user Review
export const getReviews = () => async (dispatch) => {
  try {
     dispatch({type: ALL_REVIEWS_REQUEST});
      const { data } = await api.fetchPost();
      dispatch({ type: ALL_REVIEWS_SUCCESS, payload: data });
  } catch (error) {
      console.log(error.response)
      dispatch({ type: ALL_REVIEWS_FAIL, payload: error.response.data.error})
  }
}

export  const getRecentReview = () =>async (dispatch) => {
    try {
        dispatch({type: GET_RECENT_REVIEW_REQUEST});
        const   {data} = await api.recentReview();
        dispatch({type: GET_RECENT_REVIEW_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: GET_RECENT_REVIEW_FAIL, payload: error.response.data.error})
    }
}

export const deleteReview = (id) => async (dispatch) => {
    try {
        await api.deleteReview(id);
        dispatch({type: DELETE_A_REVIEW, payload: id})
    } catch (error) {
        console.log(error);
    }

}

export const currentreview = (review) => async (dispatch) => {
  try {
      const { data } = await api.currentReview(review);
      dispatch({ type: 'CURRENT_REVIEW', payload: data });
  } catch (error) {
      console.log(error.message);
  }
}

export const createreviews = (review) => async (dispatch) => {
  try {
      dispatch({ type: CREATE_REVIEW_REQUEST })
      const { data } = await api.createreview(review);
      const newReview = {...data.newReview, likes:0}
      dispatch({ type: CREATE_REVIEW_SUCCESS, payload: newReview});
      dispatch({type: ADD_MY_NEW_REVIEW, payload: newReview})
  } catch (error) {
      dispatch({ type: CREATE_REVIEW_FAIL , payload: error.response.data.error})
  }
}

export const updateReview = (review,history) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_REVIEW_REQUEST })
        const data = await api.updateReview(review._id, review)
        data.likes= review.likes;
        dispatch({type: UPDATE_REVIEW_SUCCESS, payload : data})
        history.push('/myreviews')
    } catch (error) {
        // dispatch({type: UPDATE_REVIEW_FAIL, payload: error.response.data.error})
        console.log(error)
    }
}

export const increaseLike = (likeData) => async (dispatch) => {
  try {
      dispatch({ type: CHANGE_LIKE_REQUEST });
      const  {data}  = await api.increaseLikeapi(likeData);
      dispatch({type:CHANGE_LIKE_SUCCESS ,payload:data});
      dispatch({type: CHANGE_LIKE_IN_USER_DATA, payload: data })
      dispatch({type: CHANGE_LIKE_IN_SEARCH_REVIEW, payload: data});
      dispatch({type: CHANGE_LIKE_IN_RECENT_REVIEW, payload: data});
  } catch (error) {
      console.log(error);
      dispatch({ type: CHANGE_LIKE_FAIL, payload: error.response.data.error })
      console.log(error);
  }
}

export const searchReview = (search) => async (dispatch) => {
    try { 
        dispatch({ type: SEARCH_REVIEW_REQUEST });
        const { data } = await  api.getPostsbyTag(search);
        dispatch({ type: SEARCH_REVIEW_SUCCESS , payload: data.Reviews})
    } catch(error) {
        console.log(error, " from action ")
        // dispatch({ type: SEARCH_REVIEW_FAIL , payload: error.response.data.error })
    }
}