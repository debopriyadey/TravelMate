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
    pagecontent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}))

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
                        <Typography varient="h2"> Create Review </Typography>
                        <TextField
                            variant="outlined"
                            label="Name"
                            name="fullname"
                            fullWidth
                            value={values.name}
                            onChange={handleInputChange}
                        />
                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            label="YourReview"
                            name="review"
                            multiline
                            fullWidth
                            rows={10}
                            value={values.review}
                        />
                        <input
                            accept="image/*"
                            className={classes.input}
                            id="contained-button-file"
                            multiple
                            type="file"
                        />
                        <Button
                            className={classes.buttonSubmit}
                            varitent="contained"
                            color="primary"
                            type="submit"
                            fullWidth> CREATE
                        </Button>
                    </Container>
                </form>
            </Grid>
        </Paper>

    )

}

