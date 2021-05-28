import { Navbar , Button} from 'react-bootstrap/'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Switch , Route   } from "react-router-dom"
 import newOrderComp from './orders/newOrder'
import CheckOutComp from './orders/checkOut'
import OrderConfimComp from './orders/orderConfirm'

function MainPageComp() {




  return (
    <div   style={{textAlign: "right" , margin: 'auto'} } >
   
      <Navbar bg="light" style={{width : 'auto'}} className="justify-content-end" >
        <Navbar.Brand  >משלוחים דואר מיתר </Navbar.Brand>
       <Button size="sm"  variant="outline-secondary"> &#9776;
         </Button>
      </Navbar>


        <Switch>
          
          <Route path='/checkout/:id' component={CheckOutComp} />
          <Route exact path='/' component={newOrderComp}/>
          <Route path='/checkout' component={CheckOutComp}/>
          <Route path='/OrderConfim' component={OrderConfimComp}/>
        </Switch>

         
       
    </div>
  );
}

export default MainPageComp;
