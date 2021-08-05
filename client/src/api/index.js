import axios from 'axios';
// const baseUrl ='https://projecthack20travelmate.herokuapp.com';
const baseUrl = 'http://localhost:3000';
const WeatherURL = 'https://api.openweathermap.org/data/2.5/weather';
const PhotosURL = 'https://api.unsplash.com/search/photos';
const BasicInfo = 'https://api.teleport.org/api/cities/';
const Wikipedia = 'https://en.wikipedia.org/w/api.php';
const DescriptionUrl = 'https://travel-places.p.rapidapi.com/';
const Hotels = 'https://hotels-com-free.p.rapidapi.com/srle/listing/v1/brands/hotels.com';
const HotelOther = 'https://hotels-com-provider.p.rapidapi.com/v1/destinations/search';


// post
export const fetchPost = () => axios.get(`${baseUrl}/fetchreviews`);
export const recentReview = () => axios.get(`${baseUrl}/recentreviews`)
export const fetchMyPost = () => axios.get(`${baseUrl}/myreviews`);
export const currentReview = (id) => axios.get(`${baseUrl}/currentreview/${id}`);
export const createreview = (review) => axios.post(`${baseUrl}/createreviews`, review);
export const deleteReview = (id) => axios.delete(`${baseUrl}/delete/${id}`);
export const updateReview = async (id, review) => {
    const { data } = await axios.patch(`${baseUrl}/update/${id}`, review);
    return data;
}
export const getReviewsTags = (search) => axios.post(`${baseUrl}/getallreviewtags`, search);
export const getPostsbyTag = (search) => axios.post(`${baseUrl}/getpostsbytag`, search)


// user
export const signup = (users) => axios.post(`${baseUrl}/signup`, users);
export const signin = (users) => axios.post(`${baseUrl}/signin`, users);
export const logout = () => axios.post(`${baseUrl}/logout`, { withCredentials: true })
export const increaseLikeapi = (id) => axios.post(`${baseUrl}/increaseLike`, id);
export const getLoggedInUserInfo = () => axios.post(`${baseUrl}/userInfo`, { withCredentials: true });

export const fetchWeather = async (query) => {
    try {
        const { data } = await axios.get(WeatherURL, {
            params: {
                q: query,
                units: 'metric',
                APPID: process.env.REACT_APP_WEATHER_KEY,
            }
        });
        return data;
    } catch (error) {
        console.log("errorweather: ", error)
    }
}

export const fetchPhotos = async (query) => {
    try {
        const { data } = await axios.get(PhotosURL, {
            params: {
                query: query,
                client_id: process.env.REACT_APP_UNSPLASH_KEY,
            }
        });
        return data;
    } catch (error) {
        console.log(error)
    }
}

export const fetchBasicInfo = async (query) => {
    const { data } = await axios.get(BasicInfo, {
        params: {
            search: query
        }
    });
    return data;
}

export const fetchDesc = async (query) => {
    try {
        const { data } = await axios.get(Wikipedia, {
            params: {
                format: 'json',
                action: 'query',
                uselang: 'user',
                prop: 'extracts',
                explaintext: true,
                redirects: 1,
                titles: query,
                origin: '*',
            }

        });
        return data
    } catch (error) {
        console.log("infoerror: ", error)
    }
}

export const fetchHotelDeatils = async (lon, lat) => {
    try {
        const { data } = await axios.get(Hotels, {
            params: {
                lat: lat,
                lon: lon,
                checkIn: '2021-08-02',
                checkOut: '2021-08-02',
                rooms: '3',
                locale: 'en_US',
                currency: 'INR',
                pageNumber: '1',
                sortOrder: 'STAR_RATING_HIGHEST_FIRST',
            },
            headers: {
                'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_HOTEL_KEY,
                'x-rapidapi-host': 'hotels-com-free.p.rapidapi.com'
            }
        });
        return data
    } catch (error) {
        console.log("hotelerror: ", error)
    }
}


// tourist attraction api
/*
export const fetchTouristAttraction = async (latitude, longitude) => {

    var options = {
        method: 'POST',
        url: 'https://travel-places.p.rapidapi.com/',
        headers: {
            'content-type': 'application/json',
            'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_TOURIST_ATTRACTION_KEY,
            'x-rapidapi-host': 'travel-places.p.rapidapi.com'
        },
        data: {
            query: `{ getPlaces(categories:["NATURE", "MUSEUM", "BEACHES","PARKS"],lat:${latitude},lng: ${longitude},maxDistMeters:50000, limit:20) { name,lat,lng,abstract,distance,categories } }`
        }
    };
    
    return  axios.request(options);
    
}
*/
export const fetchTouristAttraction = async (latitude, longitude) => {

    var options = {
        method: 'GET',
        url: `https://www.triposo.com/api/20210615/local_highlights.json?tag_labels=exploringnature|relaxinapark|topattractions|museums&max_distance=100000&latitude=${latitude}&longitude=${longitude}`,
        headers: {
            'content-type': 'application/json',
            'X-Triposo-Token': process.env.REACT_APP_TRIPOSO_TOKEN,
            'X-Triposo-Account': process.env.REACT_APP_TRIPOSO_ACCOUNT
        },
       
    };
    
    return axios.request(options)
    
    
}