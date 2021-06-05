import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';

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
        marginTop: "5%"
    },

}));

export default function Reviews(props) {
    const classes = useStyles();
    return (
            <div className={classes.root}>
                <Grid container spacing={3} className={classes.container}>
                    {
                        props.reviews.map( (review)=>(
                        <Grid key={review._id}>
                            <ReviewCard places={review} />
                        </Grid>
                    ) )
                    }
                </Grid>
            </div>
    )
}
