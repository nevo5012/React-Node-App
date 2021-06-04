import { Navbar , Button,Nav,Form,FormControl} from 'react-bootstrap/'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Switch , Route   } from "react-router-dom"
 import newOrderComp from './orders/newOrder'
import CheckOutComp from './orders/checkOut'
import OrderConfimComp from './orders/order'
import HomePageComp from './homePage'
import MyOrdersComp from './orders/myOrders';
function MainPageComp() {




  return (
    <div   style={{textAlign: "right" , margin: 'auto'} } >
     <Navbar className="mr-sm-2"  bg="dark" variant="dark">
    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
    <Nav className="mr-auto">
    
    </Nav>
    <Navbar.Brand   >משלוחים דואר מיתר 
       
       
      </Navbar.Brand>
  </Navbar>
   


        <Switch>
          <Route path='/myorders' component={MyOrdersComp}/>
          <Route exact path='/' component={HomePageComp}/>
          <Route path='/checkout/:id' component={CheckOutComp} />
          <Route  path='/neworder' component={newOrderComp}/>
          <Route path='/checkout' component={CheckOutComp}/>
          <Route path='/OrderConfim' component={OrderConfimComp}/>
        </Switch>

         
       
    </div>
  );
}

export default MainPageComp;
