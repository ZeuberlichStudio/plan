import React, { Component } from 'react';

export default class MStartAnimation extends Component {
  componentDidMount() {

    let startWrapper = document.getElementById('m-start-animation-wrapper');
    let startContainer = document.getElementById('m-start-animation-container');

    let startAnimation = window.lottie.loadAnimation({
      name: 'mStartAnimation',
      container: startContainer,
      renderer: 'svg',
      loop: false,
      autoplay: true,
      path: '/json/m_start.json'
    });

    /*document.body.addEventListener('scroll', () => {
      let scrolled = document.body.scrollLeft;
      let clientWidth = document.documentElement.clientWidth;

      document.getElementById('phone-container').style.transform = `translateZ(0) scale(${1 + scrolled/clientWidth})`;

    },
    {
      capture: true,
      passive: true
    });*/
  }

  render (){
    return(
      <div id="m-start-animation-wrapper">
        <div id="m-start-animation-container"></div>
      </div>
    )
  }
}
