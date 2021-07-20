import { Form, Button, Card, } from 'react-bootstrap/'
import { useState, useEffect } from 'react';
import './App.css'
import OrderComp from './order';
import { Link } from 'react-router-dom';
import CheckOutComp from './checkOut';

function getDate(params) {
    let currentDate = new Date();
    var dd = String(currentDate.getDate()).padStart(2, '0');
    var mm = String(currentDate.getMonth() + 1).padStart(2, '0');
    var yyyy = currentDate.getFullYear();
    var hh = currentDate.getHours();
    var min = currentDate.getMinutes();
    currentDate = hh + ":" + min + " " + dd + '/' + mm + '/' + yyyy;
    return currentDate;
}
function getSessionStorageOrDefault(key, defaultValue) {
    const stored = sessionStorage.getItem(key);
    if (!stored) {
        return defaultValue;
    }
    return JSON.parse(stored);
}

function NewOrderComp(props) {
    const [packCont, setPackCont] = useState(0);
    const [member] = useState(
        getSessionStorageOrDefault('member', false)
    )

    const [shelfNum, setShelfNum] = useState('');
    const [trackNum, settrackNum] = useState('')
    const [newOrder, setNewOrder] = useState({
        date: getDate(),
        order_data: [],
        mailbox: '',
        member_id: member._id,
        pack_counter: ''
    });
    const [validated, setValidated] = useState(false);
    const [checkOut, setCheckOut] = useState(false)

    const handleSubmit = (event) => {
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            let numOfPack = packCont
            event.preventDefault();
            let obj = { shelf_number: shelfNum, tracking_number: trackNum };
            newOrder.order_data.push(obj);
            numOfPack = numOfPack + 1;
            setNewOrder({ ...newOrder, pack_counter: numOfPack })
            setPackCont(numOfPack);
            console.log(newOrder)
        }
        setValidated(true);
        event.target.reset();
    };

    const sendForm = () => {
        setCheckOut(true)
    }

    useEffect(() => {
        if (!sessionStorage.member) {
            console.log("yes")
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
                                <Form.Control
                                    type="text"
                                    maxLength="5"
                                    minLength="2"
                                    required
                                    onChange={e => setShelfNum(e.target.value)}
                                    placeholder="הכנס מספר מדף (לדוגמא ג124)" />
                                <Form.Control.Feedback type="invalid">
                                    אנא הקלד מספר מדף תקין
                                </Form.Control.Feedback>
                                <Form.Control
                                    type="text"
                                    maxLength="13"
                                    minLength="13"
                                    required
                                    onChange={e => settrackNum(e.target.value)}
                                    placeholder="הכנס מספר מעקב" />
                                <Form.Control.Feedback type="invalid">
                                    אנא הכנס מספר מעקב תקין.
                                </Form.Control.Feedback>
                                <a href={"https://mypost.israelpost.co.il/lp?itemcode=" + trackNum}
                                    rel="noreferrer"
                                    target={"_blank"}>
                                </a>
                                <br />
                            </Form.Group>
                            <Button type="submit" > הוסף פריט למשלוח</Button><br /><br />
                        </Form >
                    </Card.Body>
                </Card>
            </div>
            <div style={{ display: packCont ? 'block' : 'none' }}  >
                <Card className="Card">
                    <Card.Header> <Card.Title> פריטים להזמנה - {packCont}</Card.Title> </Card.Header>
                    <OrderComp order={newOrder} packCont={1} />
                     <Button variant="success" onClick={sendForm} > המשך לסיום הזמנה</Button> 
                </Card>
            </div>
        </div>
    )
    

}

export default NewOrderComp;
