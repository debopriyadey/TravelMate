import React from 'react';
import Reviews from './Reviews'
import { Grid, makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';
import ReviewCard from './ReviewCard';


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


export default function TopReviews() {
    const classes = useStyles();

    const allreviews = useSelector(state => state.allreviews)
    return (
        <div id="top-reviews">
            <div>
                <h1 className="mt-4 text-center"> Top Reviews </h1>
            </div>
            <Grid container spacing={3} className={classes.container}>
                {
                    allreviews.slice(0, 10).map((review) => (
                        <Grid key={review._id}>
                            <ReviewCard places={review} />
                        </Grid>
                    ))
                }
            </Grid>
        </div>
    )
}
