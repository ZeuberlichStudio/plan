import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import lottie from 'lottie-web'

const ModalHeader = ({posts}) => {

  const { client: clientId } = useParams();
  const [client, setClient] = React.useState(null);

  useEffect(() => {
    if ( !client ) {
      const clientObj = posts[0].client.find( client => client._id === clientId );
      setClient( clientObj );
    }

    client && loadAnimation();
  }, [client]);

  function loadAnimation() {
    const container = document.getElementById('modal_header_animation');
    const path = client.illustration && client.illustration;

    const anim = path ?
    lottie.loadAnimation({
      container: container,
      autoplay: false,
      loop: false,
      path: path,
    }) : null;

    if( !anim ){
      container.classList.add('static-line');
    }

    controlAnimation(anim);
  };

  function controlAnimation(animation) {
    const wrapper = document.getElementById('modal-wrapper');
    const header = document.getElementById('modal_header');

    function toVw(px) {
      return `${px/1920*100*1}vw`;
    }

    wrapper.addEventListener('scroll', () => {
      const scrolled = wrapper.scrollTop;
      const length = 400;

      if( animation ){
        if( scrolled <= length ){
          //plays animation
          const framesTotal = animation.totalFrames - 10;

          let nextFrame = framesTotal * (scrolled / length);

          animation.goToAndStop(nextFrame, true)
        }else{
          animation.goToAndStop(animation.totalFrames - 10, true)
        }
      }

      //changes content layout
      if( scrolled > length && posts.length > 1 && !header.classList.contains('minified')){
        header.classList.add('fade-out');
        setTimeout( () => {
          header.classList.add('minified');
          header.classList.remove('fade-out');
        }, 300);
      }else if( scrolled < length && header.classList.contains('minified') ){
        header.classList.add('fade-out');
        setTimeout( () => {
          header.classList.remove('minified');
          header.classList.remove('fade-out');
        }, 300);
      }
    });
  };

  return(
    <div id="modal_header" className="modal_header">
      <div id="modal_header_animation" className="modal_header_animation"></div>
      <div className="modal_header_content">
        {/* <h2>{ posts[0].client[0].name }</h2> */}
        <h2>{ client && client.name }</h2>
        <h3>{ client && client.slogan }</h3>
        <Counter posts={posts}/>
        <p>{ client && client.about }</p>
      </div>
      <Link to="/" id="modal_close"></Link>
    </div>
  );
}

const Counter = ({posts}) => {

  function count() {
    let count = [0,0,0];

    if ( !Array.isArray(posts) ) return count; 

    posts.forEach(post => {
      post.cat.forEach(cat => {
        cat.name === "Аналитика" ?
        count[0]++ :
        cat.name === "Стратегия" ?
        count[1]++ :
        count[2]++
      });
    });

    return count;
  }

  return(
    <div className="modal_header_content_counter">
      <div className="modal_header_content_counter_cell">
        <span>{count()[0]}</span>
        <span>
          Аналитических
          <br/>
          проектов
        </span>
      </div>
      <div className="modal_header_content_counter_cell">
        <span>{count()[1]}</span>
        <span>
          Выстроенных
          <br/>
          стратегий
        </span>
      </div>
      <div className="modal_header_content_counter_cell">
        <span>{count()[2]}</span>
        <span>
          Успешных
          <br/>
          коммуникаций
        </span>
      </div>
    </div>
  )
}

export default ModalHeader
