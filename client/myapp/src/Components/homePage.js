
import { Link } from "react-router-dom";
import { Button, Col, Container, OverlayTrigger, Popover, Row } from "react-bootstrap";
import '../Components/Pages/App.css';
import { useState } from "react";

function getSessionStorageOrDefault(key, defaultValue) {
    const stored = sessionStorage.getItem(key);
    if (!stored) {
      return defaultValue;
    }
    return true;
  }

function HomePageComp() {
    const [session] = useState(getSessionStorageOrDefault('member', false));


    return (
        <div className="text-center home-page"   style={{marginTop : 100,}} >
            <Container>
                <Row className="justify-content-center" >
                    <Col md="auto"><h1 className="Home1" >משלוחים מדואר מיתר</h1></Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md="auto"><h2   className="Home2" > מהיום להיום</h2></Col>
                </Row>
                <Row  className="justify-content-center" >
                  <Link to="/neworder" style={{ display: session ? 'block' : 'none'}} > <Button variant="outline-dark">הרשמה למשלוח</Button></Link> 
                  <Link to="/login" style={{ display: session ? 'none' : 'block'  }} > <Button variant="outline-dark">הרשמה למשלוח</Button></Link> 
                
                </Row>
            </Container>
         </div>
    );
}

export default HomePageComp;
