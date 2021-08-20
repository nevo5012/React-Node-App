import React, { useState } from 'react';

import { Button, Modal, Form, Col, Alert } from 'react-bootstrap';
import { authService } from '../../_services/auth.service';
import loginUtils from './loginUtils';

export const RegisterComp = (props) => {

    const [show, setShow] = useState(false);
    const [user, setUser] = useState({
        email: '',
        password: '',
        roles: []
    });
    const [member, setMember] = useState({
        first_name: '',
        last_name: '',
        city: '',
        street: '',
        house_number: '',
        phone: '',
        email: user.email,
        orders_counter : 0
    });
    const [validated, setValidated] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            registerNewUser()
        }

        setValidated(true);
    };



    const registerNewUser = async () => {
        let resp = await authService.register(user)
        console.log(resp.data);
        if (resp.data === 'email already in use') {
            console.log(resp.data)
        }
        else {
            let resp2 = await loginUtils.addNewMember(member);
            console.log(resp2.data);
            setShow(true)
            
        }
    }


    return (
        <div  >

            <Modal.Header   >
                <Modal.Title id="contained-modal-title-vcenter">
                    הרשמה
                </Modal.Title>
            </Modal.Header >
            <Modal.Body >

                
                <Form noValidate validated={validated} onSubmit={handleSubmit} >
                    <Form.Group controlId="validationCustom01">
                        <Form.Row>
                            <Form.Group as={Col}  >
                                <Form.Control
                                    type="text"
                                    name="first_name"
                                    placeholder="שם פרטי"
                                    maxLength="10"
                                    minLength="2"
                                    required
                                    onChange={e => setMember({ ...member, first_name: e.target.value })}
                                />
                                <Form.Control.Feedback type="invalid">
                                    נא למלא שם פרטי
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Control
                                    type="text"
                                    name="last_name"
                                    placeholder="שם משפחה"
                                    maxLength="10"
                                    minLength="2"
                                    required
                                    onChange={e => setMember({ ...member, last_name: e.target.value })} />
                                <Form.Control.Feedback type="invalid">
                                    נא למלא שם משפחה
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Control
                                    name="email"
                                    type="email"
                                    placeholder='דוא"ל'
                                    minLength="8"
                                    required
                                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
                                    onChange={e => setUser({ ...user, email: e.target.value }, setMember({ ...member, email: e.target.value }))} />
                                <Form.Control.Feedback type="invalid">
                                    נא להכניס כתובת דוא"ל
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Control
                                    name="phone"
                                    type="tel"
                                    minLength="10"
                                    maxLength="10"
                                    required
                                    pattern="[0]{1}[5]{1}[0-9]{1}[0-9]{7}"
                                    onChange={e => setMember({ ...member, phone: e.target.value })}
                                    placeholder="מספר טלפון נייד" />
                                <Form.Control.Feedback type="invalid">אנא הכנס מספר נייד תקין </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Control
                                    minLength="6"
                                    maxLength="10"
                                    required
                                    name="password"
                                    onChange={e => setUser({ ...user, password: e.target.value })}
                                    type="password"
                                    placeholder="סיסמה"
                                />
                                <Form.Control.Feedback type="invalid" >הסיסמה חייבת להכיל בין 6-12 תווים </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridPassword2">
                                <Form.Control
                                    minLength="6"
                                    maxLength="12"
                                    required
                                    name="confirmPassword"
                                    onChange={e => setConfirmPassword(e.target.value)}
                                    type="password"
                                    placeholder=" סיסמה שוב"
                                    pattern={user.password}
                                />
                                <Form.Control.Feedback type="invalid" >הסיסמה לא זהה </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Form.Group controlId="">
                        </Form.Group>
                        <Form.Group controlId="formGridAddress1">
                            <Form.Label>כתובת מגורים למשלוח הדואר</Form.Label>
                            <Form.Control
                                required
                                name="street"
                                onChange={e => setMember({ ...member, street: e.target.value })}
                                placeholder="רחוב" />
                            <Form.Control.Feedback type="invalid">
                                אנא הכנס כתובת מגורים
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Control
                                    placeholder="ישוב"
                                    required
                                    name="city"
                                    onChange={e => setMember({ ...member, city: e.target.value })} as="select" defaultValue="Choose...">
                                    <option  > </option>
                                    <option>מיתר</option>
                                    <option>כרמית</option>
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    אנא בחר יישוב
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group
                                as={Col} >
                                <Form.Control
                                    placeholder="מספר בית"
                                    name="house_number"
                                    required
                                    type="number"
                                    onChange={e => setMember({ ...member, house_number: e.target.value })} />
                                <Form.Control.Feedback type="invalid">
                                    אנא הכנס מספר בית
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>

                        <Button type="submit" size="lg">
                            הרשמה
                        </Button>
                    </Form.Group>
                </Form>
                <Alert style={{ zIndex: "+1"   }} show={show} variant="success">
                    <Alert.Heading>מעולה !   </Alert.Heading>
                    <Alert.Heading> נרשמת בהצלחה </Alert.Heading>

                   <h5>ssad</h5>
                    <hr />
                    <div className="d-flex justify-content-end">
                        <Button variant="outline-success">
                            קדימה
                        </Button>
                    </div>
                </Alert>
            </Modal.Body>
        </div>
    );
}

export default RegisterComp