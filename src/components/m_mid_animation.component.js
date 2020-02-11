import React, { Component } from 'react';

export default class MMidAnimation extends Component {
  componentDidMount() {

    let midContainer = document.getElementById('m-mid-animation-container');

    let midAnimation = window.lottie.loadAnimation({
      name: 'MMidAnimation',
      container: midContainer,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path: '/json/m_mid.json'
    });

    document.body.addEventListener('scroll', () => {

      if( document.body.scrollLeft > document.documentElement.clientWidth){
        window.lottie.play('MMidAnimation');
      }

    }, {capture: true, passive: true});
  }

  render (){
    return(
      <div id="m-mid-animation-wrapper">
        <div id="m-mid-animation-container"></div>
      </div>
    )
  }
}
