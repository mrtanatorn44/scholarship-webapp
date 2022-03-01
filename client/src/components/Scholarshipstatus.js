import { React, useState, useEffect } from 'react';
import data from '../data/datanews.js';
import AlertModal from '../modals/AlertModal.js';
import StudentScholarshipListRegister   from '../sub-contents/ScholarshipListRegister.js';



const [showModal, setShowModal] = useState(false);

    function getConfirm(data) {
        if (data) {
        //alert('TRUE !')
        // PUSH DATA TO DATABASE
        // CLOSE OR SAVE
        props.sendContent(['admin','ScholarshipStatus']);
        } else {
        //alert('FALSE !')
        }
        setShowModal(false);
    }


    function Scholarshipstatus(props){
        const [state, setState] = useState(data.map((x)=>({...x,check:false})));
        const checkState = (index) =>{
        let a=[...state];
        a[index].check=!a[index].check;
        setState(a);
        }
        
        const Scholar = ({idScholar,title,detail,date,index,check}) => {
        return(
            <div className = "d-flex">
                <div className = "scholar-list">
                    <div className = 'title'>
                        <h2>{title}</h2>
                        <h3>{date}</h3>
                    </div>
                    <div className='scholar-bottom'>
                        <div className='user-panel'>
                            <h3  onClick={() => checkState(index)}>
                                {!check ? "รายละเอียดเพิ่มเติม (แสดง)" : "รายละเอียดเพิ่มเติม (ซ่อน)"}
                            </h3>
                        </div>
                    </div>
                    {check && <h3>{detail}</h3>} 
                </div>
                <button className = "button-big" onClick = {() => setShowModal(true)}>
                    นัดหมาย
                </button>
                {showModal && <AlertModal sendConfirm={getConfirm}/>}
            </div>
            
        );

    }}

export default Scholarshipstatus;