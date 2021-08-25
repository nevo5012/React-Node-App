import { Navbar, Nav, Button, Container,  Row, Col } from 'react-bootstrap/';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LinkContainer } from 'react-router-bootstrap';
import { Switch, Route, Link } from "react-router-dom";
import newOrderComp from './Pages/newOrder';
import CheckOutComp from './Pages/checkOut';
import OrderConfimComp from './Pages/order';
import HomePageComp from './homePage';
import MyOrdersComp from './Pages/myOrders';
import LoginComp from './login/Login';
import logo from './logo.png';
import { useState } from 'react';
import { authService } from '../_services/auth.service';
import AllOrdersComp from './admin/pages/TableList/AllOrders';
import AllMembersComp from './admin/pages/TableList/AllMembers';
import RegisterComp from './login/register';
import FooterComp from './footer';
 
function getSessionStorageOrDefault(key, defaultValue) {
  const stored = sessionStorage.getItem(key);
  if (!stored) {
    return defaultValue;
  }
  return true;
}

function MenuComp() {
  const [session] = useState(getSessionStorageOrDefault('member', false));

  return <div>

    <Navbar sticky="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">
          <img
            src={logo}
            width="35"
            height="35"
            className="d-inline-block align-top"
            alt="Logo"
          /> משלוחים דואר-מיתר
        </Navbar.Brand>
         <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-right">
            <LinkContainer style={{ display: session ? 'block' : 'none' }} to="/neworder">
              <Nav.Link>הזמנת משלוח</Nav.Link>
            </LinkContainer>
            <LinkContainer style={{ display: session ? 'block' : 'none' }} to="/myorders">
              <Nav.Link>המשלוחים שלי</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>

      <Navbar.Collapse style={{ marginRight: "20px", marginLeft: "30px" }} className="justify-content-end">
        <Nav style={{ display: session ? 'none' : 'block', marginRight: "10px" }}>
          <Link to="/login"> <Button >התחברות</Button></Link>
        </Nav>
        <Nav style={{ display: session ? 'block' : 'none' }}>
          <Button onClick={authService.logout} >התנתק</Button>
        </Nav>
      </Navbar.Collapse>

    </Navbar>


    <Container>
      <Row>
        <Col >
          <Switch>
            <Route exact path='/' component={HomePageComp} />
            <Route path='/myorders' component={MyOrdersComp} />
            <Route path='/home' component={HomePageComp} />
            <Route path='/checkout/:id' component={CheckOutComp} />
            <Route path='/checkout' component={CheckOutComp} />
            <Route path='/neworder' component={newOrderComp} />
            <Route path='/checkout' component={CheckOutComp} />
            <Route path='/OrderConfim' component={OrderConfimComp} />
            <Route path='/login' component={LoginComp} />
            <Route path='/allorders' component={AllOrdersComp} />
            <Route path='/allmembers' component={AllMembersComp} />
            <Route path='/register' component={RegisterComp} />

          </Switch>
        </Col>
      </Row>
    </Container>
   
  </div>;
}

export default MenuComp;