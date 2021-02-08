import React from 'react';
import Header from './Header';
import { makeStyles } from '@material-ui/core';
import bgimage from '../img/heroimage.jpg';


const useStyle = makeStyles((theme) => ({
    root: {
        backgroundImage: `url(${bgimage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        height: "100vh"
    }
}));

export default function MainBody() {
    const classes = useStyle()

    return (
        <div className={classes.root}>
            <Header /> 
        </div>
    )
}
