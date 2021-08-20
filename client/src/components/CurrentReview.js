import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import Chip from '@material-ui/core/Chip';
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
    title2: {
        fontWeight: 'bold',
        fontSize: '1.5rem',
        color: 'black',
        borderBottom: '3px solid #295ed9',
        display: 'inline-block'
    },

    desc: {
        fontSize: '1.1rem',
        color: 'black',
        marginBottom: '20px'
    },

    button: {
        maxWidth: '300px',
        margin: '0 auto',
        display: 'block'
    }
});

export default function CurrentReview(props) {
    const classes = useStyles();

    const item2 = props.location.state;
    const [item, setItem] = useState(item2 === null ? [] : item2)


    const renderReview = (item) => {
        console.log(item)
        if (item == '') {
            return [
                <h3>Loading</h3>
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

                        {
                           
                            item.speciality && (
                                <React.Fragment>
                                    <Typography
                                        variant="h5"
                                        component="h1"
                                        className={classes.title2}
                                    >
                                        Speciality 
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                        component="p"
                                        className={classes.desc}
                                    >
                                        {item.speciality}
                                    </Typography>
                                </React.Fragment>
                            )
                        }
                        {
                            item.expence && (
                                <React.Fragment>
                                <Typography
                                    variant="h5"
                                    component="h1"
                                    className={classes.title2}
                                >
                                   Total Expence
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    component="p"
                                    className={classes.desc}
                                >
                                    {item.expence}
                                </Typography>
                            </React.Fragment>
                            )
                        }
                        {
                            item.time && (
                                <React.Fragment>
                                <Typography
                                    variant="h5"
                                    component="h1"
                                    className={classes.title2}
                                >
                                   Best Time To Vist
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    component="p"
                                    className={classes.desc}
                                >
                                    {item.time}
                                </Typography>
                            </React.Fragment>
                            )
                        }

                        {item.tags.map((data) => (
                            <Chip
                                label={data}
                                size="small"
                                color='primary'
                            />
                        ))
                        }

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
