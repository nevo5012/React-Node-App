import { Table } from 'react-bootstrap/'


function OrderComp(props) {

  


    return (
        <div style={{ width: '40rem', margin: 'auto' }}>
            {/* <Card  >
                <Card.Header>
                    <Card.Title>תאריך הזמנה {props.order.date}   </Card.Title>
                  - פרטי הזמנה
                </Card.Header>

                <ListGroup variant="flush">

                    {props.order.order_data.map((item, index) => {
                        return <ListGroup.Item action variant="light" key={index}>
                            {item.shelf_number + " + " + item.tracking_number}
                        </ListGroup.Item>
                    })}
                      <ListGroup.Item style={{ display: props.mailbox ? 'none' : 'block' }} action variant="light"> {props.order.mailbox} - תא דואר  </ListGroup.Item>  
                </ListGroup>
            </Card> */}

            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>{props.order.date}</th>
                        <th>מספר מדף</th>
                        <th>מספר מעקב</th>
                    </tr>
                </thead>
                <tbody>


                    {props.order.order_data.map((item, index) => {
                        return <tr key={index} >
                            <td> </td>

                            <td> {item.shelf_number}</td>
                            <td> {item.tracking_number}</td>


                        </tr>
                    })}


                </tbody>
            </Table>
        </div>
     )
    }
 
export default OrderComp