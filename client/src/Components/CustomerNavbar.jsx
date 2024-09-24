import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash,faUser, faTruckFast} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

function CustomerNavbar() {

    const [accountSts,setAccountSts] = useState("guest");

    console.log(accountSts);

    return (
    <nav>
        <div style={{background:"orange",padding:"18px 0"}}>
            <div className="d-flex justify-content-between align-items-center px-4">
                <div className="logo">
                    <FontAwesomeIcon style={{height:"30px"}} icon={faTruckFast} /> <b style={{fontSize:'2rem'}}>FOODIE</b>
                </div>
                <div className='d-flex align-items-center'>
                    {(accountSts=="guest")?<div>
                        <Link onClick={()=>setAccountSts('login')} to="/loginx"><button className='btn btn-primary me-3'>LOGIN</button></Link>
                        <Link onClick={()=>setAccountSts('signup')} to="/signup"><button className='btn' style={{background:'white'}}>SIGNUP</button></Link>
                    </div>:(accountSts=="login"||accountSts=="signup")?<Link onClick={()=>setAccountSts('signup')} to="/signup"><button className='btn' style={{background:'white'}}>SIGNUP</button></Link>:''}
                    
                    {/* <FontAwesomeIcon style={{height:"25px",marginRight:".3rem"}} icon={faUser} />
                    <b className='me-3'>My Account</b>
                    <Link to='/myorders'><div className="btn btn-primary">My Orders</div></Link> */}
                </div>
            </div>
        </div>
    </nav>
    )
}

export default CustomerNavbar