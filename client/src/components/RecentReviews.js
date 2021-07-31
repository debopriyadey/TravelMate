import React from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';
import RecentCard from './RecentCard';


const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '80px',
    },

    container: {
        justifyContent: "center",
        marginTop: "2%"
    },

}));


export default function TopReviews() {
    const classes = useStyles();

    const { allReviews, loading, error } = useSelector(state => state.reviews)

    return (
        <div className={classes.root} id="recent-review">
            <div className="container">
                <div>
                    <h3 className="mt-4"> Recent Reviews </h3>
                </div>
                <hr className="mb-2 mt-0 d-inline-block mx-auto" style={{ width: "400px", backgroundColor: 'grey' }} />

                {loading ? (
                    <div>Loading Recent Review...</div>
                ) :
                    error ? (
                        <div>{error}</div>
                    ) :
                        (
                            <Grid container spacing={3} className={classes.container}>
                                {
                                    allReviews.slice(0, 10).map((review) => (
                                        <Grid key={review._id}>
                                            <RecentCard places={review} />
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        )

                }
            </div>
        </div>
    )
}
