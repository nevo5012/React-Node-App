import axios from 'axios'


export function addNewOrder(order)
{

    return axios.post("http://localhost:8000/api/orders", order)
      
}
const getOrder =(id) =>
{
    return axios.get("http://localhost:8000/api/orders/"+id)
}

export function getByMemberId(memberId)
{
     return axios.post("http://localhost:8000/api/orders/memberid",memberId)
}

export default {addNewOrder,getOrder,getByMemberId};