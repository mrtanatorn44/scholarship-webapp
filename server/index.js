const express = require("express");
const mysql = require("mysql");
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
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
   
// pool
// https://stackoverflow.com/questions/34542902/nodejs-mysql-how-to-know-connection-is-release-or-not
// var pool  = mysql.createPool({
//   connectionLimit : 10,
//   host            : 'localhost',
//   user            : 'root',
//   password        : ''
// });

// pool.getConnection(function(err, connection) {
//     connection.query( 'SELECT something FROM sometable', function(err, rows) {

//       console.log(pool._freeConnections.indexOf(connection)); // -1

//       connection.release();

//       console.log(pool._freeConnections.indexOf(connection)); // 0

//    });
// });


// ░█─░█ ░█▀▀▀█ ░█▀▀▀ ░█▀▀█ 
// ░█─░█ ─▀▀▀▄▄ ░█▀▀▀ ░█▄▄▀ 
// ─▀▄▄▀ ░█▄▄▄█ ░█▄▄▄ ░█─░█

app.get("/getAllUser", (req, res) => {
  dbCon.query(
    "SELECT * FROM user ;", (err, result) => {
    if(err){
      res.send(err);
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
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/getUserRole", (req, res) => {
  const role = req.body.role;
  const id = req.body.id;
  dbCon.query(
    "UPDATE user SET role = ? WHERE role = ?",
    [role, id], 
    (err, result) => {
      if (err) {
        res.send(err);
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
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/editRole", (req, res) => {
  const role = req.body.role;
  const id = req.body.id;
  dbCon.query(
    "UPDATE user SET role = ? WHERE id = ?",
    [role, id], 
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});


// ─█▀▀█ ░█▄─░█ ░█▄─░█ ░█▀▀▀█ ░█─░█ ░█▄─░█ ░█▀▀█ ░█▀▀▀ 
// ░█▄▄█ ░█░█░█ ░█░█░█ ░█──░█ ░█─░█ ░█░█░█ ░█─── ░█▀▀▀ 
// ░█─░█ ░█──▀█ ░█──▀█ ░█▄▄▄█ ─▀▄▄▀ ░█──▀█ ░█▄▄█ ░█▄▄▄

app.get("/getAllAnnounce", (req, res) => {
  dbCon.query(
    "SELECT * FROM announce ORDER BY date DESC;", (err, result) => {
    if(err){
      res.send(err);
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
        res.send(err);
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
    if (err) { 
      res.send(err) 
    } else { 
      res.send(result) 
    }
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
        res.send(err);
      }else{
        res.send(result);
      }
    }
  )
});


// ░█▀▀█ ░█▀▀█ ░█▀▀▀█ ░█▀▀▀ ▀█▀ ░█─── ░█▀▀▀ 
// ░█▄▄█ ░█▄▄▀ ░█──░█ ░█▀▀▀ ░█─ ░█─── ░█▀▀▀ 
// ░█─── ░█─░█ ░█▄▄▄█ ░█─── ▄█▄ ░█▄▄█ ░█▄▄▄
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


// ░█▀▀▀█ ░█▀▀█ ░█─░█ ░█▀▀▀█ ░█─── ─█▀▀█ ░█▀▀█ ░█▀▀▀█ ░█─░█ ▀█▀ ░█▀▀█ 
// ─▀▀▀▄▄ ░█─── ░█▀▀█ ░█──░█ ░█─── ░█▄▄█ ░█▄▄▀ ─▀▀▀▄▄ ░█▀▀█ ░█─ ░█▄▄█ 
// ░█▄▄▄█ ░█▄▄█ ░█─░█ ░█▄▄▄█ ░█▄▄█ ░█─░█ ░█─░█ ░█▄▄▄█ ░█─░█ ▄█▄ ░█───

app.get("/getAllScholarship", (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  dbCon.query(
    `SELECT * FROM scholarship ORDER BY id DESC;`, 
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/getScholarship",(req ,res)=>{
  const id = req.body.id;
  dbCon.query(
    `SELECT * FROM scholarship WHERE id = ?`,
    [id],
    (err, result) => {
      if(err){
        res.send(err);
      }else{
        res.send(result);
      }
    }
  )
});

app.get("/getYearScholar", (req, res) => {
  dbCon.query(
    "SELECT DISTINCT on_year FROM scholarship",
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

app.post("/addScholarship", (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  const donator_id  = req.body.donator_id;
  const status      = req.body.status;
  const type        = req.body.type;
  const detail      = req.body.detail;
  const amount      = req.body.amount;
  const on_year     = req.body.on_year;
  const on_term     = req.body.on_term;
  const open_date   = req.body.open_date;
  const close_date  = req.body.close_date;
  const attribute_requirement = req.body.attribute_requirement;
  const file_requirement      = req.body.file_requirement;
  const interview_requirement = req.body.interview_requirement;
  dbCon.query(
    "INSERT INTO scholarship ( donator_id, status, type, detail, amount, on_year, on_term, open_date, close_date, attribute_requirement, file_requirement, interview_requirement) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
      [donator_id, status,type,detail, amount, on_year, on_term, open_date, close_date,attribute_requirement,file_requirement,interview_requirement],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/editScholarshipStatus", (req, res) => {
  const id = req.body.id;
  const status = req.body.status;
  dbCon.query(
    "UPDATE scholarship SET status=? WHERE id=?",
    [status, id], 
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/editScholarship",(req ,res)=>{
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  const id          = req.body.id;
  const status      = req.body.status;
  const type        = req.body.type;
  const detail      = req.body.detail;
  const amount      = req.body.amount;
  const on_year     = req.body.on_year;
  const on_term     = req.body.on_term;
  const open_date   = req.body.open_date;
  const close_date  = req.body.close_date;
  const donator_id  = req.body.donator_id;
  const attribute_requirement = req.body.attribute_requirement;
  const file_requirement      = req.body.file_requirement;
  const interview_requirement = req.body.interview_requirement;
  dbCon.query(
    "UPDATE scholarship SET status=?, type=?, detail=?, amount=?, on_year=?, on_term=?, open_date=?, close_date=?, donator_id=?, attribute_requirement=?, file_requirement=?, interview_requirement=? WHERE id=?",
    [status, type, detail, amount, on_year, on_term, open_date, close_date, donator_id, attribute_requirement, file_requirement, interview_requirement, id],
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
        res.send(err);
      }else{
        res.send(result);
      }
    }
  )
});



app.get("/getOnyearScholar", (req, res) => {
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

app.get("/getOntermScholar", (req, res) => {
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


// ░█▀▀▄ ░█▀▀▀█ ░█▄─░█ ─█▀▀█ ▀▀█▀▀ ░█▀▀▀█ ░█▀▀█ 
// ░█─░█ ░█──░█ ░█░█░█ ░█▄▄█ ─░█── ░█──░█ ░█▄▄▀ 
// ░█▄▄▀ ░█▄▄▄█ ░█──▀█ ░█─░█ ─░█── ░█▄▄▄█ ░█─░█
app.get("/getallDonator", (req, res) => {
  dbCon.query(
    "SELECT * FROM donator ",
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

// ▒█▀▀▀ █▀▀█ █▀▀█ █▀▄▀█ 
// ▒█▀▀▀ █░░█ █▄▄▀ █░▀░█ 
// ▒█░░░ ▀▀▀▀ ▀░▀▀ ▀░░░▀

app.post("/addForm", (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  const user_id         = req.body.user_id;
  const scholarship_id  = req.body.scholarship_id;
  const profile_detail  = req.body.profile_detail;
  const status           = req.body.status;
  const file            = req.body.file;
  const rate            = req.body.rate;
  const notation        = req.body.notation;
  dbCon.query(
    "INSERT INTO form ( user_id, scholarship_id, profile_detail, status, file, rate, notation) VALUES ( ?, ?, ?, ?, ?, ? ,?)",
    [ user_id, scholarship_id, profile_detail, status, file, rate, notation],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});


app.post("/editForm", (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  const id              = req.body.id;
  const profile_detail  = req.body.profile_detail;
  const file            = req.body.file;
  const status          = req.body.status;
  dbCon.query(
    "UPDATE form SET profile_detail=?,file=?,status=? WHERE id=?",
    [profile_detail, file,status,id],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/editStatusForm", (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  const id              = req.body.id;
  const status          = req.body.status;
  const notation        = req.body.notation;
  dbCon.query(
    "UPDATE form SET status=? ,notation=? WHERE id=?",
    [status,notation,id],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});
app.post("/editRateForm", (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  const id              = req.body.id;
  const status          = req.body.status;
  const rate            = req.body.rate;
  dbCon.query(
    "UPDATE form SET status=? ,rate=? WHERE id=?",
    [status,rate,id],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/deleteForm", (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  const id = req.body.id;
  dbCon.query(
    "DELETE FROM form WHERE id = ?",
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

app.post("/getForm",(req ,res)=>{
  const id = req.body.id;
  dbCon.query(
    "SELECT * FROM form WHERE id = ?",
    [id],
    (err, result) => {
      if(err){
        res.send(err);
      }else{
        res.send(result);
      }
    }
  )
});

app.post("/getFormByScholarshipID", (req, res) => {
  const scholarship_id = req.body.scholarship_id;
  dbCon.query(
    "SELECT * FROM form WHERE scholarship_id = ?",
    [scholarship_id],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});


app.post("/getFormByUserID",(req ,res)=>{
  const user_id = req.body.user_id;
  dbCon.query(
    "SELECT * FROM form WHERE user_id = ?",
    [user_id],
    (err, result) => {
      if(err){
        res.send(err);
      }else{
        res.send(result);
      }
    }
  )
});


// ░█▀▀█ ▒█▀▀█ ▒█▀▀█ ▒█▀▀▀█ ▀█▀ ▒█▄░▒█ ▀▀█▀▀ ▒█▀▄▀█ ▒█▀▀▀ ▒█▄░▒█ ▀▀█▀▀ 
// ▒█▄▄█ ▒█▄▄█ ▒█▄▄█ ▒█░░▒█ ▒█░ ▒█▒█▒█ ░▒█░░ ▒█▒█▒█ ▒█▀▀▀ ▒█▒█▒█ ░▒█░░ 
// ▒█░▒█ ▒█░░░ ▒█░░░ ▒█▄▄▄█ ▄█▄ ▒█░░▀█ ░▒█░░ ▒█░░▒█ ▒█▄▄▄ ▒█░░▀█ ░▒█░░
app.post("/editAppointment", (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  const id          = req.body.id;
  const appointment = req.body.appointment;
  dbCon.query(
    "UPDATE scholarship SET appointment=? WHERE id=?",
    [appointment,id],
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