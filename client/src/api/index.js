import axios from 'axios';
// const baseUrl ='https://traveldires.herokuapp.com';
const baseUrl = 'https://projecthack20travelmate.herokuapp.com';
// const baseUrl = 'http://localhost:5000';

// post
export const fetchPost = () => axios.get(`${baseUrl}/fetchreviews`,{}, {withCredentials: true});
export const recentReview = () => axios.get(`${baseUrl}/recentreviews`,{}, {withCredentials: true})
export const fetchMyPost = () => axios.get(`${baseUrl}/myreviews`, {}, {withCredentials: true});
export const currentReview = (id) => axios.get(`${baseUrl}/currentreview/${id}`,{},  {withCredentials: true});
export const createreview = (review) => axios.post(`${baseUrl}/createreviews`, review, {withCredentials: true});
export const deleteReview = (id) => axios.delete(`${baseUrl}/delete/${id}`, {withCredentials: true});
export const updateReview = async (id, review) => {
    const { data } = await axios.patch(`${baseUrl}/update/${id}`, review,{withCredentials: true});
    return data;
}
export const getReviewsTags = (search) => axios.post(`${baseUrl}/getallreviewtags`, search, {withCredentials: true});
export const getPostsbyTag = (search) => axios.post(`${baseUrl}/getpostsbytag`, search, {withCredentials: true})


// user
export const signup = (users) => axios.post(`${baseUrl}/signup`, users);
export const signin = (users) => axios.post(`${baseUrl}/signin`, users, {withCredentials: true});
export const logout = () => axios.post(`${baseUrl}/logout`, {}, { withCredentials: true })
export const increaseLikeapi = (id) => axios.post(`${baseUrl}/increaseLike`, id, {withCredentials: true});
export const getLoggedInUserInfo = () => axios.post(`${baseUrl}/userInfo`,{}, { withCredentials: true });

// Other services
export const fetchWeather = async (query) => axios.post(`${baseUrl}/getWeather`, {query})
export const fetchPhotos =  (query) => axios.post(`${baseUrl}/getPhotos`, {query})
export const fetchDesc = async (query) => axios.post(`${baseUrl}/getDescription`, {query});
export const fetchHotelDeatils = (latitude, longitude) => axios.post(`${baseUrl}/getHotels`, {latitude, longitude})
export const fetchTouristAttraction = (latitude, longitude) => axios.post(`${baseUrl}/getTouristAttraction`, {latitude, longitude})