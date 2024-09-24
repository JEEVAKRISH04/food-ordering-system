import React, { useEffect, useState ,useReducer} from 'react'
import axios from 'axios'
import {useNavigate,Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan,faPenToSquare } from '@fortawesome/free-regular-svg-icons'


function Address() {
    const [id,setId] = useState(1);

    const [flag,setFlag] = useState(0);

    const [address,setAddress] = useState([]);

    const [reducerValue,forceUpdate] = useReducer(x => x + 1,0);

    const navigate = useNavigate();

    useEffect(()=>{
        axios.get('http://localhost:5555/customerexistingaddress')
        .then(res=>setAddress(res.data))
        .catch(err=>console.log(err))
    },[reducerValue]);

    const handlenavigate = (e) =>{
        e.preventDefault();
        navigate('/checkout/payment/'+id)
    }
 
    const handleDelete = (id)=>{
        setId(id);
        axios.delete(`http://localhost:5555/deleteaddress/${id}`)
        .then(res=>console.log(res.data))
        .catch(err=>console.log(err))
        forceUpdate()       
    }

    console.log(id);

    return ( 
        <div className=' pb-4 d-flex align-items-center flex-column'>
            {
                (address.length>0 && flag ==0)?
                <div>      
                    <h5 className='text-primary mb-4'>Existing Address</h5>
                    <form  onSubmit={handlenavigate} action="" >           
                        <div style={{maxHeight:'19rem', width:'33rem', overflow:'hidden',overflowY:'scroll'}}>
                            {
                            address.map(m=>
                                    <label className='d-flex justify-content-between my-2' style={{borderBottom:'1px solid rgb(213, 213, 213)'}}>
                                        <div className='d-flex' style={{cursor:"pointer"}}>
                                            <input onChange={(e)=>setId(e.target.value)} className=' me-3' type="radio" name="address" value={m.customerID} required />
                                            <div className='d-flex flex-column'>
                                                <b className='me-1'>{m.customername},</b>
                                                <p className='me-1'>{m.mail},</p>
                                                <p className='me-1'>{m.phnum},</p>
                                                <div className="d-flex">
                                                    <p className='me-1'>{m.city},</p>
                                                    <p>{m.state}.</p>
                                                </div>
                                            </div>
                            
                                        </div>
                                        <div className='ms-5 ps-5'>
                                            <Link to={`/checkout/addressupdate/${m.customerID}`}><FontAwesomeIcon className='me-4' style={{cursor:'pointer',color:'blue',fontSize:'1.3rem'}} icon={faPenToSquare} /></Link>
                                            <FontAwesomeIcon className='me-4' onClick={()=>handleDelete(m.customerID)} style={{cursor:'pointer',color:'red',fontSize:'1.3rem'}} icon={faTrashCan} />    
                                        </div>
                                    </label>
                            )}
                        </div>
                        
                    {
                        (address.length>3)?<h6 onClick={()=>alert(`already ${address.length} address available. Delete and use`)} style={{cursor:'pointer'}} className='text-primary'>+ Add New Address</h6>:<h6 onClick={()=>setFlag(1)} style={{cursor:'pointer'}} className='text-primary'>+ Add New Address</h6>
                    }
                    <div className="d-flex mt-4 justify-content-center">
                            <button type='submit' className="btn btn-primary ">
                            CONFIRM ADDRESS
                            </button>
                        </div>
                    </form>  
                </div>:
                navigate('/checkout/newAddress')
            }   
        </div>
     );
}

export default Address;