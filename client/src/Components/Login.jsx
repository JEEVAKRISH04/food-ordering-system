import React from 'react'
import { Link } from 'react-router-dom'
import CustomerNavbar from './CustomerNavbar'

function Login() {
  return ( 
    <div>
        <CustomerNavbar/>
        <section  className='d-flex justify-content-center mt-2 pt-5'>
            <div className='bg-white' style={{borderRadius:'7px', width:'500px',height:'450px'}}>
                <form action="" className='py-3 px-5'>
                    <h3 className='text-center mt-3'>LOG IN</h3>
                    <div className='d-flex flex-column my-3'>
                        <label className='label my-2'><h6>Email</h6></label>
                        <input type="email" placeholder='enter email or phone number' required/>
                    </div>
                    <div className='d-flex flex-column my-3'>
                        <label className='label my-2'><h6>Password</h6></label>
                        <input type="password" placeholder='enter password' required/>
                    </div>
                    <center>
                        <button className='btn btn-primary mt-3 mb-4'>LOG IN</button>
                        <div>
                            <Link to='/forgettenpassword'>Forget Password ?</Link>
                            <p className='mt-2'>Don't have an account ? <Link to="/signup">Sign up</Link> </p>
                        </div>
                    </center>

                </form>
            </div>
        </section>
    </div>
  )
}

export default Login