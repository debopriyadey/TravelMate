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
const useStyles = makeStyles((theme) => ({
    root: {
        color: 'black',
        minWidth: 434,
        maxWidth: 435,
        background: '#fff',
        backdropFilter: 'saturate(280%) blur(5px)',
        margin: '20px',
        borderRadius: '30px',
        boxShadow: '6px 12px 18px 3px #888888',
        [theme.breakpoints.down('sm')]: {
            minWidth: 345,
            maxWidth: 346,
        },
    },

    media: {
        width: 410,
        height: 240,
        margin: '0 auto',
        marginTop: '10px',
        marginBottom: '12px',
        borderRadius: '20px', 
        [theme.breakpoints.down('sm')]: {
            width: 320,
        }
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
}));

export default function ReviewCard({ places }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const loggedIn = useSelector(state => state.loggedIn);
    const Likes = useSelector(state => state.Like);
    let user = useSelector((state) => state.userInfo);
    if (user && Object.keys(user).length === 0);
    else {
        user = JSON.parse(user);
    }
    const [openLogin, setOpenLogin] = useState(false);
    const [openCopy, setOpenCopy] = useState(false);
    const [alreadyLiked, setalreadyLiked] = useState(false);
    const [likes, setLikes] = useState(places.likes);
    var maxDescLength = 170
    var reviewDesc = places.review.slice(0, maxDescLength)
    reviewDesc = reviewDesc.slice(0, Math.min(reviewDesc.length, reviewDesc.lastIndexOf(" ")))

    useEffect(() => {
        setLikes(places.likes)
        if (user && Object.keys(user).length === 0); else {

            if (user.likes.includes(places._id)) {
                setalreadyLiked(true);
            } else
                setalreadyLiked(false);
        }
    }, [places.likes])

    const render = () => {
        history.push(`/currentreview/${places._id}`);
    }


    const handelSubmit = async (e) => {
        sessionStorage.setItem("currentreview", JSON.stringify(places))
        render()
    }

    const handleCloseLogin = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenLogin(false);
    };

    const handleCloseCopy = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenCopy(false);
    };

    const handleCopy = (e) => {
        e.preventDefault()
        navigator.clipboard.writeText(`https://traveldires.herokuapp.com/currentreview/${places._id}`)
        setOpenCopy(true)
    }

    const IncreaseLike = (e) => {

        dispatch(increaseLike({
            "placeId": places._id,
            "userId": user._id
        }));
    }

    const handelUpdate = (e) => {
        e.preventDefault()
        sessionStorage.setItem('toUpdate', JSON.stringify(places))
        history.push(`/update`)
    }

    const handleDelete = async (e) => {
        await deleteReview(places._id)
        window.location.reload()
    }


    return (
        <Card className={classes.root}>
            <CardMedia
                className={classes.media}
                image={places.selectedFile}
                title={places.title}
            />
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        {places.creatorName.charAt(0)}
                    </Avatar>
                }

                title={places.title}
                subheader={places.createdAt.slice(0, 10)}
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
                            <IconButton aria-label="add to favorites" onClick={() => setOpenLogin(true)}>
                                <FavoriteIcon />
                                {likes}
                            </IconButton>
                            <Snackbar open={openLogin} autoHideDuration={6000} onClose={handleCloseLogin}>
                                <Alert onClose={handleCloseLogin} severity="error">
                                    Please Login
                                </Alert>
                            </Snackbar>
                        </>
                    )
                }

                <IconButton aria-label="share" onClick={handleCopy}>
                    <ShareIcon aria-label="share" onClick={handleCopy} />
                    <Snackbar open={openCopy} autoHideDuration={6000} onClose={handleCloseCopy}>
                        <Alert onClose={handleCloseCopy} severity="success">
                            Link copied to clipboard
                        </Alert>
                    </Snackbar>
                </IconButton>
                {
                    loggedIn && user._id == places.creator ? (
                        <>
                            <Button onClick={handleDelete} size="small" color="primary" className="ml-auto">
                                <DeleteIcon title="delete" />
                            </Button>
                            <Button onClick={handelUpdate} size="small" color="primary" className="" style={{ margin: '-15px' }}>
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
