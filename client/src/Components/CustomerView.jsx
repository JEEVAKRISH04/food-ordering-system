import React,{useEffect, useReducer, useState} from 'react';
import {Accordion, Navbar} from 'react-bootstrap';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash,faUser, faTruckFast} from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'

// sweetalert
import Swal from 'sweetalert2';
import CustomerNavbar from './CustomerNavbar';

function CustomerView() {

    //------------ menucard 

    const [reducerValue,forceUpdate] = useReducer(x => x + 1,0);
    
    const[menu,setMenu] = useState([]);
    const [menuitem,setMenuItem] = useState([]);
    
    const [cart,setCart]= useState([]);

    const [confirmationstatus, setconfirmationstatus] = useState(false);
    
    const menuname = '';

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

    function handleAdd(item) {
        if(cart.find(k=>k.menuitemid===item.menuitemsid)){
            
            let timerInterval
            Swal.fire({
            title: 'Please Check cart',
            text: `"${item.menuitem}" is already in cart`,
            timer: 4000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                b.textContent = Swal.getTimerLeft()
                }, 100)
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
            }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log('I was closed by the timer')
            }
            })
            return;
        }
        else{
        axios.post('http://localhost:5555/cart',{menuid:item.menuid, menuitemid:item.menuitemsid, menuname:item.menuitem, price:item.price, quantity:item.quantity,count:1, image:item.image})
        .then(res=>res)
        .catch(err=>console.log(err))
        }
        forceUpdate()
        if(confirmationstatus===false){
            setconfirmationstatus(true);
            setTimeout(() => {
                setconfirmationstatus(false);
                
            }, 2000);
        }
                   
    }

    //-----------cart items

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
        
        axios.delete(`http://localhost:5555/cartdelete/${id}`)
        .then(res=>console.log(res.data))
        .catch(err=>console.log(err))
        forceUpdate()
        
    }
    function handlePrice(){
        let amount = 0;
        cart.map(m=>amount+=m.price*m.count)
        return amount;
    }

    function clearAllCartValue(){
        axios.post('http://localhost:5555/handleResetCart')
        .then(res=>console.log(res.data))
        .catch(err=>console.log(err))
        forceUpdate()
    }

    console.log(menu);
    console.log(menuitem);

    return ( 
        <div className="mainclass">

            <CustomerNavbar/>
            
            <main style={{overflow:'hidden',display:'flex'}}>
                {/*------Menu List -------*/}
                <div style={{width:'60%',maxHeight:'88.5vh'}} className="">
                <div >
                <div style={{maxHeight:'90vh',background:'white',overflowY:'scroll',scrollBehavior:'smooth'}}>

                    <div style={{borderBottom:'1px solid rgb(213, 213, 213)',position:'sticky',top:'0%',zIndex:'33',paddingLeft:"1rem"}} className='d-flex justify-content-between align-items-center bg-white'>
                        <h3 className=' py-3' style={{color:'orangered'}}>
                            MENU LIST
                        </h3>
                        {(confirmationstatus===true)?<p className='successfullanimation'>Successfully added 🥳</p>:''}
                    </div>
                    
                    {menu.map(m=>
                    <Accordion className='py-2 px-2' >
                    <Accordion.Item>
                            <Accordion.Header>{m.menuname}</Accordion.Header>
                            {menuitem.map(n=>
                                (m.menuid==n.menuid)?<Accordion.Body  style={{display:'flex',justifyContent:'space-between ',textAlign:'start',alignItems:'center',borderBottom:'1px solid rgb(213, 213, 213)'}} className='p-2' key={n.id}>
                                <div style={{display:'flex',alignItems:'center',width:'400px',marginLeft:"1rem"}} >
                                    <img style={{height:'3.5rem',borderRadius:'50%',width:'3.5rem'}} src={'http://localhost:5555/images/'+n.image} alt="" />
                                    <div style={{fontSize:'1.1rem', marginLeft:'1.5rem',display:'flex',justifyContent:'space-between',width:'20rem'}}>
                                        <b>{n.menuitem}</b>
                                        <b>{n.price}</b>
                                    </div>
                                </div>
                                <button style={{background:'#609dfe'}} onClick={()=>handleAdd(n)} className="btn">ADD</button>
                            </Accordion.Body>:''
                            )}
                        </Accordion.Item>
                    </Accordion>
                    )}
                </div>
            </div>
            
                </div>
            
                {/*------Cart Items -------*/}
                <div style={{width:'40%',maxHeight:'88.5vh'}} className="">
            
                <div className="border">
                <div className="head py-2 px-4">
                    <div> 
                        <h5>Your Order</h5>
                        <h6 style={{fontSize:'1.4rem'}}>
                            <b>"{cart.length}"</b> items
                        </h6>
                    </div>
                    <u onClick={()=>clearAllCartValue()} style={{cursor:"pointer",marginTop:'2rem',fontWeight:'bolder'}}>Clear all</u>
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
                                                <p>(₹ {(item.price)*(item.count)})</p>
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
                    <div  className="item pt-3 d-flex justify-content-between">
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
                    <p style={{textAlign:"end"}}>
                        <Link  to='/checkout' className='mb-3 me-3'><button className='btn btn-primary'>Checkout Order</button></Link>
                    </p>
                    </div>:<div className='py-5 my-2' style={{textAlign:'center'}}>
                    <h2><b>Ouch !!!</b></h2><h4>Your cart is Empty</h4> <h6 className='mt-4 text-primary'>*** Choose your favorite food ***</h6></div>
                    }
            </div>
             
                </div>
            </main>
        </div>
     );
}

export default CustomerView;