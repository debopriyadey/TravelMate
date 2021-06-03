import React, {useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {useSelector, useDispatch } from 'react-redux';
import { getReviews } from './actions/actions'
import Find from './components/Find';
import MainBody from './components/MainBody';
import SignUp from './components/SignUpForm';
import Login from './components/LoginForm';
import ReviewForm from './components/ReviewForm';
import MyReviews from './components/MyReviews';
import CurrentReview from './components/CurrentReview'
import setAuthenticationToken from './actions/setAuthenticationToken';
//import { useSelector } from 'react-redux';
import history from './history'
import {setCurrentUser} from './actions/actions'
import Search from './components/Search.js'
function App() {
    const dispatch=useDispatch();
    if(localStorage.jwt){
        setAuthenticationToken(localStorage.jwt)
        dispatch(setCurrentUser(localStorage.users))
    }
    useEffect(() => {
         dispatch(getReviews())
    }
    , [dispatch])

    // const renderRoutes = () => {
    //     if (localStorage.getItem("jwt") === null) {
    //         return [
    //             <Route path="/" exact component={Home} />,
    //             <Route path="/login" component={Login} />,
    //             <Route path="/signup" component={SignUp} />,
    //             <Route path="/find" component={Find} />
    //         ]
    //     }
    //     else {
    //         return [
    //             <Route path="/" exact component={Home} />,
    //             <Route path="/createreview" component={ReviewForm} />,
    //             <Route path="/myreviews" component={MyReviews} />,
    //             <Route path="/find" component={Find} />
    //         ]
    //     }
    // }

    return (
        
        <Router history={history}>
            <div className="App">
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={SignUp} />
                    <Route path="/find" component={Find} />
                    <Route path="/search" component={Search} />
                    <Route path="/createreview" component={ReviewForm} />
                    <Route path="/myreviews" component={MyReviews} />
                    <Route path="/review" component={CurrentReview} />

                </Switch>
            </div>
        </Router>
    );
}

function Home() {
    return (
        <div>
            <MainBody />
        </div>
    );
}

export default App;
