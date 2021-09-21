import {instance} from '../../_services/auth.service'

const getMember = (id)=>
{
    return instance.get("/api/members/"+id)
}

const updateMember = (obj,id)=>
{
    instance.put("/api/members/"+id,obj)
}


export default {getMember,updateMember}