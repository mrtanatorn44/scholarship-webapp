import React from 'react';
import './ReportInspect.css';

function ReportInspect() {
  return <div>
    <center>
    <br></br>
    <h2>รายชื่อผู้ได้รับทุนเรียนดี</h2>
    <h4>ทุนประจำปีการศึกษา 2564 เทอมต้น ประเภททุนที่ 5 สำหรับนิสิตรหัส 62-64</h4>
    <table border="1" width="70%" align="center"> 
      <tr >
        <th>ลำดับที่</th> 
        <th>รหัสนิสิต</th>
        <th>ชื่อ - สกุล</th>
        <th>สาขา</th>
        <th>ชั้นปี</th>
        <th>จำนวนเงิน</th>
      </tr>
        <td>1</td> 
        <td>6230301130</td>
        <td>จักรพงษ์ สิงสี</td>
        <td>T12</td>
        <td>7</td>
        <td>1slp</td>
    </table>
    </center>

  </div>;
}


export default ReportInspect;
