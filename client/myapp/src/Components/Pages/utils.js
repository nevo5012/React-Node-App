import axios from 'axios'


const getMember = (id)=>
{
    return axios.get("http://localhost:8000/api/members/"+id)
}

const updateMember = (obj,id)=>
{
    axios.put("http://localhost:8000/api/members/"+id,obj)
}




export default {getMember,updateMember}