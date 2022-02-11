import { React, useState, useEffect } from 'react';
import data from '../../data/datanews.js';

import './Announcement.css';

function Announcement() {

  
  function NewsList() {
    
    const [state, setState] = useState(data.map((x)=>({...x,check:false})));
    const checkState = (index) =>{
      let a=[...state];
      a[index].check=!a[index].check;
      setState(a);
    }
    const News = ({idNews,title,image,detail,date,index,check}) => {
      return(
          <article className="news">
            <div class='title'>
              <h2>{title}</h2>
              <h3>{date}</h3>
              
            </div>
      
            <img src={image} alt='scholarship promote'/>

            <div class='bottom'>
              <div class='user-panel'>
                <h3 onClick={() => checkState(index)}>
                    {!check ? "รายละเอียดเพิ่มเติม ⋁" : "รายละเอียดเพิ่มเติม ⋀"}
                </h3>
              </div>
            </div>

            {check && <h3>{detail}</h3>}

          </article>
      );
    }
    
    return (
      <section> {
        state.map((news, index) => {
          const {image, title, detail, date ,check} = news;
          return (
            <div>
              <News
                check={check}
                index={index}
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
    <div class="annoucement ">
        <div class="header d-flex">
            <div class="icon-news">
                <i class="bi bi-megaphone"></i>
            </div>
            <h4>ประกาศข่าวสาร</h4>
        </div>

        <div class="newslist">
          <NewsList/>
        </div>

    </div>
  );
}


export default Announcement;
