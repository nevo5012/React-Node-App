import axios from "axios";

const getAll = async() =>
{
   let resp = await axios.get("http://localhost:8000/api/members")
    return resp.data
}

const updateMember = (obj,id)=>
{
    axios.put("http://localhost:8000/api/members/"+id,obj)
}


export default {getAll,updateMember}