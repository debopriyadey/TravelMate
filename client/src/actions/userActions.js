import * as api from '../api';
import { CLEAR_USER_DATA, GET_USER_DATA_FAIL, GET_USER_DATA_REQUEST, LOGGEDIN_USER_INFO_FAIL, LOGGEDIN_USER_INFO_REQUEST, LOGGEDIN_USER_INFO_SUCCESS, LOGOUT_FAIL, LOGOUT_REQUEST, LOGOUT_SUCCESS, SIGNIN_FAIL, SIGNIN_REQUEST, SIGNIN_SUCCESS, SIGNUP_FAIL, SIGNUP_REQUEST, SIGNUP_SUCCESS } from '../constents';
import setAuthenticationToken from './setAuthenticationToken'

export const signup = (users) => async (dispatch) => {
    try {
        dispatch({type: SIGNUP_REQUEST});
        const { data } = await api.signup(users);
        dispatch({ type: SIGNUP_SUCCESS, payload: data.message });
    } catch (error) {
        dispatch({ type: SIGNUP_FAIL, payload: error.response.data.error})
    }
}

export const signin = (users) => async (dispatch) => {
    try {
        dispatch({type: SIGNIN_REQUEST})
        const { data } = await api.signin(users);
        dispatch({ type: SIGNIN_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({ type: SIGNIN_FAIL, payload: error.response.data.error});
    }
}



export const logout = () => async (dispatch)  => {
    try {
        dispatch({type: LOGOUT_REQUEST})
        const { data } = await api.logout();
        dispatch({ type: LOGOUT_SUCCESS, payload: data });
        dispatch({ type: CLEAR_USER_DATA });
    } catch (error) {
        dispatch({ type: LOGOUT_FAIL, payload: error.response.data.error})
    }
}


export const loggedInUserInfo = () => async (dispatch) => {
    try {
        dispatch({ type: GET_USER_DATA_REQUEST })
        const { data } = await api.getLoggedInUserInfo();
        dispatch({type: SIGNIN_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: GET_USER_DATA_FAIL })
    }
}

