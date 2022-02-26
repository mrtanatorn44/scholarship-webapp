import React, {useState} from 'react';
import './AlertModal.css';

function AlertModel(props) {
  const icon = ["bi bi-clock"]
  const iconIndex = props.iconIndex
  const text1 = props.text1 || '';
  const text2 = props.text2 || '';
  const text3 = props.text3 || '';
  const text4 = props.text4 || '';

  return (
    <div class="modal">
      <div class="modal-content" >
        <div class="modal-body">
        <button className="button-close" onClick={() => props.sendConfirm(true)}>
          <i class="x-button bi bi-x"></i>
        </button>
          <center class = "icon">
            <i class={icon[iconIndex]}></i>
          </center><br></br>
          <center>{text1}</center><br></br>
          <center>{text2}</center><br></br>
          <center>{text3}</center><br></br>
          <center>{text4}</center><br></br>
        </div>
      </div>
    </div>
  );
}

export default AlertModel;
 