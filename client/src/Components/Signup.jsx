import React from 'react'
import CustomerNavbar from './CustomerNavbar'
import { Link } from 'react-router-dom'

function Signup() {
    
  return (
    <div>
        <CustomerNavbar/>
        <section  className='d-flex justify-content-center mt-2 pt-5'>
            <div className='bg-white' style={{borderRadius:'7px', width:'500px',height:'550px'}}>
                <form action="" className='py-3 px-5'>
                    <h4 className='text-center mt-3'>SIGN UP</h4>
                    <div className='d-flex flex-column my-2'>
                        <label className='label mb-2'><h6>User Name</h6></label>
                        <input type="name" placeholder='enter username' required/>
                    </div>
                    <div className="d-flex">
                        <div className='d-flex flex-column my-2 me-2'>
                            <label className='label mb-2'><h6>Email</h6></label>
                            <input type="email" placeholder='enter email' required/>
                        </div>
                        <div className='d-flex flex-column my-2'>
                            <label className='label mb-2'><h6>Phone Number</h6></label>
                            <input type='number' placeholder='enter phone number' required/>
                        </div>
                    </div>
                    <div className='d-flex flex-column my-2'>
                        <label className='label mb-2'><h6>Address</h6></label>
                        <input type='text' placeholder='enter Address' required/>
                    </div>
                    <div className="d-flex">
                        <div className='d-flex flex-column my-2 me-2'>
                            <label className='label mb-2'><h6>Password</h6></label>
                            <input type='password' placeholder='enter password' required/>
                        </div>
                        <div className='d-flex flex-column my-2'>
                            <label className='label mb-2'><h6>Confirm password</h6></label>
                            <input type='password' placeholder='enter confirm password' required/>
                        </div>
                    </div>
                    <center>
                        <button className='btn btn-primary mt-4'>LOG IN</button>
                        <p className='mt-4'>Already have an account ? <Link to="/login">Log in</Link> </p>
                    </center>
                </form>
            </div>
        </section>
    </div>
  )
}

export default Signup