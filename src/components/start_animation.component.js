import React, { Component } from 'react';

//animation data
import start from 'json/start.json';

export default class startAnimation extends Component {
  componentDidMount() {
    let startContainer = document.getElementById('start-animation-container');

    let startAnimation = window.lottie.loadAnimation({
        container: startContainer,
        renderer: 'svg',
        loop: false,
        autoplay: true,
        animationData: start
      });
    };

  render (){
    return(
      <div id="start-animation-wrapper">
        <div id="start-animation-container"></div>
      </div>
    )
  }
}
