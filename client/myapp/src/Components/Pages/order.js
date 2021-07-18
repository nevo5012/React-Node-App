import { Table } from 'react-bootstrap/'
 
function OrderComp(props) {

    const packageInfo = (t) => {
        window.open("https://mypost.israelpost.co.il/lp?itemcode=" + t);
    }
 
    return (
        <div style={{ width: '40rem', margin: 'auto' }}>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>מספר מדף</th>
                        <th>מספר מעקב</th>
                        <th style={{ display: props.packCont ? 'none' : 'block' }}>{props.order.date}</th>
                    </tr>
                </thead>
                <tbody>
                    {props.order.order_data.map((item, index) => {
                        return <tr onClick={e=> packageInfo(item.tracking_number)} key={index} >
                            <td> {item.shelf_number}</td>
                            <td > {item.tracking_number}</td>
                            <td  style={{ display: props.packCont ? 'none' : 'block' }}></td>
                        </tr>
                    })}
                </tbody>
            </Table>
        </div>
     )
    }
 
export default OrderComp