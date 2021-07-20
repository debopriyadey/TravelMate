import axios from 'axios';
/* heroku url https://projecthack20travelmate.herokuapp.com
*/

const baseUrl ='https://projecthack20travelmate.herokuapp.com';
const WeatherURL = 'https://api.openweathermap.org/data/2.5/weather';
const PhotosURL = 'https://api.unsplash.com/search/photos';
const BasicInfo = 'https://api.teleport.org/api/cities/';
const Wikipedia = 'https://en.wikipedia.org/w/api.php';

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

export const fetchWeather = async(query) => {
    try {
        const { data } = await axios.get(WeatherURL, {
            params: {
                q: query,
                units: 'metric',
                APPID: 'f33a484cf794d08d0148764789aaba32',
            }
        });
        return data;
    } catch (error) {
        console.log("error weather: ", error)
    }
}

export const fetchPhotos = async(query) => {
    const { data } = await axios.get(PhotosURL, {
        params: {
            query: query,
            client_id: 'zwH51OhEXDftmjFKTNHkKX1u7C10HwmeniCIAQm36_c',
        }
    });
    return data;
}

export const fetchBasicInfo = async(query) => {
    const { data } = await axios.get(BasicInfo, {
        params: {
            search: query
        }
    });
    return data;
}

export const fetchDesc = async(query) => {
    try {
        const { data } = await axios.get(`https://en.wikipedia.org/w/api.php?action=query&format=json&uselang=user&prop=extracts&titles=kolkata`);
        return data
    } catch (error) {
        console.log("infoerror: ", error) 
    }
    //     Wikipedia, {
    //     params: {
    //             action: 'query',
    //             format: 'json',
    //             uselang: 'user',
    //             prop: 'extracts',
    //             titles: query,
    //         }
    // });
}

export const fetchHotelDeatils = async(query) => {
    try {
        const { data } = await axios.get(`https://hotels-com-provider.p.rapidapi.com/v1/destinations/search`, {
            params: {currency: 'USD', locale: 'en_US', query: query},
            headers: {
              'x-rapidapi-key': 'b2bcc81cd5msh7bd347d7ba10befp168e94jsnce8a3ac290f4',
              'x-rapidapi-host': 'hotels-com-provider.p.rapidapi.com'
            } 
        });
        return data        
    } catch (error) {
        console.log("hotelerror: ", error) 

    }
}
