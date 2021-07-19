import React, { useState } from 'react'
import { Grid, TextField, makeStyles, Paper, Container, Typography, Button, Select, InputLabel, MenuItem, FormControl } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import { StateDropdown, RegionDropdown } from 'react-indian-state-region-selector';
// import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


import "../css/reviewForm.css";
import NavBar from './NavBar'
import { updateReview } from '../api';

const useStyles = makeStyles(theme => ({
    root: {
        background: 'linear-gradient(184deg, rgba(45,35,255,1) 0%, rgba(26,169,227,1) 82%);',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',

    },
    bgimage: {

    },
    formContainer2: {
        marginTop: '0 auto',
        '& .MuiOutlinedInput-input': {
            color: 'white',
        },
        //backgroundColor: '#1f1f1f',
        color: '#fff',
    },
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        backgroundColor: '#1f1f1f',
        margin: '30px 200px',
        [theme.breakpoints.down('sm')]: {
            margin: '0',
        },
        opacity: '0.9',

    },
    topfield: {

    },
    bottomfield: {
        marginTop: theme.spacing(2),
        width: '200px',
        display: 'block',
    },
    spacing: {
        marginTop: theme.spacing(2),
    },
    heading: {
        marginLeft: '-10px',
        fontWeight: 'bold',
    },
    formheadings: {
        marginLeft: '10px',
        fontWeight: 'bold',
        fontSize: '1.2rem',
    },

    select: {
        minWidth: 160,
    },

    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    video: {
        position: 'fixed',
        zIndex: '-100',
        height: '100vh',
        width: '100vw',

        transform: 'translateX(-50%) translateY(-50%)',
        transition: '1s opacity',
    },

}));


export default function UpdateReview() {
    const toUpdate = JSON.parse(sessionStorage.getItem('toUpdate'))
    const initialFValues = {
        title: toUpdate.title,
        review: toUpdate.review,
        tags: toUpdate.tags,
    }

    const history = useHistory();
    const [reviewData, setData] = useState(initialFValues);
    const classes = useStyles();

    const dispatch = useDispatch();

    const render = () => {
        history.push('/myreviews');
    }

    const handeleSubmit = async (e) => {
        e.preventDefault();
        console.log(reviewData.tags)
        const { data } = await updateReview(toUpdate._id, reviewData)
        render()
    }

    React.useEffect(() => {
        const auto = () => {
            var $results = document.querySelector('.results');
            var appendToResult = $results.insertAdjacentHTML.bind($results, 'afterend');

            window.TeleportAutocomplete.init('.my-input').on('change', function (value) {
                setData({...reviewData, tags: value.title})
                appendToResult('<pre>' + JSON.stringify(value, null, 2) + '</pre>');
            });
        }
        auto();
    }, [])

    return (
        <div className={classes.root}>
            <NavBar />
            <div className={classes.formContainer}>
                <Paper className={classes.paper}>
                    <Grid item xs={12} sm={12}>
                        <form className={classes.formContainer2} noValidate onSubmit={handeleSubmit}>
                            <Container maxWidth="sm">
                                <Typography className={classes.heading}> <h1> Update Review </h1>  </Typography>
                                <FormControl fullWidth>
                                    <p className={classes.formheadings}> Title </p>
                                    <TextField
                                        id="outlined-full-width"
                                        name="title"
                                        placeholder="Place, City"
                                        fullWidth
                                        required
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                        autoFocus
                                        value={reviewData.title}
                                        onChange={(e) => setData({ ...reviewData, title: e.target.value })}
                                    />
                                </FormControl>
                                <FormControl fullWidth>
                                    <p className={classes.formheadings}> Your Review </p>
                                    <TextField
                                        autoComplete="fname"
                                        name="speciality"
                                        placeholder="You liked/disliked that place..."
                                        variant="outlined"
                                        required
                                        id="review"
                                        multiline
                                        fullWidth
                                        rows={4}
                                        value={reviewData.review}
                                        onChange={(e) => setData({ ...reviewData, review: e.target.value })}
                                    />
                                </FormControl>
                                <FormControl variant="outlined" item className={classes.bottomfield}>
                                    <p className={classes.formheadings}> State </p>
                                    <input
                                        type="text"
                                        className="my-input"
                                        name="field"
                                        tabIndex="1"
                                        autoComplete="off"
                                        value={reviewData.tags}
                                        onChange={(e) => {
                                            console.log(e.target.value)
                                            setData({ ...reviewData, tags: e.target.value })
                                        }}
                                    />
                                </FormControl>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    UPDATE
                                </Button>
                                <Grid item className='text-right'>
                                    <Link to='/' style={{ textDecoration: 'none' }}>
                                        <Button>
                                            <ArrowBackIcon /> Back to Home
                                        </Button>
                                    </Link>
                                </Grid>
                            </Container>
                        </form>
                        <div className="results"></div>

                    </Grid>
                </Paper>
            </div>
        </div >

    )

}

