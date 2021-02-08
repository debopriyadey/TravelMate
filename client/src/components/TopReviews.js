import React from 'react';
import { makeStyles } from '@material-ui/core';
import ReviewCard from './ReviewCard';
import places from '../Reviews';

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
        },
    },
}));

export default function TopReviews() {

    const classes = useStyles();

    return (
        <div className={classes.root} id="top-reviews">
            <ReviewCard places={places[0]} />
            <ReviewCard places={places[1]} />
        </div>
    )
}
