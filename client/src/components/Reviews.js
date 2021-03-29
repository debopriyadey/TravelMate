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
}));

export default function Reviews(props) {
    const classes = useStyles();
    return (
            <div className={classes.root}>
                <Grid container spacing={3}>
                    {
                        props.reviews.map( (review,index)=>(
                        <Grid item sm={12} md={6} lg={4} key={index}  >
                            <ReviewCard places={review} />
                        </Grid>
                    ) )
                    
                    }
                   
                </Grid>
            </div>
    )
}
