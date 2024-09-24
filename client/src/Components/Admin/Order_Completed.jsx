import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Order_Completed = () => {
    const [orderDetails, setOrderDetails] = useState([]);

    useEffect(() => {
    fetchOrderDetails();
    }, []);

    const fetchOrderDetails = async () => {
    try {
        const response = await axios.get('http://localhost:5555/fetchorderdetails');
        setOrderDetails(response.data);
    } catch (error) {
        console.error(error);
    }
    };

    return (
    <div >
        <center className='my-4'><h2>ORDERS COMPLETED</h2></center>
        <div style={{overflow:'hidden',display:'flex'}}>
            <div className='d-flex justify-content-center' style={{width:'100%',maxHeight:'73vh'}}>
                <div style={{maxHeight:'95vh',width:'80%',background:'white',overflowY:'scroll',scrollBehavior:'smooth'}}>
                    {(orderDetails.length>0)?<table>
                    <thead>
                        <th>CustomerID</th>
                        <th>Menu</th>
                        <th>Menuitem</th>
                        <th>Quantity</th>
                        <th>Ordered_datetime</th>
                        <th style={{textAlign:"center"}}>Status</th>
                    </thead>
                    <tbody>
                    {orderDetails.map((order) => (
                        (order.makingStatus=="success")?<tr>
                        <td>
                            {order.customerID}
                        </td>
                        <td>
                            {order.menuname}
                        </td>
                        <td>
                            {order.menuitem}
                        </td>
                        <td>
                            {order.quantity}
                        </td>
                        <td>
                            {order.ordered_datetime}
                        </td>
                        <td style={{display:'flex',alignItems:'center'}}>
                            <button className='btn btn-success'>Completed</button>
                        </td>
                    </tr>:''
                    ))}
                    </tbody>
                    </table>:
                    <div className='d-flex justify-content-center align-items-center flex-column'>
                        <h4 className='mt-5 pt-5'>Ouch! There is no Order Done</h4>
                    </div>
                    }
                </div>
            </div>
        </div>
    </div>
    );
};

export default Order_Completed;