import React from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBarsStaggered,faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope,faBell } from '@fortawesome/free-regular-svg-icons'
import profile from '../../assests/images/profile.png'

function TopBar() {
    return ( 
        <div style={{height:'5rem'}} className='ps-5 py-4 bg-white'>
            <div className="d-flex justify-content-between">
                <FontAwesomeIcon className='fs-3' icon={faBarsStaggered} />
                <div className='d-flex align-items-center'>
                    <input style={{height:'2.8rem' ,width:'20rem',borderRadius:'1rem',outline:'1px solid black'}} type="search" name="" id="" placeholder='search...'/>
                    <FontAwesomeIcon style={{cursor:'pointer'}} className='fs-4 ms-2' icon={faMagnifyingGlass} />
                    <FontAwesomeIcon style={{cursor:'pointer'}} className='fs-3 ms-5' icon={faEnvelope} />
                    <FontAwesomeIcon style={{cursor:'pointer'}} className='fs-3 ms-5'  icon={faBell} />
                    <img style={{width:'2.2rem',height:'2.6rem'}} className=' mx-5'  src={profile}/>
                </div>
            </div>
        </div>
     );
}

export default TopBar;