
import { Link } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";

import '../Components/orders/App.css';



function HomePageComp() {




    return (
        <div style={{margin : 'auto'}} >

            <Container>
                <Row className="justify-content-md-center">

                    <Col md="auto"><h1 className="Home1">משלוחים מדואר מיתר</h1></Col>

                </Row>
                <Row className="justify-content-md-center">

                    <Col md="auto"><h2 className="Home2">משלוחים מהיום להיום</h2></Col>
                    
                </Row>
                <Row className="justify-content-md-center">

                   
                  <Link to="/neworder"> <Button variant="secondary">הרשמה למשלוח</Button></Link> 
                </Row>
            </Container>
            
        </div>

    );
}

export default HomePageComp;
