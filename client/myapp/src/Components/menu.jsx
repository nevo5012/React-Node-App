import { Navbar, Nav, Button } from 'react-bootstrap/';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LinkContainer } from 'react-router-bootstrap';
import { Switch, Route, Link } from "react-router-dom";
import newOrderComp from './Pages/newOrder';
import CheckOutComp from './Pages/checkOut';
import OrderConfimComp from './Pages/order';
import HomePageComp from './homePage';
import MyOrdersComp from './Pages/myOrders';
import Login from './login/Login';

function MenuComp() {
  return <div  >
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="/">משלוחים דואר-מיתר</Navbar.Brand>    
      <Nav>
        <LinkContainer to="/neworder">
          <Nav.Link>הזמנת משלוח</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/myorders">
          <Nav.Link>המשלוחים שלי</Nav.Link>
        </LinkContainer>
      </Nav>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Link to="/login"> <Button >התחברות</Button></Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>






    <Switch>
      <Route path='/myorders' component={MyOrdersComp} />
      <Route exact path='/' component={HomePageComp} />
      <Route path='/home' component={HomePageComp} />
      <Route path='/checkout/:id' component={CheckOutComp} />
      <Route path='/neworder' component={newOrderComp} />
      <Route path='/checkout' component={CheckOutComp} />
      <Route path='/OrderConfim' component={OrderConfimComp} />
      <Route path='/login' component={Login} />
    </Switch>

  </div>;
}

export default MenuComp;