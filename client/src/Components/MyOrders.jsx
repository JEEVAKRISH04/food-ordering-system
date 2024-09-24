import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CustomerNavbar from './CustomerNavbar';

const MyOrders = () => {
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
        <CustomerNavbar/>
        <center className='my-5'><h2>MY ORDERS</h2></center>
        <div style={{overflow:'hidden',display:'flex'}}>
            <div className='d-flex justify-content-center' style={{width:'100%',maxHeight:'75vh'}}>
                <div style={{maxHeight:'95vh',width:'80%',background:'white',overflowY:'scroll',scrollBehavior:'smooth'}}>
                    {(orderDetails.length>0)?<table>
                    <thead>
                        <th>Menu</th>
                        <th>Menuitem</th>
                        <th>Quantity</th>
                        <th>Ordered_datetime</th>
                    </thead>
                    <tbody>
                    {orderDetails.map((order) => (
                        <tr>
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
                        </tr>
                    ))}
                    </tbody>
                    </table>:
                    <div className='d-flex justify-content-center align-items-center flex-column'>
                        <h4 className='mt-5 pt-5'>Ouch! There is no previous Order</h4>
                        <Link to="/"><button className='btn btn-primary my-4'>Order Now</button></Link>
                        <p className='mb-5 pb-5'>Big sale is ON! Keep Order</p>
                    </div>
                    }
                </div>
            </div>
        </div>
    </div>
    );
};

export default MyOrders;