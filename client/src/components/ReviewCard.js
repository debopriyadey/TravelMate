import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { IconButton, Button } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


import { currentreview } from '../actions/actions'

const useStyles = makeStyles({
    root: {
        color: 'black',
        maxWidth: 435,
        background: 'white',
        margin: '20px',
    },

    media: {
        height: 240,
    },

    title: {
        fontWeight: 'bold',
        fontSize: '2rem',
        color: 'black',
    },

    desc: {
        fontSize: '1.1rem',
        color: 'black',
    },
});

export default function ReviewCard({ places }) {
    const classes = useStyles();

    var maxDescLength = 350
    var reviewDesc = places.review.slice(0, maxDescLength)
    reviewDesc = reviewDesc.slice(0, Math.min(reviewDesc.length, reviewDesc.lastIndexOf(" ")))

    const dispatch = useDispatch();
    const history = useHistory();
    const loggedIn = useSelector(state => state.loggedIn);

    const render = () => {
        history.push(`/review/${places._id}`);
    }

    const handelSubmit = (e) => {
        e.preventDefault();

        dispatch(currentreview(places))
        render()

    }

    return (
        <Card className={classes.root}>
            <CardMedia
                className={classes.media}
                image={places.selectedFile}
                title={places.title}
            />
            <CardContent>
                <Typography
                    gutterBottom
                    variant="h5"
                    component="h1"
                    className={classes.title}
                >
                    {places.title}
                </Typography>
                <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    className={classes.desc}
                >
                    {reviewDesc+"..."}
                </Typography>
            </CardContent>
            <CardActions>
                <IconButton aria-label="add to favorites" disabled={!loggedIn}>
                    <FavoriteIcon />
                    {places.likes}
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                
                <Button onClick={handelSubmit} size="small" color="primary" className="ml-auto">
                    Read More
                </Button>
            </CardActions>
        </Card>
    );
}
