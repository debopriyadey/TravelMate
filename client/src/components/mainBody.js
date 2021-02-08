import React from 'react';
import Header from './Header';
import TopReviews from './TopReviews';
import { makeStyles, Paper } from '@material-ui/core';
import bgimage from '../img/heroimage.jpg';


const useStyle = makeStyles((theme) => ({
    root: {
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
            <Header />
            <TopReviews />
        </div>
    )
}
