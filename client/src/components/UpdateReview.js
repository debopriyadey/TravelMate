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
        backgroundColor: '#1f1f1f',
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
        background: 'linear-gradient(180deg, rgba(8,11,23,1) 0%, rgba(9,17,117,1) 51%)',
        margin: '30px 200px',
        [theme.breakpoints.down('sm')]: {
            margin: '0',
        },
        opacity: '0.7',

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
        const { data } = await updateReview(toUpdate._id, reviewData)
        render()
    }

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
                                    {/* <InputLabel id="demo-simple-select-filled-label"> State </InputLabel> */}
                                    <Select
                                        id="tags"
                                        label="tags"
                                        fullWidth
                                        required
                                        value={reviewData.tags}
                                        onChange={(e) => setData({ ...reviewData, tags: e.target.value })}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value="Andhra Pradesh">Andhra Pradesh</MenuItem>
                                        <MenuItem value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</MenuItem>
                                        <MenuItem value="Arunachal Pradesh">Arunachal Pradesh</MenuItem>
                                        <MenuItem value="Assam">Assam</MenuItem>
                                        <MenuItem value="Bihar">Bihar</MenuItem>
                                        <MenuItem value="Chandigarh">Chandigarh</MenuItem>
                                        <MenuItem value="Chhattisgarh">Chhattisgarh</MenuItem>
                                        <MenuItem value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</MenuItem>
                                        <MenuItem value="Daman and Diu">Daman and Diu</MenuItem>
                                        <MenuItem value="Delhi">Delhi</MenuItem>
                                        <MenuItem value="Lakshadweep">Lakshadweep</MenuItem>
                                        <MenuItem value="Puducherry">Puducherry</MenuItem>
                                        <MenuItem value="Goa">Goa</MenuItem>
                                        <MenuItem value="Gujarat">Gujarat</MenuItem>
                                        <MenuItem value="Haryana">Haryana</MenuItem>
                                        <MenuItem value="Himachal Pradesh">Himachal Pradesh</MenuItem>
                                        <MenuItem value="Jammu and Kashmir">Jammu and Kashmir</MenuItem>
                                        <MenuItem value="Jharkhand">Jharkhand</MenuItem>
                                        <MenuItem value="Karnataka">Karnataka</MenuItem>
                                        <MenuItem value="Kerala">Kerala</MenuItem>
                                        <MenuItem value="Madhya Pradesh">Madhya Pradesh</MenuItem>
                                        <MenuItem value="Maharashtra">Maharashtra</MenuItem>
                                        <MenuItem value="Manipur">Manipur</MenuItem>
                                        <MenuItem value="Meghalaya">Meghalaya</MenuItem>
                                        <MenuItem value="Mizoram">Mizoram</MenuItem>
                                        <MenuItem value="Nagaland">Nagaland</MenuItem>
                                        <MenuItem value="Odisha">Odisha</MenuItem>
                                        <MenuItem value="Punjab">Punjab</MenuItem>
                                        <MenuItem value="Rajasthan">Rajasthan</MenuItem>
                                        <MenuItem value="Sikkim">Sikkim</MenuItem>
                                        <MenuItem value="Tamil Nadu">Tamil Nadu</MenuItem>
                                        <MenuItem value="Telangana">Telangana</MenuItem>
                                        <MenuItem value="Tripura">Tripura</MenuItem>
                                        <MenuItem value="Uttar Pradesh">Uttar Pradesh</MenuItem>
                                        <MenuItem value="Uttarakhand">Uttarakhand</MenuItem>
                                        <MenuItem value="West Bengal">West Bengal</MenuItem>
                                    </Select>
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
                    </Grid>
                </Paper>
            </div>
        </div >

    )

}

