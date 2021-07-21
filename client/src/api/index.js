import axios from 'axios';
/* heroku url https://projecthack20travelmate.herokuapp.com
*/

// const baseUrl ='https://projecthack20travelmate.herokuapp.com';
const baseUrl ='http://localhost:3000';

// post 
export const fetchPost = () => axios.get(`${baseUrl}/fetchreviews`); 
export const recentReview = () => axios.get(`${baseUrl}/recentreviews`)
export const fetchMyPost = ()=> axios.get(`${baseUrl}/myreviews`);
export const currentReview = (id)=> axios.get(`${baseUrl}/currentreview/${id}`);
export const createreview = (review) => axios.post(`${baseUrl}/createreviews`, review);
export const deleteReview = (id) => axios.delete(`${baseUrl}/delete/${id}`);
export const updateReview = async(id, review) => {
    const { data }= await axios.patch(`${baseUrl}/update/${id}`, review);
    return data;
}
export const getReviewsTags =(search) => axios.post(`${baseUrl}/getallreviewtags`, search);
export const getPostsbyTag = (search) => axios.post(`${baseUrl}/getpostsbytag`, search)


// user
export const signup = (users) => axios.post(`${baseUrl}/signup`, users);
export const signin = (users) => axios.post(`${baseUrl}/signin`, users);
export const logout = () => axios.post(`${baseUrl}/logout`,{withCredentials: true})
export const increaseLikeapi = (id) => axios.post(`${baseUrl}/increaseLike`, id);
export const getLoggedInUserInfo = () => axios.post(`${baseUrl}/userInfo`, {withCredentials: true});
