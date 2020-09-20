import React, { Component } from 'react';

//animation data
import mid from 'json/m_mid.json';

export default class MMidAnimation extends Component {
  componentDidMount() {

    let midContainer = document.getElementById('m-mid-animation-container');

    let mMidAnimation= window.lottie.loadAnimation({
      name: 'MMidAnimation',
      container: midContainer,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      animationData: mid
    });

    document.getElementById('content').addEventListener('scroll', () => {
      
      if( this.containerRef.current.getBoundingClientRect().left >= 0 && this.containerRef.current.getBoundingClientRect().left <= 10 ){
        mMidAnimation.playSegments([120, 350], true);
      }

    },
    {
     capture: true,
     passive: true
    });

    mMidAnimation.addEventListener('complete', () => {
      for( let i = 0; i < 2; i++ ){
        document.getElementsByClassName('about--fade-in')[i].style.opacity = 1;
      };
    });
  }

  containerRef = React.createRef();

  render (){
    return(
      <div ref={this.containerRef} id="m-mid-animation-wrapper">
        <div id="m-mid-animation-container"></div>
      </div>
    )
  }
}
