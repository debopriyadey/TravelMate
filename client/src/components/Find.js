import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, Grid, InputAdornment, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search'

//import Navbar from './Navbar';
//import MovieCard from './MovieCard';
import searchbg from '../img/searchimg.jpg'

const useStyles = makeStyles((theme) => ({
    root: {
        overflow: 'hidden',
        color: "white",
    },

    container: {
        justifyContent: "center",
        marginTop: "5%"
    },

    card: {
        margin: '2%',
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


    margin: {
        margin: theme.spacing(1),
    },

}));

export default function Main() {
    const classes = useStyles();

    const [query, setQuery] = useState({
        movie: ""
    });

   const [results, setResults] = useState([]);

    const onChange = (e) => {
        e.preventDefault();
        setQuery(e.target.value);

        fetch(`https://api.themoviedb.org/3/search/movie?api_key=620bcff5c65556bbc5abc99f82b7164a&language=en-US&page=1&include_adult=false&query=${e.target.value}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (!data.errors) {
                    setResults(data.results);
                } else {
                    setResults([]);
                }
            });
    };

    return (
        <div className={classes.root}>
            <div>
                <Grid container>
                    <div className={classes.search}>
                        <div className={classes.searchContent}>
                            <h1 className={classes.searchText}> Search a review of your destination </h1>
                            <FormControl className={classes.inputInput}>
                                <TextField
                                    name="query"
                                    variant="outlined"
                                    autoComplete="query"
                                    id="query"
                                    value={query.movie}
                                    onChange={onChange}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end"> <h1 style={{color: "white"}}><SearchIcon /> </h1></InputAdornment>,
                                        className: classes.inputRoot
                                    }}
                                    color="secondary"
                                    //size="small"
                                />
                            </FormControl>
                        </div>

                    </div>
                </Grid>
            </div>
            <div>
                <Grid container spacing={3} className={classes.container}>
                    {results.length > 0 && (results.map((movie) => (
                        <Grid className={classes.card} key={movie.id}>
                            {/* <MovieCard movie={movie} /> */}
                        </Grid>
                    ))
                    )}
                </Grid>
            </div>
        </div>
    )
}
