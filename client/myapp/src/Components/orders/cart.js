import { Button, Card, ListGroup,  } from 'react-bootstrap/'
import { Link } from "react-router-dom";
import React, {  useState } from "react";
import CheckOutComp from './checkOut'





function CartComp(props) {
    // const [mailbox, setMailbox] = useState(false)
    // const [packCounter, setCounter] = useState(props.packCont)
       const [checkOut, setCheckOut] = useState(false);

     
     const sendForm = () => {
        setCheckOut(true)

        sessionStorage.setItem('order', JSON.stringify(props.order));
        sessionStorage.setItem('memberid',JSON.stringify(props.memberid));

    }
    const packageInfo = (t) =>{
        window.open("https://mypost.israelpost.co.il/lp?itemcode="+ t);
    }
  
    if (checkOut) {
        return (
            <div>
                <CheckOutComp order={props.order} />
            </div>
        )
    }
     
    
    return (
        <div>
            <div className="d-flex justify-content-end">
                <Card style={{ width: '40rem' , margin : 'auto' }}>
                    <Card.Header  >{props.packCont} - פריטים להזמנה</Card.Header>
                    <ListGroup variant="flush">
                        {props.order.order_data.map((item, index) => {
                            return <ListGroup.Item 
                             
                             action variant="light"
                              key={index}>
                             <a  href={"https://mypost.israelpost.co.il/lp?itemcode=" + item.tracking_number} rel="noreferrer" target={"_blank"}>
                            <Button variant="outline-secondary">איתור פריט</Button>
                            </a>
                            {item.shelf_number + " + " + item.tracking_number}
                          
                            </ListGroup.Item>
                        })}

                        {/* <ListGroup.Item action variant="light" style={{ display: order.mailbox ? 'block' : 'none' }} >{ "תא דואר : " + order.mailbox}</ListGroup.Item> */}


                        {/* <Form.Label> <Button size="sm" variant="outline-primary" onClick={updateCounter}>לחץ כאן</Button>
                                  לקבלת דואר מהתיבה</Form.Label>
                                 */}
                        {/* <Form.Control type="text" value={order.mailbox}   onChange={e => setOrder({ ...order, mailbox: e.target.value })} placeholder="הכנס מספר תיבה" />
                                <ListGroup.Item style={{ display: props.order.mailbox ? 'block' : 'none' }} >{ "תא דואר : " + props.order.mailbox}</ListGroup.Item> */}


                    </ListGroup>
                    <Link to="/checkout" style={{display :  props.order.order_data.length? 'block' : 'none'}}> <Button variant="outline-info" onClick={sendForm} > המשך לסיום הזמנה</Button>  </Link>
                </Card>

            </div>

        </div>
    )
}


export default CartComp;