import axios from 'axios'

const apiURL = process.env.NODEJS_SERVER_URL || 'http://localhost:8000';
var instance = axios.create({
    baseURL: apiURL
});

export function addNewOrder(order) {
    return instance.post("/api/orders", order)
}

const getOrder = (id) => {
    return instance.get("/api/orders/" + id)
}

export function getByMemberId(memberId) {
    return instance.post("/api/orders/memberid", { memberId: memberId })
}

export async function getALL() {
    let resp = await instance.get("/api/orders")
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

export default { getDate, addNewOrder, getByMemberId, getALL };