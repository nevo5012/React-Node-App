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
  const [orders , setOrders] = useState()
  const [member] = useState(
    getSessionStorageOrDefault('member', false)
  )

  useEffect(() => {
    if(!sessionStorage.member)
        {
            alert("על מנת להמשיך עליך להתחבר למערכת");
             props.history.push("/login")
        }
    if (member) {
      getMemberOrders();
    }
  },[])


  const getMemberOrders = () =>{

    let memberId = member._id;
     ordersUtils.getByMemberId({memberId}).then(resp=> {
       let orders = resp.data.orderResult;
       if(orders)
       {
         setOrders(orders.reverse());
       }
      });

    // let orders = resp.data.orderResult;
   
  }
 
  const App = () => <List list={orders} />;
  const List = ({ list }) => (
    <ul>
      {list.map(item => (
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