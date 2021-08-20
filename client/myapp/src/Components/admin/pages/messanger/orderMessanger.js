import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

function OrderMessangerComp(props) {
   
  
  
  
    return (
      <>
        <Button variant="primary" >
          Launch demo modal
        </Button>
  
        <Modal   >
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" >
              Close
            </Button>
            <Button variant="primary" >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
  export default OrderMessangerComp