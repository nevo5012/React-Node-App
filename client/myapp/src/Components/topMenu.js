import { useState } from "react";
import { Button } from "react-bootstrap";
import Offcanvas from 'react-bootstrap/Offcanvas'

function Example() {
    const [show, setShow] = useState(false);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                תפריט
            </Button>
            <div style={{ marginTop: "10px" }}>


                <Offcanvas

                    placement="top"
                    show={show}
                    scroll={true}
                    backdrop={true}

                    onHide={handleClose}>

                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        Some text as placeholder. In real life you can have the elements you
                        have chosen. Like, text, images, lists, etc.

                    </Offcanvas.Body>
                </Offcanvas>
            </div>
        </>
    );
}


export default Example