/*eslint no-unused-vars:*/

import { React, useState, useEffect } from 'react';
import User from '../../data/datanews.js';

function StatusList(props) {
	const [scholar, setState] = useState(User.map((x)=>({...x,check:false})));
	const checkState = (index) =>{
		let a=[...scholar];
		a[index].check=!a[index].check;
		setState(a);
	}
	const [showModal, setShowModal] = useState(false);

	function getConfirm(data) {
		if (data) {
			// alert('TRUE !')
			// PUSH DATA TO DATABASE
			// CLOSE OR SAVE
			props.setContent(['admin','ScholarshipStatus']);
		} else {
			// alert('FALSE !')
		}
		setShowModal(false);
	}

	return(
		scholar.map((scholar, index) => (
			<div className="d-flex" key={index}>
				<div className="list3">

					<div className='title'>
						<h2>{scholar.title}</h2>
						<h3>{scholar.date}</h3>
					</div>

					<div className='bottom1'>
						<div className='admin-panel'>
						</div>
						<div className='user-panel'>
							<h3 onClick={() => checkState(index)}>
								{!scholar.check ? "รายละเอียดเพิ่มเติม (แสดง)" : "รายละเอียดเพิ่มเติม (ซ่อน)"}
							</h3>
						</div>
					</div>

					{scholar.check && <h3>{scholar.detail}</h3>} 
					
				</div>
				<button className="button-big" onClick={() => setShowModal(true)}>
					นัดหมาย
				</button>
				{/* showModal && <AlertModal sendConfirm={getConfirm}/> */}
			</div>
		))
	)
}

export default StatusList;