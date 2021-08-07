import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';

import ReviewCard from './ReviewCard';
import { useSelector } from 'react-redux';


const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
        },
    },

    container: {
        justifyContent: "center",
        marginTop: "2%"
    },

}));

export default function Reviews(props) {
    console.log(props.reviews)
    console.log("Review Render");
    const classes = useStyles();
    return (
            <div className={classes.root}>
                <Grid container spacing={3} className={classes.container}>
                    {
                        props.reviews.map( (review)=>(
                        <Grid key={review._id}>
                            <ReviewCard places={review} caller={props.caller} />
                        </Grid>
                    ) )
                    }
                </Grid>
            </div>
    )
}
