import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent, CardMedia, Snackbar, Typography, IconButton, Button, CardHeader, Avatar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import UpdateIcon from '@material-ui/icons/Update';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


import { increaseLike } from '../actions/actions';
import { deleteReview } from '../api/index';


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
    let user = useSelector((state) => state.userInfo);
    console.log(user)
    if (user && Object.keys(user).length === 0);
    else {
        user = JSON.parse(user);
    }
    const [open, setOpen] = useState(false);
    const [alreadyLiked, setalreadyLiked] = useState(false);
    const [likes, setLikes] = useState(places.likes);
    var maxDescLength = 350
    var reviewDesc = places.review.slice(0, maxDescLength)
    reviewDesc = reviewDesc.slice(0, Math.min(reviewDesc.length, reviewDesc.lastIndexOf(" ")))


    const dispatch = useDispatch();
    const history = useHistory();
    const loggedIn = useSelector(state => state.loggedIn);
    const Likes = useSelector(state => state.Like);
    const render = () => {
        history.push(`/currentreview/${places._id}`);
    }

    const handelSubmit = async (e) => {
        sessionStorage.setItem("currentreview", JSON.stringify(places))
        render()
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    useEffect(() => {
        setLikes(places.likes)
        if (user && Object.keys(user).length === 0); else {

            if (user.likes.includes(places._id)) {
                setalreadyLiked(true);
            } else
                setalreadyLiked(false);
        }
    }, [places.likes])


    const IncreaseLike = (e) => {

        dispatch(increaseLike({
            "placeId": places._id,
            "userId": user._id
        }));
    }

    const handelUpdate = (e) => {
        e.preventDefault()
        console.log(places)
        sessionStorage.setItem('toUpdate', JSON.stringify(places))
        history.push(`/update`)
    }

    const handleDelete = async (e) => {
        await deleteReview(places._id)
        window.location.reload()
    }

    console.log(typeof (places.creatorName))

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        {places.creatorName.charAt(0)}
                    </Avatar>
                }

                title={places.title}
                subheader={places.createdAt.slice(0, 10)}
            />
            <CardMedia
                className={classes.media}
                image={places.selectedFile}
                title={places.title}
            />
            <CardContent>
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
                    <br />
                    <small> <i> A review given by {places.creatorName} </i></small>
                </Typography>

            </CardContent>
            <CardActions>
                {
                    loggedIn ? (
                        <IconButton aria-label="add to favorites" onClick={IncreaseLike}>
                            {alreadyLiked ? (<FavoriteIcon color="error" />) : (<FavoriteIcon />)}
                            {likes}
                        </IconButton>
                    ) : (
                        <>
                            <IconButton aria-label="add to favorites" onClick={() => setOpen(true)}>
                                <FavoriteIcon />
                                {likes}
                            </IconButton>
                            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                                <Alert onClose={handleClose} severity="error">
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
                        <>
                            <Button onClick={handleDelete} size="small" color="primary" className="ml-auto">
                                <DeleteIcon title="delete" />
                            </Button>
                            <Button onClick={handelUpdate} size="small" color="primary" className="" style={{margin: '-15px'}}>
                                <UpdateIcon title="update" />
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button onClick={handleDelete} size="small" color="primary" className="ml-auto">
                                {/* <DeleteIcon /> */}
                            </Button>
                        </>
                    )
                }
            </CardActions>
        </Card>
    );
}
