 import React, { useEffect, useState } from "react";
import ordersUtils from './ordersUtils'
import { Card } from "react-bootstrap";
import OrderComp from "./order";





function getSessionStorageOrDefault(key, defaultValue) {
    const stored = sessionStorage.getItem(key);
    if (!stored) {
        return defaultValue;
    }
    return JSON.parse(stored);
}





function MyOrdersComp(props) {
   const [orders] = useState([])
    
    const [member ] = useState( 
        getSessionStorageOrDefault('member',false)
        
    )
  useEffect( () => {
          
        getMemberOrders()

    }, )
    
     

    const getMemberOrders=()=> 
    {
        let ordersId = member.orders
       
        ordersId.forEach(element => {
            getAllOrders(element)
        });
    }
    
    const getAllOrders = async (id) =>
    {
        let resp = await ordersUtils.getOrder(id)
          orders.push(resp.data)
    }
   
    // let ordersList = orders.map(o => {
    //     return(
    //         <OrderComp key={o._id} order={o}/>
    //     )
    // })
    const list =  orders
       
      const App = () => <List list={list} />;
       
      const List = ({ list }) => (
        <ul>
          {list.map(item => (
            <OrderComp key={item._id} order={item} />
          ))}
        </ul>
      );
       
     
      
      
        return (
             <div>
               
               <Card className="text-center">
               <Card.Header>
               <Card.Title>הזמנות האחרונות</Card.Title>
                  </Card.Header>
              <Card.Body>

             
                 <React.Fragment>
                  
                 {App()} 
             
                </React.Fragment>
                </Card.Body>
                </Card>  
            </div>
        )
    }
 
 
export default MyOrdersComp;