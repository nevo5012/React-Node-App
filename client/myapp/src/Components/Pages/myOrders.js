import React, { useEffect, useState } from "react";
import ordersUtils from './ordersUtils'
import { Card } from "react-bootstrap";
import OrderComp from "./order";
import utils from "./utils";

function getSessionStorageOrDefault(key, defaultValue) {
  const stored = sessionStorage.getItem(key);
  if (!stored) {
    return defaultValue;
  }
  return JSON.parse(stored);
}

function MyOrdersComp(props) {
  const [orders , setOrders] = useState([])
  const [member] = useState(
    getSessionStorageOrDefault('member', false)
  )

  useEffect(() => {
    if(!sessionStorage.member)
        {
            alert("על מנת להמשיך עליך להתחבר למערכת");
            window.location.assign('/login');   
        }
    if (member) {
      getMemberOrders();
    }
  },[])


  const getMemberOrders = async() =>{
    let resp1 = await utils.getMember(member._id)
    console.log("member :"+ resp1.data)
    let memberId = member._id
    let resp = await ordersUtils.getByMemberId({memberId});

    console.log( "result : "+ resp.data.orderResult)
    setOrders(resp.data.orderResult)
  }

  // const getMemberOrders = () => {
  //   let ordersId = member.orders;

  //   ordersId.forEach(element => {
  //     getAllOrders(element);
  //   });
  // }

  // const getAllOrders = async (id) => {
  //   let resp = await ordersUtils.getOrder(id);
  //   setOrders(resp.data.order_data);
  // }

  // let ordersList = orders.map(o => {
  //     return(
  //         <OrderComp key={o._id} order={o}/>
  //     )
  // })
 
  const App = () => <List list={orders} />;

  const List = ({ list }) => (
    <ul>
      {orders.map(item => (
        <OrderComp key={item._id} order={item} />
      ))}
    </ul>
  );



    if(orders)
    {
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
  if(!orders) {
    return (
      <div>
        <Card className="text-center">
          <Card.Header>
            <Card.Title>הזמנות האחרונות</Card.Title>
          </Card.Header>
          <Card.Body>

            פה יופיעו ההזמנות האחרונות שלך, לאחר שתזמין בפעם הראשונה.
          </Card.Body>
        </Card>
      </div>
    )
  }


}


export default MyOrdersComp;