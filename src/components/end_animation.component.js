import React, { Component } from 'react';

//animation data
import end from 'json/end.json';

export default class EndAnimation extends Component {
  componentDidMount() {

    let endWrapper = document.getElementById('end-animation-wrapper');
    let endContainer = document.getElementById('end-animation-container');

    let endAnimation = window.lottie.loadAnimation({
      container: endContainer,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      animationData: end
    });

    endAnimation.addEventListener('DOMLoaded', () => {
      let bound;

      document.body.addEventListener('scroll', () => {
        bound = endWrapper.getBoundingClientRect().left;
        if( bound <= document.documentElement.clientWidth / 2 ){
          endAnimation.play();
        }
      },
      {
        capture: true,
        passive: true
      })
    });
  }

  render (){
    return(
      <div id="end-animation-wrapper">
        <div id="end-animation-container"></div>
      </div>
    )
  }
}
