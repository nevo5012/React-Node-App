
import { Link } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";
import '../Components/Pages/App.css';



function HomePageComp() {

   

    return (
        <div className="text-center"   style={{marginTop : 100 }} >
            <Container>
                <Row className="justify-content-center" >
                    <Col md="auto"><h1 className="Home1" >משלוחים מדואר מיתר</h1></Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md="auto"><h2   className="Home2" > מהיום להיום</h2></Col>
                </Row>
                <Row  className="justify-content-center" >
                  <Link to="/neworder" > <Button variant="outline-dark">הרשמה למשלוח</Button></Link> 
                </Row>
            </Container>
        </div>
    );
}

export default HomePageComp;
