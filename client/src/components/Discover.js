import React, { useState, useEffect } from 'react'
import { fetchPhotos, fetchDesc, fetchHotelDeatils } from '../api/index';
import '../css/discover.css';

export default function Discover() {
    const [query, setQuery] = useState('');
    const [info, setInfo] = useState('');
    const [hotels, setHotels] = useState('');
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
        if(city){
            const photosearch = () => {
                fetchPhotos(city.title)
                    .then((res) => { 
                        setCityPhoto(res)
                     })
            }
            photosearch();
            const infoSearch = () => {
                fetchDesc(city.name)
                    .then((res) => {
                        setInfo(res)
                    })
            }
            const hotelSearch = () => {
                fetchHotelDeatils(city.name)
                    .then((res) => {
                        console.log(hotels);
                        setHotels(res)
                    })
            }
            infoSearch();
            hotelSearch();
            
            
        }

    }, [city])
   
    return (
        <>
            <div className="discover-container" id="weather">
                <h1 className="discover-main-text"> Discover new <span className="special-text">destination </span> </h1>
                <input type="text" className="mt-4 my-input discover-search" name="field" placeholder="search a place...." tabIndex="1" autoComplete="off" />
                <div  className="discover-city-container">
                    {city && city.title && cityPhoto && (
                        <div className="discover-city">
                            <div className="city-header">
                                <div className="row">
                                    <div className="col-sm-12 col-md-6 city-header-photo-container">
                                    
                                        {
                                            cityPhoto.results.map((e)=> (
                                                <img key={e.urls.thumb} src={e.urls.thumb+'&q=80&w=200'} alt="city-name" className="city-header-photo" style={{width:'300px'}} />
                                            ))
                                        }
                                    </div>
                                    <div className="col-sm-12 col-md-6">
                                        <div className="city-header-main">
                                            <h2 className="city-name">{city.name}</h2>
                                            <h4 className="city-state">{city.title.slice(city.name.length+2, city.title.length)}</h4>
                                        </div>
                                        <br />
                                        <div className="city-sec-about">
                                            <h2 className="sec-title">about</h2>
                                            {
                                                 info.query&&  Object.entries(info.query.pages).map((e)=> (
                                                    <p className="city-about" key={e[0]}>
                                                       { e[1].extract}
                                                    </p>
                                                 ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="city-gallary">
                                <div className="gallary-header">
                                    <h2 className="sec-title">gallery</h2>
                                    <p className="sec-title-help"> explore the city </p>
                                </div>
                            </div>
                            <div className="city-tour">
                                <div className="hotels-header">
                                    <h2 className="sec-title">tourist attraction</h2>
                                    <p className="sec-title-help"> places to visit </p>
                                </div>
                            </div>
                            <div className="city-hotels">
                                <div className="hotels-header">
                                    <h2 className="sec-title">hotels</h2>
                                    <p className="sec-title-help"> to spend your nights </p>
                                </div>
                            </div>
                            <div className="city-hotels">
                                <div className="hotels-header">
                                    <h2 className="sec-title">transport</h2>
                                    <p className="sec-title-help"> to make travel easy </p>
                                </div>
                            </div>
                            <div className="city-hotels">
                                <div className="hotels-header">
                                    <h2 className="sec-title">map</h2>
                                    <p className="sec-title-help"> locate your destination </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
