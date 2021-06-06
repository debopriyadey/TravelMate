import React, {useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
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
import UpdateReview from './components/UpdateReview.js';
import { ProtectedRoute } from './components/ProtectedRoutes';
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

    return (
        <Router history={history}>
            <div className="App">
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={SignUp} />
                    <Route path="/find" component={Find} />
                    <Route path="/search" component={Search} />
                    <ProtectedRoute path="/createreview" component={ReviewForm} />
                    <ProtectedRoute path="/myreviews" component={MyReviews} />
                    <Route path="/currentreview" component={CurrentReview} />
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
