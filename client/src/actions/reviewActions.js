import * as api from '../api';
import { ADD_MY_NEW_REVIEW, ALL_REVIEWS_FAIL, ALL_REVIEWS_REQUEST, ALL_REVIEWS_SUCCESS, CHANGE_LIKE_FAIL, CHANGE_LIKE_IN_SEARCH_REVIEW, CHANGE_LIKE_IN_USER_DATA, CHANGE_LIKE_REQUEST, CHANGE_LIKE_SUCCESS, CREATE_REVIEW_FAIL, CREATE_REVIEW_REQUEST, CREATE_REVIEW_SUCCESS, SEARCH_REVIEW_FAIL, SEARCH_REVIEW_REQUEST, SEARCH_REVIEW_SUCCESS } from '../constents';
import store from '../store'

// for getting all Reviews and adding that in user Review
export const getReviews = () => async (dispatch) => {
  try {
     dispatch({type: ALL_REVIEWS_REQUEST});
      const { data } = await api.fetchPost();
      const myreviews = [];
      if (store.getState().userInfo.user && store.getState().userInfo.user._id) {
          const user = store.getState().userInfo.user;
          data.forEach(element => {
              if (element.creator === user._id) {
                  myreviews.push(element);
              }
          });

      }
      dispatch({ type: ALL_REVIEWS_SUCCESS, payload: [myreviews, data] });
  } catch (error) {
      console.log(error.response)
      dispatch({ type: ALL_REVIEWS_FAIL, payload: error.response.data.error})
  }
}

export const currentreview = (review) => async (dispatch) => {
  try {
      const { data } = await api.currentReview(review);
      dispatch({ type: 'CURRENT_REVIEW', payload: data });
      console.log(data)
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

export const increaseLike = (likeData) => async (dispatch) => {
  try {
      dispatch({ type: CHANGE_LIKE_REQUEST });
      const  {data}  = await api.increaseLikeapi(likeData);
      console.log(data);
      dispatch({type:CHANGE_LIKE_SUCCESS ,payload:data});
      dispatch({type: CHANGE_LIKE_IN_USER_DATA, payload: data })
      dispatch({type: CHANGE_LIKE_IN_SEARCH_REVIEW, payload: data});
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
        console.log(data.Reviews);
        dispatch({ type: SEARCH_REVIEW_SUCCESS , payload: data.Reviews})
    } catch(error) {
        console.log(error, " from action ")
        // dispatch({ type: SEARCH_REVIEW_FAIL , payload: error.response.data.error })
    }
}