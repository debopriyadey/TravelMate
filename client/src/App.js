import React, {useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import MainBody from './components/MainBody';
import SignUp from './components/SignUpForm';
import Login from './components/LoginForm';
import ReviewForm from './components/ReviewForm';
import MyReviews from './components/MyReviews';
import CurrentReview from './components/CurrentReview'
import history from './history'
import {getReviews} from './actions/reviewActions'
import { loggedInUserInfo } from './actions/userActions';
import Search from './components/Search.js'
import UpdateReview from './components/UpdateReview.js';
import { ProtectedRoute } from './components/ProtectedRoutes';
import Discover from './components/Discover';

import './app.css';

function App() {

    const dispatch=useDispatch();
    useEffect(() => {
        dispatch(loggedInUserInfo());
         dispatch(getReviews())
    }
    , [dispatch])

    return (
        <Router history={history}>
            <div className="App">
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/signup" component={SignUp} />
                     <Route path="/login" component={Login} />
                    <Route path="/search" component={Search} />
                    <Route path="/currentreview" component={CurrentReview} />
                    <Route path="/discover" component={Discover} />
                    <Route path="/createreview" component={ReviewForm} />
                    <ProtectedRoute path="/myreviews" component={MyReviews} />
                    <ProtectedRoute path="/update" component={UpdateReview} />
                    
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
