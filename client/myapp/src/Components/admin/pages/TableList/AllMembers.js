import { Card, Table } from "react-bootstrap";
import { useState, useEffect } from 'react';
import memberUtils from "../../utils/memberUtils";




function AllMembersComp() {
    const [allMembers, setMembers] = useState([])


    useEffect(() => {
        GetAllMembers()
    }, []);


    async function GetAllMembers() {
        setMembers(await memberUtils.getAll())

    }





    return (
        <div className="text-right" >
            <Card>
                <Card.Header as="h5">כל המשתמשים במערכת</Card.Header>
                <Card.Body>
                     
                    <Table border="secondary" style={{ width: '90%' }} striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>שם</th>
                        <th>נייד</th>
                        <th>מייל</th>
                        <th>כתובת</th>
                        <th>הזמנה מספר</th>
                    </tr>
                </thead>
                <tbody>
                    {allMembers.map(item => {
                        return <tr key={item._id}>
                            <td>{item.first_name + " " + item.last_name}</td>
                            <td>{item.phone}</td>
                            <td>{item.email}</td>
                            <td>{item.street + " " + item.house_number + " " + item.city} </td>
                            <td>{item.orders_counter}</td>
                            
                        </tr>
                    })}
                    <tr  >
                       
                    </tr>


                </tbody>

            </Table>
                   
                </Card.Body>
            </Card>
            

        </div>
    );
}

export default AllMembersComp;
