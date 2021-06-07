import React from 'react';

import { Button, Card, Col, Form, Row } from 'react-bootstrap/';

// import './Login.css';


  function Login() {

  return (
    <div className="text-center"   >

      <div>
        <Card style={{ marginTop: 100 }} >
          <Card.Body>
            <Card.Title>
              <h1>התחברות </h1>
            </Card.Title>



            <form     >
              <label>
                <p>שם משתמש</p>
                <input type="text" placeholder="שם משתמש" />
              </label>
              <label>
                <p>סיסמה</p>
                <input type="password" placeholder="סיסמה" />
              </label>
              <div>
                <Button type="submit"   >התחבר</Button>
              </div>
            </form>
            <br />
            <Card.Text>
              <Button variant="link">לחץ כאן </Button>  ? עדיין אין משתמש  <br />

            </Card.Text>
          </Card.Body>
        </Card>
      </div>
      {/* <div>
         
        <Form>
         <Row className="mb-3">
         <Form.Group as={Col} controlId="formGridEmail">
      <Form.Label>Email</Form.Label>
      <Form.Control type="email" placeholder="Enter email" />
    </Form.Group>

    <Form.Group as={Col} controlId="formGridPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" />
    </Form.Group>
         </Row>
         <Row  className="mb-3">

         </Row>
         <Form.Group as={Col} controlId="formGridCity">
      <Form.Label>City</Form.Label>
      <Form.Control />
    </Form.Group>
    <Form.Group as={Col} controlId="formGridZip">
      <Form.Label>Zip</Form.Label>
      <Form.Control />
    </Form.Group>
     
        </Form>
      </div> */}
    </div>

  )
}
export default Login