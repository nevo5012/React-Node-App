import React from 'react';

import { Button, Card, Col, Form, Row } from 'react-bootstrap/';
// import './Login.css';

function Login() {

  //TODO: Check if user logged in
  //TODO: authenticate user in DB
  //TODO: create a new user in DB

  //TODO: after login save member state

  return (
    <div className="text-center"   >

      <div>
        <Card style={{ marginTop: 100 }} >
          <Card.Body>
            <Card.Title>
              <h1>התחברות </h1>
            </Card.Title>

            <form>
              <label>
                <p>שם משתמש</p>
                <input type="text" placeholder="שם משתמש" />
              </label>
              <label>
                <p>סיסמה</p>
                <input type="password" placeholder="סיסמה" />
              </label>
              <div>
                <Button type="submit">התחבר</Button>
              </div>
            </form>
            <br />
            <Card.Text>
              <Button variant="link">לחץ כאן </Button>  ? עדיין אין משתמש  <br />
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}
export default Login