import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import ReviewCard from './ReviewCard';
import places from '../Reviews';

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100vh',
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
        <div id="top-reviews">
            <div>
                <h1 style={{ textAlign: 'center', color: 'white' }}> Top Reviews </h1>
            </div>
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs>
                        <ReviewCard places={places[0]} />
                    </Grid>
                    <Grid item xs>
                        <ReviewCard places={places[1]} />
                    </Grid>
                    <Grid item xs>
                        <ReviewCard places={places[2]} />
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs>
                        <ReviewCard places={places[3]} />
                    </Grid>
                    <Grid item xs>
                        <ReviewCard places={places[4]} />
                    </Grid>
                    <Grid item xs>
                        <ReviewCard places={places[5]} />
                    </Grid>
                </Grid>
                

            </div>
        </div>
    )
}
