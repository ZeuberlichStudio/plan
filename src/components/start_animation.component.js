import React, { Component } from 'react';

export default class startAnimation extends Component {
  componentDidMount() {
    let startWrapper = document.getElementById('start-animation-wrapper');
    let startContainer = document.getElementById('start-animation-container');

    let startAnimation = window.lottie.loadAnimation({
      container: startContainer,
      renderer: 'svg',
      loop: false,
      autoplay: true,
      path: '/json/start.json'
    });
  }

  render (){
    return(
      <div id="start-animation-wrapper">
        <div id="start-animation-container"></div>
      </div>
    )
  }
}
