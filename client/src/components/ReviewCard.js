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

const useStyles = makeStyles({
    root: {
        color: 'black',
        maxWidth: 645,
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

    return (
        <Card className={classes.root}>
            <CardMedia
                className={classes.media}
                image={places.imageUrl}
                title="Contemplative Reptile"
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
                    {places.desc}
                </Typography>
            </CardContent>
            <CardActions>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                <Button size="small" color="primary">
                    Read More
                </Button>
            </CardActions>
        </Card>
    );
}
