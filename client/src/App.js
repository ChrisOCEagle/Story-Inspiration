import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import IndexPage from './pages/Index';
import Members from './pages/Members';
import './style.css';

function App() {
    return(
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path='/' component={IndexPage}/>
                    <Route exact path='/prompts' component={Members}/>
                    <Route exact path='/prompt/:id' component={Members}/>
                    <Route exact path='/story/:id' component={Members}/>
                </Switch>
            </Router>
        </div>
    );
};

export default App;