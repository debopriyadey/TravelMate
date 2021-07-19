import React, { useState, useEffect } from 'react'
import { fetchPhotos, fetchBasicInfo, fetchDesc } from '../api/index';
import '../css/discover.css';

export default function Discover() {
    const [query, setQuery] = useState('');
    const [info, setInfo] = useState('')
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
    const search = async (e) => {
        if (e.key === 'Enter') {
            const data = await fetchBasicInfo(query);
            console.log(data);
            setCityPhoto(data);
            setQuery('');
        }
    }

    useEffect(() => {
        const auto = () => {
            window.TeleportAutocomplete.init('.my-input').on('change', function (value) {
                setCity(value)
            });
        }
        auto();
    }, [])

    useEffect(() => {
        const photosearch = () => {
            fetchPhotos(city.title)
                .then((res) => { setCityPhoto(res) })
        }
        photosearch();
    }, [city])

    useEffect(() => {
        const infoSearch = () => {
            fetchDesc(city.title)
                .then((res) => { setInfo(res) })
        }
        infoSearch();
    }, [city])

    console.log(info)

    return (
        <div className="discover-container" id="weather">
            <h1 className="discover-main-text"> Discover new <span className="special-text">destination </span> </h1>
            <input type="text" className="mt-4 my-input discover-search" name="field" placeholder="search a place...." tabIndex="1" autoComplete="off" />

            {city.title && (
                <div className="city">
                    <h2 className="city-name">
                        <span>{city.name}</span>
                        <sup>{city.title}</sup>
                    </h2>

                </div>
            )}
        </div>
    );
}
