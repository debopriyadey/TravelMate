import * as api from '../api';

//action creator
const getReviews = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPost();

        dispatch({ type: 'FECTCH_ALL', payload: data });
    } catch (error) {
        console.log(error.message);
    }
} 

export default getReviews;