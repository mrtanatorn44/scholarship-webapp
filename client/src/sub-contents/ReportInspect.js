import React from 'react';
import './ReportInspect.css';

function ReportInspect(props) {
  return (
    <div class="frame-content">
      <div class="reportInspect-head d-flex">
        <center>
          <br></br>
          <h4>รายชื่อผู้ได้รับทุนเรียนดี</h4>

          <h4>ทุนประจำปีการศึกษา 2564 เทอมต้น ประเภททุนที่ 5 สำหรับนิสิตรหัส 62-64</h4>
        </center>
      </div>
      <div class="reportInspect-columns">
        <center>
          <table border='1'>
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
      <div class="reportInspect-foter">
        <div class="button">
          <button class="dowload" type="button" >
            <p>ดาวน์โหลดรายงาน</p>
          </button>
          <button class="back"  type="button" onClick = {() => props.sendContent(['admin','Report'])} >
            <p>กลับ</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ReportInspect;
