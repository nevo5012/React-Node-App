import { Router } from 'express'
import { getAllOrders, addOrder,getOrdersByMember } from './ordersUtils.js'


const appRoute = Router()


appRoute.route('/').get(async function(req,resp)
{
    let orders = await getAllOrders()
    return resp.json(orders)
})


appRoute.route('/').post(async function(req,resp)
{
    let newOrder = req.body;
    console.log(`${JSON.stringify(newOrder)}`);
    let result = await addOrder(newOrder)
    return resp.json(result)
})

appRoute.route('/member/:id').get(async function(req,resp)
{
    if(!req.params.id.includes('undefined'))
    {
        let orders = await getOrdersByMember(req.params.id)
        return resp.json(orders)
    }
    console.log('failed to get orders by member id');
})

export default appRoute;