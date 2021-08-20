import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { allReviewsReducer, createReviewReducer, recentReviewReducer, searchReviewReducer } from './reducers/reviewsReducer';
import { logoutReducer, signupReduecer, userDataReducer } from './reducers/userReducers';

const initialState = {};
const reducer = combineReducers({
  userInfo: userDataReducer,
  logoutInfo: logoutReducer,
  signupInfo: signupReduecer,
  reviews: allReviewsReducer,
  createReviewInfo: createReviewReducer,
  searchReview: searchReviewReducer,
  recentReviews: recentReviewReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||compose;

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;