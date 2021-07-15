import React from 'react';
import { useState } from 'react';
import {authService} from '../../_services/auth.service'
import { Button, Card, Modal, Form, Col } from 'react-bootstrap/';
import loginUtils from './loginUtils'
 
function MyVerticallyCenteredModal(props) {
 const [user , setUser] = useState( {
                                      email : '',
                                      password : '',
                                      roles : []
                                    });
 const [member, setMember] = useState({
                                      first_name: '',
                                      last_name: '',
                                      city: '',
                                      street: '',
                                      house_number: '',
                                      phone: '',
                                      email: user.email,
                                      orders: []
                                    });

const registerNewUser = async ()=>
{
  let resp = await authService.register(user)
   console.log(resp);
   if(resp.data==='email already in use')
   {
     console.log(resp.data)
   }
   else
   {
    let resp2 = await loginUtils.addNewMember(member);
    console.log(resp2.data);
    alert("נרשמת למערכת בהצלחה. נא להתחבר עם המייל והסיסמה ")
    window.location.assign('/login')
   }
}
  return (
    <div>
      <Modal
        dir="rtl"
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="text-center"
      >
        <Modal.Header   >
          <Modal.Title id="contained-modal-title-vcenter">
            הרשמה
          </Modal.Title>
          <Button onClick={props.onHide}>חזור</Button>
        </Modal.Header >
        <Modal.Body >
          <Form>
            <Form.Row>
              <Form.Group as={Col}  >
                <Form.Control onChange={e=>setMember({...member,first_name: e.target.value})} type="text" placeholder="שם פרטי" />
              </Form.Group>

              <Form.Group as={Col}  >
                <Form.Control onChange={e=>setMember({...member,last_name: e.target.value})} type="text" placeholder="שם משפחה" />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Control onChange={e=>setUser({...user,email: e.target.value},setMember({...member,email:e.target.value}))}  type="email" placeholder='דוא"ל' />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Control onChange={e=>setUser({...user,password: e.target.value})} type="password" placeholder="סיסמה" />
              </Form.Group>
            </Form.Row>
            <Form.Group controlId="">
              <Form.Control onChange={e=>setMember({...member,phone: e.target.value})} placeholder="מספר נייד" />
            </Form.Group>

            <Form.Group controlId="formGridAddress1">
              <Form.Label>כתובת מגורים למשלוח הדואר</Form.Label>
              <Form.Control onChange={e=>setMember({...member,street: e.target.value})} placeholder="רחוב" />
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>ישוב</Form.Label>
                <Form.Control onChange={e=>setMember({...member,city: e.target.value})} as="select" defaultValue="Choose...">
                  <option></option>
                  <option>מיתר</option>
                  <option>כרמית</option>
                </Form.Control>
              </Form.Group>

              <Form.Group onChange={e=>setMember({...member,house_number: e.target.value})} as={Col} >
                <Form.Label>מספר בית</Form.Label>
                <Form.Control />
              </Form.Group>
            </Form.Row>

            <Button size="lg" block variant="success" onClick={registerNewUser} >
              הרשמה
            </Button>
          </Form>
        </Modal.Body>

      </Modal>
    </div>
  );
}


function LoginComp() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [modalShow, setModalShow] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();

    const data = await authService.login({
      email,
      password
    });
    if(data.member===undefined)
    {
      alert("שם המשתמש או הסיסמה שגויים")
    }
    else
    {
      sessionStorage['email'] = data.email
      sessionStorage.setItem('member' ,JSON.stringify(data.member)) 
      window.location.assign('/')
    }
  }

  //TODO: Check if user logged in
  //TODO: authenticate user in DB
  //TODO: create a new user in DB

  //TODO: after login save member state


  return (
    <div className="text-center"   >

      <div style={{ overflow: 'auto', marginTop: "100px" }} >
        <Card style={{ width: '40rem', margin: 'auto' }} >
          <Card.Body>
            <Card.Title>
              <h1>התחברות </h1>
            </Card.Title>

            <form>
              <label>
                <input type="text" onChange={e => setEmail(e.target.value)} placeholder='דוא"ל' />
              </label>
              <label>
                <input type="password" onChange={e => setPassword(e.target.value)} placeholder="סיסמה" />
              </label>
              <div>
                <Button type="submit" onClick={handleSubmit}>התחבר/י</Button>
              </div>
            </form>
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