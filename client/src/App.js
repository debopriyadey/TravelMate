import Footer from './components/Footer';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Find from './components/Find';
import Upload from './components/Upload';
import MainBody from './components/MainBody';
import SignUp from './components/SignUpForm';
import Login from './components/loginForm';
import ReviewForm from './components/ReviewForm';

function App() {
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
                </Switch>
            </div>
        </Router>
  );
}


function Home() {
    return (
        <div>
        <MainBody />
        {/* <Footer /> */}
        </div>
        );
}

export default App;
