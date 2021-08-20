import React from 'react';
import { useState } from 'react';
import { authService } from '../../_services/auth.service'
import { Alert, Button, Card, Col, Form, Modal, Row, Toast } from 'react-bootstrap/';
import RegisterComp from './register';

function MyVerticallyCenteredModal(props) {

  return (
    <div>
      <Modal
        dir="rtl"
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="text-center">
        <RegisterComp />
      </Modal>
    </div>
  );
}

function LoginComp() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();

    }
    else {
      const data = await authService.login({
        email,
        password
      });
      if (data.member === undefined) {
        setShow(true)
      }
      else {
        sessionStorage['email'] = data.email
        sessionStorage.setItem('member', JSON.stringify(data.member))
        window.location.assign('/')
      }
    }
    setValidated(true);
  }




  return (
    <div className="text-center"   >
      <div style={{ overflow: 'auto', marginTop: "100px" }} >

        <Card className="Card" >
          <Card.Body>
            <Card.Title>
              <h1>התחברות </h1>
            </Card.Title>

            <Form noValidate validated={validated} onSubmit={handleSubmit} >
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>דוא"ל</Form.Label>
                <Form.Control
                  type="email"
                  onChange={e => setEmail(e.target.value)}
                  placeholder='דוא"ל'
                  required
                />
                <Form.Control.Feedback type="invalid">
                  נא נהקליד כתובת דוא"ל תקינה
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>סיסמה</Form.Label>
                <Form.Control type="password"
                  minLength="6"
                  required
                  onChange={e => setPassword(e.target.value)}
                  placeholder="סיסמה" />
                <Form.Control.Feedback type="invalid">
                  נא להקליד סיסמה
                </Form.Control.Feedback>
              </Form.Group>

              <Alert show={show} variant="danger">
                <div>
                  <p>
                    דוא"ל או הסיסמה שגויים, אנא נסה שנית
                  </p>
                </div>
              </Alert >

              <Button type="submit"   >התחבר/י</Button>
            </Form>
            <br />
            <Card.Text>
              עדיין אין משתמש ? <Button variant="link" onClick={() => setModalShow(true)}>לחץ כאן </Button>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  )
}

export default LoginComp