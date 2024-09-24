const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require('body-parser')
const multer = require('multer');
const path = require('path');

const app = express();

app.use(express.static('public'));
app.use( bodyParser.json() );
app.use(express.json());
app.use(cors());

var image = '';

//creating db

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'fos'
})

//Display 'menu' table data

app.get('/data1',(req,res)=>{
    const sql = "SELECT * FROM MENU";
    db.query(sql,(err,data)=>{
        if(err) res.json(err)
        return res.json(data)
    })
})

//Display desired 'menu' table data

app.get('/desireddata1/:id',(req,res)=>{
    const id = req.params.id;  
    const sql = `SELECT * FROM MENU where menuid = ${id}`;
    db.query(sql,(err,data)=>{
        if(err) res.json(err)
        return res.json(data[0])
    })
})

//Display 'menu_details' table data

app.get('/data',(req,res)=>{
    const sql = "SELECT * FROM menuitems";
    db.query(sql,(err,data)=>{
        if(err) res.json(err)
        return res.json(data)
    })
})

//Display 'menu_details' table data (Required data only)

app.get('/need/:id',(req,res)=>{
    
    const sql = "SELECT * FROM menuitems where menuitemsid=?";
    const id = req.params.id;
    db.query(sql,[id],(err,data)=>{
        if(err) res.json(err)
        return res.json(data)
    })
})

// app.put('/update/:id',(req,res)=>{
//     const sql = "UPDATE MENUITEMS SET `menuitem` =?,`price`=? WHERE menuitemsid=?";
//     const id = req.params.id;
//     db.query(sql,[req.body.menuitem,req.body.price,id],(err,result)=>{
//         if(err) return res.json('Error');
//         return res.json({updated:true});
//     })
// })

//multer - used to store image from frontend to server folder

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images/');
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    },
  });
  
  const upload = multer({ storage: storage });
  

// add data - menuitems

