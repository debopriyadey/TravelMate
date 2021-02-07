import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Find from './components/Find';
import Upload from './components/Upload';
import MainBody from './components/MainBody';

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/find" component={Find} />
                    <Route path="/upload" component={Upload} />
                </Switch>
            </div>
        </Router>
  );
}


function Home() {
    return (
        <div>
        <Header />
        <MainBody />
        </div>
        );
}

export default App;
