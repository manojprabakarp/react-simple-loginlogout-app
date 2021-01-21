import React, { useState } from 'react';

import { useHistory, withRouter } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { userActions, getUser } from "../sliceStore/storeAndSlice";

export default function Register() {
    let history = useHistory();
    let [state, setState] = useState({
        fname: null,
        lname: null,
        email: null,
        password: null,
        isLoad: false,
        errorMsg: null
    })

    function submit() {
        let states = state;
        states.isLoad = true;
        if (states.errorMsg) states.errorMsg = null;
        setState({...states});
        console.log(states, 'sasa')
        fetch('/api/registeruser', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(state)
        }).then(async (result) => {
            let data = await result.json();
            console.log(data, ' front end', result);
            let states = state;
            if (result.status === 200) {
                history.push('/home', {
                    sessionToken: data.sessionToken,
                    user: data.user
                });
            } else {
                states.errorMsg = data.message;
            }
            states.isLoad = false;
            setState({...states});
        }).catch(err => {
            let states = state;
            states.isLoad = false;
            states.errorMsg = err;
            setState(states);
            console.log(err);
        });

    }
    function handleInputChange(e) {
        let states = state;
        states[e.target.name] = e.target.value;
        setState(states);
    }

    return (
        <div className="innerContainer">
            <span className="login-form-title">
                Sign Up</span>
            <div className="wrap-input validate-input" data-validate="Enter Fist Name">
                <input className="input" type="text" value={state.fname} name="fname" onChange={handleInputChange} />
                <span className="focus-input" data-placeholder="First Name"></span>
            </div>
            <div className="wrap-input validate-input" data-validate="Enter Last Name">
                <input className="input" type="text" name="lname" value={state.lname} onChange={handleInputChange} />
                <span className="focus-input" data-placeholder="Last Name"></span>
            </div>
            <div className="wrap-input validate-input" data-validate="Enter email address">
                <input className="input" type="text" name="email" value={state.email} onChange={handleInputChange} />
                <span className="focus-input" data-placeholder="Email"></span>
            </div>
            <div className="wrap-input validate-input" data-validate="Enter new password">
                <input className="input" type="password" name="password" value={state.password} onChange={handleInputChange} />
                <span className="focus-input" data-placeholder="New Password"></span>
            </div>
            <span className="termsCondition"> By clicking Sign Up, you agree to our Terms, Data Policy and Cookie Policy.</span>
            <div className="container-login-form-btn">
                <button className="login-form-btn signUpButton" onClick={submit}>Sign Up</button>
            </div>
            <div className="loader">
                {state.isLoad && "Fetching..."}
            </div>
            <div className="errorMsg">
                {state.errorMsg}
            </div>
        </div>)
};