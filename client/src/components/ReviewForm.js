import React, { useState } from 'react'
import { Grid, TextField, makeStyles, Paper, Container, Typography, Button, Select, InputLabel, MenuItem, FormControl } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Filebase from 'react-file-base64';
// import { StateDropdown, RegionDropdown } from 'react-indian-state-region-selector';
// import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


import "../css/reviewForm.css";
import { createreviews } from '../actions/actions';
import formimg from '../img/formimg.jpg';


const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#1f1f1f',
        // backgroundImage: `url(${formimg})`,
        // backgroundSize: "cover",
        // backgroundRepeat: "no-repeat",
        // backgroundAttachment: "fixed",
        // // position: 'fixed',
        // zIndex: '-100',

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


export default function ReviewForm() {
    const t= true;
    const userInfo = useSelector(state => JSON.parse(state.userInfo))
    const initialFValues = {
        title: '',
        review: '',
        tags: '',
        creator: userInfo._id,
        creatorName: userInfo.name,
    }

    const separatedVlues = {
        like: '',
        speciality: '',
        expence: '',
        time: '',
    }
    //const user = useSelector((state) => state.reviews);
    //console.log(user[0].savedUser.name);
    const history = useHistory();
    const [reviewData, setData] = useState(initialFValues);
    const [placeData, setPlaceData] = useState(separatedVlues);
    const classes = useStyles();

    const dispatch = useDispatch();

    const render = () => {
        history.push('/myreviews');
    }

    const handeleSubmit = (e) => {
        e.preventDefault();
        reviewData.review = placeData.like + ' ' + placeData.speciality + ' ' +  placeData.expence + ' ' + placeData.time;
        dispatch(createreviews(reviewData))
        console.log(reviewData);
        setTimeout(function () {
            render()
        }, 3000);

    }
    let item= true;
    return (
        
        <div className={classes.root}>
            <div className={classes.bgimage}></div>
            {/* <Paper className={classes.paper}> */}
            <hr style={{ backgroundColor: '#806ac1', margin: 0 }} />
            <div className={classes.formContainer}>
                <Paper className={classes.paper}>
                    <Grid item xs={12} sm={12}>
                        <form className={classes.formContainer2} noValidate onSubmit={handeleSubmit}>
                            <Container maxWidth="sm">
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
                                        placeholder="You liked/disliked that place..."
                                        variant="outlined"
                                        required
                                        id="review"
                                        multiline
                                        fullWidth
                                        rows={4}
                                        value={placeData.like}
                                        onChange={(e) => setPlaceData({ ...placeData, like: e.target.value })}
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
                                        value={placeData.speciality}
                                        onChange={(e) => setPlaceData({ ...placeData, speciality: e.target.value })}
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
                                        value={placeData.expence}
                                        onChange={(e) => setPlaceData({ ...placeData, expence: e.target.value })}
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
                                        value={placeData.time}
                                        onChange={(e) => setPlaceData({ ...placeData, time: e.target.value })}
                                    />
                                </FormControl>

                                <FormControl  className={classes.bottomfield}>
                                    <p className={classes.formheadings}> Upload Photo </p>
                                    <div className={classes.fileInput}>
                                        <Filebase
                                            type="file"
                                            multiple={false}
                                            onDone={({ base64 }) => setData({ ...reviewData, selectedFile: base64 })}
                                        />
                                    </div>
                                </FormControl>
                                <FormControl variant="outlined"  className={classes.bottomfield}>
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
                                {/* <CountryDropdown
                                    value={reviewData.state}
                                    onChange={(e) => setData({ ...reviewData, state: e.target.value })} />
                                <RegionDropdown
                                    State={reviewData.state}
                                    value={reviewData.region}
                                    onChange={(e) => setData({ ...reviewData, region: e.target.value })} />*/}
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
                    </Grid>
                </Paper>
            </div>
        </div >

    )

}

