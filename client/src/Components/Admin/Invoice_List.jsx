import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

function Invoice_list() {
    return ( 
        <main className='s-l'>
            <div style={{letterSpacing:'2px'}} className='pb-3 ps-4'>
                <FontAwesomeIcon style={{color:'orange'}} icon={faHouse} />
                <span style={{color:'black'}}> / Invoice </span>
            </div>
            <div className='py-3 px-4 '>
            <h5 className='pb-3 mb-4 light-border'><b>INVOICE LIST</b></h5>
            <table className="table">
                <thead style={{background:'orange',color:'white'}}>
                    <tr>
                        <th>Invoice ID</th>
                        <th>Order Name</th>
                        <th>Order ID</th>
                        <th>Invoice Date</th>
                        <th>Quantity</th>
                        <th>Total Bill</th> 
                        <th>Send Invoice</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>12345</td>
                        <td>ABC</td>
                        <td>98765</td>
                        <td>30/04/2023</td>
                        <td>2</td>
                        <td>300</td>
                        <td>
                            <FontAwesomeIcon icon={faPaperPlane} style={{color: "#17823c",}} />
                            <FontAwesomeIcon icon={faTrashCan} style={{color: "#ff2424",}} />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        </main>
     );
}

export default Invoice_list;