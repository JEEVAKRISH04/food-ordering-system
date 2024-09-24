import React from 'react';
import Cart from './Cart';
import CustomerNavbar from './CustomerNavbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCircle} from '@fortawesome/free-regular-svg-icons'
import { Outlet } from 'react-router-dom';
import { useParams} from 'react-router-dom';


function Checkout() {
    const {id} = useParams();
    return ( 
        <div>
            <CustomerNavbar/>
            <div className="d-flex justify-content-center">
                    <div style={{width:"50%"}}>
                        <Cart/>
                    </div>
                    <div style={{width:"50%",background:"white",height:'88vh'}}>
                        <center className='pt-3 pb-2' style={{ borderBottom:'1px solid rgb(213, 213, 213)'}}>
                            <h3>ORDER STATUS</h3>
                        </center>
                        <div className="d-flex flex-column align-items-center m-4">

                            {(id>0)?<div className='d-flex'>
                                <h4 style={{color:"blue"}}>Address</h4>
                                <div className="mx-2 d-flex align-items-center">
                                    <FontAwesomeIcon style={{color:"blue",background:'blue',borderRadius:"50%",}} icon={faCircle} />
                                    <div style={{height:"3px",width:"300px",background:"blue"}}></div>
                                    <FontAwesomeIcon style={{color:"blue"}} icon={faCircle} />
                                </div>
                                <h4 style={{color:"blue"}}>Payment</h4>
                            </div>:<div className='d-flex'>
                                <h4 style={{color:"blue"}}>Address</h4>
                                <div className="mx-2 d-flex align-items-center">
                                    <FontAwesomeIcon style={{color:"blue"}} icon={faCircle} />
                                   <div style={{height:"2px",width:"300px",background:"gray"}}></div>
                                    <FontAwesomeIcon icon={faCircle} />
                                </div>
                                <h4>Payment</h4>
                            </div>
                            }

                            <div className='mt-4'>
                                <Outlet/>
                            </div>
                        </div>
                    </div>

            </div>
        </div>
     );
} 

export default Checkout; 