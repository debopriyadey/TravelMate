// *https://www.registers.service.gov.uk/registers/country/use-the-api*
// import fetch from 'cross-fetch';
import axios from 'axios'
import React from 'react';
import { Grid, TextField, makeStyles, Container, Toolbar, Typography } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import Reviews from './Reviews';
import NavBar from './NavBar';
export default function Search() {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [post, setPost] = React.useState([]);
  const loading = open && options.length === 0;

  const getPostByTag = (tag) => {

    const search = {
      "tags": tag
    }
    axios.post('http://localhost:5000/getpostbytag', search).then(res => {
      const data = res.data.Reviews;
      setPost(data);
    }).catch((error) => {
      console.log(error)
    })
  }

  React.useEffect(() => {
    let active = true;
    if (!loading) {
      return undefined;
    }
    const search = {
      "tags": ""
    }
    axios.post('http://localhost:5000/searchreview', search).then(res => {
      setOptions(res.data);
    }).catch((error) => {
      console.log(error)
    })
    return () => {
      active = false;
    };

  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);


  const useStyles = makeStyles((theme) => ({
    root: {
      // backgroundColor: 'currentColor',
      overflow: 'hidden',
    },
    textFiled: {

      overflow: 'hidden',
      zIndex: -1
    },
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }

  })


  )

  const classes = useStyles();
  return (

    <div className={classes.root}>
        <Autocomplete
          className={classes.textFiled}
          id="asynchronous-demo"
          style={{ width: 300 }}

          open={open}


          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          onChange={(event, value) => getPostByTag(value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              getPostByTag(e.target.value)

            }
          }}
          options={options}
          loading={loading}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Asynchronous"
              variant="outlined"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          )}
        />


      {/* {post.length ? <Reviews reviews={post} /> : <CircularProgress color="inherit" size={100} />} */}
      <Reviews reviews={post} />
    </div>
  );
}