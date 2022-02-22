import { React, useState } from 'react';
import data from '../data/datanews.js';

function NewsListlogin(props) {
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
                    {!visible ? "รายละเอียดเพิ่มเติม (แสดง)" : "รายละเอียดเพิ่มเติม (ซ่อน)"}
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

export default  NewsListlogin;

