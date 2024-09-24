import React,{useEffect, useReducer, useState} from 'react';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash ,faAnglesLeft} from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'

function Cart() {
    const [reducerValue,forceUpdate] = useReducer(x => x + 1,0);
    
    const[menu,setMenu] = useState([]);
    const [menuitem,setMenuItem] = useState([]);
    
    const [cart,setCart]= useState([]);

    useEffect(()=>{
        axios.get('http://localhost:5555/data')
        .then(res=>setMenuItem(res.data))
        .catch(err=>console.log(err))
    },[]);

    useEffect(()=>{
        axios.get('http://localhost:5555/cartdata')
        .then(res=>setCart(res.data))
        .catch(err=>console.log(err))
    },[reducerValue])

    useEffect(()=>{
        axios.get('http://localhost:5555/data1')
        .then(res=>setMenu(res.data))
        .catch(err=>console.log(err))
    },[]);

    function handleDecrement(itemId){
        const clone = [...cart];
        const itemIndex = clone.findIndex(item=>item.cartid===itemId);
        if(clone[itemIndex].count>1){
            axios.put('http://localhost:5555/cartdecrement/'+itemId)
            .then(res=>res)
            .catch(err=>console.log(err))
            forceUpdate()
        }
    }

    function handleIncrement(itemId){
        const clone = [...cart];
        const itemIndex = clone.findIndex(item=>item.cartid===itemId);
        if(clone[itemIndex].count<5){
            axios.put('http://localhost:5555/cartincrement/'+itemId)
            .then(res=>res)
            .catch(err=>console.log(err))
            forceUpdate()
        }
        else{
            alert("maximum 5 items allowed")
        }
    }
    const handleDelete = (id)=>{
        
        if(cart.length>1){
            axios.delete(`http://localhost:5555/cartdelete/${id}`)
            .then(res=>console.log(res.data))
            .catch(err=>console.log(err))
            forceUpdate()
        }
        else{
            alert("You need to keep atleast one item in your cart");
        }
        
    }
    function handlePrice(){
        let amount = 0;
        cart.map(m=>amount+=m.price*m.count)
        return amount;
    }

    return ( 
        <div className="border">
            <div className="head py-3 px-4">
                <h5>Your Order</h5>
                <h6 style={{fontSize:'1.4rem'}}>
                    <b>"{cart.length}"</b> items
                </h6>
            </div>

            {(cart.length>=1)?<div>
                <div className='py-1' style={{maxHeight:'40vh',overflow:'hidden',overflowY:'scroll'}}>
                
                    {cart.map(
                        item=>
                            <div className="d-flex  justify-content-between border p-3">
                                <div style={{width:'200x'}} className="d-flex w-75 align-items-center ">
                
                                    <div className='d-flex w-50'>
                                        <img src={'http://localhost:5555/images/'+item.image} style={{height:'2.5rem',borderRadius:'50%',width:'2.5rem'}} alt="" />
                
                                        <p className='ms-3'>{item.menuitem}</p>
                                    </div>
                                    <div className="d-flex w-50 ms-">
                                        <div className='ms-4'>
                                            <p>Qty : <b>{item.count}</b></p>
                                        </div>
                                        <div className='ms-2'>
                                            <p>({(item.price)*(item.count)})</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center'>
                                    <button onClick={()=>handleDecrement(item.cartid)} className='py-1 px-2 mx-2'>-</button>
                                    <button className="btn btn-primary  mx-2">
                                        {item.count}
                                    </button>
                                    <button onClick={()=>handleIncrement(item.cartid)}
                                        className='py-1 px-2 mx-2'>+</button>
                                        <FontAwesomeIcon className='mx-1' onClick={()=>handleDelete(item.cartid)} icon={faTrash} style={{color: "#c20000",height:'1.4rem',cursor:'pointer'}} />
                                </div>
                            </div>
                
                    )}
                </div>
                <div className="amount pt-1 p-3">
                <div  className="item pt-4 d-flex justify-content-between">
                    <h6>Total </h6>
                    <h6>₹ {handlePrice( )} </h6>
                </div>
                <div  className="item pt-3 d-flex justify-content-between">
                    <h6>Discount</h6>
                    <h6>₹ {handlePrice( )/ 10} </h6>
                </div>
                <small><b>(10% discount applied)*</b></small>
                <div  className="item pt-3 d-flex justify-content-between">
                    <h6>Delivery Charge</h6>
                    <h6>₹ 0 </h6>
                </div>
                <div  className="item pt-3 d-flex justify-content-between">
                    <h4 style={{fontWeight:"bolder"}}><b>Order Total</b></h4>
                    <h4 style={{fontWeight:"bolder"}}><b> ₹ {(handlePrice()) - (handlePrice())/ 10} </b></h4>
                </div>
                
                
                </div>
                <p style={{textAlign:"center"}}>
                    <Link  to='/' className='mb-3 me-3'>
                        <button className='btn btn-primary'>
                            <FontAwesomeIcon className='me-1' icon={faAnglesLeft} />
                            Order More
                        </button>
                    </Link>
                </p>
                </div>:<div className='py-5 my-2' style={{textAlign:'center'}}>
                <h2><b>Ouch !!!</b></h2><h4>Your cart is Empty</h4> <h6 className='mt-4 text-primary'>*** Choose your favorite food ***</h6></div>
                }
       
        </div>
     );
}

export default Cart;