import React, { Component, Fragment } from 'react';

//animation data
import mid from 'json/mid.json';

export default class MidAnimation extends Component {
  componentDidMount() {

    let midWrapper = document.getElementById('mid-animation-wrapper');
    let midContainer = document.getElementById('mid-animation-container');

    let midAnimation = window.lottie.loadAnimation({
      container: midContainer,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      animationData: mid
    });


    midAnimation.addEventListener('DOMLoaded', () => {

      let midTotalFrames = midAnimation.totalFrames;

      document.body.addEventListener('scroll', () => {
          let scrollX = document.body.scrollLeft;

          let goTo = midTotalFrames * (scrollX / midWrapper.offsetWidth);

          if( goTo > 0 && goTo < midTotalFrames - 1 ){
            midAnimation.goToAndStop( goTo, true);
          }
      },{
        capture: true,
        passive: true
      });
    });
  }

  render (){
    return(
      <Fragment>
        <div id="mid-animation-wrapper">
          <div id="mid-animation-container"></div>
        </div>
      </Fragment>
    )
  }
}
