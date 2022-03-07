const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
//const fileUpload = require("express-fileupload");
//const fileType = require("file-type");


const app = express();
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(express.json({limit: '50mb'}));
//app.use(express.urlencoded({limit: '50mb'}));

//app.use(fileUpload());

/*const storage = multer.diskStorage({
  destination: function(req, file, cb){
cb(null,file.originailname);
  }
});
const upload =multer({storage: storage})*/

let dbCon = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "scholarship-webapp",
    timezone: 'gmt'
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

app.get("/getUser", (req, res) => {
  dbCon.query(
    "SELECT * FROM user ;", (err, result) => {
    if(err){
      console.log(err);
    }else{
      res.send(result);

      //console.log(result)
    }
  });
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
        //console.log(result)
      }
    }
  )
});

app.post("/editAnnounce",(req ,res)=>{
  const id = req.body.id;
  const title = req.body.title;
  const image_url = req.body.image_url;
  const detail = req.body.detail;
  dbCon.query(
    "UPDATE announce SET title = ?,detail = ?,image_url = ?  WHERE id = ?",
    [title,detail,image_url,id],
    (err, result) => {
      if(err){
        res.send(err);
      }else{
        res.send(result);
      }
    }
  )
});



/*
app.post("/upload", (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  const image = req.files.pic;
  "INSERT INTO announce (imade_url), VALUES (?)",
  [image]
  res.sendStatus(200);

})

app.post("/Upload",upload.array("file",2),(req, res) => {
const fileImg = fs.readFileSync("upload/"+req.file[0].filename)
})
*/



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
    [ id, profile_data, profile_data, picture_name ], 
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


/////////////SCHOLARSHIP///////////////////

app.post("/addScholar", (req, res) => {
  
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
  const sponsor = req.body.sponsor;

  dbCon.query(
    "INSERT INTO scholarship ( is_public, type, detail, amount, min_student_year, max_student_year, on_year, on_term, open_date, close_date, sponsor) VALUES (?,?, ?, ?,?, ?, ?,?,?,?,?)",
    [ is_public,type,detail, amount, min_student_year, max_student_year, on_year, on_term, open_date, close_date,sponsor], 
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
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

app.get("/getAllScholarship", (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  dbCon.query(
    "SELECT * FROM scholarship;", 
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//get sposor
app.get("/getSponsor", (req, res) => {
  dbCon.query(
    "SELECT DISTINCT sponsor FROM scholarship",
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
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


app.post("/editScholar",(req ,res)=>{
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
  const sponsor = req.body.sponsor;
  dbCon.query(
    "UPDATE scholarship SET is_public = ?,type = ?,detail = ?,amount = ?,min_student_year = ?,max_student_year = ?,on_year = ?,on_term = ?,open_date = ?,close_date = ?,sponsor = ?   WHERE id = ?",
    [is_public,type,detail,amount,min_student_year,max_student_year,on_year,on_term,open_date,close_date,sponsor,id],
    (err, result) => {
      if(err){
        res.send(err);
      }else{
        res.send(result);
      }
    }
  )
});



app.listen(5000, () => {
  console.log(`running at port 5000`);
});


