import { Navbar, Nav, Button } from 'react-bootstrap/';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LinkContainer } from 'react-router-bootstrap';
import { Switch, Route, Link } from "react-router-dom";
import newOrderComp from './orders/newOrder';
import CheckOutComp from './orders/checkOut';
import OrderConfimComp from './orders/order';
import HomePageComp from './homePage';
import MyOrdersComp from './orders/myOrders';
import Login from './login/Login';

function MenuComp() {
  return <div>


      <Navbar sticky="top" className="justify-content-end" bg="dark" variant="dark">


        <Nav>
       <Link to="/login"> <Button>התחברות</Button></Link>
       <LinkContainer to="/home">
            <Nav.Link>ראשי</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/myorders">
            <Nav.Link>המשלוחים שלי</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/neworder">
            <Nav.Link>הזמנת משלוח</Nav.Link>
          </LinkContainer>
          <Navbar.Brand href="/">משלוחים דואר-מיתר</Navbar.Brand>

        </Nav>
        
      </Navbar>







      <Switch>
        <Route path='/myorders' component={MyOrdersComp} />
        <Route exact path='/' component={HomePageComp} />
        <Route   path='/home' component={HomePageComp} />
        <Route path='/checkout/:id' component={CheckOutComp} />
        <Route path='/neworder' component={newOrderComp} />
        <Route path='/checkout' component={CheckOutComp} />
        <Route path='/OrderConfim' component={OrderConfimComp} />
        <Route path='/login' component={Login} />
      </Switch>



    </div>;
}

export default MenuComp;