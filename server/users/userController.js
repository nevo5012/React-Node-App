
import e, { Router } from 'express';
import { getMemberByEmail } from '../members/membersUtils.js';
import { addUser, getUser, findEmail } from './userUtils.js';

// link to Router function
const appRoute = Router();

appRoute.route('/authenticate')
    .post(async function (req, resp) {
        console.log(req.body)
        let email = req.body.email;
        let password = req.body.password;
        let userResult = await getUser(email, password);


        if (userResult.length) {
            console.log("user : " + userResult);
             getMemberByEmail(email)
                .then(member => {
                    console.log("member : "+ member)
                    return resp.send({
                        'email': member[0].email,
                        'member': member[0]
                    });
                })
        }
        else {
            return resp.send({ 'data': 'username or password are not valid' });
        }

    })

appRoute.route('/register').post(async function (req, resp) {
    let email = req.body.email;
    let password = req.body.password;
    let emailResult = await findEmail(email);
    if (emailResult.length) {
        return resp.send({ 'data': 'email already in use' });
    }
    else {
        addUser(email, password).
            then((res, err) => {
                if (err) {
                    console.log('Could not crate new user');
                    return resp.send({});
                }
                return resp.json(res);
            })
    }
})

export default appRoute;