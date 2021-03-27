import * as api from '../api';
import setAuthenticationToken from './setAuthenticationToken'
import jwt from 'jsonwebtoken'
// import history from '../history';
// import { Link, useHistory } from 'react-router-dom';
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
        console.log(data);
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
        dispatch({type:'SIGNUPFAILS',payload: error.response.data})
    }
} 

export const signin = (users) => async (dispatch) => {
    try{
        // const history = useHistory()
        const {data}  = await api.signin(users);
        localStorage.setItem("jwt", data.token);
        localStorage.setItem("users", JSON.stringify(data.savedUser))
        let useinfo={}
        for(const property in data.savedUser)
        useinfo[property]=data.savedUser[property]
        useinfo["token"]=data.token
        setAuthenticationToken(useinfo["token"])
        console.log(jwt.decode(useinfo["token"]))
        dispatch(setCurrentUser(useinfo))
        dispatch({ type: 'SIGNIN', payload: useinfo});
    } catch (error) {
        
        dispatch({ type: 'SIGNINFAILS', payload: error.response.data});
    }
}


export const setCurrentUser=(user)=>{
    return {
        type:"SET_CURRENT_USER",
        payload:user
    }
}

export const logout=()=>{
    return function(dispatch){
            localStorage.removeItem("jwt");
            localStorage.removeItem("users");
            setAuthenticationToken(false);
            dispatch(setCurrentUser({}))
            dispatch({type:"LOGOUT"})
    }
}