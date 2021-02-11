import * as api from '../api';

//action creator
export const getReviews = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPost();

        dispatch({ type: 'FECTCH_ALL', payload: data });
    } catch (error) {
        console.log(error.message);
    }
} 

export const signup = (users) => async (dispatch) => {
    try {
        const { data } = await api.signup(users);

        dispatch({ type: 'CREATE', payload: data });
    } catch (error) {
        console.log(error.message);
    }
} 