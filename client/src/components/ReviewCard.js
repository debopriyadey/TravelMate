import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent, CardMedia, Snackbar, Typography, IconButton, Button } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


import { currentreview, increaseLike } from '../actions/actions';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
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
    const [open, setOpen] = useState(false);
    const [likes, setLikes] = useState(places.likes);
    var maxDescLength = 350
    var reviewDesc = places.review.slice(0, maxDescLength)
    reviewDesc = reviewDesc.slice(0, Math.min(reviewDesc.length, reviewDesc.lastIndexOf(" ")))


    const dispatch = useDispatch();
    const history = useHistory();
    var user = useSelector(state => state.userInfo);
    if (user && Object.keys(user).length === 0){
        console.log("if")
    } else {
        user = JSON.parse(user);
        console.log(user._id)
    }
    const loggedIn = useSelector(state => state.loggedIn);
    const Likes = useSelector(state => state.Like);
    // if (loggedIn) {
    //     
    //     const userId = user._id;
    // }
    // console.log(user._id)
    let userId;
    // loggedIn ? userId = useSelector(state => JSON.parse(state.userInfo)) : userId = null;

    const render = () => {
        history.push(`/currentreview/${places._id}`);
    }

    const handelSubmit = async (e) => {
        e.preventDefault();
        await dispatch(currentreview(places._id));
        console.log(places._id);
        render()
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const IncreaseLike = (e) => {
        dispatch(increaseLike(places._id));
        setLikes(likes + 1);
    }

    const handleDelete = (e) => {

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
                    {reviewDesc + "..."}
                    <Button onClick={handelSubmit} size="small" color="primary" className="">
                        Read More
                    </Button>
                </Typography>

            </CardContent>
            <CardActions>
                {
                    loggedIn ? (
                        <IconButton aria-label="add to favorites" onClick={IncreaseLike}>
                            <FavoriteIcon />
                            {likes}
                        </IconButton>
                    ) : (
                        <>
                            <IconButton aria-label="add to favorites" onClick={() => setOpen(true)}>
                                <FavoriteIcon />
                                {likes}
                            </IconButton>
                            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                                <Alert onClose={handleClose} severity="success">
                                    Please Login
                                 </Alert>
                            </Snackbar>
                        </>
                    )
                }

                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                {
                    loggedIn && user._id == places.creator ? (
                        <Button onClick={handleDelete} size="small" color="primary" className="ml-auto">
                            <DeleteIcon />
                        </Button>
                    ) : (
                        <>
                            <Button onClick={handleDelete} size="small" color="primary" className="ml-auto">
                                {/* <DeleteIcon /> */}
                            </Button>
                        </>
                    )
                }
                {/* {
                    loggedIn ? (
                         ?
                            (
                                <Button onClick={handleDelete} size="small" color="primary" className="ml-auto">
                                    <DeleteIcon />
                                </Button>
                            ) : (
                                <>
                                    <IconButton aria-label="add to favorites" onClick={() => setOpen(true)}>
                                        <FavoriteIcon />
                                        {likes}
                                    </IconButton>
                                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                                        <Alert onClose={handleClose} severity="success">
                                            Please Login
                                    </Alert>
                                    </Snackbar>
                                </>
                            )
                    ) : (
                        <Button></Button>
                    )

                } */}


            </CardActions>
        </Card>
    );
}
