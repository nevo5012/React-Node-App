import { Button, Card, ListGroup, ButtonGroup, ToggleButton, ToggleButtonGroup } from 'react-bootstrap/'
import { useState,  } from 'react';
import { } from "react-router-dom";
import ordersUtils from './ordersUtils';
import OrderConfimComp from './orderConfirm';

function getSessionStorageOrDefault(key, defaultValue) {
    const stored = sessionStorage.getItem(key);
    if (!stored) {
        return defaultValue;
    }
    return JSON.parse(stored);
}

function getTotal(num, mail) {
    let price = 10;
    if (mail.length > 1) {
        num = num + 1
    }

    if (num > 1) {
        price = 5;
    }
    num = num * price
    return num
}

function CheckOutComp(props) {

    const [order ] = useState(
        getSessionStorageOrDefault('order', false)
    );
    const [total] = useState(
        getTotal(order.pack_counter, order.mailbox)
    )
    const [value, setValue] = useState(false)

    const [confirm , setConfirm] = useState(false)
    // useEffect(() => {

    //     setPackCounter(props.order.order_data.length)

    //     if (props.order.mailbox.length > 1) {
    //         setMailbox(true);
    //         let x = props.order.order_data.length + 1

    //         setPackCounter(x);
    //     }
    //    priceCalc()
    // }, [])

    // const priceCalc = () => {
    //     if (props.order.order_data.length > 1) {
    //         setPrice(5)
    //     }
    //     let x = props.order.order_data.length * price
    //     if (mailbox) {
    //         x = x + 5
    //     }
    //     setTotal(x)

    // }

    const handleChange = (val) => setValue(val);

    const sendOrder = async () => {
        if(value===false)
        {
            alert(
                 "לאחר השלמת התשלום ההזמנה תישלח")
            window.open(
                'https://payboxapp.page.link/n6pMSuHkmp4j7D6d7',
                '_blank'  
              );
            let resp = await ordersUtils.addNewOrder(order)
            console.log(resp.data)
           

        }
        else
        {
            let resp = await ordersUtils.addNewOrder(order)
            console.log(resp.data)
        }
         setConfirm(true)


    }


    if(confirm)
    {
        return(
            <OrderConfimComp order={order}/>
        )
    }

    if (order) {
        return (
            <div style={{ width: '30rem', margin: 'auto' }} >
                <Card border="info" style={{ width: 'auto', margin: 'auto' }}>
                    <Card.Header> <Card.Title>סיכום הזמנה</Card.Title>   </Card.Header>
                    <Card.Body>

                        <Card.Text >
                            <Card.Header>   {order.pack_counter} - מספר פריטים להזמנה </Card.Header>
                            <ListGroup variant="flush">
                                {order.order_data.map((item, index) => {

                                    return <ListGroup.Item action variant="light" key={index}>{item.shelf_number + " + " + item.tracking_number}</ListGroup.Item>

                                })}
                                <ListGroup.Item style={{ display: order.mailbox ? 'block' : 'none' }} action variant="light"> {order.mailbox} - תא דואר  </ListGroup.Item>


                            </ListGroup>
                        </Card.Text>
                         




                        <Card.Header size="lg"> סה"כ לתשלום - {total + " שקלים "}<br/>
                            בחר את דרך התשלום המועדפת <br />


                            <ButtonGroup toggle>
                              
                                <ToggleButtonGroup type="radio" name="options" onChange={handleChange}   >

                                    <ToggleButton value={false}>payBox</ToggleButton>
                                    <ToggleButton value={true}>מזומן</ToggleButton>
                                </ToggleButtonGroup>
                            </ButtonGroup>

                        </Card.Header>



                    </Card.Body>
                    <ButtonGroup style={{ display: value ?'none' : 'block'}} >

                        <Button variant="outline-success" size="lg" block onClick={sendOrder}>
                            
                                paybox  שלח הזמנה ומעבר לתשלום ב
                             
                        </Button>  

                    </ButtonGroup>
                    <ButtonGroup style={{ display: value ? 'block' : 'none' }} >
                        <Button variant="outline-success" size="lg" block onClick={sendOrder}>
                            שלח הזמנה
                </Button>
                    </ButtonGroup>

                </Card>

            </div>
        );
    }
}

export default CheckOutComp;


