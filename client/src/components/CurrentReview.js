import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { currentReview } from '../api/index';
import NavBar from './NavBar';

const useStyles = makeStyles({
    root: {
        color: 'black',
        background: 'white',
        maxHeight: "435",
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

    const item2 = JSON.parse(sessionStorage.getItem("currentreview"))
    const [item, setItem] = useState(item2 === null ? [] : item2)

    const url = window.location.href
    const lastItem = url.substring(url.lastIndexOf('/') + 1)

    window.onload = async (e) => {
        const data = await currentReview(lastItem);
        setItem(data.data)
    }

    const renderReview = (item) => {
        if (item == '') {
            return [
                <h1>Loading</h1>
            ]
        } else {
            return [
                <>
                    <NavBar />
                    <br />
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

    return (
        <div maxWidth="sm" className={classes.root}>
            {renderReview(item)}
        </div>
    );
}
