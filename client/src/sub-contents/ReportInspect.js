
import React, { useContext, useState, useEffect } from 'react';
import { WebContext } from '../App';
import Test from '../data/test.js';

function ReportInspect() {
  const { Content } = useContext(WebContext)
  const [content, setContent] = Content;
  return (
    Test.map((test) => (
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
            <div>
              <table border='1'>
                <tr>
                  <td>ลำดับ</td>
                  <td>รหัสนิสิต</td>
                  <td>ชื่อ-สกุล</td>
                  <td>สาขา</td>
                  <td>ชั้นปี</td>
                  <td>จำนวนเงิน</td>
                </tr>
                <tr>
                  <td>{test.id}</td>
                  <td>{test.number_std}</td>
                  <td>{test.name}</td>
                  <td>{test.branch}</td>
                  <td>{test.year_class}</td>
                  <td>{test.money}</td>
                </tr>
                
                <tr>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>รวม</td>
                  <td>บาท</td>
                </tr>
              </table>
            </div>
          </center>
        </div>
        <div class="lasttitle">
          <center>
            <h4>โดยบริษัทเสี่ยโอ</h4>
          </center>
        </div>
        <div class="reportInspect-fotter">
          <div class="button">
            <button class="dowload" type="button" >
              <p>ดาวน์โหลดรายงาน</p>
            </button>
            <button class="back"  type="button" onClick = {() => setContent(['Report'])}>
              <p>กลับ</p>
            </button>
          </div>
        </div>
      </div>
    ))
  )
}

export default ReportInspect;
