import axios from 'axios'


export async function addNewOrder(order)
{
    return axios.post("http://localhost:8000/api/orders", order)
      
}
const getOrder =(id) =>
{
    return axios.get("http://localhost:8000/api/orders"+id)
}

export default {addNewOrder,getOrder};