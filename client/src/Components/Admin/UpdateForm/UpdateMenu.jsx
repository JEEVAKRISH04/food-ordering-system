import axios from 'axios';
import React, { useEffect, useState } from 'react'

function UpdateMenu(props) {
  const { menuID } = props;
  const [menuname, setMenuName] = useState('');
  const [menudescription, setMenuDescription] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5555/desireddata1/' + menuID)
      .then(res => {
        setMenuName(res.data.menuname);
        setMenuDescription(res.data.menudescription);
      })
      .catch(err => console.log(err));
  }, [menuID]);

  const handleUpdate = (e) => {
    e.preventDefault();
  
    const data = {
      menuname: menuname,
      menudescription: menudescription,
      menuID: menuID
    };
  
    axios.put('http://localhost:5555/updatemenu', data)
      .then(res => {
        console.log(res.data);
        alert("Updated !");
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div>
      <center>
        <h5 style={{color:'orange'}} className='py-4 light-border'><b>UPDATE MENU FORM</b></h5>
      </center>
      <form action="" className='mt-4 d-flex justify-content-center'>
        <div>
          <div className="pro mb-2" style={{width:'500px'}}>
              <label htmlFor="">Menu Name</label>
              <input value={menuname} onChange={(e)=>setMenuName(e.target.value)} type="text" placeholder='Pizza' required/>
          </div>
          <div className="pro mt-3" style={{width:'500px'}}>
              <label htmlFor="">Menu Description</label>
              <input value={menudescription} onChange={(e)=>setMenuDescription(e.target.value)} type="text" placeholder='Description' required />
          </div>
          <center><button onClick={handleUpdate} className='btn btn-primary mt-4'>UPDATE NOW</button></center>
        </div>
      </form>
    </div>
  )
}

export default UpdateMenu;
