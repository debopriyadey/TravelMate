import axios from 'axios';

const url = 'http://localhost:5000/ReviewForm';

export const fetchPost = () => axios.get(url);
export const signup = (users) => axios.post('http://localhost:5000/signup', users);