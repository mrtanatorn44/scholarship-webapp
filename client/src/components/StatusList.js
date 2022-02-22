import { React, useState, useEffect } from 'react';
import User from '../data/datanews.js';
import AlertModal from '../modals/AlertModal.js';

function StatusList(props) {
	const [user, setState] = useState(User.map((x)=>({...x,check:false})));
	const checkState = (index) =>{
		let a=[...user];
		a[index].check=!a[index].check;
		setState(a);
	}
	const [showModal, setShowModal] = useState(false);

	function getConfirm(data) {
		if (data) {
			// alert('TRUE !')
			// PUSH DATA TO DATABASE
			// CLOSE OR SAVE
			props.sendContent(['admin','ScholarshipStatus']);
		} else {
			// alert('FALSE !')
		}
		setShowModal(false);
	}

	return(
		User.map((user, index) => (
			<div className="d-flex">
				<div className="scholar">
					<div className='title'>
						<h2>{user.title}</h2>
						<h3>{user.date}</h3>
					</div>
					<div className='bottom'>
						<div className='user-panel'>
							<h3 onClick={() => checkState(index)}>
								{!user.check ? "รายละเอียดเพิ่มเติม (แสดง)" : "รายละเอียดเพิ่มเติม (ซ่อน)"}
							</h3>
						</div>
					</div>
					{user.check && <h3>{user.detail}</h3>} 
				</div>
				<button className="button" onClick={() => setShowModal(true)}>
					นัดหมาย
				</button>
				{ showModal && <AlertModal sendConfirm={getConfirm}/> }
			</div>
		))
	)
}

export default StatusList;