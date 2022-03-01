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

app.post("/ScholarshipCreate", (req,res) => {
  const Type = req.body.type;
  const createDate = req.body.create_date;
  const Detail = req.body.detail;
  const organName = req.body.organization_name;
  const Amount= req.body.amount;
  dbCon.query(
    "INSERT INTO scholarship (type, create_date, detail, amount) VALUES (?, ?, ?, ?), INSERT INTO sponser (organization_name) VALUES (?)",
    [Type,createDate, Detail, organName, Amount],
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

      //console.log(result)
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
  const image_name = req.body.image_name;
  const image = req.body.image;
  const detail = req.body.detail;
  //console.log(String(image))

  dbCon.query(
    "INSERT INTO announce (title, image_name, image_url, detail) VALUES (?, ?, ?, ?)",
    [title, image_name, image, detail],
    (err, result) => {
    if(err){
      console.log(err);
    }else{
      res.send(result);
      //console.log(result)
    }
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
    [image, detail, title,id],
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



//////PROFILE 
app.post("/addProfile", (req, res) => {
  const id = req.body.id;
  const user_id= req.body.user_id;
  const file_path = req.body.file_path;

  dbCon.query(
    "INSERT INTO profile (user_id, file_path) VALUES ( ?, ?)",
    [user_id, file_path], 
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
app.post("/editProfile",(req ,res)=>{
  const id = req.body.id;
  const user_id= req.body.user_id;
  const file_path = req.body.file_path;
  
  dbCon.query(
    "UPDATE profile SET user_id = ?,file_path = ?  WHERE id = ?",
    [user_id, file_path,id],
    (err, result) => {
      if(err){
        res.send(err);
      }else{
        res.send(result);
      }
    }
  )
});

app.post("/getProfile", (req, res) => {
  const user_id = req.body.user_id;
  dbCon.query(
    "SELECT * FROM profile WHERE user_id = ?",
    [user_id],
    (err, result) => {
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



/*




*/ 