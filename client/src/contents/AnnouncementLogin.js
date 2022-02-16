import { React, useState } from 'react';
import data from '../data/datanews.js';
import './AnnouncementLogin.css';

function AnnouncementLogin() {

  function NewsList() {
    const [visible, setVisible] = useState(false);
    const News = ({idNews,title,image,detail,date}) => {
      return(
          <article className="news">
            <div className='title'>
              <h2>{title}</h2>
              <h3>{date}</h3>
            </div>
            
        
            <img src={image} alt='scholarship promote'/>
            <div className='bottom'>
              <div className='user-panel'>
                <h3 onClick={() => setVisible(!visible)}>
                    {!visible ? "รายละเอียดเพิ่มเติม ∨" : "รายละเอียดเพิ่มเติม ∧"}
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
    <div className="annoucement-login">

      <div className="header d-flex">
        <div className="icon-news">
          <i className="bi bi-megaphone"></i>
        </div>
        <h4>ประกาศข่าวสาร</h4>
      </div>

      <div className="newslist">
        <NewsList/>
      </div>

    </div>
  );
}

export default AnnouncementLogin;
