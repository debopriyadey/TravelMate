import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Container, Grid } from '@material-ui/core';
import LinkedIn from '@material-ui/icons/LinkedIn';

const useStyles = makeStyles((theme) => ({
    root: {
        color: 'grey',
        flexGrow: 1,
        backgroundColor: '#292929',
        marginTop: theme.spacing(2),
    },

    paper: {
        padding: theme.spacing(3),
        margin: 'auto',
    },

    socialIcons: {
        display: 'flex',
        justifyContent: 'center',
    },

    link: {
        color: 'inherit',
        textDecoration: 'none',
    },

    image: {
        width: 128,
        height: 128,
    },

    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
}));

export default function Footer() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Container className={classes.paper}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Typography variant="h4" style={{ color: '#fff' }}><strong>Travel<span style={{ color: '#295ed9' }}>Mate</span></strong></Typography>
                    </Grid>
                </Grid>
                <br />
                <Grid container spacing={1}>
                    <Grid item xs={12} md={7}>
                        <p><i><strong>A little bit about TravellMate</strong></i></p>
                        <Typography varient="h6">
                            This website is build with the aim of helping people to decide and plan their travel destination in a more effective way.
                            People will have access to hundreds of review on different places given by our users which can be searched without creating an account on
                            this website. These reviews are helping people plan their vacation in structured way.
                        </Typography>
                        <br />
                    </Grid>
                    <Grid item xs={12} md={2}>
                    </Grid>
                    <Grid item xs={12} md={3} className="text-left">
                        <h5>Developers</h5>
                        <hr className="mb-2 mt-0 d-inline-block mx-auto" style={{ width: "100px", backgroundColor: 'grey' }} />
                        <h5 className="mb-0"><strong>GOURAV MODI <a href="https://www.linkedin.com/in/gourav-modi-125004191/" target="_blank"><LinkedIn /></a> </strong></h5>
                        <Typography variant="body2" gutterBottom className="mb-0">
                            <small>
                                MERN Stack Developer
                            </small>
                        </Typography>

                        <br />
                        <h5 className="mb-0"><strong>DEBOPRIYA DEY <a href="https://www.linkedin.com/in/debopriya-dey/" target="_blank"><LinkedIn /></a> </strong></h5>
                        <Typography variant="body2" gutterBottom className="mb-0">
                            <small>
                                MERN Stack Developer
                            </small>
                        </Typography>
                    </Grid>
                </Grid>
                <hr style={{ backgroundColor: 'white' }} />
                <Typography variant="body2" gutterBottom style={{ textAlign: 'center' }}>&copy; TravellMate </Typography>
            </Container>
        </div >
    );
}
