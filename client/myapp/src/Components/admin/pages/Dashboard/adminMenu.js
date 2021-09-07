import { Navbar, Nav, Button, Container, NavDropdown, Row, Col } from 'react-bootstrap/';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LinkContainer } from 'react-router-bootstrap';
import { Switch, Route, Link } from "react-router-dom";
import AllOrdersComp from '../TableList/AllOrders';
import AllMembersComp from '../TableList/AllMembers';
import logo from '../../../logo.png' 
 
function AdminMenuComp() {
  

  return <div    >
 

    <Navbar sticky="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Container>
        <Navbar.Brand href="/">
          <img
            src={logo}
            width="35"
            height="35"
            className="d-inline-block align-top"
            alt="Logo"
          />
        </Navbar.Brand>
        <Navbar.Brand href="/">Delivery - Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse     id="responsive-navbar-nav">
          <Nav  className="me-auto">
          <LinkContainer  to="/allorders">
              <Nav.Link>All-Orders</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav  className="me-auto">
          <LinkContainer  to="/allmembers">
              <Nav.Link>All-Members </Nav.Link>
            </LinkContainer>
          </Nav>
          
        </Navbar.Collapse>
      </Container>
      <Navbar.Collapse id="responsive-navbar-nav">
       
      </Navbar.Collapse>
    </Navbar>
  
  <Container>
    <Row>
      <Col >
      <Switch>
      <Route path='/allorders' component={AllOrdersComp} />
      <Route path='/allmembers' component={AllMembersComp}/>  
     </Switch>
      </Col>
    </Row>
  </Container>
    
  </div>;
}

export default AdminMenuComp;