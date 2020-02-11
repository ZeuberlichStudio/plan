import React, { Component } from 'react';

export default class MidAnimation extends Component {
  componentDidMount() {

    let midWrapper = document.getElementById('mid-animation-wrapper');
    let midContainer = document.getElementById('mid-animation-container');

    let midAnimation = window.lottie.loadAnimation({
      container: midContainer,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path: '/json/mid.json'
    });

    midAnimation.addEventListener('DOMLoaded', () => {
      let midTotalFrames = midAnimation.totalFrames;

      /*scroll start*/
      document.body.addEventListener('scroll', () => {
          let scrollX = document.body.scrollLeft;

          let goTo = midTotalFrames * (scrollX / midWrapper.offsetWidth);

          if( goTo > 0 && goTo < midTotalFrames - 5){
            midAnimation.goToAndStop( Math.round(goTo), true);
          }
      });
      /*scroll end*/
    });

    let animationText = document.getElementsByClassName('fix');

    midAnimation.addEventListener('enterFrame', () => {
      if( midAnimation.currentFrame >= 70 ){
        for( let i = 0; i < animationText.length; i++ ){
          animationText[i].classList.add('fixed');
        };
      }else{
        for( let i = 0; i < animationText.length; i++ ){
          animationText[i].classList.remove('fixed');
        };
      }
    });

  }

  render (){
    return(
      <div id="mid-animation-wrapper">
        <div id="mid-animation-container"></div>
      </div>
    )
  }
}
