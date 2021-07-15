import axios from "axios";


export async function addNewMember(member)
{
    return axios.post("http://localhost:8000/api/members", member)
      
}

const getMemberByEmail =(email) =>
{
    return axios.get("http://localhost:8000/api/members/"+email)
}

export default {addNewMember}