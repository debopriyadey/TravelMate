import * as api from '../api';



// import { signin } from'../actions/actions';
//action creator
export const getReviews = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPost();
        dispatch({ type: 'FECTCH_ALL', payload: data });
    } catch (error) {
        console.log(error.message);
    }
} 

export const createreviews = (review) => async (dispatch) => {
    try {
        const { data } = await api.createreview(review);
        
        dispatch({type: 'CREATE_REVIEW', payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const signup = (users) => async (dispatch) => {
    try {
        const { data } = await api.signup(users);

        dispatch({ type: 'SIGNUP', payload: data });
    } catch (error) {
        console.log(error.message);
    }
} 

export const signin = (users) => async (dispatch) => {
    try{
        const { data } = await api.signin(users);
        localStorage.setItem("jwt", data.token);
        localStorage.setItem("users", JSON.stringify(data.savedUser))

        dispatch({ type: 'SIGNIN', payload: data});
    } catch (error) {
        console.log(error.message);
    }
}
