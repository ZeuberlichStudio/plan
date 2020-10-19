import React, { Component } from 'react';

//animation data
import mid from 'json/m_mid.json';

export default class MMidAnimation extends Component {
  
  containerRef = React.createRef();
  mMidAnimation = {};

  componentDidMount() {

    let midContainer = document.getElementById('m-mid-animation-container');

    this.mMidAnimation = window.lottie.loadAnimation({
      name: 'MMidAnimation',
      container: midContainer,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      animationData: mid
    });

    const { mMidAnimation } = this;

    document.getElementById('content').addEventListener('scroll', () => {
      
      if ( !this.containerRef.current ) return;
      
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

  componentWillUnmount() {
    let midContainer = document.getElementById('m-mid-animation-container');

    const { mMidAnimation } = this;

    document.getElementById('content').removeEventListener('scroll', () => {

      if( this.containerRef.current.getBoundingClientRect().left >= 0 && this.containerRef.current.getBoundingClientRect().left <= 10 ){
        mMidAnimation.playSegments([120, 350], true);
      }

    },
    {
     capture: true,
     passive: true
    });
  }

  render (){
    return(
      <div ref={this.containerRef} id="m-mid-animation-wrapper">
        <div id="m-mid-animation-container"></div>
      </div>
    )
  }
}
