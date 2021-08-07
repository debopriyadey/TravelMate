import { CHANGE_LIKE_IN_USER_DATA, CLEAR_SIGNUP_INFO, CLEAR_USER_DATA, GET_USER_DATA_FAIL, GET_USER_DATA_REQUEST, LOGGEDIN_USER_INFO_REQUEST, LOGOUT_FAIL, LOGOUT_REQUEST, LOGOUT_SUCCESS, SIGNIN_FAIL, SIGNIN_REQUEST, SIGNIN_SUCCESS, SIGNUP_FAIL, SIGNUP_REQUEST, SIGNUP_SUCCESS } from "../constents";

// signupReducer
const signupReduecer = (state = { message: "" }, action) => {
  switch(action.type) {
    case SIGNUP_REQUEST: 
      return { loading: true }
    case SIGNUP_SUCCESS:
      return { loading: false, message: action.payload }
    case SIGNUP_FAIL:
      return { loading: false, error: action.payload }
    case CLEAR_SIGNUP_INFO:
      return {}
    default:
      return state;
  }
}

// userDataReducer for handeling signin + some user events
const userDataReducer = (state = {user: {}}, action) => {
  switch(action.type){
    case SIGNIN_REQUEST:
      return { loading: true }
    case SIGNIN_SUCCESS:
      return { loading: false , user: action.payload, getUserDataLoader: false }
    case SIGNIN_FAIL:
      return { loading: false, error: action.payload }

    case CHANGE_LIKE_IN_USER_DATA:
      const {message, postId } = action.payload;
      // Changing user Likes 
      const userInfo= state.user;
      if(message==="Increase Like"){
        userInfo.likes.push(postId);
      }else if(action.payload.message==="Decrease Like"){
        userInfo.likes= userInfo.likes.filter((id)=> id!= postId);
      }
      return { user: userInfo }
    
    case GET_USER_DATA_REQUEST:
      return { getUserDataLoader: true }  
    case GET_USER_DATA_FAIL:
      return { getUserDataLoader: false }
    case CLEAR_USER_DATA:
      return {user:[]}
    
    default:
      return state;
  }
}

// logoutReducer
const logoutReducer = (state = {message: ""}, action) => {
  switch(action.type) {
    case LOGOUT_REQUEST:
      return { loading : true }
    case LOGOUT_SUCCESS: 
      return {loading : false, message: action.payload }
    case LOGOUT_FAIL: 
      return { loading : false , error: action.payload }
    default:
      return state
  }
}



export { signupReduecer ,userDataReducer, logoutReducer };