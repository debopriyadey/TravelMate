import React from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';
import RecentCard from './RecentCard';


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
            <Container>
                <div>
                    <h1 className="mt-4"> Recent Reviews </h1>
                </div>
                <hr className="mb-2 mt-0 d-inline-block mx-auto" style={{ width: "400px", backgroundColor: 'grey' }} />

                <Grid container spacing={3} className={classes.container}>
                    {
                        allreviews.slice(0, 10).map((review) => (
                            <Grid key={review._id}>
                                <RecentCard places={review} />
                            </Grid>
                        ))
                    }
                </Grid>
            </Container>
        </div>
    )
}
