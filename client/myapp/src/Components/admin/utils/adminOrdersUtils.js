import axios from "axios";

 const updateOrder = async(id,obj) =>
{
    let resp = await axios.put("http://localhost:8000/api/orders/"+id,obj);
    return resp.data;
}

export default {updateOrder}