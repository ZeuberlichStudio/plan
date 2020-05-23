import React, {Fragment, useEffect, useState} from 'react'
import parseHtml from 'react-html-parser'

const Post = ({showClients, ...post}) => {
  return(
    <div className="post">
      <div className="post_text">
        {
          showClients ?
          <ul className="post_clients">
            { post.client.map(client => <li>{client.name}</li>) }
          </ul> : null
        }
        <span className="post_date">
          <span className="post_date_year">{ post.year }</span>
          <span className="post_date_month">{ post.month }</span>
        </span>
        <h2 className="post_title">{ post.title }</h2>
        { post.content ? <p className="post_content">{ parseHtml(post.content) }</p> : null }
        <span className="post_adds-header">{ post.additionsHeader }</span>
        <ul className="post_adds">
          {
            post.additions.map( add =>
              <li className="post_adds_add">
                { add.map( phrase => <span>{ phrase }</span> ) }
              </li>
            )
          }
        </ul>
      </div>
      <div className="post_media">
        {
          post.mediaType === "slides" ?
          <Slider id={post._id} images={post.slides}/> : null
        }
        {
          post.mediaType === "image" ?
          <img className="post_media_image" src={post.img} alt="post_image"/> : null
        }
        {
          post.mediaType === "video" ?
          <Video src={post.video}/>: null
        }
        {
          post.mediaType === "html" ?
          <div className="post_media_html">
            { parseHtml(post.html) }
          </div> : null
        }
      </div>
    </div>
  )
}

const Video = ({src}) => (
  <div className="post_media_video">
    <iframe width="560" height="315"
    src={ src }
    frameborder="0"
    allow="accelerometer;
    encrypted-media;
    gyroscope;
    picture-in-picture"
    allowfullscreen>
    </iframe>
  </div>
)

const Slider = ({id, images}) => {

  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesTotal, setSlidesTotal] = useState(images.length);

  useEffect(() => {
    clone();
  }, []);

  function clone() {
    const container = document.getElementById(id).
          getElementsByClassName('post_media_slider_slides')[0];
    const firstSlide = container.children[0];
    const lastSlide = container.children[container.children.length - 1];

    container.append(firstSlide.cloneNode(true));
    container.insertBefore(lastSlide.cloneNode(true), firstSlide);
  };

  function changeSlide(slide) {
    const container = document.getElementById(id).
          getElementsByClassName('post_media_slider_slides')[0];

    if( slide < 0 ){
      container.classList.add('animating');
      container.style.setProperty('--slide', slide);
      setCurrentSlide(slidesTotal - 1);
      setTimeout(() => {
        container.classList.remove('animating');
        container.style.setProperty('--slide', slidesTotal - 1);
      }, 300);
    }

    if( slide > slidesTotal - 1 ){
      container.classList.add('animating');
      container.style.setProperty('--slide', slide);
      setCurrentSlide(0);
      setTimeout(() => {
        container.classList.remove('animating');
        container.style.setProperty('--slide', 0);
      }, 300);
    }

    if( slide <= slidesTotal - 1 && slide >= 0 ){
      container.classList.add('animating');
      container.style.setProperty('--slide', slide);
      setCurrentSlide(slide);
      setTimeout(() => {
        container.classList.remove('animating');
      }, 300);
    }
  }

  return(
    <div id={id} className="post_media_slider">
      <button onClick={() => changeSlide(currentSlide+1)} className="post_media_slider_next"/>
      <button onClick={() => changeSlide(currentSlide-1)} className="post_media_slider_prev"/>
      <div className="post_media_slider_slides">
        {
          images.map((img, i) =>
            <div className="post_media_slider_slides_slide">
              <img src={img} alt={i}/>
            </div>
          )
        }
      </div>
      <div className="post_media_slider_map">
        { images.map((img, i) => <i className={ currentSlide === i ? "active" : null }/>) }
      </div>
    </div>
  );
}

export default Post
