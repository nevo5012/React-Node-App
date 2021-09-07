import { Button, Card, ListGroup, ToggleButton, ToggleButtonGroup } from 'react-bootstrap/'
import { useState } from 'react';
import { Link } from "react-router-dom";
import ordersUtils from './ordersUtils';
import utils from './utils';

function getTotal(num, mail) {
    let price = 10;

    if (num > 1) {
        price = 5;
    }
    num = num * price
    if (mail.length > 1) {
        num = num + 5
    }
    return num
}

function CheckOutComp(props) {
    const [order, setOrder] = useState(props.newOrder);
    const [total] = useState(
        getTotal(props.newOrder.pack_counter, props.newOrder.mailbox)
    );
    const [value, setValue] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const handleChange = (val) => setValue(val);

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
                        <Card.Title>תודה, הזמנתך נשלחה  </Card.Title>
                        פרטי הזמנה:
                    </Card.Header>

                    <ListGroup variant="flush">

                        {order.order_data.map((item, index) => {
                            return <ListGroup.Item action variant="light" key={item._id}>
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
                            <Card.Header>  מספר פריטים להזמנה - {props.newOrder.pack_counter}  </Card.Header>
                            <ListGroup variant="flush">
                                {order.order_data.map((item, index) => {
                                    return <ListGroup.Item
                                        action variant="light"
                                        key={item._id}>
                                        {item.shelf_number + " + " + item.tracking_number}
                                    </ListGroup.Item>
                                })}
                                <ListGroup.Item
                                    style={{ display: order.mailbox ? 'block' : 'none' }}
                                    action variant="light">
                                    תא דואר - {order.mailbox}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <input placeholder="הערות לשליח" onChange={e => setOrder({ ...order, member_notes: e.target.value })}></input>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Text>
                        <Card.Header size="lg"> סה"כ לתשלום - {total + " שקלים "}<br />
                            בחר את דרך התשלום המועדפת <br />
                            <ToggleButtonGroup type="radio" name="options" defaultValue={value} onChange={handleChange}>
                                <ToggleButton id="paybox" value={false}>payBox</ToggleButton>
                                <ToggleButton id="cash" value={true}>מזומן</ToggleButton>
                            </ToggleButtonGroup>
                        </Card.Header>
                    </Card.Body>
                    {!value ?
                        <Button variant="outline-success" size="lg" block onClick={sendOrder}>
                            שלח הזמנה ומעבר לתשלום ב paybox
                            </Button>
                        :
                        <Button variant="outline-success" size="lg" block onClick={sendOrder}>
                            שלח הזמנה
                            </Button>
                    }
                </Card>
            </div>
        );
    }
}

export default CheckOutComp;


