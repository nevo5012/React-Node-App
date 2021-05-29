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
    const [id] = useState("607ff45bcaac553672743f5e");
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
        var conditions = ["ח","ר","ג"];
        if(conditions.some(e=>shelfNum.includes( e) ) )
          {
              alert("yes")
          }
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

            console.log(currentDate)

            setNewOrder({ ...newOrder, date: 123 })


            numOfPack = numOfPack + 1;
            setNewOrder({ ...newOrder, pack_counter: numOfPack })
            setPackCont(numOfPack);

        }
        setValidated(true);
    };

    useEffect(() => {
        getOneMember()
    });

    async function getOneMember() {
        let resp = await utils.getMember(id)
        setMember(resp.data)
    }

    useEffect(() => {
        if (orderId) {
            member.orders.push(orderId)
            console.log(member)
            utils.updateMember(member, id)
        }
    }, [orderId])

    return (
        <div style={{ overflow: 'auto', margin: '90' }}>
            <div className="main">
                <Card border="info" style={{ width: 'auto', margin: 'auto' }} >
                    <Card.Header> <Card.Title>להזמנת משלוח אנא מלא את הפרטים</Card.Title>  </Card.Header>
                    <Card.Body>
                        <Form noValidate validated={validated} onSubmit={handleSubmit}   >
                            <Form.Group controlId="validationCustom01">
                                <Form.Label>מספר מדף</Form.Label>
                                <Form.Control
                                    type="text"
                                    maxlength="5"
                                    minLength="2"
                                    
                                    required
                                    onChange={e => setShelfNum(e.target.value)}
                                    placeholder="הכנס מספר מדף (לדוגמא ג'124)" /><Form.Control.Feedback type="invalid">
                                    נא להכניס מספר מדף תקין 
                                  </Form.Control.Feedback>
                                <Form.Label>מספר מעקב</Form.Label>
                                <Form.Control
                                    type="text"
                                    maxlength="13"
                                    minLength="13"
                                    required
                                    onSubmit={e => e.target.reset()}
                                    onChange={e => settrackNum(e.target.value)}
                                    placeholder="הכנס מספר מעקב" /><Form.Control.Feedback type="invalid">
                                    נא להכניס מספר מעקב תקין   
                                  </Form.Control.Feedback>
                                <a href={"https://mypost.israelpost.co.il/lp?itemcode=" + trackNum} rel="noreferrer" target={"_blank"}>
                                    <Button variant="outline-info" >  בדיקת סטטוס החבילה בדואר ישראל</Button>
                                </a>
                                <br />
                            </Form.Group>
                            <Button type="submit" >הוסף פריט</Button><br /><br />
                        </Form >
                    </Card.Body>
                </Card>
            </div>
            <div className="right">
                <CartComp order={newOrder} packCont={packCont} />
            </div>
        </div>
    )
}
export default NewOrderComp;
