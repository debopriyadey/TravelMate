const axios = require('axios');

const fetchTouristAttraction = async (req, res, next) => {
  try {
    const {latitude, longitude} = req.body;
    var options = {
        method: 'GET',
        url: `${process.env.REACT_APP_TOURIST_ATTRACTION_URL}${latitude}&longitude=${longitude}`,
        headers: {
            'content-type': 'application/json',
            'X-Triposo-Token': process.env.REACT_APP_TRIPOSO_TOKEN,
            'X-Triposo-Account': process.env.REACT_APP_TRIPOSO_ACCOUNT
        },
       
    };
    const response =  await axios.request(options);
    return res.json(response.data.results[0].pois);
  } catch (error) {
    next(error)
  }
}


const fetchHotelDeatils = async (req, res, next) => {
  try {
    const {latitude, longitude} = req.body;
    const response = await axios.get(process.env.REACT_APP_HOTELS_URL, {
        params: {
            lat: latitude,
            lon: longitude,
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
            'x-rapidapi-host': process.env.REACT_APP_RAPIDAPI_HOTEL_HOST
        }
    });
    return res.send(response.data);
  } catch(error) {
    next(error);
  }

}


const fetchWeather = async (req, res, next) => {
  try {
      const { query } = req.body;
      const  {data}  = await axios.get(`${process.env.REACT_APP_WEATHER_URL}`, {
          params: {
              q: query,
              units: 'metric',
              APPID: process.env.REACT_APP_WEATHER_KEY,
          }
      });
      return res.json(data);
  } catch (error) {
      next(error);
  }
}

const fetchPhotos = async (req, res, next) => {
  try {
    const { query } = req.body;
    const {data} = await axios.get(process.env.REACT_APP_PHOTOS_URL, {
      params: {
          query: query,
          client_id: process.env.REACT_APP_UNSPLASH_KEY,
      }
    });
    return res.json(data);
  } catch (error) {
    next(error);
  }

}


const fetchDesc = async (req, res, next ) => {
  try {
    const {query} = req.body;
    const {data} = await axios.get(process.env.REACT_APP_WIKIPEDIA_URL, {
 
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
    return res.json(data);
  } catch (error) {
    next(error);
  }
 
}


module.exports = {
  fetchTouristAttraction,
  fetchHotelDeatils,
  fetchPhotos,
  fetchDesc,
  fetchWeather,
}