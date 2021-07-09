import { Form, Button, Card, } from 'react-bootstrap/'
import { useState, useEffect } from 'react';
import utils from './utils';
import './App.css'
import CartComp from './cart'

function getDate(params) {
    let currentDate = new Date();
    var dd = String(currentDate.getDate()).padStart(2, '0');
    var mm = String(currentDate.getMonth() + 1).padStart(2, '0');
    var yyyy = currentDate.getFullYear();
    currentDate = dd + '/' + mm + '/' + yyyy;
    return currentDate;
}

function NewOrderComp(props) {
    const [packCont, setPackCont] = useState(0);
    const [id] = useState("60c0854f3829019701d5aff9");
    sessionStorage.setItem('memberId', '60c0854f3829019701d5aff9');
    const [member, setMember] = useState({
        firstname: '',
        lastname: '',
        city: '',
        street: '',
        housenumber: '',
        phonenumber: '',
        orders: ['']
    });
    const [shelfNum, setShelfNum] = useState('');
    const [trackNum, settrackNum] = useState('')
    const [newOrder, setNewOrder] = useState({
        date: getDate(),
        order_data: [],
        mailbox: '',
        member_id: id,
        pack_counter: ''
    });


    const [orderId] = useState();

    const [validated, setValidated] = useState(false);
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
            let currentDate = new Date();
            var dd = String(currentDate.getDate()).padStart(2, '0');
            var mm = String(currentDate.getMonth() + 1).padStart(2, '0');
            var yyyy = currentDate.getFullYear();
            currentDate = dd + '/' + mm + '/' + yyyy;
            setNewOrder({ ...newOrder, date: 123 })
            numOfPack = numOfPack + 1;
            setNewOrder({ ...newOrder, pack_counter: numOfPack })
            setPackCont(numOfPack);
        }
        setValidated(true);
        event.target.reset();
    };

    useEffect(() => {
        getOneMember()
    });

    async function getOneMember() {
        let resp = await utils.getMember(id)
        setMember(resp.data)
        sessionStorage.setItem('member', JSON.stringify(resp.data));
    }

    useEffect(() => {
        if (orderId) {
            member.orders.push(orderId)
            console.log(member)
            utils.updateMember(member, id)
        }
    })

    return (
        <div dir="rtl" >
            <div style={{ overflow: 'auto', marginTop: "100px" }} >
                <Card border="info" style={{ width: '40rem', margin: 'auto' }}  >
                    <Card.Header> <Card.Title>להזמנת משלוח אנא מלא את הפרטים</Card.Title>  </Card.Header>
                    <Card.Body >
                        <Form noValidate validated={validated} onSubmit={handleSubmit}    >
                            <Form.Group controlId="validationCustom01">
                                <Form.Label   >מספר מדף</Form.Label>
                                <Form.Control
                                    type="text"
                                    maxLength="5"
                                    minLength="2"
                                    required
                                    onChange={e => setShelfNum(e.target.value)}
                                    placeholder="הכנס מספר מדף (לדוגמא ג'124)" /><Form.Control.Feedback type="invalid">
                                     
                                  </Form.Control.Feedback>
                                <Form.Label>מספר מעקב</Form.Label>
                                <Form.Control
                                    type="text"
                                    maxLength="13"
                                    minLength="13"
                                    required
                                    onChange={e => settrackNum(e.target.value)}
                                    placeholder="הכנס מספר מעקב" />
                                <Form.Control.Feedback type="invalid">
                                    
                                  </Form.Control.Feedback>
                                <a href={"https://mypost.israelpost.co.il/lp?itemcode=" + trackNum} 
                                rel="noreferrer" 
                                target={"_blank"}>
                                </a>
                                <br />
                            </Form.Group>
                            <Button type="submit" >הוסף פריט</Button><br /><br />
                        </Form >
                    </Card.Body>
                </Card>
            </div>
            <div  >
                <CartComp order={newOrder} packCont={packCont} />
            </div>
        </div>
    )
}
export default NewOrderComp;
