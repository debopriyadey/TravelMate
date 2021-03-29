import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { IconButton, Button } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import { Link } from 'react-router-dom';



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
    //const item  = useSelector((state) => state.currentReview)
    const item = JSON.parse(sessionStorage.getItem("currentreview"));
    //item2 = JSON.parse(item2)
    //console.log(item2);

    return (
        <div maxWidth="sm" className={classes.root}>
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
        </div>
    );
}
