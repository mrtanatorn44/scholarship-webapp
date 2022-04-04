const express = require("express");
const mysql = require("mysql");
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(express.json({limit: '50mb'}));

let dbCon = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "scholarship_webapp",
    timezone: 'gmt'
})

dbCon.connect(function(err) {
  if (err) throw err;
  console.log('Connected to DB');
});

/* ----- USER ----- */
app.get("/getAllUser", (req, res) => {
  dbCon.query(
    "SELECT * FROM user ;", (err, result) => {
    if(err){
      console.log(err);
    }else{
      res.send(result);
    }
  });
});

app.post("/getUser", (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  const email = req.body.email;
  dbCon.query(
    "SELECT email,fname,lname,role,id FROM user WHERE email = ?",
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

app.post("/addUser", (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
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

app.post("/editRole", (req, res) => {
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

/* ----- ANNOUNCE ----- */
app.get("/getAllAnnounce", (req, res) => {
  dbCon.query(
    "SELECT * FROM announce ORDER BY date DESC;", (err, result) => {
    if(err){
      console.log(err);
    }else{
      res.send(result);
    }
  });
});

app.post("/getAnnounce",(req ,res)=>{
  const id = req.body.id;
  dbCon.query(
    "SELECT * FROM announce WHERE id = ?",
    [id],
    (err, result) => {
      if(err){
        console.log(err);
      }else{
        res.send(result);
      }
    }
  )
});

app.post("/addAnnounce", (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  const title = req.body.title;
  const imageName = req.body.imageName;
  const imageData = req.body.imageData;
  const detail = req.body.detail;
  dbCon.query(
    "INSERT INTO announce (title, detail, image_data, image_name) VALUES (?, ?, ?, ?)",
    [title, detail, imageData, imageName],
    (err, result) => {
    if (err) { console.log(err) } else { res.send(result) }
  });
});


app.post("/editAnnounce",(req ,res)=>{
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  const id = req.body.id;
  const title = req.body.title;
  const detail = req.body.detail;
  const imageName = req.body.imageName;
  const imageData = req.body.imageData;
  dbCon.query(
    "UPDATE announce SET title=?, detail=?, image_data=?, image_name=? WHERE id=?",
    [title, detail, imageData, imageName, id],
    (err, result) => {
      if(err){
        res.send(err);
      }else{
        res.send(result);
      }
    }
  )
});

app.post("/deleteAnnounce", (req, res) => {
  const id = req.body.id;
  dbCon.query(
    "DELETE FROM announce WHERE id = ?",
    [id],
    (err, result) => {
      if(err){
        console.log(err);
      }else{
        res.send(result);
      }
    }
  )
});

/* ----- PROFILE ----- */
app.post("/addProfile", (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  const id            = req.body.id;
  const profile_data  = req.body.profile_data;
  const picture_data  = req.body.picture_data;
  const picture_name  = req.body.picture_name;
  dbCon.query(
    "INSERT INTO profile (id, profile_data, picture_data, picture_name) VALUES ( ?, ?, ?, ? )",
    [ id, profile_data, picture_data, picture_name ], 
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result); 
      }
    }
  );
});

app.post("/editProfile", (req, res)=>{
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  const id            = req.body.id;
  const profile_data  = req.body.profile_data;
  const picture_data  = req.body.picture_data;
  const picture_name  = req.body.picture_name;
  dbCon.query(
    "UPDATE profile SET profile_data=?, picture_data=?, picture_name=? WHERE id=?",
    [ profile_data, picture_data, picture_name, id ],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  )
});

app.post("/getProfile", (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  const id = req.body.id;
  dbCon.query(
    "SELECT * FROM profile WHERE id = ?",
    [id],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
  });
});


/* ----- SCHOLARSHIP ----- */
app.get("/getAllScholarship", (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  dbCon.query(
    "SELECT * FROM scholarship ORDER BY id DESC;", 
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/getScholarship",(req ,res)=>{
  const id = req.body.id;
  dbCon.query(
    "SELECT * FROM scholarship WHERE id = ?",
    [id],
    (err, result) => {
      if(err){
        console.log(err);
      }else{
        res.send(result);
        //console.log(result)
      }
    }
  )
});

app.post("/addScholar", (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  const donator_id= req.body.donator_id;
  const is_public= req.body.is_public;
  const type= req.body.type;
  const detail= req.body.detail;
  const amount=req.body.amount;
  const min_student_year=req.body.min_student_year;
  const max_student_year=req.body.max_student_year;
  const on_year=req.body.on_year;
  const on_term=req.body.on_term;
  const open_date=req.body.open_date;
  const close_date=req.body.close_date;
  const required = req.body.required;
  const rating = req.body.rating;

  dbCon.query(
    "INSERT INTO scholarship ( donator_id, is_public, type, detail, amount, min_student_year, max_student_year, on_year, on_term, open_date, close_date, required, rating) VALUES (?,?, ?, ?,?, ?, ?,?,?,?,?, ?, ?)",
      [donator_id, is_public,type,detail, amount, min_student_year, max_student_year, on_year, on_term, open_date, close_date,required,rating],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/editScholar",(req ,res)=>{
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  const id = req.body.id;
  const is_public= req.body.is_public;
  const type= req.body.type;
  const detail= req.body.detail;
  const amount=req.body.amount;
  const min_student_year=req.body.min_student_year;
  const max_student_year=req.body.max_student_year;
  const on_year=req.body.on_year;
  const on_term=req.body.on_term;
  const open_date=req.body.open_date;
  const close_date=req.body.close_date;
  const donator_id = req.body.donator_id;
  const required = req.body.required;
  const rating = req.body.rating;
  dbCon.query(
    "UPDATE scholarship SET is_public = ?,type = ?,detail = ?,amount = ?,min_student_year = ?,max_student_year = ?,on_year = ?,on_term = ?,open_date = ?,close_date = ?,donator_id = ?,required=?,rating=?   WHERE id = ?",
    [is_public,type,detail,amount,min_student_year,max_student_year,on_year,on_term,open_date,close_date,donator_id,required,rating,id],
    (err, result) => {
      if(err){
        res.send(err);
      }else{
        res.send(result);
      }
    }
  )
});

app.post("/deleteScholarship", (req, res) => {
  const id = req.body.id;
  dbCon.query(
    "DELETE FROM scholarship WHERE id = ?",
    [id],
    (err, result) => {
      if(err){
        console.log(err);
      }else{
        res.send(result);
      }
    }
  )
});

app.get("/getTypeScholar", (req, res) => {
  dbCon.query(
    "SELECT DISTINCT type FROM scholarship",
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

/* ----- DONATOR ----- */
app.get("/getallDonator", (req, res) => {
  dbCon.query(
    "SELECT * FROM donator",
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/getDonator", (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  const id = req.body.id;
  dbCon.query(
    "SELECT * FROM donator WHERE id = ?",
    [id],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/addDonator", (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  const name = req.body.name;
  dbCon.query(
    "INSERT INTO donator (name) VALUES (?)",
    [name],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/addRegister", (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  const id = req.body.id;
  const profile_id= req.body.profile_id;
  const scholarship_id= req.body.scholarship_id;
  const profile_detail= req.body.profile_detail;
  const check=req.body.check;
  const file=req.body.file;
  const rate=req.body.rate;
  dbCon.query(
    "INSERT INTO infomation (id,profile_id,scholarship_id,profile_detail,check,file,rate) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [id,profile_id,scholarship_id,profile_detail,check,file,rate],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.listen(5000, () => {
  console.log(`running at port 5000`);
});