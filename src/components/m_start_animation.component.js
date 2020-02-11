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

    startAnimation.addEventListener('complete', () => {
      document.getElementById('phone-container').style.opacity = 1;
      window.lottie.destroy('mStartAnimation');
    });

    document.body.addEventListener('scroll', () => {
      let scrolled = document.body.scrollLeft;

      document.getElementById('phone-container').style.transform = `translateZ(0) scale(${1 + document.body.scrollLeft/document.body.offsetWidth})`;

    }, {capture: true, passive: true});
  }

  render (){
    return(
      <div id="m-start-animation-wrapper">
        <div id="m-start-animation-container"></div>
      </div>
    )
  }
}
