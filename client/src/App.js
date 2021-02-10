import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import getReviews from './actions/reviews'
import Find from './components/Find';
import Upload from './components/Upload';
import MainBody from './components/MainBody';
import SignUp from './components/SignUpForm';
import Login from './components/LoginForm';
import ReviewForm from './components/ReviewForm';
import MyReviews from './components/MyReviews';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getReviews());
    }, [dispatch]);

    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/find" component={Find} />
                    <Route path="/upload" component={Upload} />
                    <Route path="/login" component={Login} />
                    <Route path="/SignUp" component={SignUp} />
                    <Route path="/ReviewForm" component={ReviewForm} />
                    <Route path="/MyReviews" component={MyReviews} />
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
