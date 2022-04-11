import React, { useState, useContext, useEffect } from 'react';
import { WebContext } from '../../App';
import Axios from 'axios';

function EditAttrform (){

  const { AttrForm } = useContext(WebContext)
  const [attrForm, setAttrForm] = AttrForm;

  useEffect(() => {
    setAttrForm(
      {
        min_gpa      : "", 
        min_nisit_id : "",
        max_nisit_id : ""
      }
    );
  }, [])

  return (
    <>
      <div className="heading">
        <h4>เอกสารประกอบการยื่นทุน</h4>
      </div>

      <div className="top">
        <div className="indicator">
          <label>เกรด</label>
          <input 
            className="academic"
            defaultValue={attrForm.min_gpa}
            type="number"
            min="1"
            max="4"
            step="0.01"
            placeholder="เกรด"
            required
            onChange={
              (event) => {
                setAttrForm({
                  ...attrForm,
                  min_gpa : event.target.value
                })
              }
            }
          />
        </div>

        <div className="indicator">
          <label>รหัสนิสิตต่ำสุด</label>
          <input 
            className="academic"
            type="number"
            defaultValue = {attrForm.min_nisit_id}
            min={String(new Date().getFullYear() + 543 - 8).substring(2, 4)}
            max={String(new Date().getFullYear() + 543 - 0).substring(2, 4)} 
            minLength="2"
            maxLength="2"
            placeholder="รหัสนิสิตต่ำสุด"
            required
            onChange={
              (event) => {
                setAttrForm({
                  ...attrForm,
                  min_nisit_id : event.target.value
                })
              }
            }
            
          />
        </div>
        
        <div className="indicator">
          <label>รหัสนิสิตสูงสุด</label>
            <input className="academic" type="number" 
            defaultValue= {attrForm.max_nisit_id}
            min={String(new Date().getFullYear() + 543 - 8).substring(2, 4)}
            max={String(new Date().getFullYear() + 543 - 0).substring(2, 4)} 
            minLength="2"
            maxLength="2"
            placeholder="รหัสนิสิตสูงสุด"
            required
            onChange={
              (event) => {
                setAttrForm({
                  ...attrForm,
                  max_nisit_id : event.target.value
                })
              }
            }
          />
        </div>
      </div>
    </>
  );
}

export default EditAttrform;