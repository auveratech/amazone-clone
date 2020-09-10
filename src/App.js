import React, { useEffect } from 'react';
import Header from './Header';
import Home from './Home';
import Login from './Login';
import Orders from './Orders';
import Prime from './Prime';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Checkout from "./Checkout";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";

function App() {

    const [{}, dispatch] = useStateValue();

    useEffect(() => {
        // Only run once when the app component loads

        auth.onAuthStateChanged(authUser => {
            console.log('THE USER IS >>>', authUser);
            if (authUser) {
                // the user just logged in / the user was logged in
                
                dispatch({
                    type: 'SET_USER',
                    user: authUser
                })

            } else {
                // the user is logged out

                dispatch({
                    type: 'SET_USER',
                    user: null
                })
            }
        })
    }, [])

    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/prime">
                        <Header />
                        <Prime />
                    </Route>
                    <Route path="/orders">
                        <Header />
                        <Orders />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/checkout">
                        <Header />
                        <Checkout />
                    </Route>
                    <Route path="/">
                        <Header />
                        <Home />
                    </Route>
                </Switch>
                
            </div>
        </Router>
  );
}

export default App;