import { Table, Button, OverlayTrigger, Tooltip, Card } from 'react-bootstrap/'
import { InfoCircle } from 'react-bootstrap-icons';
import React from 'react';

function OrderComp(props) {

    const packageInfo = (t) => {
        window.open("https://mypost.israelpost.co.il/lp?itemcode=" + t);
    }

    const paymentStat= (p)=>{
        if (p === 0) {
            return "ממתין"
        }
        if (p === 1) {
            return "שולם"
        }
        if (p === 2) {
            return "שולם"
        }
        if (p === 3) {
            return "לא התקבל תשלום, אנא צור קשר לביצוע התשלום"
        }
    }
    const delivertStat = (s) => {
        if (s === 0) {
            return "הזמנה בתהליך קבלה "
        }
        if (s === 1) {
            return "הזמנה בתהליך הוצאה מהסניף"
        }
        if (s === 2) {
            return "הזמנה הושלמה בהצלחה"
        }
        if (s === 3) {
            return "הזמנה בוטלה"
        }
    }

    const getColor = (s) => {
        if (s === 0) {
            return "warning"
        }
        if (s === 1) {
            return "info"
        }
        if (s === 2) {
            return "success"
        }
        if (s === 3) {
            return "danger"
        }
    }

    return (
        <div >
            <Card border={getColor(props.order.status)}>
                <Card.Header style={{ display: props.packCont ? 'none' : 'block' }}> סטטוס - {delivertStat(props.order.status)}</Card.Header>
                <Table striped bordered hover size="sm">

                    <thead>
                        <tr>
                            <th>מס' מדף</th>
                            <th>מס' מעקב</th>
                         </tr>
                    </thead>
                    <tbody>
                        {props.order.order_data.map((item) => {
                            return <tr key={item.tracking_number}  >
                                <td> {item.shelf_number} </td>
                                <td>

                                    <Button variant="link" onClick={e => packageInfo(item.tracking_number)}>

                                        <OverlayTrigger
                                            placement="bottom"
                                            overlay={<Tooltip id="button-tooltip-2">בדיקת סטטוס בדואר ישראל</Tooltip>}
                                        >
                                            {({ ref, ...triggerHandler }) => (
                                                <InfoCircle  {...triggerHandler} ref={ref} />
                                            )}
                                        </OverlayTrigger>

                                    </Button> {item.tracking_number}
                                </td>
                          
                            </tr>
                        })}
                       <tr>
                           <td>
                               סטטוס תשלום:
                           </td>
                            <td>
                                {paymentStat(props.order.payment)}
                            </td>
                       </tr>
                    </tbody>
                </Table>
                <Card.Footer style={{ display: props.packCont ? 'none' : 'block' }}>
                    
                    <small className="text-muted"> הזמנה מתאריך - {props.order.date}   </small>
                </Card.Footer>
            </Card>
            <br />
        </div>
    )
}

export default OrderComp