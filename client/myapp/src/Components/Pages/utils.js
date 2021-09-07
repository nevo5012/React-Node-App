import axios from 'axios'
import config from '../../_services/config'

var instance = axios.create({
    baseURL: config.apiUrl
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