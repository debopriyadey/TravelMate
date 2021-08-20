import React, { useEffect, useState } from 'react'
import { Grid, TextField, makeStyles, Paper, Container, Typography, Button, Select, InputLabel, MenuItem, FormControl } from '@material-ui/core';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Filebase from 'react-file-base64';
// import { StateDropdown, RegionDropdown } from 'react-indian-state-region-selector';
// import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


import "../css/reviewForm.css";
import { createreviews } from '../actions/reviewActions';
import formimg from '../img/formimg.jpg';
import { CLEAR_CREATE_REVIEW } from '../constents';


const useStyles = makeStyles(theme => ({
    root: {
        background: '#fff',

    },
    bgimage: {

    },
    formContainer2: {
        marginTop: '50px',
        '& .MuiOutlinedInput-input': {
            color: 'white',
        },
        //backgroundColor: '#1f1f1f',
        color: '#fff',
    },
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        background: '#1f1f1f',
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
    error: {
        color: 'red',
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


export default function ReviewForm(props) {
    const userInfo = useSelector(state => state.userInfo.user)
    const { error , message , loading } = useSelector( (state)=> state.createReviewInfo)

    const initialFValues = {
        title: '',
        review: '',
        tags: '',
        speciality: '',
        expence: '',
        time: '',
    }

    const history = useHistory();
    const [reviewData, setData] = useState(initialFValues);
    const classes = useStyles();

    const dispatch = useDispatch();

    const render = () => {
        history.push('/myreviews');
    }

    const handeleSubmit = (e) => {
        e.preventDefault();
        reviewData.tags = reviewData.title ? (reviewData.tags? reviewData.title + ',' + reviewData.tags:reviewData.title): reviewData.tags;
        dispatch(createreviews(reviewData))
    }   
    const [locationTitle, setLocationTitle] = useState('')
    useEffect(() => {
            if(props.update){
                setData(props.review)
            }
            var $results = document.querySelector('.results');
            
            var appendToResult =  $results.insertAdjacentHTML.bind($results, 'afterend');

            window.TeleportAutocomplete.init('.my-input').on('change', function (value) {
                console.log(value)
                setLocationTitle(value.title)
                appendToResult('<pre>' + JSON.stringify(value, null, 2) + '</pre>');
            });
        return () => {
            dispatch({type: CLEAR_CREATE_REVIEW});
        }
    }, [])

    useEffect(()=> {
        setData({...reviewData, tags: locationTitle})
    }, [locationTitle])
  
    return (
        
        !message?(
            <div className={classes.root}>
            <div className={classes.bgimage}></div>
            <hr style={{ backgroundColor: '#806ac1', margin: 0 }} />
            <div className={classes.formContainer}>
                <Paper className={classes.paper}>
                    <Grid item xs={12} sm={12}>
                        <form className={classes.formContainer2} noValidate onSubmit={handeleSubmit}>
                            <Container maxWidth="sm">
                                {
                                    error? (
                                        <Typography className={classes.error} variant="h5">  {error}  </Typography>
                                    ): (null)
                                }
                                <Typography className={classes.heading} variant="h5">  Create Review   </Typography>
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
                                        placeholder="Something About that place..."
                                        variant="outlined"
                                        required
                                        id="review"
                                        multiline
                                        fullWidth
                                        rows={4}
                                        value={reviewData.review}
                                        onChange={(e) => setData({ ...reviewData, review: e.target.value })}
                                    />
                                    <div className={classes.spacing}></div>
                                    <TextField
                                        autoComplete="fname"
                                        name="speciality"
                                        placeholder="Speaciality of that place..."
                                        variant="outlined"
                                        required
                                        id="review"
                                        multiline
                                        fullWidth
                                        rows={4}
                                        value={reviewData.speciality}
                                        onChange={(e) => setData({ ...reviewData, speciality: e.target.value })}
                                    />
                                    <div className={classes.spacing}></div>
                                    <TextField
                                        autoComplete="fname"
                                        name="expences"
                                        placeholder="Total Expence..."
                                        variant="outlined"
                                        required
                                        id="review"
                                        multiline
                                        fullWidth
                                        rows={4}
                                        value={reviewData.expence}
                                        onChange={(e) => setData({ ...reviewData, expence: e.target.value })}
                                    />
                                    <div className={classes.spacing}></div>
                                    <TextField
                                        autoComplete="fname"
                                        name="Time"
                                        placeholder="Best Time to vivsit...."
                                        variant="outlined"
                                        required
                                        id="review"
                                        multiline
                                        fullWidth
                                        rows={4}
                                        value={reviewData.time}
                                        onChange={(e) => setData({ ...reviewData, time: e.target.value })}
                                    />
                                </FormControl>

                                <FormControl className={classes.bottomfield}>
                                    <p className={classes.formheadings}> Upload Photo </p>
                                    <div className={classes.fileInput}>
                                        <Filebase
                                            type="file"
                                            multiple={false}
                                            onDone={({ base64 }) => setData({ ...reviewData, selectedFile: base64 })}
                                        />
                                    </div>
                                </FormControl>
                                <FormControl variant="outlined" className={classes.bottomfield}>
                                    <p className={classes.formheadings}> State </p>
                                    <input
                                        type="text"
                                        className="my-input"
                                        name="field"
                                        tabIndex="1"
                                        autoComplete="off"
                                        value={reviewData.tags}
                                        onChange={(e) => {
                                            setData({...reviewData, tags: e.target.value})
                                            console.log(e.target.value)
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
                                    CREATE
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

        ):(
            <Redirect to="/myreviews"/>
        )
    )

}

