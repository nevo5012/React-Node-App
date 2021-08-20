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

export async function getALL()
{
    let resp = await axios.get("http://localhost:8000/api/orders")
    return resp.data
}

 export function getDate() {
    let currentDate = new Date();
    
    var dd = String(currentDate.getDate()).padStart(2, '0');
    var mm = String(currentDate.getMonth() + 1).padStart(2, '0');
    var yyyy = currentDate.getFullYear();
    var hh = currentDate.getHours();
    var min = currentDate.getMinutes();
    currentDate = hh + ":" + min + " " + dd + '/' + mm + '/' + yyyy;
    return currentDate;
}
export default {getDate,addNewOrder,getOrder,getByMemberId,getALL };