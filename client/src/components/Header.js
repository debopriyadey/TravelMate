import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Collapse, IconButton, Button } from '@material-ui/core';
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';
import { Link } from 'react-router-dom';
import { Link as Scroll } from 'react-scroll';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textDecoration: "none",
        flexGrow: '1'
    },

    appbar: {
        background: 'none',
    },

    appbarWrapper: {
        width: '80%',
        margin: '0 auto',
        justifyContent: "space-between",

    },

    appbarTitle: {
        flexGrow: '1',
    },

    icon: {
        color: '#fff',
        fontSize: '1.5rem',
        padding: theme.spacing(1),
    },

    button : {
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
    },

    subtitle: {
        fontSize: '4rem',
    },

    goDown: {
        color: '#295ed9',
        fontSize: '3.6rem',
    },
}));
export default function Header() {
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
                        <Link to="/Login" className={classes.icon} style={{ textDecoration: 'none' }}>
                            Login
                        </Link>
                        <Link to="/SignUp" className={classes.icon} style={{ textDecoration: 'none' }}>
                            SignUp
                        </Link>
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Collapse
                in={checked}
                {...(checked ? { timeout: 1000 } : {})}
                collapsedHeight={50}
            >
                <div className={classes.container}>
                    <h1 className={classes.title}>
                        Welcome to <br />
                        <span className={classes.subtitle}>Travell<span className={classes.colorText}>Mate</span></span>
                    </h1>
                    <span>
                        <Button variant="outlined" size="medium" color="primary" className={classes.button}>
                            <Link to="/Find" style={{ textDecoration: 'none' }}>
                                Search
                            </Link>                    
                        </Button>
                        <Button variant="outlined" size="medium" color="primary" className={classes.button}>
                            <Link to="/ReviewForm" style={{ textDecoration: 'none' }}>
                                Create
                            </Link>
                        </Button>
                    </span>
                    <div>
                        <Scroll to="top-reviews" smooth={true}>
                            <IconButton>
                                <ArrowDropDownCircleIcon className={classes.goDown} />
                            </IconButton>
                        </Scroll>
                    </div>
                </div>
            </Collapse>
        </div>
    );
}