<h1>TH</h1>

<h1>โฟลเดอร์</h1>
โฟลเดอร์ 'client' คือ front-end.<br/>
โฟลเดอร์ 'server' คือ back-end.<br/>

<h1>ติดตั้ง NODE-MODULES เมื่อโหลดไฟล์ครั้งแรก</h1>
ใช้คำสั่ง >>> npm i<br/>
ในโฟลเดอร์ client และ server เพื่อติดตั้ง node-modules.<br/>

<h1>เตรียม DATABASE</h1>
เชื่อม Back-end กับ Database ด้วย xampp Apache and MySQL.<br/>
back-end ติดต่อบน localhost port 5000.<br/>
*อย่าลืม import ไฟล์ 'scholarship_db.sql' เข้าไปยัง phpMyAdmin<br/>
โดยให้ใช้ชื่อ table ว่า 'scholarship_webapp'<br/>
*

<h1>เตรียม GOOGLE LOGIN API (สำคัญ)</h1>
ในโฟลเดอร์ 'client/.env' จะมีตัวแปรชื่อ 'REACT_APP_GOOGLE_CLIENT_ID'.<br/>
ต้องใส่ API-CLIENT-ID ของ Google OAuth2.0 (https://developers.google.com/identity/protocols/oauth2)<br/>
  
<h1>วิธีเปิดใช้งาน</h1>
หลังจากติดตั้ง NODE-MODULES เสร็จแล้วให้<br/>
ไปที่ 'client' แล้วใช้คำสั่ง >>> npm start<br/>
ไปที่ 'server' แล้วใช้คำสั่ง >>> npm run dev<br/>
แล้วรอสักพักถึงจะใช้งานได้<br/>

<h1>EN</h1>

<h1>FOLDER</h1>
Folder 'client' is front-end.<br/>
Folder 'server' is back-end.<br/>

<h1>INSTALL NODE-MODULES</h1>
use command >>> npm i<br/>
In both folder to install node-modules.<br/>

<h1>PREPARE DATABASE</h1>
Connect 'server' to database by using xampp Apache and MySQL.<br/>
back-end listening on localhost port 5000.<br/>
*dont forget to import 'scholarship_db.sql' into you MySQL*<br/>

<h1>PREPARE GOOGLE LOGIN API (IMPORTANT)</h1>
In folder client/env you will see variable 'REACT_APP_GOOGLE_CLIENT_ID'.<br/>
So you need to place API-CLIENT-ID in it.<br/>
  
<h1>HOW TO RUN</h1>
after you install node-modules and need to run this project,<br/>
for 'client' folder use command >>> npm start<br/>
for 'server' folder use command >>> npm run dev<br/>
and wait for a few sec you can use it.<br/>
