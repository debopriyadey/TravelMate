import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import { signup } from '../actions/actions';
import NavBar from './NavBar';

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
    margin: theme.spacing(3, 0, 2),
  },
  error_msg_style: {
    padding: '0 16px',
    outline: 'none'
  },
  error_msg: {
    display: 'none'
  }
}));

function SignUp() {
  //const history = useHistory()
  let message = useSelector(state => state.signupMessage)
  const [postData, setData] = useState({
    name: "",
    email: "",
    password: "",
    showError: false,
    error: "",
    submitting: false,
  })

  const dispatch = useDispatch()

  const handeleSubmit = (e) => {
    setData({ ...postData, submitting: true });
    e.preventDefault();
    dispatch(signup(postData))
  }
  useEffect(() => {
    if (message !== "" && message) {
      setData({ ...postData, showError: true, error: message.error, submitting: false });
    }
  }, [message])


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
            Sign up
          </Typography>

          <Alert className={postData.showError ? classes.error_msg_style : classes.error_msg} severity="error" variant="filled" onClose={(e) => setData({ ...postData, showError: false })}>{postData.error}</Alert>


          <form className={classes.form} autoComplete="off" noValidate onSubmit={handeleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={postData.name}
                  onChange={(e) => setData({ ...postData, name: e.target.value })}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="email"
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  value={postData.email}
                  onChange={(e) => setData({ ...postData, email: e.target.value })}
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
                  value={postData.password}
                  onChange={(e) => setData({ ...postData, password: e.target.value })}
                />
              </Grid>
              {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={postData.submitting}
            >
              {postData.submitting ? ('Submitting...') : ('Sign Up')}
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  );
}


export default function SignUpForm() {

  const log = useSelector(state => state.signupSuccess)
  const success = log
  return (
    <>
      {!success ? <SignUp /> : <Redirect to='/login' />}
    </>
  )

}
