import order from './ordersModel.js'

export function getAllOrders()
    {
        return new Promise((resolve, reject) =>
        {
            order.find({}, function(err, data)
            {
                if(err)
                {
                    reject(err)
                }
                else
                {
                    resolve(data)
                }
            })
        })
    }

export function addOrder(data)
    {
        console.log(data);
        return new Promise((resolve, reject) =>
        {
            let toAdd = new order({
                date : data.date,
                order_data : data.order_data,
                mailbox : data.mailbox,
                member_id : data.member_id,
                pack_counter : data.pack_counter
                 
            })
            toAdd.save(function(err,data)
            {
                if(err)
                {
                    reject(err)
                }
                else
                {
                    resolve(data)
                }
            })
        })

    }

    export function getByMemberId(id)
    {
        return order.find({member_id : id});
    }

    export function getAOrder(id)
    {
        return new Promise((resolve, reject) =>
        {
            order.findById(id, function(err,data)
            {
                if(err)
                {
                    reject(err)
                }
                else
                {
                    resolve(data)
                }
            })
        })
    }