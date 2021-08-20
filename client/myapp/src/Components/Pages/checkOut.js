import { Button, Card, ListGroup, ButtonGroup, ToggleButton, ToggleButtonGroup } from 'react-bootstrap/'
import { useEffect, useState, } from 'react';
import { Link } from "react-router-dom";
import ordersUtils from './ordersUtils';
import utils from './utils';
import './App.css'
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

    
    const [order,setOrder] = useState(props.newOrder);
    const [total] = useState(
         getTotal(props.newOrder.pack_counter, props.newOrder.mailbox)
    )
    const [value, setValue] = useState(false)
    const [confirm, setConfirm] = useState(false)
    const handleChange = (val) => setValue(val);

    useEffect(() => {
        console.log(props.newOrder)
        setOrder(props.newOrder)
    },[props]);

    const sendOrder = async () => {
        if (value === false) {
            alert(
                "לאחר השלמת התשלום ההזמנה תישלח")
            window.open(
                'https://payboxapp.page.link/n6pMSuHkmp4j7D6d7',
                '_blank'
            );
        }
         await ordersUtils.addNewOrder(order)
        setConfirm(true)
    }



    
    if (confirm) {
        return (
            <div dir="rtl" className="text-center" style={{ overflow: 'auto', marginTop: "100px" }}>
                <Card className="Card">
                    <Card.Header>
                        <Card.Title>תודה, הזמנתך הושלמה  </Card.Title>
                        - פרטי הזמנה
                    </Card.Header>

                    <ListGroup variant="flush">

                        {order.order_data.map((item, index) => {
                            return <ListGroup.Item action variant="light" key={index}>
                                {item.shelf_number + " + " + item.tracking_number}
                            </ListGroup.Item>
                        })}
                        <Link to="/myorders" > <Button>חזרה למשלוחים שלי </Button></Link>
                    </ListGroup>
                </Card>
            </div>
        )
    }

    if (order) {
        return (
            <div dir="rtl" className="text-center" style={{ overflow: 'auto', marginTop: "100px" }}>
                <Card className="Card">
                    <Card.Header> <Card.Title>סיכום הזמנה</Card.Title>   </Card.Header>
                    <Card.Body>
                        <Card.Text >
                            <Card.Header>   {props.newOrder.pack_counter} - מספר פריטים להזמנה </Card.Header>
                            <ListGroup variant="flush">
                                {order.order_data.map((item, index) => {
                                    return <ListGroup.Item
                                        action variant="light"
                                        key={index}>
                                        {item.shelf_number + " + " + item.tracking_number}
                                    </ListGroup.Item>
                                })}
                                <ListGroup.Item
                                    style={{ display: order.mailbox ? 'block' : 'none' }}
                                    action variant="light">
                                    {order.mailbox} - תא דואר
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Text>
                        <Card.Header size="lg"> סה"כ לתשלום - {total + " שקלים "}<br />
                            בחר את דרך התשלום המועדפת <br />
                            <ButtonGroup toggle>
                                <ToggleButtonGroup type="radio" name="options" onChange={handleChange}>
                                    <ToggleButton value={false}>payBox</ToggleButton>
                                    <ToggleButton value={true}>מזומן</ToggleButton>
                                </ToggleButtonGroup>
                            </ButtonGroup>
                        </Card.Header>
                    </Card.Body>
                    <ButtonGroup style={{ display: value ? 'none' : 'block' }} >
                        <Button variant="outline-success" size="lg" block onClick={sendOrder}>
                            שלח הזמנה ומעבר לתשלום ב paybox
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


