import React, { useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { userActions, getUser } from "../sliceStore/storeAndSlice";


export default function Signin() {
        let dispatch = useDispatch();
        let history = useHistory();
        let [state, setState] = useState({
            session: {token: null, id: null},
            errorMsg: 'Incorrect User Name or Password',
            is400: false,
            isLoad: false,
            username: '',
            password: ''
        });

    
    function signUp(){
        history.push('/register');
    }

    function handleSubmit(e) {
        e.preventDefault();
        let states = state;
        states.isLoad = true;
        states.is400 = false;
        setState(states);

        fetch('/api/signin', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(state)
        }).then(async (result) => {
            let data = await result.json();
            let states = state;
            states.isLoad = false;
            if (result.status === 400) {
                states.is400 = true;
            } else {
                states.is400 = false;
                states.session = {token: data.sessionToken, user: data.user};
                dispatch(userActions.setUser(data.user));
                history.push('/home');
            }
            console.log(states);
            setState(states);
            console.log(states, 'login-----------------------------------------------------------token')
        }).catch(err => console.log);
    }

    function handleChange(e) {
        let states = state;
        states[e.target.name] = e.target.value;
        setState(states);
    }
    
       // console.log(this.state, 'this.state');
        // if (this.state.session['token']) {
        //     this.props.history.push('/home', this.state.session);
        //     return null;
        // }

        return (
            <div className="loginForm">
                <div className="innerContainer">
                    <form className="validate-form">
                        <span className="login-form-title">
                            Welcome</span>
                        <div className="wrap-input validate-input" data-validate="Enter username">
                            <input className="input" type="text" name="username" onChange={handleChange} />
                            <span className="focus-input" data-placeholder="Username"></span>
                        </div>
                        <div className="wrap-input validate-input" data-validate="Enter password">
                            <input className="input" type="password" name="password" onChange={handleChange} />
                            <span className="focus-input" data-placeholder="Password"></span>
                        </div>
                        <div className="container-login-form-btn">
                            <button className="login-form-btn" onClick={handleSubmit}>Login</button>
                        </div>
                        <div className="loader">
                            {state.isLoad && "Loding..."}
                        </div>
                        <div className="errorMsg">
                            {state.is400 && state.errorMsg}
                        </div>
                        <ul className="login-more">
                            <li>
                                <span className="txt1">Don’t have an account? </span>
                                <a onClick={signUp} className="txt2">Sign up</a>
                            </li>
                        </ul>
                    </form>
                </div>
            </div>
        );
};
