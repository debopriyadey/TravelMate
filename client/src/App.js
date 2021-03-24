import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getReviews } from './actions/actions'
import Find from './components/Find';
import Upload from './components/Upload';
import MainBody from './components/MainBody';
import SignUp from './components/SignUpForm';
import Login from './components/LoginForm';
import ReviewForm from './components/ReviewForm';
import MyReviews from './components/MyReviews';
import setAuthenticationToken from './actions/setAuthenticationToken';
import { useSelector } from 'react-redux';
import history from './history'
import {setCurrentUser,signin} from './actions/actions'
function App() {
    const dispatch=useDispatch();
    if(localStorage.jwt){
        setAuthenticationToken(localStorage.jwt)
        dispatch(setCurrentUser(localStorage.users))
    }
    // useEffect(() => {
    //     const user = JSON.parse(localStorage.getItem("users"))
    //     if(user) {
    //         history.push('/')
    //     }
    //     else {
    //         history.push('/signup')
    //     }
    // }, [])


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
                    <Route path="/createreview" component={ReviewForm} />
                    <Route path="/myreviews" component={MyReviews} />
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
