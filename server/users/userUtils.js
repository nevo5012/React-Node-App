import user from './userModel.js'

export function addUser(email, password) {
    let toAdd = new user({
        email: email,
        password: password
    })
    return toAdd.save();
}