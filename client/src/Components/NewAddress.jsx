import React, { useEffect, useState ,useReducer} from 'react'
import axios from 'axios'
import {useNavigate,Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons'

function NewAddress() {

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [phoneNumber,setPhoneNumber] = useState('');
    const [city,setCity] = useState('');
    const [state,setState] = useState('');

    const [address,setAddress] = useState([]);

    const navigate = useNavigate();

    useEffect(()=>{
        axios.get('http://localhost:5555/customerexistingaddress')
        .then(res=>setAddress(res.data))
        .catch(err=>console.log(err))
    });

    const handleSubmit = (e) =>{
        e.preventDefault();
        axios.post('http://localhost:5555/customeraddress',{name,email,phoneNumber,city,state})
        .then(res=>res)
        .catch(err=>console.log(err))
        navigate('/checkout')
    }

    const backToAddress = () =>{
        navigate('/checkout')
    }
  return (
    <div>
        <form onSubmit={handleSubmit} style={{width:'33rem'}}>
            <h5 className='text-primary mb-3'>Add new Address :</h5>
            <div className='d-flex flex-column mt-2'>
                <label className='label'>Name</label>
                <input onChange={(e)=>setName(e.target.value)} type="text" placeholder='enter your name' required/>
            </div>
            <div className='d-flex flex-column my-3'>
                <label className='label'>Email</label>
                <input onChange={(e)=>setEmail(e.target.value)} type="email" placeholder='enter your email' required/>
            </div>
            <div className='d-flex flex-column my-3'>
                <label className='label'>PhoneNumber</label>
                <input onChange={(e)=>setPhoneNumber(e.target.value)} type="text" placeholder='enter your phonenumber' required/>
            </div>
            <div className='d-flex justify-content-between my-3'>
                <div className="d-flex flex-column">
                    <label className='label'>City</label>
                    <input style={{width:'14.5rem'}} onChange={(e)=>setCity(e.target.value)} type="text" placeholder='enter your city' required/>
                </div>
                <div className="d-flex flex-column">
                    <label className='label'>State</label>
                    <input style={{width:'14.5rem'}} onChange={(e)=>setState(e.target.value)} type="text" placeholder='enter your state' required/>
                </div>
            </div>
            
            {
                (address.length>0)?<h6 onClick={()=>backToAddress()} style={{cursor:'pointer'}} className='text-primary my-4'><u>Use Existing Address</u></h6>:''
            }
            <div className="d-flex mt-3 justify-content-center">
                <Link to={'/checkout'}>
                    <h3 className='btn btn-primary me-2'>
                        <FontAwesomeIcon className='me-1' icon={faAnglesLeft} />
                        Back
                    </h3>
                </Link>
                <button type='submit' className="btn btn-primary ">
                CONFIRM ADDRESS
                </button>
            </div>      
        </form>
    </div>
  )
}

export default NewAddress