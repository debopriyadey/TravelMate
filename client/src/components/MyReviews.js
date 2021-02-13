import React from 'react'
import { AppBar, Fab, makeStyles, Paper, Toolbar, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';

import NavBar from './NavBar'
import TopReviews from './TopReviews';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: 'currentColor',
        overflow: 'hidden',
    },

    paper: {
        backgroundColor: 'white',
        margin: '0 auto',
        marginTop: 100,
        maxWidth: theme.spacing(100),
        height: theme.spacing(25),
        [theme.breakpoints.down('md')]: {
            maxWidth: theme.spacing(80),
        },
        [theme.breakpoints.down('sm')]: {
            maxWidth: theme.spacing(60),
        },
        [theme.breakpoints.down('xs')]: {
            maxWidth: theme.spacing(40),
            height: theme.spacing(15),
        },
    },

    userInfo: {
        textAlign: 'center',
    },

    content: {
        marginTop: theme.spacing(10),
        marginBottom: theme.spacing(10),
    },

    appBar: {
        top: 'auto',
        bottom: 0,
    },

    fabButton: {
        position: 'fixed',
        zIndex: 1,
        bottom: 20,
        left: 0,
        right: 0,
        margin: '0 auto',
    },
}));

export default function MyReviews() {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <NavBar />
            <div>
                <Paper elevation={3} className={classes.paper} >
                    <Typography className={classes.userInfo}>
                        <h1> NAME </h1>
                        <h3> Reviews : 12 </h3>
                    </Typography>
                </Paper>
                <div className={classes.content} >
                    <TopReviews />
                </div>
            </div>
            <AppBar position="fixed" color="primary" className={classes.appBar}>
                <Toolbar>
                    <Link to="/createreview" style={{ textDecoration: 'none' }}>
                        <Fab color="secondary" aria-label="add" className={classes.fabButton}>
                            <AddIcon />
                        </Fab>
                    </Link>
                </Toolbar>
            </AppBar>
        </div>
    )
}
