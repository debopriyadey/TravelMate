import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
} from 'reactstrap'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../actions/actions';
const useStyles = makeStyles((theme) => ({
    root: {
        justifyContent: 'center',
        alignItems: 'center',
        textDecoration: "none",
        flexGrow: '1'
    },

    appbar: {
        backgroundColor: '#232423',
        opacity: '0.9',
        [theme.breakpoints.down('xs')]: {
            height: '5%',
        },
    },

    appbarWrapper: {
        width: '80%',
        margin: '0 auto',
        justifyContent: "space-between",

    },

    appbarTitle: {
        flexGrow: '1',
        [theme.breakpoints.down('xs')]: {
            marginTop: "0",
            paddingTop: "0",
            fontSize: '15px',
        }
    },

    icon: {
        color: '#fff',
        //fontSize: '1.5rem',
        padding: theme.spacing(1),
        [theme.breakpoints.down('xs')]: {
            marginTop: "0",
            paddingTop: "0",
            fontSize: '5px',
        }
    },

    iconSize: {
        [theme.breakpoints.down('xs')]: {
            marginTop: "0",
            fontSize: '8px'
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
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    const loggedIn = useSelector(state => state.loggedIn)
    const dispatch = useDispatch();
    const logoutT = () => {
        dispatch(logout())
    }
    const renderList = () => {
        if (!loggedIn) {
            return [
                <Link to="/login" className={classes.icon} style={{ textDecoration: 'none' }}>
                    <Button varient="contained" color="primary">
                        <strong>Login</strong>
                    </Button>
                </Link>,
                <Link to="/signup" className={classes.icon} style={{ textDecoration: 'none' }}>
                    <Button varient="contained" color="primary">
                        <strong>SignUp</strong>
                    </Button>
                </Link>
            ]
        }
        else {
            return [
                <Link to="/myreviews" className={classes.icon} style={{ textDecoration: 'none' }}>
                    <Button varient="contained" color="primary">
                        <strong>My Reviews</strong>
                    </Button>
                </Link>,
                <Link to="/" className={classes.icon} style={{ textDecoration: 'none' }} >
                    <Button varient="contained" color="primary" onClick={logoutT}>
                        <strong>LogOut</strong>
                    </Button>
                </Link>
            ]
        }
    }

    const classes = useStyles();

    return (
        <div className={classes.root} id="header">
            <Navbar color="dark" dark expand="md" className={classes.appbar}>
                <NavbarBrand className="mx-5">
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <h1 className={classes.appbarTitle}>
                            Travell<span className={classes.colorText}>Mate</span>
                        </h1>
                    </Link>
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar className="mr-4">
                    <Nav className="ml-auto" navbar>
                        {renderList()}
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}