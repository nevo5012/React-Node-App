import user from './userModel.js'

export function getUser(email , password)
{
     return user.find({email : email , password : password})
}

export function findEmail(email)
{
     return user.find({email: email});    
}

export function addUser(email, password) {
    let toAdd = new user({
        email: email,
        password: password
    })
    return toAdd.save();
}