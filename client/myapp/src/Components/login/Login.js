import React from 'react';
import { useState } from 'react';
import { authService } from '../../_services/auth.service'
import { Button, Card, Form, Modal } from 'react-bootstrap/';
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

  const handleSubmit = async e => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    else
    {
      const data = await authService.login({
        email,
        password
      });
      if (data.member === undefined) {
        alert("שם המשתמש או הסיסמה שגויים")
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
        <Card  className="Card" >
          <Card.Body>
            <Card.Title>
              <h1>התחברות </h1>
            </Card.Title>
            <Form noValidate validated={validated} onSubmit={handleSubmit} >
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="text"
                  onChange={e => setEmail(e.target.value)}
                  placeholder='דוא"ל'
                  required
                />

              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password"
                  required
                  onChange={e => setPassword(e.target.value)}
                  placeholder="סיסמה" />
              </Form.Group>

               
                <Button type="submit"   >התחבר/י</Button>
               
            </Form>
            <br />
            <Card.Text>
              עדיין אין משתמש ?     <Button variant="link" onClick={() => setModalShow(true)}>לחץ כאן </Button>
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