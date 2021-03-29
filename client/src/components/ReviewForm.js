import React, { useState } from 'react'
import { Grid, TextField, makeStyles, Paper, Container, Typography, Button } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Filebase from 'react-file-base64';

import "../css/reviewForm.css";
import { createreviews } from '../actions/actions';

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


export default function ReviewForm() {
    const userInfo = useSelector(state => JSON.parse(state.userInfo))
    const initialFValues = {
        title: '',
        review: '',
        tags: '',
        creator: userInfo._id,
    }

    //const user = useSelector((state) => state.reviews);
    //console.log(user[0].savedUser.name);
    const history = useHistory();
    const [reviewData, setData] = useState(initialFValues);
    const classes = useStyles();

    const dispatch = useDispatch();

    const render = () => {
        history.push('/myreviews');
    }

    const handeleSubmit = (e) => {
        e.preventDefault();
        dispatch(createreviews(reviewData))
        console.log(reviewData);
        setTimeout(function () {
            render()
        }, 3000);

    }

    return (
        <Paper className={classes.paper}>
            <Grid item xs={12} sm={12}>
                <form className={classes.root} noValidate onSubmit={handeleSubmit}>
                    <Container maxWidth="sm">
                        <Typography component="h1"> Create Review </Typography>
                        <TextField
                            autoComplete="fname"
                            name="title"
                            variant="outlined"
                            required
                            fullWidth
                            id="title"
                            label="title"
                            autoFocus
                            value={reviewData.title}
                            onChange={(e) => setData({ ...reviewData, title: e.target.value })}
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
                            value={reviewData.review}
                            onChange={(e) => setData({ ...reviewData, review: e.target.value })}
                        />
                        {/* <FormControl item className={classes.topspace}>
                            <Filebase
                                type="file"
                                multiple={false}
                                onDone={({base64}) => setData({...reviewData, selectedFile: base64})}
                            />
                        </FormControl> */}
                        <div className={classes.fileInput}>
                            <Filebase
                                type="file"
                                multiple={false}
                                onDone={({ base64 }) => setData({ ...reviewData, selectedFile: base64 })}
                            />
                        </div>


                        <TextField
                            name="tags"
                            variant="outlined"
                            required
                            id="tags"
                            label="tags"
                            multiline
                            fullWidth
                            rows={10}
                            value={reviewData.tags}
                            onChange={(e) => setData({ ...reviewData, tags: e.target.value })}
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

