import { Form, Button, Card, Tooltip, Overlay, ListGroup } from 'react-bootstrap/'
import { useState, useEffect, useRef } from 'react';
import './App.css'
import OrderComp from './order';
import CheckOutComp from './checkOut';
import ordersUtils from './ordersUtils';


function getSessionStorageOrDefault(key, defaultValue) {
    const stored = sessionStorage.getItem(key);
    if (!stored) {
        return defaultValue;
    }
    return JSON.parse(stored);
}

function NewOrderComp(props) {
    const [show, setShow] = useState(false);
    const target = useRef(null);

    const [packCont, setPackCont] = useState(0);
    const [member] = useState(
        getSessionStorageOrDefault('member', false)
    )

    const [shelfNum, setShelfNum] = useState('');
    const [trackNum, settrackNum] = useState('')
    const [newOrder, setNewOrder] = useState({
        date: ordersUtils.getDate(),
        order_data: [],
        mailbox: '',
        member_id: member._id,
        pack_counter: '',
        status: 0,
        payment: 0,
        notes: "",
        mail:''
    });
    const [validated, setValidated] = useState(false);
    const [checkOut, setCheckOut] = useState(false);
    const [showInput, setShowInput] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        let duplication = false
        if (packCont !== '') {
            newOrder.order_data.forEach(od => {

                if (od.tracking_number === trackNum || od.shelf_number === shelfNum) {
                    setValidated(false)
                    event.stopPropagation();
                    duplication = true
                    setShow(true)
                }
            })
        }

        if (form.checkValidity() === false) {
            event.stopPropagation();
        }

        else if (duplication === false) {
            setShow(false)
            let numOfPack = packCont
            let obj = { shelf_number: shelfNum, tracking_number: trackNum };
            newOrder.order_data.push(obj);
            numOfPack = numOfPack + 1;
            setNewOrder({ ...newOrder, pack_counter: numOfPack })
            setPackCont(numOfPack);
        }
        setValidated(true);
    }


    const sendForm = () => {
        setCheckOut(true)
    }

    useEffect(() => {
        if (!sessionStorage.member) {
            alert("על מנת להזמין משלוח עליך להתחבר למערכת")
            props.history.push("/login")
        }
    })


    if (checkOut) {
        return (
            <div>
                <CheckOutComp newOrder={newOrder} />
            </div>
        )
    };


    return (
        <div dir="rtl" className="text-center" >
            <div style={{ overflow: 'auto', marginTop: "100px" }} >
                <Card className="Card" >
                    <Card.Header> <Card.Title>להזמנת משלוח אנא מלא את הפרטים</Card.Title>  </Card.Header>
                    <Card.Body >
                        <Form noValidate validated={validated} onSubmit={handleSubmit}    >
                            <Form.Group controlId="validationCustom01">
                                <Form.Label>מספר מדף</Form.Label>

                                <Form.Control
                                    type="text"
                                    maxLength="5"
                                    minLength="2"
                                    required
                                    onChange={e => setShelfNum(e.target.value)}
                                    placeholder="הכנס מספר מדף (לדוגמא ג124)" />
                                <Form.Control.Feedback type="invalid" >
                                    אנא הקלד מספר מדף תקין
                                </Form.Control.Feedback>
                                <br />
                                <Form.Label>מספר מעקב</Form.Label>

                                <Form.Control
                                    type="text"
                                    maxLength="13"
                                    minLength="13"
                                    required
                                    onChange={e => settrackNum(e.target.value)}
                                    placeholder="הכנס מספר מעקב" />
                                <Form.Control.Feedback type="invalid" >
                                    אנא הכנס מספר מעקב תקין.
                                </Form.Control.Feedback>
                                <a href={"https://mypost.israelpost.co.il/lp?itemcode=" + trackNum}
                                    rel="noreferrer"
                                    target={"_blank"}>
                                </a>
                                <br />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label> תוספת דואר מהתיבה ב5 שקלים? </Form.Label>{' '}
                                <Button variant="outline-primary" onClick={e => setShowInput(true)}>כן</Button>{' '}
                                <Button variant="outline-primary" onClick={e => setShowInput(false),setNewOrder({...newOrder,mailbox:''})}>לא</Button>

                            </Form.Group>
                            <ListGroup.Item  style={{ display: showInput ? 'block' : 'none' }}>
                                
                                <Form.Control
                                    placeholder="מספר תא דואר"
                                    onChange={e => setNewOrder({ ...newOrder, mailbox: e.target.value })}>
                                </Form.Control>
                            </ListGroup.Item>
                            <br />
                            <Button ref={target} type="submit" > הוסף פריט למשלוח</Button>
                            <Overlay
                                variant="danger"
                                target={target.current}
                                show={show}
                                placement="bottom">
                                {(props) => (
                                    <Tooltip id="overlay-example" {...props}>
                                        פריט זה כבר נוסף להזמנה, באפשרותך להוסיף פריטים נוספים לאותו משלוח או להמשיך לסיום ההזמנה
                                    </Tooltip>
                                )}
                            </Overlay>
                            <br /><br />
                        </Form >
                    </Card.Body>
                </Card>

            </div>
            <div style={{ display: packCont ? 'block' : 'none' }}  >
                <Card className="Card">
                    <Card.Header> <Card.Title> מספר פריטים להזמנה  - {packCont}</Card.Title> </Card.Header>
                    <OrderComp order={newOrder} packCont={1} />

                    <Button variant="success" onClick={sendForm} > המשך לסיום הזמנה</Button>
                </Card>
            </div>
        </div>
    )


}

export default NewOrderComp;
