import React, { useState } from 'react';
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
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import api from '../api/index'
import { Redirect } from 'react-router-dom';
import { signin } from '../actions/actions';

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error_msg:{
    color:"red"
  }
}));

 function Login() {
  const message=useSelector(state=>state.message.error)
  const [signinData, setData] = useState({
    email: "",
    password: ""
  })
  const dispatch = useDispatch()
  const handeleSubmit = (e) => {
    e.preventDefault();
    dispatch(signin(signinData))
  }
  // console.log(user)

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Typography component="h3" className={classes.error_msg}>
          {message}
        </Typography>
        
        <form className={classes.form} noValidate onSubmit={handeleSubmit}>
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
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default function LoginForm() {
  const log=useSelector(state=>state.loggedIn)
  const success=log 
  return (
    <>
      {!success?<Login/>:<Redirect to='/' />}
    </>
  )
}