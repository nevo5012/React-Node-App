import { Router } from 'express'
import { getAllOrders, addOrder, getAOrder, getByMemberId, updateOrder } from './ordersUtils.js'
 
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
});

appRoute.route('/memberid')
    .post(async function(req,resp)
    {
        let id = req.body.memberId
        console.log(id)
       let orderResult = await getByMemberId(id);
        if(orderResult.length)
       {
               return resp.send({
                   orderResult
           })
       }
       else{
           return resp.send({});
       }
    })


appRoute.route('/orders/:id').get(async function(req,resp)
{
    if(!req.params.id.includes('undefined'))
    {
        let orders = await getOrdersByMember(req.params.id)
        return resp.json(orders)
    }
    console.log('failed to get orders by member id');
})

appRoute.route('/:id').get(async function(req, resp)
{
    let id = req.params.id;
    let order = await getAOrder(id);
    return resp.json(order)
})

appRoute.route('/:id').put(async function(req,resp)
{
    let id = req.params.id
    let order = req.body
    let result = await updateOrder(id,order)
    return resp.json(result)
})

appRoute.route('/getall').get(async function(req,resp)
{

})
export default appRoute;


// /orders - get all
// /orders/id - get one be it
// /order - create (POST)
// /order - update (PUT) 