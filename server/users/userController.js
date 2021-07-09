
// import express for rounting functionality
import { Router } from 'express';


import { addUser } from './userUtils.js';
// link to Router function
const appRoute = Router();

appRoute.route('/authenticate').post(function (req, resp) {

})

appRoute.route('/register').post(function (req, resp) {
    let email = req.headers['email'];
    let password = req.headers['password'];
    addUser(email, password).
        then((res, err) => {
            if (err) {
                console.log('Could not crate new user');
                return {};
            }
            return res;
        })
    }
)

export default appRoute;