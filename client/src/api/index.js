import axios from 'axios';

const url = `https://projecthack20travelmate.herokuapp.com/fetchreviews`;
export const fetchPost = () => axios.get(url);
export const fetchMyPost = ()=> axios.get(`https://projecthack20travelmate.herokuapp.com/myreviews`);
export const currentReview = (id)=> axios.get(`https://projecthack20travelmate.herokuapp.com/currentreview/${id}`);
export const signup = (users) => axios.post(`https://projecthack20travelmate.herokuapp.com/signup`, users);
export const signin = (users) => axios.post(`https://projecthack20travelmate.herokuapp.com/signin`, users);
export const createreview = (review) => axios.post(`https://projecthack20travelmate.herokuapp.com/createreviews`, review);
export const increaseLikeapi = (id) => axios.post(`https://projecthack20travelmate.herokuapp.com/increaseLike`, id);
export const deleteReview = (id) => axios.delete(`https://projecthack20travelmate.herokuapp.com/delete/${id}`);
export const updateReview = async(id, review) => {
    const { data }= await axios.patch(`https://projecthack20travelmate.herokuapp.com/update/${id}`, review);
    return data;
}
