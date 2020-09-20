import React, { Component } from 'react';

//images
import partners from 'images/partners.svg';

export default class Partners extends Component{

  componentDidMount() {

    document.body.addEventListener('scroll', () => {
      let scrolled = document.body.scrollLeft;
      let clientWidth = document.documentElement.clientWidth;
      let bodyScrollWidth = document.body.scrollWidth;
      let partnersBar = document.getElementById('partners');
      let barScrollWidth = partnersBar.scrollWidth;

      partnersBar.scrollTo( (barScrollWidth - clientWidth) * scrolled / (bodyScrollWidth - clientWidth), 0);
    },
    {
      capture: true,
      passive: true
    });
  }

  render() {
    return(
      <div id="partners"><img alt="partners" src={partners}/></div>
    )
  }
}
