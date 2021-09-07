import React, { useEffect, useState } from "react";
import ordersUtils from './ordersUtils'
import { Card } from "react-bootstrap";
import OrderComp from "./order";
import { Auth } from 'aws-amplify';

function MyOrdersComp(props) {
  const [orders, setOrders] = useState();

  useEffect(() => {
    getMemberOrders().then(resp => {
      let orders = resp.data.orderResult;
      if (orders) {
        setOrders(orders.reverse());
      }
    });
  },[])
  
  const getMemberOrders = async () => {
    let user = await Auth.currentAuthenticatedUser();
    const { attributes } = user;
    return ordersUtils.getByMemberId(attributes.email);
  }

  const App = () => <List list={orders} />;
  const List = ({ list }) => (
    list.map(item => (
      <OrderComp key={item._id} order={item} />
    ))
  );


  if (orders) {
    return (
      <div>
        <Card border="dark" className="text-center">
          <Card.Header>
            <Card.Title sticky="top">הזמנות האחרונות</Card.Title>
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

  if (!orders) {
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