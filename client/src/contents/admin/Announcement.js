import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import data from '../../data/datanews.js';
import './Announcement.css';
import Axios from 'axios';
import AdminAnnouncementCreate from '../../sub-contents/admin/AnnouncementCreate.js';




/*
  HOW IT WORK
  [LOGIN]
  1.
*/
function Announcement(props) {

  
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("");

  const content = 'AdminAnnouncementCreate';

  const sendContent = (props) => {
    
  }
  const getPermission =()=>{
    alert('fetching...');

    Axios.get("http://localhost:5000/product").then((response)=>{
      alert(response.data);
    });  
  }

  function NewsList() {
    const [visible, setVisible] = useState(false);
    const News = ({idNews,title,image,detail,date}) => {
      return(
          <article className="news">
            <div class='title'>
              <h2>{title}</h2>
              <h3>{date}</h3>
              
            </div>
            
        
            <img src={image} alt='scholarship promote'/>
            <div class='bottom'>
              <div class='admin-panel'>
                <h3 onClick={getPermission}>
                  EDIT
                </h3>
                <h3 >
                  DELETE
                </h3>
              </div>
              <div class='user-panel'>
                <h3 onClick={() => setVisible(!visible)}>
                    {!visible ? "รายละเอียดเพิ่มเติม ⋁" : "รายละเอียดเพิ่มเติม ⋀"}
                </h3>
              </div>
            </div>

            {visible && <h3>{detail}</h3>}

          </article>
      );
    }
     
    return (
      <section> {
        data.map((news, index) => {
          const {image, title, detail, date } = news;
          return (
            <div>
              <News
                date = {date}
                image={image}
                title={title}
                detail={detail}
              />
            </div>
          );
        })
      } </section>
    );
  }

  return (
    <div class="annoucement">

      <div class="header d-flex">
 
        <div class='column-left d-flex'>
          <div class="icon-news">
            <i class="bi bi-megaphone"></i>
          </div> 
          <h4>ประกาศข่าวสาร</h4>
        </div>
        
        <div class='column-center'>

        </div>

        <div class='column-right'>
          
            <button  className='addNews d-flex' onClick={ () => props.sendContent(['admin', 'AdminAnnouncementCreate']) } >
              <i class="bi bi-plus-lg"></i>
              <p>เพิ่มข่าวสาร</p>
            </button>
          
        </div>

      </div>

      <div class="newslist">
        <NewsList/>
      </div>

    </div>
  );
}

export default Announcement;
