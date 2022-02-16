const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

let dbCon = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "scholarship-webapp"
})

dbCon.connect(function(err) {
  if (err) throw err;
  console.log('Connected to DB');
});

app.post("/getUser", (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  const email = req.body.email;
  dbCon.query(
    "SELECT email,fname,lname,role FROM user WHERE email = ?",
    [email], 
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.put("/addUser", (req, res) => {
  const email = req.body.email;
  const fname= req.body.fname;
  const lname = req.body.lname;
  const role = req.body.role;

  dbCon.query(
    "INSERT INTO user (email, fname, lname, role) VALUES (?, ?, ?, ?)",
    [email,fname, lname, role], 
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.put("/editRole", (req, res) => {
  const role = req.body.role;
  const email = req.body.email;
  dbCon.query(
    "UPDATE user SET role = ? WHERE email = ?",
    [role, email], 
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        /*
          []

          {
            [],
            [],
            []
          }
        
        */
      }
    }
  );
});

app.post("/creatSCLS", (req,res) => {
  const Type = req.body.Type;
  const stdYears = req.body.stdYears;
  const Detail = req.body.Detail;
  const Supporter = req.body.Supporter;
  const Price= req.body.Price;
  dbCon.query(
    "INSERT INTO scholarship (Type, stdYears, Detail, Supporter ,Price) VALUES (?, ?, ?, ?, ?)",
    [Type,stdYears, Detail, Supporter, Price],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/getAnnounce", (req, res) => {
  dbCon.query(
    "SELECT * FROM announce", (err, result) => {
    if(err){
      console.log(err);
    }else{
      res.send(result);
      //console.log(result)
    }
  });
});






app.listen(5000, () => {
  console.log(`running at port 5000`);
});