import React from 'react';
import { makeStyles} from '@material-ui/core';

import Header from './Header';
import TopReviews from './TopReviews';
import bgimage from '../img/heroimage.jpg';
import Footer from './Footer';


const useStyle = makeStyles((theme) => ({
    root: {
        overflow: 'hidden',
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
            <Footer />
        </div>
    )
}
