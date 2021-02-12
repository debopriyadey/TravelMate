import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Collapse, IconButton, Button } from '@material-ui/core';
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';
import { Link } from 'react-router-dom';
import { Link as Scroll } from 'react-scroll';

import NavBar from './NavBar';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '18%',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textDecoration: "none",
        flexGrow: '1',
        [theme.breakpoints.down('md')]: {
            marginTop: '30%'
        },
        [theme.breakpoints.down('sm')]: {
            marginTop: '40%'
        },
        [theme.breakpoints.down('xs')]: {
            marginTop: '60%'
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
    const renderLink = () => {
        if (localStorage.getItem("jwt") === null) {
            return [
                <Link to="/login" style={{ textDecoration: 'none' }}>
                    Create
                </Link>
            ]
        }
        else {
            return [
                <Link to="/reviewform" style={{ textDecoration: 'none' }}>
                    Create
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
            <NavBar />
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
                            <Link to="/find" style={{ textDecoration: 'none' }}>
                                Search
                            </Link>
                        </Button>
                        <Button variant="outlined" size="medium" color="primary" className={classes.button}>
                            {renderLink()}
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