import React from 'react';
import { makeStyles } from '@material-ui/core';

import Header from './Header';
import TopReviews from './TopReviews';
import RecentReviews from './RecentReviews'
import TrendyPlaces from './TrendyPlaces';
import bgimage from '../img/headerbg.webp';
import Weather from './Weather';
import Footer from './Footer';
import CreateInfo from './CreateInfo';
import InfoCard from './InfoCard';


const useStyle = makeStyles((theme) => ({
    root: {
        overflow: 'hidden',
    },
    header: {
        backgroundColor: 'black',
        backgroundImage: `url(${bgimage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
    }
}));

export default function MainBody() {
    const classes = useStyle()

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <Header />
            </div>
            <InfoCard />
            <TopReviews />
            <RecentReviews />
            <TrendyPlaces />
            <Weather />
            <CreateInfo />
            <Footer />
        </div>
    )
}
