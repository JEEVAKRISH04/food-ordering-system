import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
function Invoice_Details() {
    return ( 
        <div className='s-l'>
            <div className='pt-2 ps-4 pb-3' >
                <FontAwesomeIcon style={{color:'orange'}} icon={faHouse} /> 
                <span style={{color:'orange'}}> / Invoice </span>
                <span style={{color:'black'}}> / Invoice Details </span>
            </div>
            <div className=' px-4'>
                <div className="d-flex justify-content-between">
                    <div><h5>INVOICE BILL</h5></div>
                    <div>#78321</div>
                </div>
                <div className="d-flex justify-content-between">
                    <div>
                        <h2 className='pb-3'>Receiver : </h2>
                        <div className='pb-2'>
                            <h5 style={{fontWeight:'700'}}>Harry Potter</h5>
                            <p>harry@gmail.com</p>
                        </div>
                        <div className="address">
                            <h6 >115, Salem City, 637502</h6>
                            <h6>Tamilnadu</h6>
                            <h6>India</h6>
                        </div>
                    </div>
                    <div className='py-5'>
                        <div>
                            <p> <b>Invoice Date : </b>Monday, May 01 2023 </p>
                            <span></span>
                        </div>
                        <div>
                            <p> <b>Due Date : </b>Wednesday, May 03 2023</p>
                        </div>
                    </div>
                </div>
                <table className="table">
                    <thead style={{background:'rgb(213, 213, 213)'}}>
                        <tr>
                            <th>Id</th>
                            <th>Description</th>
                            <th>Qty</th>
                            <th>Unit Cost</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Grilled Sandwich</td>
                            <td>2</td>
                            <td>200</td>
                            <td>400</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Grilled Sandwich</td>
                            <td>2</td>
                            <td>200</td>
                            <td>400</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Grilled Sandwich</td>
                            <td>2</td>
                            <td>200</td>
                            <td>400</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Grilled Sandwich</td>
                            <td>2</td>
                            <td>200</td>
                            <td>400</td>
                        </tr>
                    </tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td><p className='pt-1'><b>Total Cost : </b></p></td>
                        <td><p className='pt-1'><b>2000</b></p></td>
                    </tr>
                </table>
                <div style={{marginTop:'-1.5rem'}} className="d-flex justify-content-end">
                    <button className="btn px-3 me-4" style={{background:'orange',height:'2.5rem',color:'white',cursor:'pointer'}}>Print Invoice</button>
                    <button className="btn px-3" style={{background:'orange',height:'2.5rem',color:'white',cursor:'pointer'}}>Send Invoice</button>
                </div>
            </div>
        </div>
     );
}

export default Invoice_Details;