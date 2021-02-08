import React, { useState, useEffect } from 'react'
import { Grid, TextField, makeStyles, Paper, Container, Typography, Button, IconButton } from '@material-ui/core';
import Filebase from 'react-file-base64'
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

    const [values, setValues] = useState(initialFValues);
    const classes = useStyles();

    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    return (
        <Paper className={classes.pagecontent}>
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
                            value={values.name}
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
                        <input
                            accept="image/*"
                            className={classes.input}
                            id="contained-button-file"
                            multiple
                            type="file"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            CREATE
                        </Button>
                    </Container>
                </form>
            </Grid>
        </Paper>

    )

}

