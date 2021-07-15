import { Table } from 'react-bootstrap/'
import { useEffect } from 'react'

function OrderComp(props) {

  
 
    return (
        <div style={{ width: '40rem', margin: 'auto' }}>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>{props.order.date}</th>
                        <th>מספר מדף</th>
                        <th>מספר מעקב</th>
                    </tr>
                </thead>
                <tbody>
                    {props.order.order_data.map((item, index) => {
                        return <tr key={index} >
                            <td> </td>
                            <td> {item.shelf_number}</td>
                            <td> {item.tracking_number}</td>
                        </tr>
                    })}
                </tbody>
            </Table>
        </div>
     )
    }
 
export default OrderComp