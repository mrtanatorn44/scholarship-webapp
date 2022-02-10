const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");


var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
app.use(express.json());

let dbCon = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "scholarship"
})

dbCon.connect(function(err) {
  if (err) throw err;
  console.log('Connected to DB');
});

/*
  getUser-
  addUser-
  
  getRole-
  editRole-

  getNews
  addNews
  editNews

*/

app.post("/getUser", (req, res) => {

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
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS");
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

app.put("/getRole", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS");
  const email = req.body.email;
  dbCon.query(
    "SELECT role FROM user WHERE email = ?",
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

app.put("/editRole", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS");
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
      }
    }
  );
});

app.put("/creatSCLS", (req,res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS");
  const sclsType = req.body.sclsType;
  const sclsYears = req.body.sclsYears;
  const sclsAttribute = req.body.sclsAttribute;
  const sclsSupporter = req.body.sclsSupporter;
  const sclsPrice= req.body.sclsPrice;

  dbCon.query(
    "INSERT INTO scholarship_list_create (sclsType, sclsYears, sclsAttribute, sclsSupporter ,sclsPrice) VALUES (?, ?, ?, ?, ?)",
    [sclsType,sclsYears, sclsAttribute, sclsSupporter, sclsPrice],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
app.listen(5000, () => {
  console.log(`running at port 5000`);
});