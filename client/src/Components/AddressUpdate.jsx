import React from 'react'
import { useState,useEffect } from 'react';
import { useParams ,useNavigate,Link} from 'react-router-dom';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons'


function AddressUpdate() {

    const {id} = useParams();

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [phoneNumber,setPhoneNumber] = useState('');
    const [city,setCity] = useState('');
    const [state,setState] = useState('');

    const navigate = useNavigate();

    useEffect(()=>{
        axios.get('http://localhost:5555/geteditaddress/'+id)
        .then(res=>{
            setName(res.data[0].customername);
            setEmail(res.data[0].mail);
            setPhoneNumber(res.data[0].phnum);
            setCity(res.data[0].city);
            setState(res.data[0].state);
        }) 
        .catch(err=>console.log(err))
    },[]);
    
    const handleUpdate = (e) =>{
        e.preventDefault();
        axios.put('http://localhost:5555/editaddress/'+id,{name,email,phoneNumber,city,state})
        .then(res=>{
            if(res.data.updated){
                alert('Updated')
            }
            else{
                alert('not updated')
            }
        })
        navigate('/checkout')
    }

    console.log(name);

    return ( 
        <div className='d-flex align-items-center flex-column'>
            <form onSubmit={handleUpdate} style={{width:'33rem'}}>
                        <h5 className='text-primary mb-4'>UPDATE ADDRESS <FontAwesomeIcon className='ms-2 ' style={{cursor:'pointer',color:'blue',fontSize:'1.4rem'}} icon={faPenToSquare} /></h5>
                        <div className='d-flex flex-column mt-2'>
                            <label >Name</label>
                            <input value={name} onChange={(e)=>setName(e.target.value)} type="text" placeholder='enter your name' required/>
                        </div>
                        <div className='d-flex flex-column my-4'>
                            <label>Email</label>
                            <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder='enter your email' required/>
                        </div>
                        <div className='d-flex flex-column my-4'>
                            <label>PhoneNumber</label>
                            <input value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)} type="text" placeholder='enter your phonenumber' required/>
                        </div>
                        <div className='d-flex justify-content-between my-4'>
                            <div className="d-flex flex-column">
                                <label className='label'>City</label>
                                <input value={city} style={{width:'14.5rem'}} onChange={(e)=>setCity(e.target.value)} type="text" placeholder='enter your city' required/>
                            </div>
                            <div className="d-flex flex-column">
                                <label className='label'>State</label>
                                <input value={state} style={{width:'14.5rem'}} onChange={(e)=>setState(e.target.value)} type="text" placeholder='enter your state' required/>
                            </div>
                        </div>
                        
                        <div style={{marginTop:'2.6rem'}} className="d-flex justify-content-center">
                            <Link to={'/checkout'}>
                                <h3 className='btn btn-primary me-2'>
                                <FontAwesomeIcon className='me-1' icon={faAnglesLeft} />
                                Back
                            </h3>
                            </Link>
                            <button type='submit' className="btn btn-primary ">
                            UPDATE ADDRESS
                            </button>
                        </div>
                    </form>
        </div>
     );
}

export default AddressUpdate;