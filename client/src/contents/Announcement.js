import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import data from '../data/datanews.js';
import './Announcement.css';
import Axios from 'axios';
import AnnouncementCreate from '../sub-contents/AnnouncementCreate.js';




/*
  HOW IT WORK
  [LOGIN]
  1.
*/
function Announcement(props) {

  const [AnnouncementList,setAnnouncementList] = useState([]);
  const getAnnouncement = () =>{
    Axios.get("http://localhost:5000/announcement", {}).then((response)=> { 
      console.log(response)

      setAnnouncementList(response.data);
    })
      //"กูจับตาดูมึงอยู่นะ" 
  }
  
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("");

  const content = 'AnnouncementCreate';

  const sendContent = (props) => {
    
  }
  const getPermission =()=>{
    alert('fetching...');
  }

  function NewsList() {
    const [state, setState] = useState(data.map((x)=>({...x,check:false})));
    const checkState = (index) => {
      let a=[...state];
      a[index].check=!a[index].check;
      setState(a);
    }
    
    return (
      state.map((news, index) => {
        return (
          <article className="news">
            <div class='title'>
              <h2>{news.title}</h2>
              <h3>{news.date}</h3>
            </div>
        
            <img src={news.image} alt='scholarship promote'/>
            <div class='bottom'>
              <div class='admin-panel'>
              </div>
              <div class='user-panel'>
                <h3 onClick={() => checkState(index)}>
                    {!news.check ? "รายละเอียดเพิ่มเติม ⋁" : "รายละเอียดเพิ่มเติม ⋀"}
                </h3>
              </div>
            </div>
            {news.check && <h3>{news.detail}</h3>}
          </article>
        );
      })
    )
  }

  return (
    <div class="annoucement">

      <p>Ea aute elit minim aute. Nulla consequat labore consectetur quis aute. Quis dolor sint commodo ad laborum excepteur tempor sit dolore ex incididunt velit nisi. Id sit pariatur cillum sint aliquip adipisicing elit labore officia. Ullamco qui eiusmod incididunt veniam pariatur incididunt aute ut quis esse ut non. Enim aliquip commodo tempor ex minim ea in aliquip esse. Sit excepteur elit incididunt quis sit nulla enim consequat aliquip aliqua.</p>

<div class="newslist">
<NewsList/>
</div>
</div>
  );
}

export default Announcement;
