import React from 'react';
import MenuCard from './Components/MenuCard'

import {Routes,Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'

import Dashboard from './Components/Admin/Dashboard';
import Invoice_list from './Components/Admin/Invoice_List';
import Invoice_Details from './Components/Admin/Invoice_Details';
import DashMain from './Components/Admin/DashMain';
import MenuList from './Components/Admin/ViewForm/ViewMenuItems';
import Update from './Components/Admin/Update';
import Payment from './Components/Payment';
import Summary from './Components/Summary';
import Address from './Components/Address';
import AddressUpdate from './Components/AddressUpdate';
import CustomerView from './Components/CustomerView';
import NewAddress from './Components/NewAddress';
import Checkout from './Components/Checkout';
import MyOrders from './Components/MyOrders';
import Order_Pending from './Components/Admin/Order_Pending';
import Order_Completed from './Components/Admin/Order_Completed';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Forgettenpassword from './Components/Forgettenpassword';
import AddMenuItems from './Components/Admin/AddForm/AddMenuItems';
import ViewMenuItems from './Components/Admin/ViewForm/ViewMenuItems';
import AddMenu from './Components/Admin/AddForm/AddMenu';
import ViewMenu from './Components/Admin/ViewForm/ViewMenu';


function App() {
  return (
    <div className="App" >
        
          <Routes> 
            <Route path='/' element={<CustomerView/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
          <Route path='/signup' element={<Signup/>}></Route>
          <Route path='/forgettenpassword' element={<Forgettenpassword/>}></Route>
          <Route path='/checkout' element={<Checkout/>}>
            <Route path='' element={<Address/>}></Route>
            <Route path='newAddress' element={<NewAddress/>}></Route>
            <Route path='addressupdate/:id' element={<AddressUpdate/>}></Route>
            <Route path='payment/:id' element={<Payment/>}></Route>
          </Route>
          <Route path='/checkout/summary' element={<Summary/>}></Route>
          <Route path='/myorders' element={<MyOrders/>}></Route>
          <Route path='/dashboard' element={<Dashboard/>}>
            <Route path='' element={<DashMain/>}></Route>
            <Route path='addmenuitems' element={<AddMenuItems/>}></Route>
            <Route path='addmenu' element={<AddMenu/>}></Route>
            <Route path='viewmenu' element={<ViewMenu/>}></Route>
            <Route path='viewmenuitems' element={<ViewMenuItems/>}></Route>
            <Route path='orderpending' element={<Order_Pending/>}></Route>
            <Route path='ordercompleted' element={<Order_Completed/>}></Route>
            <Route path='invoicelist' element={<Invoice_list/>}></Route>
            <Route path='invoicedetails' element={<Invoice_Details/>}></Route>
            <Route path={`update/:id`} element={<Update/>}></Route>
          </Route>
        </Routes>
     
    </div>
  );
}

export default App;
