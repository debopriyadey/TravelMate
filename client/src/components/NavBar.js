import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textDecoration: "none",
        flexGrow: '1'

    },

    appbar: {
        backgroundColor: '#232423',
        opacity: '0.7',
    },

    appbarWrapper: {
        width: '80%',
        margin: '0 auto',
        justifyContent: "space-between",

    },

    appbarTitle: {
        flexGrow: '1',
        [theme.breakpoints.down('xs')]: {
            fontSize: '20px'
        }
    },

    icon: {
        color: '#fff',
        fontSize: '1.5rem',
        padding: theme.spacing(1),
        [theme.breakpoints.down('xs')]: {
            fontSize: '18px'
        }
    },

    button: {
        margin: theme.spacing(1),
    },

    colorText: {
        color: '#295ed9',
    },

    container: {
        textAlign: 'center',
    },

    title: {
        color: '#fff',
        fontSize: '4.5rem',
        fontFamily: 'Lemonada',
        [theme.breakpoints.down('xs')]: {
            fontSize: '30px'
        }
    },

    subtitle: {
        fontSize: '4rem',
        [theme.breakpoints.down('xs')]: {
            fontSize: '27px'
        }
    },

    goDown: {
        color: '#295ed9',
        fontSize: '3.6rem',
        [theme.breakpoints.down('xs')]: {
            fontSize: '40px'
        }
    },
}));
export default function Header() {
    const renderList = () => {
        if (localStorage.getItem("jwt") === null) {
            return [
            <Link to="/login" className={classes.icon} style={{ textDecoration: 'none' }}>
                Login
            </Link>,
            <Link to="/signup" className={classes.icon} style={{ textDecoration: 'none' }}>
                SignUp
            </Link>
            ]
        }
        else {
            return [
                <Link to="/myreviews" className={classes.icon} style={{ textDecoration: 'none' }}>
                    MyReviews
                </Link>,
                <Link to="/" className={classes.icon} style={{ textDecoration: 'none' }}>
                    LogOut
                </Link>
            ]
        }
    }

    const classes = useStyles();
    const [checked, setChecked] = useState(false);
    useEffect(() => {
        setChecked(true);
    }, []);
    return (
        <div className={classes.root} id="header">
            <AppBar className={classes.appbar} elevation={0} >
                <Toolbar className={classes.appbarWrapper}>
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <h1 className={classes.appbarTitle}>
                            Travell<span className={classes.colorText}>Mate</span>
                        </h1>
                    </Link>
                    <IconButton>
                        {renderList()}
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    );
}