import React from 'react';
import './ReportInspect.css';

function ReportInspect() {
  return (
  <div class="reportinspect">
    <div class="header">
      <center>
        <br></br>
        <h2>รายชื่อผู้ได้รับทุนเรียนดี</h2>
        <h4>ทุนประจำปีการศึกษา 2564 เทอมต้น ประเภททุนที่ 5 สำหรับนิสิตรหัส 62-64</h4>
      </center>
    </div>
    <div class="row-columns">
      <center>
        <table>
          <tr>
            <td>ลำดับที่</td>
            <td>รหัสนิสิต</td>
            <td>ชื่อ-สกุล</td>
            <td>สาขา</td>
            <td>ชั้นปี</td>
            <td>จำนวนเงิน</td>
          </tr>
          <tr>
            <td>xx</td>
            <td>62xxxxxxxxx</td>
            <td>นายxxxxxxxxx</td>
            <td>T12</td>
            <td>3</td>
            <td>จำนวนเงิน</td>
          </tr>
          <tr>
            <td>xx</td>
            <td>62xxxxxxxxx</td>
            <td>นายxxxxxxxxx</td>
            <td>T12</td>
            <td>3</td>
            <td>จำนวนเงิน</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>รวม</td>
            <td>100000บาท</td>
          </tr>
        </table>
      </center>
    </div>
    <div class="lasttitle">
      <center>
        <h4>โดยบริษัทเสี่ยโอ</h4>
      </center>
    </div>
    <div class="fotter-button">
      <div class="button">
        <button class="dowload" type="button" >
          <p>ดาวน์โหลดรายงาน</p>
        </button>
        <button class="back"  type="button" >
          <p>กลับ</p>
        </button>
      </div>
    </div>
  </div>

    


  );
}


export default ReportInspect;
