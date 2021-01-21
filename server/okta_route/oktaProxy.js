"use strict"

const okta = require('@okta/okta-sdk-nodejs');

var OktaAuth = require('@okta/okta-auth-js').OktaAuth;

const client = new okta.Client({
    orgUrl: 'https://dev-4463525.okta.com',
    token: '00aZnzrbVDCymE597HbUrSKbF5ejO6fj7Zvrp8osOy'
});

var configuration = {
    issuer: 'https://dev-4463525.okta.com/oauth2/default',
    tokenManager: {
        storage: 'sessionStorage'
    }
};

const conf = {
    clientId: "0oa36vaw23WgMr8YD5d6",
    issuer: 'https://dev-4463525.okta.com/oauth2/default',
    redirectUri: "/home",
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: false,
    tokenManager: {
        storage: 'sessionStorage'
    }
};

const PATH = {
    BASE: "/api",
    RIGISTER: '/registeruser',
    SIGN_IN: '/signin',
    SIGN_OUT: '/signout',
    GET_USER: '/getuser'
};

const authClient = new OktaAuth(configuration);

const registerUser = (req, res) => {
    const newUser = {
        profile: {
            firstName: req.body.fname,
            lastName: req.body.lname,
            email: req.body.email,
            login: req.body.email
        },
        credentials: {
            password: {
                value: req.body.password
            }
        }
    };
    console.log(req.body, newUser);
    client.createUser(newUser)
        .then(user => {
            signInUser(req, res);
        })
        .catch(err => {
            res.status(400);
            res.send(err);
        });
}

const signInUser = (req, res) => {
    authClient.signIn({
        username: req.body.username || req.body.email,
        password: req.body.password
    })
        .then(result => {
            if (result.data.status === 'SUCCESS') {
                res.status(200);
                res.send(result);
            } else {
                throw 'We cannot handle the ' + result.data.status + ' status';
            }

        })
        .catch(function (err) {
            res.status(400);
            res.send(err);
            console.error(err);
        });
};

const getUserDetails = async (req, res) => {
    console.log('getting user details')
    if (!req.body) return res.sendStatus(400);
    client.getUser(req.body.data.id)
        .then(user => {
            console.log(user);
            res.send(user);
        });
}
const signOutUser = (req, res) => {
    authClient.signOut();
};

exports.init = (app) => {
    app.post(PATH.BASE + PATH.GET_USER, getUserDetails);

    app.post(PATH.BASE + PATH.RIGISTER, (req, res, next) => {
        if (!req.body) return res.sendStatus(400);
        registerUser(req, res);
    });

    app.post(PATH.BASE + PATH.SIGN_IN, (req, res, next) => {
        if (!req.body) return res.sendStatus(400);
        signInUser(req, res);
    });

    app.post(PATH.BASE + PATH.SIGN_OUT, (req, res, next) => {
        signOutUser(req, res);
    });
}