import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signin } from '../actions/userActions';
import NavBar from './NavBar';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(0, 0, 2),
  },
  error_msg_style: {
    padding: '0 16px',
    outline: 'none'
  },
  error_msg: {
    display: 'none'
  },
  linkColor: {
    color: '#0000ee'
  }
}));

function Login() {
  const {message, error , loading } = useSelector(state => state.userInfo);
  const [signinData, setData] = useState({
    email: "",
    password: "",
  })
  const dispatch = useDispatch()
  const handeleSubmit = (e) => {
    e.preventDefault();
    dispatch(signin(signinData))
  }

  const classes = useStyles();

  return (
    <>
      <NavBar />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          {
            error?<Alert
            severity="error"
            variant="filled"
            onClose={(e) => setData({ ...signinData, showError: false })}>
            {error}
             </Alert>:(null)
          }

          <form className={classes.form} noValidate onSubmit={handeleSubmit}>
            <Grid container spacing={2}>

              <Grid item xs={12}>
                <TextField
                  name="email"
                  variant="outlined"
                  autoComplete="email"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  value={signinData.email}
                  onChange={(e) => setData({ ...signinData, email: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="password"
                  variant="outlined"
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  id="password"
                  value={signinData.password}
                  onChange={(e) => setData({ ...signinData, password: e.target.value })}
                />
              </Grid>
            </Grid>
            <br />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={signinData.submitting}
            >
              {loading ? ('Submitting...') : ('Sign In')}
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/signup" variant="body2">
                  <p className={classes.linkColor}>Don't have an account? Sign Up</p>
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  );
}

export default function LoginForm() {
  const {user} = useSelector(state => state.userInfo)
  let loggedIn = false;
  if (user && Object.keys(user).length !== 0)loggedIn=true;
  return (
    <>
      {!loggedIn ? <Login /> : <Redirect to='/' />}
    </>
  )
}