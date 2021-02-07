import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Find from './components/Find';
import Upload from './components/Upload';
import SuccessStories from './components/SuccessStories';

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/find" component={Find} />
                    <Route path="/upload" component={Upload} />
                    <Route path="/successstories" component={SuccessStories} />
                </Switch>
            </div>
        </Router>
  );
}


function Home() {
    return (
        <div>
        <Header />
        <Footer />
        </div>
        );
}

export default App;
