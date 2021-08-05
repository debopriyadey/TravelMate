import { CardMedia, IconButton } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Carousel from 'react-elastic-carousel'
import ReactMapGL, { Marker } from 'react-map-gl';

import { fetchPhotos, fetchDesc, fetchHotelDeatils, fetchTouristAttraction } from '../api/index';
import '../css/discover.css';

export default function Discover() {
    const [query, setQuery] = useState('');
    const [info, setInfo] = useState('');
    const [hotels, setHotels] = useState('');
    const [attractionPlaces, setAttractionPlaces] = useState([]);
    const [city, setCity] = useState({
        admin1Division: "",
        admin1DivisionCode: "",
        country: "",
        geonameId: "",
        latitude: "",
        longitude: "",
        name: "",
        population: "",
        title: "",
        tzOffsetMinutes: "",
    });
    const [cityPhoto, setCityPhoto] = useState();
    const [viewport, setViewport] = useState({
        width: '90vh',
        height: '80vh',
        latitude: null,
        longitude: null,
        zoom: 6
    });
    /*const search = async (e) => {
        if (e.key === 'Enter') {
            const data = await fetchBasicInfo(query);
            console.log(data);
            setCityPhoto(data);
            setQuery('');
        }
    }*/


    useEffect(() => {
        window.TeleportAutocomplete.init('.my-input').on('change', function (value) {
            setCity(value)
        });
    }, [])

    useEffect(() => {
        if (city && city.name) {
            fetchTouristAttraction(city.latitude, city.longitude).then((response) => {
                setAttractionPlaces(response.data.results[0].pois)
                // console.log(response);
                console.log(attractionPlaces, "ok ")
            }).catch((error) => {
                console.log("TouristAttractionError", error);
            });
            fetchPhotos(city.name)
                .then((res) => {
                    setCityPhoto(res)
                })
            fetchDesc(city.name)
                .then((res) => {
                    setInfo(res)
                })
            fetchHotelDeatils(city.longitude, city.latitude)
                .then((res) => {
                    setHotels(res)
                })
            setViewport({ ...viewport, latitude: city.latitude, longitude: city.longitude });

        }

    }, [city])

    return (
        <>
            <div className="discover-container" id="weather">
                <h1 className="discover-main-text"> Discover new <span className="special-text">destination </span> </h1>
                <input type="text" className="mt-4 my-input discover-search" name="field" placeholder="search a place...." tabIndex="1" autoComplete="off" />
                <div className="discover-city-container">
                    {city && city.title && cityPhoto && (
                        <div className="discover-city">

                            {/* about */}
                            <div className="city-header">
                                <div className="row">
                                    <div className="col-sm-12 col-md-6 city-header-photo-container">
                                        {
                                            cityPhoto.results && cityPhoto.results[0] &&
                                            <img src={cityPhoto.results[0].urls.regular} alt="city-name" className="city-header-photo" style={{ maxHeight: '750px' }} />
                                        }
                                    </div>
                                    <div className="col-sm-12 col-md-6">
                                        <div className="city-header-main">
                                            <h2 className="city-name">{city.name}</h2>
                                            <h4 className="city-state">{city.title.slice(city.name.length + 2, city.title.length)}</h4>
                                        </div>
                                        <br />
                                        <div className="city-sec-about">
                                            <h2 className="sec-title">about</h2>
                                            {
                                                info.query && Object.entries(info.query.pages).map((e) => (
                                                    <p className="city-about p-5" key={e[0]}>
                                                        {
                                                            e[1].extract.slice(Math.min(500, e[1].extract.indexOf(".") + 1), (e[1].extract.slice(0, 1000)).lastIndexOf('.')+1)
                                                        }
                                                    </p>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* gallary */}
                            <div className="city-gallary">

                                <div className="gallary-header text-center">
                                    <h2 className="sec-title">gallery</h2>
                                    <p className="sec-title-help"> explore the city </p>
                                    {
                                        cityPhoto.results.map((e) => (
                                            <img key={e.urls.thumb} src={e.urls.full + '&q=80&h=200'} alt="city-name" className="city-header-photo" />
                                        ))
                                    }
                                </div>

                            </div>

                            {/* tourist attractions */}
                            <div className="city-attraction">
                                <div className="attraction-header">
                                    <h2 className="sec-title" style={{ color: '#1f1f1f' }}>tourist attractions</h2>
                                    <p className="sec-title-help" style={{ color: '#1f1f1f' }}> places to visit </p>
                                </div>
                                <div>
                                    <Carousel itemPadding={[0, 20]} itemsToShow={3} outerSpacing={100} className="attraction-carousel my-5">
                                        {
                                            attractionPlaces.length > 0 && (attractionPlaces.filter((e) => {
                                                return e.images.length !== 0;
                                            }).map((e) => (
                                                <div className="attraction-card">
                                                    <img src={e.images[0].sizes.thumbnail.url} height="100" width="100" />
                                                    <p>{e.name}</p>
                                                    <p>{e.snippet}</p>
                                                </div>

                                            )))
                                        }
                                    </Carousel>
                                </div>
                            </div>

                            {/* hotels */}
                            <div className="city-hotels mt-5">
                                <div className="hotels-header mb-0">
                                    <h2 className="sec-title">hotels</h2>
                                    <p className="sec-title-help"> to spend your nights </p>
                                </div>
                                <div className="hotel-container mt-0">
                                    {
                                        hotels && hotels.data.body.searchResults.results.map((e) => (
                                            <div className="row hotel-card my-3 mx-1">
                                                <div className="col-sm-12 col-md-4 hotel-img-ctn">
                                                    <img src={e.optimizedThumbUrls.srpDesktop} alt={e.name} className="hotel-img" />
                                                </div>
                                                <div className="col-sm-12 col-md-8 hotel-desc">
                                                    <h1 className="hotel-name mb-0">{e.name}</h1>
                                                    <small className="hotel-address">{e.address.streetAddress}, {e.address.locality}, {e.address.postalCode}</small>
                                                    <br />
                                                    <Rating
                                                        name="customized-empty"
                                                        value={e.starRating} precision={0.5}
                                                        emptyIcon={<StarBorderIcon fontSize="inherit" className="star" />}
                                                        size="small"
                                                        readOnly
                                                        className="hotel-rating mt-2" />
                                                    <br />
                                                    <div className="row hotel-desc-last">
                                                        <div className="col-md-12 col-lg-6 hotel-landmark">
                                                            <h4 className="hotel-landmark-header mb-0 mt-2"> Landmarks </h4>
                                                            {
                                                                e.landmarks.map((res) => (
                                                                    <>
                                                                        <small className="my-0">{res.distance} to {res.label.length > 25 ? res.label.slice(0, Math.min(20, res.label.indexOf(",", 2) + 1)) : res.label}</small>
                                                                        <br />
                                                                    </>
                                                                ))
                                                            }
                                                        </div>
                                                        <div className="col-ms-12 col-lg-6">
                                                            <div className="hotel-price-btn">
                                                                {/* <p className="hotel-price">{e.ratePlan === undefined ? e.ratePlan.price.current : ''}</p> */}
                                                                <p className="mb-0"><span className="hotel-price">Rs 3,240</span></p>
                                                                <small>excluding taxes & fees</small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>

                            {/* transport */}
                            <div className="city-hotels">
                                <div className="hotels-header">
                                    <h2 className="sec-title">transport</h2>
                                    <p className="sec-title-help"> to make travel easy </p>
                                </div>
                            </div>

                            {/* map */}
                            <div className="city-hotels" style={{ "width": "100%" }}>
                                <div className="hotels-header">
                                    <h2 className="sec-title">map</h2>
                                    <p className="sec-title-help"> locate your destination </p>

                                </div>
                                {
                                    viewport.latitude && (<ReactMapGL
                                        {...viewport}
                                        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
                                        mapStyle="mapbox://styles/gourav12345/ckng22ps74bqu17qj6hvbpt0i"
                                        onViewportChange={nextViewport => setViewport(nextViewport)}
                                    >
                                        {


                                            <Marker
                                                latitude={city.latitude}
                                                longitude={city.longitude}
                                            >
                                                <div>
                                                    <img
                                                        style={{
                                                            height: ` ${6 * viewport.zoom}px`,
                                                            width: ` ${6 * viewport.zoom}px`,
                                                            maxWidth: '30px',
                                                            maxHeight: '30px'
                                                        }}
                                                        className="marker"
                                                        src="https://i.imgur.com/y0G5YTX.png"
                                                        alt="marker"

                                                    />
                                                </div>
                                            </Marker>



                                        }



                                    </ReactMapGL>)
                                }
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
