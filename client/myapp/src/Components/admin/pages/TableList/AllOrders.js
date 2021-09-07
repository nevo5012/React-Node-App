import { Table } from "react-bootstrap";
import { useState, useEffect } from 'react';
import ordersUtils from "../../../Pages/ordersUtils";
import memberUtils from "../../utils/memberUtils";
import { Button } from 'react-bootstrap/';
import adminOrdersUtils from "../../utils/adminOrdersUtils";
import { HiOutlineChat } from 'react-icons/hi';
import optimoRouteAPI from "../../API/optimoRouteAPI";
import React from "react";
import MessageComp from "../messanger/MessageComp";



function AllOrdersComp() {

    const [orders, setOrders] = useState([]);
    const [members, setMembers] = useState([]);

    const [allData, setAllData] = useState([]);
    const [date,] = useState();
    const [routes, setRoutes] = useState([]);
    const [show, setShow] = useState(true);

    useEffect(() => {
        getAllOrders()
        getAllMembers()

    }, [date]);

    async function getAllOrders() {
        let allOrders = await ordersUtils.getALL()
        setOrders(allOrders.reverse())
    }

    async function getAllMembers() {
        setMembers(await memberUtils.getAll())

    }


    const getAllData = () => {
        let data = [];
        orders.forEach(o => {

            members.forEach(m => {
                if (m._id === o.member_id) {
                    data.push({
                        id: o._id,
                        name: m.first_name + " " + m.last_name,
                        address: m.street + " " + m.house_number + " " + m.city,
                        phone: m.phone,
                        orderData: o.order_data,
                        date: o.date,
                        packCounter: o.pack_counter,
                        orderId: o._id,
                        email: m.email,
                        status: o.status,
                        payment: o.payment,
                        member_notes: o.member_notes
                    });
                }
            })

        })
        setAllData(data)
    }

    const getNewData = () => {
        let data = [];
        orders.forEach(o => {
            if (o.status === 0 || o.status === 1) {
                members.forEach(m => {
                    if (m._id === o.member_id) {
                        data.push({
                            id: o._id,
                            name: m.first_name + " " + m.last_name,
                            address: m.street + " " + m.house_number + " " + m.city,
                            phone: m.phone,
                            orderData: o.order_data,
                            date: o.date,
                            packCounter: o.pack_counter,
                            orderId: o._id,
                            email: m.email,
                            status: o.status,
                            payment: o.payment,
                            member_notes: o.member_notes
                        });
                    }
                })
            }
        })
        setAllData(data)
    }




    const allOrders = () => {
        orders.map(item => {
            return <tr key={item._id} orders={orders} />
        })
    }


    const updateStatus = (id, status) => {
        orders.forEach(o => {
            if (o._id === id) {
                o.status = status

                adminOrdersUtils.updateOrder(o._id, o)
                if (o.status === "3") {
                    members.forEach(m => {
                        if (m._id === o.member_id) {
                            m.orders_counter = m.orders_counter - 1
                            memberUtils.updateMember(m, m._id)

                        }
                    })
                }
            }
        })
    }
    const updatePayment = (id, payment) => {
        orders.forEach(o => {
            if (o._id === id) {

                o.payment = payment
                adminOrdersUtils.updateOrder(o._id, o)

            }
        })
    }

    const getRoutes = () => {
        optimoRouteAPI.getRoutes().then(data => {
            let r = []
            console.log(data)
            data.forEach(element => {
                r.push(element.address)

            });
            setRoutes(r)
        })

    }
    const orderByRoutes = () => {

        allData.forEach(d => {
            routes.forEach(r => {
                if (d.address === r) {
                    console.log(d.address)
                }
            })
        })

    }

    return (
        <div  >
            <button onClick={getAllData}>Get all</button>
            <button onClick={getNewData}>Get new orders</button>

            <Table
                className="text-right"
                border="secondary"
                style={{ width: '90%' }}
                striped
                bordered
                hover
                size="sm">
                <thead>
                    <tr>
                        <th>תשלום</th>
                        <th>סטטוס</th>
                        <th>תאריך</th>
                        <th>שם מלא</th>
                        <th>מספר נייד</th>
                        <th>כתובת</th>
                        <th>פריטים להזמנה</th>
                        <th>הערות</th>
                        <th>הודעה</th>
                    </tr>
                </thead>
                <tbody>
                    {allData.map(item => {
                        return <tr key={item.id}   >
                            <td>
                                <select onChange={e => updatePayment(item.id, e.target.value)} defaultValue={item.payment}>
                                    <option value="0">בתהליך</option>
                                    <option value="1">מזומן</option>
                                    <option value="2">paybox/bit</option>
                                    <option value="3">לא שולם</option>
                                </select>
                            </td>
                            <td>
                                <select onChange={e => updateStatus(item.id, e.target.value)} defaultValue={item.status}>
                                    <option value="0">התקבל</option>
                                    <option value="1">בתהליך</option>
                                    <option value="2">בוצע</option>
                                    <option value="3">בוטל</option>
                                </select>
                            </td>
                            <td>{item.date}</td>
                            <td>{item.name}</td>
                            <td>{item.phone}</td>
                            <td>{item.address}</td>


                            {item.orderData.map((od) => {
                                return <tr key={od._id}>
                                    <td
                                        onClick={e => e.target.style.backgroundColor = "#83fca4"}
                                        onDoubleClick={e => e.target.style.backgroundColor = ""}
                                        style={{ backgroundColor: "" }}>
                                        {od.shelf_number + " " + od.tracking_number}
                                    </td>
                                </tr>

                            })}

                            <td>{item.member_notes}</td>
                            <td>  <Button onClick={e => setShow(true)} size="sm" variant="outline-success"><HiOutlineChat /></Button> </td>
                        </tr>
                    })}

                </tbody>
            </Table>
            
                {/* <MessageComp style={{display: show? 'none' :'block'}} data={show} func={setShow} /> */}
           
            <button onClick={e => getRoutes()}>get routes</button>
            <button onClick={e => orderByRoutes()} >sort</button>


        </div>
    );
}

export default AllOrdersComp;
