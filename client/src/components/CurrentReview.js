import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { IconButton, Button } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { currentreview, increaseLike } from '../actions/actions';
import { currentReview } from '../api/index';

const useStyles = makeStyles({
    root: {
        color: 'black',
        background: 'white',
        maxHeight: "435",
        marginTop: '20px',
    },

    media: {
        height: 240,
        textAlign: 'center',
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

    button: {
        maxWidth: '300px',
        margin: '0 auto',
        display: 'block'
    }
});

export default function CurrentReview() {
    const classes = useStyles();
    const [item, setItem] = useState([])
    const url = window.location.href
    const lastItem = url.substring(url.lastIndexOf('/') + 1)

    useEffect(() => {

    }, [item])

    window.onload = async (e) => {
        const data = await currentReview(lastItem);
        setItem(data.data)
    };

    const renderReview = (item) => {
        if (item == '') {
            return [
                <h1>Loading</h1>
            ]
        } else {
            return [
                <>
                    <div className={classes.media}>
                        <img src={item.selectedFile} alt={item.title} className={classes.media} />
                    </div>
                    <CardContent>
                        <Typography
                            gutterBottom
                            variant="h5"
                            component="h1"
                            className={classes.title}
                        >
                            {item.title}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                            className={classes.desc}
                        >
                            {item.review}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon />
                            {item.likes}
                        </IconButton>
                        <IconButton aria-label="share">
                            <ShareIcon />
                        </IconButton>
                    </CardActions>
                    <Link to='/' style={{ textDecoration: 'none' }}>
                        <Button
                            className={classes.button}
                            fullWidth
                            variant="contained"
                            color="secondary"
                        >
                            BACK
                    </Button>
                    </Link>
                </>
            ]
        }

    }


    console.log(item)

    return (
        <div maxWidth="sm" className={classes.root}>
            {renderReview(item)}
        </div>
    );
}
