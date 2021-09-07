import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap/';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LinkContainer } from 'react-router-bootstrap';
import { Switch, Route } from "react-router-dom";
import newOrderComp from './Pages/newOrder';
import CheckOutComp from './Pages/checkOut';
import OrderConfimComp from './Pages/order';
import HomePageComp from './homePage';
import MyOrdersComp from './Pages/myOrders';
import logo from './logo.png';
import AllOrdersComp from './admin/pages/TableList/AllOrders';
import AllMembersComp from './admin/pages/TableList/AllMembers';
import { AmplifySignOut } from '@aws-amplify/ui-react';


function MenuComp() {

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
            <LinkContainer to="/neworder">
              <Nav.Link>הזמנת משלוח</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/myorders">
              <Nav.Link>המשלוחים שלי</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>

      <Navbar.Collapse style={{ marginRight: "20px" }} className="justify-content-end">
        <Nav>
          <AmplifySignOut buttonText="התנתק" />
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
            <Route path='/allorders' component={AllOrdersComp} />
            <Route path='/allmembers' component={AllMembersComp} />

          </Switch>
        </Col>
      </Row>
    </Container>
   
  </div>;
}

export default MenuComp;