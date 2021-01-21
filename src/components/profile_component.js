import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { cartActions, getUser } from "../sliceStore/storeAndSlice";

export default function Profile() {

    let [state, setState] = useState(useSelector(getUser));
    console.log(state,'state profile')
    if (!state.user) {
        return "Please login";
    }
    return (
        <div>
            <h6>User Profile</h6>
            <table>
                <thead></thead>
                <tbody>
                    <tr>
                        <td> First Name:
                        </td>
                        <td>
                            {state.user.profile.firstName}
                        </td>
                    </tr>
                    <tr>
                        <td> Last Name:
                        </td>
                        <td>
                            {state.user.profile.lastName}
                        </td>
                    </tr>
                    <tr>
                        <td> Email:
                        </td>
                        <td>
                            {state.user.profile.login}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
};