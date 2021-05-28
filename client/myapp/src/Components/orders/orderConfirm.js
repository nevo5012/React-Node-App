import {  Card, ListGroup } from 'react-bootstrap/'
 

function OrderConfimComp(props) {
 


 

 
    return (
        <div style={{ width: '40rem', margin: 'auto' }}>
            <Card border="success">
                <Card.Header>
                   <Card.Title> הזמנתך הושלמה </Card.Title>
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
            </Card>
        </div>
    )
}
 
export default OrderConfimComp