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
import '../css/header.css'

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
    const renderLink = () => {
        if (localStorage.getItem("jwt") === null) {
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
                            <div className="bar-logo"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                <path fill="#f15743" d="M12.5 15.021l-1.768-1.768.707-.707 1.061 1.061 1.061-1.061.707.707z" />
                                <path fill="#f15743" d="M14.268 13.253l-.707-.707A1.49 1.49 0 0 0 14 11.485c0-.4-.156-.777-.439-1.061-.566-.566-1.555-.566-2.121 0-.284.284-.44.661-.44 1.061 0 .401.156.777.439 1.061l-.707.707A2.484 2.484 0 0 1 10 11.485c0-.667.26-1.295.732-1.768.943-.945 2.592-.945 3.535 0 .473.473.733 1.101.733 1.768 0 .668-.26 1.296-.732 1.768z" />
                                <circle cx="12.5" cy="11.515" r=".5" fill="#f15743" />
                                <path fill="#f15743" d="M3.5 7.021L1.732 5.253l.707-.707L3.5 5.607l1.061-1.061.707.707z" />
                                <path fill="#f15743" d="M5.268 5.253l-.707-.707a1.501 1.501 0 1 0-2.121 0l-.708.707c-.975-.975-.975-2.561 0-3.536s2.561-.975 3.535 0 .975 2.562.001 3.536z" />
                                <circle cx="3.5" cy="3.515" r=".5" fill="#f15743" />
                                <path fill="#2c4355" d="M11 15.015H1v-3h7v-1H1v-3h8v-4h4v3h1v-4H8v4H5v-1h2v-4h8v6h-3v-3h-2v4H2v1h7v3H2v1h9z" />
                            </svg></div>
                            <div className="bar-review">
                                <p className="mb-0">Search <br /> Reviews</p>
                            </div>
                        </div>
                        <div className="col-3 bar-content">
                            <div className="bar-logo">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                    <path fill="#f15743" d="M12.5 15.021l-1.768-1.768.707-.707 1.061 1.061 1.061-1.061.707.707z" />
                                    <path fill="#f15743" d="M14.268 13.253l-.707-.707A1.49 1.49 0 0 0 14 11.485c0-.4-.156-.777-.439-1.061-.566-.566-1.555-.566-2.121 0-.284.284-.44.661-.44 1.061 0 .401.156.777.439 1.061l-.707.707A2.484 2.484 0 0 1 10 11.485c0-.667.26-1.295.732-1.768.943-.945 2.592-.945 3.535 0 .473.473.733 1.101.733 1.768 0 .668-.26 1.296-.732 1.768z" />
                                    <circle cx="12.5" cy="11.515" r=".5" fill="#f15743" />
                                    <path fill="#f15743" d="M3.5 7.021L1.732 5.253l.707-.707L3.5 5.607l1.061-1.061.707.707z" />
                                    <path fill="#f15743" d="M5.268 5.253l-.707-.707a1.501 1.501 0 1 0-2.121 0l-.708.707c-.975-.975-.975-2.561 0-3.536s2.561-.975 3.535 0 .975 2.562.001 3.536z" />
                                    <circle cx="3.5" cy="3.515" r=".5" fill="#f15743" />
                                    <path fill="#2c4355" d="M11 15.015H1v-3h7v-1H1v-3h8v-4h4v3h1v-4H8v4H5v-1h2v-4h8v6h-3v-3h-2v4H2v1h7v3H2v1h9z" />
                                </svg>
                            </div>
                            <div className="bar-review">
                                <p className="mb-0">Discover <br /> Destination</p>
                            </div>
                        </div>
                        <div className="col-3 bar-content">
                            <div className="bar-logo">
                                <svg xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" width="40" height="40" viewBox="0 0 470 468">
                                    <defs>
                                        <filter id="a" width="111.8%" height="111.9%" x="-5.9%" y="-3.9%" filterUnits="objectBoundingBox"><feOffset dy="5" in="SourceAlpha" result="shadowOffsetOuter1" /><feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation="4" />
                                            <feColorMatrix in="shadowBlurOuter1" result="shadowMatrixOuter1" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.078125 0" />
                                            <feOffset dy="4" in="SourceAlpha" result="shadowOffsetOuter2" /><feGaussianBlur in="shadowOffsetOuter2" result="shadowBlurOuter2" stdDeviation="5.5" />
                                            <feColorMatrix in="shadowBlurOuter2" result="shadowMatrixOuter2" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.210824275 0" />
                                            <feMerge><feMergeNode in="shadowMatrixOuter1" /><feMergeNode in="shadowMatrixOuter2" /></feMerge>
                                        </filter>
                                        <path
                                            id="b"
                                            d="M9.635 132.808C24.782 59.782 71.388 19.109 144.085 6.822c53.74-9.081 107.5-9.196 161.15.255 74.852 13.185 119.85 56.23 134.185 130.36 11.075 57.29 11.249 115.191-.174 172.427-15.324 72.52-63.132 117.285-135.561 129.527-53.74 9.08-107.5 9.195-161.15-.255-74.852-13.186-120.05-58.38-134.384-132.509-11.64-57.668-10.52-115.935 1.484-173.82z" />
                                    </defs>
                                    <g fill="none" fill-rule="evenodd" transform="translate(-21 -26)">
                                        <g transform="translate(32 33)"><use fill="#000" filter="url(#a)" href="#b" /><use fill="#5BB0F3" href="#b" /></g>
                                        <path fill="#FFF" d="M185.077 291.418c-32.836 0-59.456-26.619-59.456-59.456 0-32.836 26.62-59.456 59.456-59.456 32.837 0 59.456 26.62 59.456 59.456h-20.502c0-21.513-17.44-38.954-38.954-38.954-21.513 0-38.954 17.44-38.954 38.954s17.44 38.954 38.954 38.954c.343 0 .685-.004 1.025-.013v.013h107.433l.013-.01c.409.007.818.01 1.229.01 37.649 0 68.17-30.75 68.17-68.682s-30.521-68.682-68.17-68.682c-23.197 0-43.687 11.673-56 29.506l-17.821-14.43C237.329 125.84 264.063 111 294.264 111c49.821 0 90.21 40.388 90.21 90.21 0 48.623-38.471 88.262-86.635 90.139v.07H185.077zm-11.276-179.393h19.477v41.004h-19.477v-41.004zm0 202.97h19.477V356h-19.477v-41.004zm-71.757-90.208v19.477H61.04v-19.477h41.004zm29.44-56.09l-13.772 13.773-28.995-28.995 13.773-13.772 28.994 28.994zm0 126.243l-28.994 28.994-13.773-13.772 28.995-28.995 13.772 13.773z" transform="translate(32 33)" />
                                    </g>
                                </svg>
                            </div>
                            <div className="bar-review">
                                <p className="mb-0">Check <br /> Weather</p>
                            </div>
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