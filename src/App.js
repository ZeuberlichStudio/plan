import React, { Component } from 'react';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';
import './App.scss';

import MStartAnimation from './components/m_start_animation.component';
import MMidAnimation from './components/m_mid_animation.component';
import StartAnimation from './components/start_animation.component';
import MidAnimation from './components/mid_animation.component';
import EndAnimation from './components/end_animation.component';

import Header from './components/header.component';
import Start from './components/start.component';
import About from './components/about.component';
import Service from './components/service.component';
import Cases from './components/cases.component';
import Contacts from './components/contacts.component';
import Lightbox from './components/lightbox.component';

class App extends Component {

  componentDidMount(){
    let clientWidth, scrollWidth;

    window.addEventListener('resize', () => {
      /*render animation?*/
      clientWidth = document.documentElement.clientWidth;
      if( clientWidth > 1024 ) this.setState({ animation: true })
      else this.setState({ animation: false })
      /*set vh*/
      let vh = document.documentElement.clientHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      /*bottom bar*/
      //scrollWidth = document.body.scrollWidth;
    });

    window.dispatchEvent( new Event('resize') );

    /*let bar = document.getElementById('partners');

    window.addEventListener('scroll', () => {
      let scrolled = document.body.scrollLeft;

      bar.stye.left = -(bar.offsetWidth - clientWidth) * (scrolled/(scrollWidth - clientWidth)) + 'px';
    }, {
      capture: true,
      passive: true
    });*/
  }

  state = {
    animation: false
  }

  scrollHorizontally = e => {
    if( Math.abs(e.wheelDeltaX) < 0 ){
      e = window.event || e;
      var delta = Math.max(-1, Math.min(1, e.wheelDeltaY));
      document.body.scrollLeft -= (delta*100); // Multiplied by 40
      e.preventDefault();
    }
  }

  render() {

    if( this.props.location.pathname === '/' ){
      window.addEventListener('mousewheel', this.scrollHorizontally, {passive: true});
    }else{
      window. removeEventListener('mousewheel', this.scrollHorizontally, {passive: true})
    }

    return(
      <div className="App">
        <Header />
        <main>
            { this.state.animation ? <StartAnimation /> : <MStartAnimation /> }
            { this.state.animation ? <MidAnimation /> : <MMidAnimation /> }
            { this.state.animation ? <EndAnimation /> : null }
            <Start />
            <About />
            <Service />
            <Cases />
            <Contacts history={ this.props.history }/>
            <Route path="/posts" render={ () => <Lightbox/> } />
            <div id="partners"></div>
        </main>
      </div>
    );
  }
}

export default withRouter(App);