app.post('/insertproduct',upload.single('image') ,(req,res)=>{
    const imageFilePath = req.file.filename;
    const sql = "INSERT INTO MENUITEMS (`menuitem`,`price`,`quantity`,`description`,`menuid`,`count`,`image`) VALUES (?)";
    const val = [
        req.body.menuitem,
        req.body.price,
        req.body.quantity,
        req.body.description,
        req.body.menuid,
        req.body.count,
        imageFilePath
    ]
    
    db.query(sql,[val],(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})



// add main dish data

app.post('/addmenu',(req,res)=>{
    const sql = "insert into menu (`menuname`,`menudescription`) values (?)";
    const val = [
        req.body.menuname,
        req.body.menudescription
    ]
    db.query(sql,[val],(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})



//delete data

app.delete('/deletemenuitems/:id',(req,res)=>{
    const id = req.params.id;
    const q = `DELETE FROM menuitems WHERE menuitemsid=${id}`;
    db.query(q,(err,data)=>{
        if(err){res.json(err)}
        res.send("Deleted")
    })
    
})

//delete menu data

app.delete('/deletemenu/:id',(req,res)=>{
    const id = req.params.id;
    const q = `DELETE FROM menu WHERE menuid=${id}`;
    db.query(q,(err,data)=>{
        if(err){res.json(err)}
        res.send("Deleted")
    })
})

//delete menuitems data based menuID

app.delete('/deletemenuitemsmenu/:id',(req,res)=>{
    const id = req.params.id;
    const q = `DELETE FROM menuitems WHERE menuid=${id}`;
    db.query(q,(err,data)=>{
        if(err){res.json(err)}
        res.send("Deleted")
    })
    
})


// add cart dish data

app.post('/cart',(req,res)=>{
    const sql = "INSERT INTO CART (`menuid`,`menuitemid`,`menuitem`,`price`,`quantity`,`count`,`image`) VALUES (?)";
    const val =[
        req.body.menuid,
        req.body.menuitemid,
        req.body.menuname,
        req.body.price,
        req.body.quantity,
        req.body.count,
        req.body.image
    ]
    db.query(sql,[val],(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})



//Display 'cart' table data

app.get('/cartdata',(req,res)=>{
    const sql = "SELECT * FROM cart";
    db.query(sql,(err,data)=>{
        if(err) res.json(err)
        return res.json(data)
    })
})

//delete cart data

app.delete('/cartdelete/:id',(req,res)=>{
    const id = req.params.id;
    const q = `DELETE FROM cart WHERE cartid=${id}`;
    db.query(q,(err,data)=>{
        if(err){res.json(err)}
        res.send("Deleted")
    })
})

//delete handleResetCart data

app.post('/handleResetCart',(req,res)=>{
    const q = 'TRUNCATE CART';
    db.query(q,(err,data)=>{
        if(err){res.json(err)}
        res.send("Deleted")
    })
})

//add customer address 
app.post('/customeraddress',(req,res)=>{
    const sql = "INSERT INTO customerdetails (`customername`,`mail`,`city`,`state`,`phnum`) VALUES (?)";
    const val =[
        req.body.name,  
        req.body.email,
        req.body.city,
        req.body.state,
        req.body.phoneNumber,
    ]
    db.query(sql,[val],(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

//add order details 

app.post('/orderdetails', (req, res) => {
    const cart = req.body.cart;
    const paymentMode = req.body.paymentMode; 
    const customerID = req.body.cusID;
    const makingStatus = req.body.makingStatus;
  
    const values = cart.map(({ menuid, menuitemid ,count}) => [customerID, menuid, menuitemid,count,makingStatus,paymentMode]);
    const sql = 'INSERT INTO orderdetails (customerID, menuid, menuitemid,quantity,makingStatus,paymentMode) VALUES ?';
    db.query(sql, [values], (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error inserting into orderdetails');
      } else {
        res.status(200).send('Data inserted into orderdetails successfully');
      }
    });
});
//update makingStatus

app.post('/changeMakingStatus/:id',(req,res)=>{
    const id = req.params.id;
    const sql = `UPDATE orderdetails SET makingStatus = 'success' WHERE customer_orderID = ${id}` 
    db.query(sql,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })

})

//update menu

app.put('/updatemenu', (req, res) => {
    const { menuname, menudescription, menuID } = req.body;
    const sql = `UPDATE menu SET menuname = ?, menudescription = ? WHERE customer_orderID = ?`;
    const values = [menuname, menudescription, menuID];

    db.query(sql, values, (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
});


//get ordered details with same datetime

app.get('/fetchorderdetails', (req, res) => {
    const sql = `SELECT c.customer_orderID,c.customerID,c.quantity,c.makingStatus, m.menuname, mi.menuitem , c.ordered_datetime
    FROM menu m
    JOIN orderdetails c ON m.menuid = c.menuid
    JOIN menuitems mi ON c.menuitemid = mi.menuitemsid
    ORDER BY c.ordered_datetime ASC
    
    `;
  
    db.query(sql, (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error retrieving order details');
      } else {
        res.json(results);
      }
    });
  });

//get customer address
app.get('/customerexistingaddress',(req,res)=>{
    const sql = "SELECT * FROM customerdetails";
    db.query(sql,(err,data)=>{
        if(err) res.json(err)
        return res.json(data)
    })
})

//get desired customer address for payment
app.get('/customerexistingaddressforpayment/:id',(req,res)=>{
    const id = req.params.id;
    const sql = `SELECT * FROM customerdetails where customerID=${id}`;
    db.query(sql,(err,data)=>{
        if(err) res.json(err)
        return res.json(data)
    })
})

//delete customer address

app.delete('/deleteaddress/:id',(req,res)=>{
    const id = req.params.id;
    const q = `DELETE FROM customerdetails WHERE customerID=${id}`;
    db.query(q,(err,data)=>{
        if(err){res.json(err)}
        res.send("Deleted")
    })
})

app.get('/geteditaddress/:id',(req,res)=>{
    const id = req.params.id;
    const sql = `SELECT * FROM customerdetails WHERE customerID = ?`;
    db.query(sql,[id],(err,data)=>{
        if(err){res.json(err)}
        return res.json(data);
    })
})

app.put('/editaddress/:id',(req,res)=>{
    const sql = "UPDATE customerdetails SET `CUSTOMERNAME` =?,`MAIL`=?,`CITY`=?,`STATE`=?,`PHNUM`=? WHERE customerID=?";
    const id = req.params.id;
    db.query(sql,[req.body.name,req.body.email,req.body.city,req.body.state,req.body.phoneNumber,id],(err,result)=>{
        if(err) return res.json('Error');
        return res.json({updated:true});
    })
})

app.post('/insertinvoice',(req,res)=>{
    const sql = "INSERT INTO INVOICEDETAIL (`ADDRESSID`,`PAYMENT`,`GATWAY`) VALUES (?)";
    const val = [
        req.body.addressid,
        req.body.payment,
        req.body.gatway
    ]
    db.query(sql,[val],(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.put('/cartincrement/:id',(req,res)=>{
    const id = req.params.id;
    const sql = 'update cart set count = count + 1 where cartid =?';
    db.query(sql,[id],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })

})
app.put('/cartdecrement/:id',(req,res)=>{
    const id = req.params.id;
    const sql = 'update cart set count = count - 1 where cartid =?';
    db.query(sql,[id],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })

})

app.listen(5555,()=>console.log("listing...."));