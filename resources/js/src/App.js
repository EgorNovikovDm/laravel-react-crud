import React from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch,} from 'react-router-dom';
import Home from './components/Home';
import Add from './components/Add';
import Edit from './components/Edit';
const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/"  exact >
                    <Home />
                </Route>
                <Route path="/add"  exact >
                    <Add />
                </Route>
                <Route path="/edit/:id"  exact >
                    <Edit />
                </Route>
            </Switch>
        </Router>
    )
}
ReactDOM.render(<App/>, document.getElementById('app'))
