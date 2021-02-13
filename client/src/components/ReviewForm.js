import React, { useState } from 'react'
import { Grid, TextField, makeStyles, Paper, Container, Typography, Button, Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


// import Filebase from 'react-file-base64'
import "../css/reviewForm.css";

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            margin: theme.spacing(1)
        }
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    topspace: {
        marginTop: theme.spacing(2)
    },

    select: {
        minWidth: 160,
    },

    submit: {
        margin: theme.spacing(3, 0, 2),
    }

}));

const initialFValues = {
    id: 0,
    fullname: '',
    review: '',
    photo: '',
    state: '',
    city: '',
    place: ''
}

export default function ReviewForm() {
    const user = useSelector((state) => state.reviews);
    console.log(user[0].savedUser.name);

    const [values, setValues] = useState(initialFValues);
    const classes = useStyles();

    const handleInputChange = e => {
        
    }

    return (
        <Paper className={classes.paper}>
            <Grid item xs={12} sm={12}>
                <form className={classes.root}>
                    <Container maxWidth="sm">
                        <Typography component="h1"> Create Review </Typography>
                        <TextField
                            autoComplete="fname"
                            name="fullname"
                            variant="outlined"
                            required
                            fullWidth
                            id="firstName"
                            label="Name"
                            autoFocus
                            value= {values.fullname}
                            onChange={handleInputChange}
                        />
                        <TextField
                            autoComplete="fname"
                            name="review"
                            variant="outlined"
                            required
                            id="review"
                            label="YourReview"
                            multiline
                            fullWidth
                            rows={10}
                            value={values.review}
                            onChange={handleInputChange}
                        />
                        <FormControl item className={classes.topspace}>
                            <input
                                accept="image/*"
                                className={classes.input}
                                id="contained-button-file"
                                multiple
                                type="file"
                            />
                        </FormControl>
                        <Grid container>
                            <Grid item>
                                <FormControl variant="outlined">
                                    <InputLabel id="state">State</InputLabel>
                                    <Select className={classes.select}
                                        labelId="state"
                                        id="demo-simple-select-outlined"
                                        name="state"
                                        required
                                        label="State"
                                        value={values.state}
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <FormControl variant="outlined">
                                    <InputLabel id="state">City</InputLabel>
                                    <Select className={classes.select}
                                        labelId="city"
                                        id="demo-simple-select-outlined"
                                        name="city"
                                        label="City"
                                        value={values.city}
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            CREATE
                        </Button>
                        <Link to='/' style={{ textDecoration: 'none' }}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="secondary"
                                className={classes.submit}
                            >
                                BACK
                            </Button>
                        </Link>
                    </Container>
                </form>
            </Grid>
        </Paper>

    )

}

