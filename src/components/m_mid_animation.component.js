import React, { Component } from 'react';

export default class MMidAnimation extends Component {
  componentDidMount() {

    let midContainer = document.getElementById('m-mid-animation-container');

    let mMidAnimation= window.lottie.loadAnimation({
      name: 'MMidAnimation',
      container: midContainer,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path: '/json/m_mid.json'
    });

    document.body.addEventListener('scroll', () => {

      if( document.body.scrollLeft > document.documentElement.clientWidth - 100){
        window.lottie.play('MMidAnimation');
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

  render (){
    return(
      <div id="m-mid-animation-wrapper">
        <div id="m-mid-animation-container"></div>
      </div>
    )
  }
}
