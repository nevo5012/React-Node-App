import axios from "axios";

const getRoutes = async() =>{

  let resp = await axios.get('https://api.optimoroute.com/v1/get_routes?key=7ca7ea5a602a811d222f4f14c06e5a68KzU3ELnQrw&date=2021-8-16')
    return resp.data.routes[0].stops
}

export default {getRoutes}