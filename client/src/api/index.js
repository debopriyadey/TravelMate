import axios from 'axios';

const url = 'http://localhost:5000/fetchreviews';
export const fetchPost = () => axios.get(url);
export const fetchMyPost = ()=> axios.get('http://localhost:5000/myreviews');
export const currentReview = (id)=> axios.get(`http://localhost:5000/currentreview/${id}`);
export const signup = (users) => axios.post('http://localhost:5000/signup', users);
export const signin = (users) => axios.post('http://localhost:5000/signin', users);
export const createreview = (review) => axios.post('http://localhost:5000/createreviews', review);
export const increaseLikeapi = (id) => axios.post('http://localhost:5000/increaseLike', id);