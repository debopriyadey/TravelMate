import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Collapse, IconButton, Button } from '@material-ui/core';
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';
import { Link } from 'react-router-dom';
import { Link as Scroll } from 'react-scroll';
import ReviewIcon from '@material-ui/icons/RateReview';
import HotelIcon from '@material-ui/icons/Hotel';
import CloudIcon from '@material-ui/icons/Cloud';

import NavBar from './NavBar';
import { useSelector } from 'react-redux';
import '../css/header.css'

import review from '../svg/review.svg'
import destination from '../svg/destination.svg'
import weather from '../svg/weather.svg'

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '18%',
        justifyContent: 'center',
        alignItems: 'center',
        height: '60vh',
        textDecoration: "none",
        flexGrow: '1',
        [theme.breakpoints.down('md')]: {
            marginTop: '30%'
        },
        [theme.breakpoints.down('sm')]: {
            marginTop: '40%'
        },
        [theme.breakpoints.down('xs')]: {
            marginTop: '60%'
        }
    },

    icon: {
        color: '#fff',
        fontSize: '1.5rem',
        padding: theme.spacing(1),
        [theme.breakpoints.down('xs')]: {
            fontSize: '18px'
        }
    },

    button: {
        margin: theme.spacing(1),
    },

    colorText: {
        color: '#295ed9',
    },

    container: {
        textAlign: 'center',
    },

    title: {
        color: '#fff',
        fontSize: '4.5rem',
        fontFamily: 'Lemonada',
        [theme.breakpoints.down('xs')]: {
            fontSize: '30px'
        }
    },

    subtitle: {
        fontSize: '4rem',
        [theme.breakpoints.down('xs')]: {
            fontSize: '27px'
        }
    },

    goDown: {
        color: '#295ed9',
        fontSize: '3.6rem',
        [theme.breakpoints.down('xs')]: {
            fontSize: '40px'
        }
    },
}));
export default function Header() {

    const user = useSelector((state) => state.userInfo.user)
    let loggedIn = false;
    if (user && Object.keys(user).length !== 0)loggedIn=true;

   const renderLink = () => {
        if (!loggedIn) {
            return (
                <Link to="/login" style={{ textDecoration: 'none' }}>
                    <Button variant="outlined" size="medium" color="primary" className={classes.button}>
                        Create
                    </Button>
                </Link>
            )
        }
        else {
            return (
                <Link to="/createreview" style={{ textDecoration: 'none' }}>
                    <Button variant="outlined" size="medium" color="primary" className={classes.button}>
                        Create
                    </Button>
                </Link>
            )
        }
    }
    const classes = useStyles();
    const [checked, setChecked] = useState(false);
    useEffect(() => {
        setChecked(true);
    }, []);

    
    return (
        <div>
            <NavBar />
            <div className={classes.root} id="header">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-lg-7" >
                            <h1 className="header-maintext"> What's your next vacation destination?</h1>
                            <p className="header-tagline"> Let <span className="special-text">TravelMate</span> help you take your desscion. </p>
                        </div>
                    </div>
                    <div className="row header-bar">
                        <div className="col-3 bar-content">
                            <Link to="/search" style={{ textDecoration: 'none', display: 'flex' }}>
                                <div className="bar-logo">
                                    <img src={review} alt="review-logo" />
                                </div>
                                <div className="bar-review">
                                    <p className="mb-0">Search <br /> Reviews</p>
                                </div>
                            </Link>
                        </div>
                        <div className="col-3 bar-content">
                            <Link to="/discover" style={{ textDecoration: 'none', display: 'flex' }}>
                                <div className="bar-logo">
                                    <img src={weather} alt="weather-logo" />
                                </div>
                                <div className="bar-review">
                                    <p className="mb-0">Discover <br /> Destination</p>
                                </div>
                            </Link>
                        </div>
                        <div className="col-3 bar-content">
                            <a href="#weather" style={{ textDecoration: 'none', display: 'flex' }}>
                                <div className="bar-logo">
                                    <img src={destination} alt="destination-logo" />
                                </div>
                                <div className="bar-review">
                                    <p className="mb-0">Check <br /> Weather</p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                {/* <Collapse
                    in={checked}
                    {...(checked ? { timeout: 1000 } : {})}
                    collapsedHeight={50}
                >
                    <div className={classes.container}>
                        <h1 className={classes.title}>
                            Welcome to <br />
                            <span className={classes.subtitle}>Travell<span className={classes.colorText}>Mate</span></span>
                        </h1>
                        <span>
                            <Link to="/search" style={{ textDecoration: 'none' }}>
                                <Button variant="outlined" size="medium" color="primary" className={classes.button}>
                                    Search
                                </Button>
                            </Link>
                            {renderLink()}
                        </span>
                        <div>
                            <Scroll to="top-reviews" smooth={true}>
                                <ArrowDropDownCircleIcon className={classes.goDown} />
                            </Scroll>
                        </div>
                    </div>
                </Collapse> */}
            </div>
        </div >

    );



}