// import fetch from 'cross-fetch';
import queryString from 'query-string'
import React, { useEffect, useState } from 'react';
import { Grid, TextField, Modal, makeStyles } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import Loader from "react-loader-spinner";
import Reviews from './Reviews';
import { useHistory } from 'react-router-dom';

import searchbg from '../img/searchimg.jpg'
import NavBar from './NavBar';
import { getPostsbyTag, getReviewsTags } from '../api';
import { useDispatch, useSelector } from 'react-redux';
import { searchReview } from '../actions/reviewActions';

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: 'hidden',
  },


  container: {
    justifyContent: 'center',
    marginTop: "5%",
  },

  search: {
    width: "100vw",
    height: "60vh",
    display: "grid",
    backgroundImage: `url(${searchbg})`,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    borderBottom: "solid 10px white",
    marginLeft: 0,
    [theme.breakpoints.down('md')]: {
      height: "40vh",
    },
    [theme.breakpoints.down('sm')]: {
      height: "30vh",
    },
    [theme.breakpoints.down('xs')]: {
      height: "20vh",
    },
  },

  searchContent: {
    alignSelf: "center",
    textAlign: "center",
    color: "currentcolor",
    [theme.breakpoints.down('md')]: {
      fontSize: "0.6em",
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: "0.4em",
    },
  },

  searchText: {
    fontSize: "4em",
    color: "white",
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: {
      fontSize: "3em",
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: "2.5em",
    },
  },

  inputRoot: {
    color: 'white',
    border: '2px solid white',
    borderRadius: "30px",
    [theme.breakpoints.down('xs')]: {
      height: "40px",
    },
    [theme.breakpoints.down('sm')]: {
      height: "35px",
    },
    [theme.breakpoints.down('xs')]: {
      height: "10px",
    },

  },

  inputInput: {
    alignSelf: "center",
    textAlign: "center",
    margin: "0 auto",
    fontSize: "4em",
    fontWeight: "700",
    lineHeight: "1",
    width: "80%",
    [theme.breakpoints.down('md')]: {
      fontSize: "3em",
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: "2em",
      fontWeight: "500",
    },
  },

})


)

export default function Search(props) {

  let history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();

  const {searchLoading, reviews, error } = useSelector((state) => state.searchReview)
  const [tagValue, setTag] = useState("");
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open
  // to add search text box value to the url
  const addToUrl = (searchTyped) => {
    if (searchTyped && searchTyped !== null) history.push(`/search?q=${searchTyped}`);
    else history.push(`/search`);
  }
  // to fetch all the review which have given tag
  const getPostByTag = (tag) => {
    if (tag != null && tag !== "") {
      const search = {
        "tags": tag
      }
      dispatch(searchReview(search));
      history.push(`/search?q=${tag}`);
    }
  }

  useEffect(() => {
    let queryTag = props.location.search
    if (queryTag) {
      queryTag = queryString.parse(queryTag).q;
      setTag(queryTag);
      getPostByTag(queryTag);
    }
    let active = true;
    if (!loading) {
      return undefined;
    }

    // getting all the tag that we already have 
    const search = {
      "tags": ""
    }
    getReviewsTags(search).then(res => {
      setOptions(res.data);
    }).catch((error) => {
      console.log(error)
    })

    return () => {
      active = false;
    };

  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <div className={classes.root}>
      <NavBar />
      <div>
        <Grid container>
          <div className={classes.search}>
            <div className={classes.searchContent}>
              <h1 className={classes.searchText}> Search reviews of destinations </h1>
              <Autocomplete
                freeSolo={true}
                value={tagValue}
                className={classes.inputInput}
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
                  if (e.code === "Enter") {
                    getPostByTag(e.target.value)
                    setOpen(false);
                  }
                }}
                options={options}
                loading={loading}
                renderInput={(params) => (
                  <TextField
                    onChange={(e) => { addToUrl(e.target.value) }}
                    fullWidth
                    {...params}
                    variant="outlined"
                    InputProps={{
                      ...params.InputProps,
                      className: classes.inputRoot,
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

            </div>
          </div>
        </Grid>
        {/* <Modal
          style={{ marginTop: '25%' }}
          open={open}
          onClose={handleCloseLoader}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal> */}
        <div>
          {
            searchLoading?(
              <Loader
              type = "BallTriangle"
              color = "#295ed9"
              className = "searchLoader"
              />
            ):(
              <Grid container spacing={3} className={classes.container}>
            <Grid className={classes.card}>
              <Reviews reviews={reviews} caller={"Search"}/>
            </Grid>
          </Grid>
            )
          }
        </div>
      </div>
    </div>
  );
}