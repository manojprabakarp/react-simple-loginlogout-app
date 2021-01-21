import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory, Redirect, useLocation, Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { cartActions, getUser } from "../sliceStore/storeAndSlice";

import Signin from '../components/signin_component';
import Register from '../components/registration_component';
import Profile from '../components/profile_component';

function MainComponent(props) {
  let state = useSelector(getUser);
  function logOut(){
    console.log('logout')
  }
  
  return (
    <div>
      <h3>Simple User Authentication App!</h3>
      <Router>
        <div className="buttonCont">
          {!state["user"] && window.location.pathname === "/home" &&
            <span>
              <Link to="/login" className="loginBtn">Sign in</Link>
              <Link to="/register">Sign up</Link>
            </span>
          }
          {state["user"] &&
            <span>
              <Link to="/logout" className="logoutBtn">Sign out</Link>
              <Link to="/profile">Profile</Link>
            </span>
          }
          {state['user'] && window.location.pathname === "/profile" &&
            <span>
              <Link onClick={logOut} className="logoutBtn">Sign out</Link>
              <Link to="/home">Home</Link>
            </span>
          }
          {!state['user'] && window.location.pathname === "/profile" &&
            <span>
              <Link to="/login" className="loginBtn">Sign in</Link>
              <Link to="/home">Home</Link>
            </span>
          }
        </div>
        <div>
          <Switch>
            <Route path="/login">
              <Signin />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/">
              <Redirect to="/home" />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

function Home(props) {
  let state = useSelector(getUser);
  return (
    <div>
      {!state['user'] &&
        <span>
          Please Sign In!
          </span>
      }
      {state && state["user"] && "Home"}
    </div>
  );
}

export default MainComponent;