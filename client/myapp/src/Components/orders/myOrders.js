import { Button, Card, ListGroup,  } from 'react-bootstrap/'
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import CheckOutComp from './checkOut'
import ordersUtils from './ordersUtils'
import OrderConfimComp from './order';

function getSessionStorageOrDefault(key, defaultValue) {
    const stored = sessionStorage.getItem(key);
    if (!stored) {
        return defaultValue;
    }
    return JSON.parse(stored);
}


function MyOrdersComp(props) {
   const [orders, setOrders] = useState([])
    const [member ] = useState( 
        getSessionStorageOrDefault('member',false)
    )
 
    useEffect(() => {
        getMemberOrders()
    }, [orders])
     
    const getMemberOrders = () => 
    {
        let ordersId = member.orders
        console.log(ordersId)
      

        ordersId.forEach(element => {
            getAllOrders(element)
        });
    }
    
    const getAllOrders = async (id) =>
    {
        let resp = await ordersUtils.getOrder(id)
        console.log(resp.data)
        orders.push(resp.data)
    }
 
        return (
            <div>
                <div className="d-flex justify-content-end">
                        <Card.Header  > </Card.Header>
                            {orders.map((item) => {
                                return    <OrderConfimComp order={item}/>
                            })}
                </div>

            </div>
        )
    }
 

export default MyOrdersComp;