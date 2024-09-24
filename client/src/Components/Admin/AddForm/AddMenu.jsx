import axios from 'axios';
import React, { useState } from 'react'

function AddMenu() {
  const [menuname, setMenuName] = useState('');
  const [menudescription, setMenuDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      menuname: menuname,
      menudescription: menudescription
    };
  
    axios.post('http://localhost:5555/addmenu', data)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
      alert("Added !")
      window.location.reload();
  };
  
  return (
    <div>
      <center>
        <h5 style={{color:'orange'}} className='py-4 light-border'><b>ADD MENU FORM</b></h5>
      </center>
      <form action="" className='mt-4 d-flex justify-content-center'>
        <div>
          <div className="pro mb-2" style={{width:'500px'}}>
              <label htmlFor="">Menu Name</label>
              <input onChange={(e)=>setMenuName(e.target.value)} type="text" placeholder='Pizza' required/>
          </div>
          <div className="pro mt-3" style={{width:'500px'}}>
              <label htmlFor="">Menu Description</label>
              <input required onChange={(e)=>setMenuDescription(e.target.value)} type="text" placeholder='Description' />
          </div>
          <center><button onClick={handleSubmit} className='btn btn-primary mt-4'>ADD NOW</button></center>
        </div>
      </form>
    </div>
  )
}

export default AddMenu