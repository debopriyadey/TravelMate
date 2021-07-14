import axios from 'axios';
/* heroku url https://projecthack20travelmate.herokuapp.com
*/

const baseUrl ='https://projecthack20travelmate.herokuapp.com';
export const fetchPost = () => axios.get(`${baseUrl}/fetchreviews`); 
export const recentReview = () => axios.get(`${baseUrl}/recentreviews`)
export const fetchMyPost = ()=> axios.get(`${baseUrl}/myreviews`);
export const currentReview = (id)=> axios.get(`${baseUrl}/currentreview/${id}`);
export const signup = (users) => axios.post(`${baseUrl}/signup`, users);
export const signin = (users) => axios.post(`${baseUrl}/signin`, users);
export const createreview = (review) => axios.post(`${baseUrl}/createreviews`, review);
export const increaseLikeapi = (id) => axios.post(`${baseUrl}/increaseLike`, id);
export const deleteReview = (id) => axios.delete(`${baseUrl}/delete/${id}`);
export const updateReview = async(id, review) => {
    const { data }= await axios.patch(`${baseUrl}/update/${id}`, review);
    return data;
}

const URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'f33a484cf794d08d0148764789aaba32';

export const fetchWeather = async(query) => {
    const { data }= await axios.get(URL, {
        params: {
            q: query,
            units: 'metric',
            APPID: API_KEY,
        }
    });
    return data;
}