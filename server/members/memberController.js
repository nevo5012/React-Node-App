
// import express for rounting functionality
import {Router} from 'express';


import {deleteMember, getAllMembers, getAMember , addMember, updateMember} from './membersUtils.js'
// link to Router function
const appRoute = Router();

//Get all
appRoute.route('/').get(async function(req,resp)
{
    let members = await getAllMembers()
    return resp.json(members)
})
// GET a member
appRoute.route('/:id').get(async function(req, resp)
{
    let id = req.params.id;
    let member = await getAMember(id);
    return resp.json(member)
})


// POST (add a member)
appRoute.route('/').post(async function(req,resp)
{
    let newmember = req.body;
    let result = await addMember(newmember)
    return resp.json(result)
})

// PUT (update a member)
appRoute.route('/:id').put(async function(req,resp)
{
    let id = req.params.id
    let newmember = req.body
    let result = await updateMember(id,newmember)
    return resp.json(result)
})

// Delete a member
appRoute.route('/:id').delete(async function(req,resp)
{
    let id = req.params.id
    let result = await deleteMember(id)
    return resp.json(result)
})


export default appRoute;