import * as api from '../api';
import setAuthenticationToken from './setAuthenticationToken'
import jwt from 'jsonwebtoken'

// import history from '../history';
// import { Link, useHistory } from 'react-router-dom';
// import { signin } from'../actions/actions';
// action creator

export const getReviews = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPost();
        const myreviews = [];
        if (localStorage.getItem("users") !== null) {
            const user = JSON.parse(localStorage.getItem("users"));
            data.forEach(element => {
                if (element.creator === user._id) {
                    myreviews.push(element);
                }
                else {
                }
            });
        }
        console.log(myreviews);
        dispatch({ type: 'FETCH_ALL', payload: [myreviews, data] });
    } catch (error) {
        console.log(error.message);
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
        const { data } = await api.createreview(review);
        dispatch({ type: 'CREATE_REVIEW', payload: data.newReview });
        console.log(typeof (data));
    } catch (error) {
        console.log(error);
    }
}

export const signup = (users) => async (dispatch) => {
    try {
        const { data } = await api.signup(users);
        dispatch({ type: 'SIGNUP', payload: data });
    } catch (error) {
        dispatch({ type: 'SIGNUPFAILS', payload: error.response.data })
    }
}

export const signin = (users) => async (dispatch) => {
    try {
        // const history = useHistory()
        const { data } = await api.signin(users);
        localStorage.setItem("jwt", data.token);
        localStorage.setItem("users", JSON.stringify(data.savedUser))
        let useinfo = {}
        for (const property in data.savedUser)
            useinfo[property] = data.savedUser[property]
        useinfo["token"] = data.token
        setAuthenticationToken(useinfo["token"])
        console.log(jwt.decode(useinfo["token"]))
        dispatch(setCurrentUser(useinfo))
        dispatch({ type: 'SIGNIN', payload: users });
    } catch (error) {

        dispatch({ type: 'SIGNINFAILS', payload: error.response });
    }
}


export const setCurrentUser = (user) => {
    return {
        type: "SET_CURRENT_USER",
        payload: user
    }
}

export const logout = () => {
    return function (dispatch) {
        localStorage.removeItem("jwt");
        localStorage.removeItem("users");
        setAuthenticationToken(false);
        dispatch(setCurrentUser({}))
        dispatch({ type: "LOGOUT" })
    }
}


export const increaseLike = (id) => async (dispatch) => {
    try {
        const postId= { "id":id};
        const { data } = await api.increaseLikeapi(postId);
        dispatch({ type: 'IncreaseLike', payload: data});
    } catch (error) {
        console.log(error);
    }
}