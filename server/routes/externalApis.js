const router = require('express').Router();
const externalApis = require('../controllers/externalApis');

router.post('/getTouristAttraction', externalApis.fetchTouristAttraction);
router.post('/getHotels', externalApis.fetchHotelDeatils);
router.post('/getPhotos', externalApis.fetchPhotos);
router.post('/getWeather', externalApis.fetchWeather);
router.post('/getDescription', externalApis.fetchDesc);

module.exports = router;