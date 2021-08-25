import { useState } from "react";
import { Alert, Button } from "react-bootstrap";

function MessageComp(params) {

    
    
    return (
        <>

            <Alert
               
                style={{ zIndex: "+1", position: 'absolute', top: '35%', right: '20%', left: '20%' }}
                
                variant="danger"
                dismissible>
                <Alert.Heading>דוא"ל זה כבר נמצא בשימוש</Alert.Heading>
                <p>לא ניתן להרשם עם אותו דוא"ל פעמיים, אנא נסה שנית.</p>
                <hr />
                <div className="d-flex justify-content-end">
                    <Button variant="light" onClick={params.func(false)}>
                        נסה שוב
                    </Button>
                </div>
            </Alert>

        </>
    )
}
export default MessageComp;