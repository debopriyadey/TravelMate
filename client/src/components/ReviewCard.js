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


import { deleteReview, increaseLike } from '../actions/reviewActions';


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

export default function ReviewCard({ places}) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(state => state.userInfo).user;
    let loggedIn = false;
    if (user && Object.keys(user).length !== 0)loggedIn=true;

    
    const [openLogin, setOpenLogin] = useState(false);
    const [openCopy, setOpenCopy] = useState(false);    
    const [alreadyLiked, setalreadyLiked] = useState(false);
    const [likes, setLikes] = useState(places.likes);
    var maxDescLength = 170
    var reviewDesc = places.review? places.review.slice(0, maxDescLength): "";
    reviewDesc = reviewDesc.slice(0, Math.min(reviewDesc.length, reviewDesc.lastIndexOf(" ")))
    useEffect(() => {
        setLikes(places.likes)
        if (loggedIn){

            if (user.likes.includes(places._id)) {
                setalreadyLiked(true);
            } else
                setalreadyLiked(false);
        }
    }, [places.likes,user])

    const handelSubmit = (e) => {
        history.push(`/currentreview/${places._id}`, places);
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
        history.push(`/update`, places)
    }

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteReview(places._id))
    }

    return (
    <React.Fragment>
        <Card className={classes.root}>
            <CardMedia
                className={classes.media}
                image={places.selectedFile}
                children={null}
                src={places.selectedFile}
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
                            
                            
                        </>
                    )
                }
                
                {/* <IconButton aria-label="share" onClick={handleCopy}>
                    <ShareIcon aria-label="share" onClick={handleCopy} />
                    <Snackbar open={openCopy} autoHideDuration={6000} onClose={handleCloseCopy}>
                        <Alert onClose={handleCloseCopy} severity="success">
                            Link copied to clipboard
                        </Alert>
                    </Snackbar>
                </IconButton> */}
                <IconButton aria-label="share" onClick={handleCopy}>
                    <ShareIcon aria-label="share"  />
                    
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
        <Snackbar open={openLogin}    anchorOrigin={{ vertical: 'bottom' , horizontal:'center' }} autoHideDuration={6000} onClose={handleCloseLogin}>
        <Alert onClose={handleCloseLogin} severity="error">
            Please Login
        </Alert>
        </Snackbar>
        <Snackbar open={openCopy} autoHideDuration={6000} onClose={handleCloseCopy}>
                        <Alert onClose={handleCloseCopy} severity="success">
                            Link copied to clipboard
                        </Alert>
        </Snackbar>
</React.Fragment>

    );
}
