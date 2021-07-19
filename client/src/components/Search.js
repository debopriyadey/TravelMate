// *https://www.registers.service.gov.uk/registers/country/use-the-api*
// import fetch from 'cross-fetch';
import axios from 'axios'
import React from 'react';
import { Grid, TextField, Modal, makeStyles } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import Loader from "react-loader-spinner";
import Reviews from './Reviews';
import { useHistory } from 'react-router-dom';

import searchbg from '../img/searchimg.jpg'
import NavBar from './NavBar';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#CDD8FF',
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

  const [tagValue, setTag] = React.useState("");
  const [open, setOpen] = React.useState(false);

  // const [openLoader, setOpenLoader] = React.useState(false);

  const [options, setOptions] = React.useState([]);
  const [post, setPost] = React.useState([]);
  const loading = open && options.length === 0;

  // const handleOpenLoader = () => {
  //   setOpenLoader(true);
  // };

  // const handleCloseLoader = () => {
  //   setOpenLoader(false);
  // };

  const getPostByTag = (tag) => {
    const search = {
      "tags": tag
    }
    axios.post('https://projecthack20travelmate.herokuapp.com/getpostbytag', search).then(res => {
      const data = res.data.Reviews;
      setPost(data);
      if (tag != null && tag !== "") {
        history.push(`/search?q=${tag}`);
      }
    }).catch((error) => {
      console.log(error)
    })
  }
  
  React.useEffect(() => {
    let queryTag = props.location.search.split("=")[1]
    if (queryTag) {
      queryTag = props.location.search.split("=")[1].replace("%20", " ");
      setTag(queryTag);
    }
    
    getPostByTag(queryTag);
    let active = true;
    if (!loading) {
      return undefined;
    }

    const search = {
      "tags": ""
    }
    axios.post('https://projecthack20travelmate.herokuapp.com/searchreview', search).then(res => {
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

  const body = (
    <Loader
      className="text-center"
      type="Puff"
      color="#00BFFF"
      height={50}
      width={50}
      timeout={60000} //10 secs
    />
  )

  return (
    <div className={classes.root}>
      <NavBar />
      <div>
        <Grid container>
          <div className={classes.search}>
            <div className={classes.searchContent}>
              <h1 className={classes.searchText}> Search a review of your destination </h1>
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
                  console.log(e)
                  if (e.code === "Enter")
                    getPostByTag(e.target.value)
                }}
                options={options}
                loading={loading}
                renderInput={(params) => (
                  <TextField
                    fullWidth
                    {...params}
                    variant="outlined"
                    InputProps={{
                      ...params.InputProps,
                      className: classes.inputRoot,
                      endAdornment: (
                        <React.Fragment>
                          {loading ? <CircularProgress color="white" size={20} /> : null}
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
          <Grid container spacing={3} className={classes.container}>
            <Grid className={classes.card}>
              <Reviews reviews={post} />
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}