import { Table, Button, OverlayTrigger, Tooltip } from 'react-bootstrap/'
import { InfoCircle, } from 'react-bootstrap-icons';

function OrderComp(props) {

    const packageInfo = (t) => {
        window.open("https://mypost.israelpost.co.il/lp?itemcode=" + t);
    }

    return (
        <div >
            <Table border="secondary" style={{ width: '90%' }} striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th colSpan="2"> <p style={{ display: props.packCont ? 'none' : 'block' }}>הזמנה מתאריך - {props.order.date}  </p> </th>
                    </tr>
                </thead>
                <thead>
                    <tr>
                        <th>מס' מעקב</th>
                        <th>מס' מדף</th>
                    </tr>
                </thead>
                <tbody>
                    {props.order.order_data.map((item, index) => {
                        return <tr key={index} >
                            <td >

                                <Button variant="link" onClick={e => packageInfo(item.tracking_number)}>
                                    <InfoCircle ></InfoCircle>
                                </Button> {item.tracking_number}

                              

                            </td>
                            <td> {item.shelf_number} </td>
                        </tr>
                    })}
                </tbody>
            </Table>

        </div>
    )
}

export default OrderComp