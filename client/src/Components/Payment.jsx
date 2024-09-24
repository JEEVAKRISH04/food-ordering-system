import React, { useState,useEffect } from 'react'
import {Link, useParams,useNavigate} from 'react-router-dom'
import axios from 'axios';
import netbankingImg from '../assests/images/netbanking.png'
import upiImg from '../assests/images/UPI.png'
import cardImg from '../assests/images/card.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faRetweet,faHandHoldingDollar} from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2';
import Summary from './Summary';

function Payment() {
    const {id} = useParams();
    const [value,setValue] = useState(null);
    const[isclicked,setisclicked] = useState(false);
    const[paymentMode,setPaymentMode] = useState('');

    const [cart,setCart]= useState([]);

    const navigate = useNavigate();

    useEffect(()=>{
        axios.get('http://localhost:5555/cartdata')
        .then(res=>setCart(res.data))
        .catch(err=>console.log(err))
    },[])

    const [address,setAddress] = useState([]);

    useEffect(()=>{
        axios.get(`http://localhost:5555/customerexistingaddressforpayment/${id}`)
        .then(res=>setAddress(res.data))
        .catch(err=>console.log(err))
    },[]);

    const handlepay = (e)=>{
        e.preventDefault();
        const cusID = 1011;
        const makingStatus = 'pending';
        if(cart.length>0){
            axios.post('http://localhost:5555/orderdetails' , {cart,paymentMode,cusID,makingStatus});
            axios.post('http://localhost:5555/handleResetCart');
            Swal.fire({
                icon: 'success',
                title: '🥳 ORDER PLACED 🥳',
                text: 'Continue Shopping To Extra Discounts',
                footer: '<h5>Check order status in "My Orders" </h5>'
            })
        }
        else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            })
        }
        navigate('/');

    }

    console.log("--> "+value);
    return (  
        <div style={{width:'33rem'}}>
    
            <label className='d-flex py-2 px-3' style={{border:'1px solid rgb(213, 213, 213)'}}>
                {
                    address.map(m=>
                        <div>
                            <div className='d-flex '>
                                <div>
                                    <div className='d-flex'>
                                        <b className='me-1'>{m.customername},</b>
                                        <p className='me-1'>{m.mail},</p>
                                        <p className='me-1'>{m.phnum},</p>
                                    </div>
                                    <div className="d-flex">
                                            <p className='me-1'>{m.city},</p>
                                            <p>{m.state}.</p>
                                            <div className='ms-3'>
                                            <Link to={"/checkout"}><FontAwesomeIcon className='me-4' style={{cursor:'pointer',color:'blue',fontSize:'1.6rem'}} icon={faRetweet} /></Link> 
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    )
                }
            </label>

            {/* <center className='mt-3'>
                <h3>Payment</h3>
                <h5>Choose payment method below</h5>
            </center> */}
           
            <div className='d-flex flex-column mt-4'>
                <form onSubmit={handlepay} className='d-flex flex-column' action="">

                    <label style={{cursor:'pointer',marginBottom:'1.3rem'}}>
                        <div className="d-flex align-items-center ">
                            <input className=' me-4' onChange={(e)=>setPaymentMode(e.target.value)} type="radio" value="upi" name="address" required />
                            <h6 style={{fontSize:'1.15rem'}}>GPay, Phonepy and all UPI's </h6><span className='ms-2'>(All type of UPI available)</span>
                        </div>
                        <img style={{width:'13rem',marginLeft:'2.5rem'}} src={upiImg} alt="" />
                    </label>

                    <label style={{cursor:'pointer',marginBottom:'1.3rem'}}>
                        <div className="d-flex align-items-center">
                            <input className=' me-4' type="radio" onChange={(e)=>setPaymentMode(e.target.value)} value="card" name="address" required />
                            <h6 style={{fontSize:'1.15rem'}}>Credit / Debit / ATM Card </h6><span className='ms-2'>(All type of card accepted)</span>
                        </div>
                        <img style={{width:'13rem',marginLeft:'2.5rem'}} src={cardImg} alt="" />
                    </label>

                    <label style={{cursor:'pointer',marginBottom:'1.3rem'}}>
                        <div className='d-flex align-items-center'>
                            <input className=' me-4' type="radio" onChange={(e)=>setPaymentMode(e.target.value)} value="cod" name="address" required />
                            <h6 style={{fontSize:'1.15rem'}}>Cash On Delivery</h6>
                        </div>
                        <p style={{marginLeft:'2.5rem'}}>(use online payment to get extra rewards)</p>
                    </label>

                    <p className='' style={{textAlign:'center'}}>
                        <button type='submit' className="px-3 btn btn-primary">
                            Pay <FontAwesomeIcon icon={faHandHoldingDollar} />
                        </button>
                    </p>
                    
                </form>
                
            </div>

        </div>
     );
}

export default Payment;