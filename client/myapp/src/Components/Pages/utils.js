import axios from 'axios'

const apiURL = process.env.REACT_APP_NODEJS_SERVER_URL || 'http://localhost:8000';
var instance = axios.create({
    baseURL: apiURL
});

const getMember = (id)=>
{
    return instance.get("/api/members/"+id)
}

const updateMember = (obj,id)=>
{
    instance.put("/api/members/"+id,obj)
}


export default {getMember,updateMember}