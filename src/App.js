import React, { Component, Fragment } from 'react';
import { Route, withRouter } from 'react-router-dom';
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
import Modal from './components/modal.component';
import Partners from './components/partners.component';

class App extends Component {

  componentDidMount(){
    let clientWidth;

    window.addEventListener('resize', () => {
      /*render animation?*/
      clientWidth = document.documentElement.clientWidth;
      if( clientWidth > 1024 ) this.setState({ animation: true })
      else this.setState({ animation: false })
      /*set vh*/
      let vh = document.documentElement.clientHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    });

    window.dispatchEvent( new Event('resize') );
  }
  
  state = {
    animation: false,
    platform: this.Platform
  }

  get Platform() {
    return window.navigator.platform;
  }

  scrollHorizontally = e => {
    if( Math.abs(e.wheelDeltaX) === 0 ){
      document.body.style.overflowX = 'hidden';
      e = window.event || e;
      var delta = Math.max(-1, Math.min(1, e.wheelDeltaY));
      document.body.scrollLeft -= (delta*150); // Multiplied by 40
      //e.preventDefault();
    }else{
      e = window.event || e;
      var delta = Math.max(-1, Math.min(1, e.wheelDeltaX));
      document.body.scrollLeft -= (delta); // Multiplied by 40
      //e.preventDefault();
      document.body.style.overflowX = 'scroll';
    }
  }

  render() {

    if( this.props.location.pathname === '/' ){
      window.addEventListener('mousewheel', this.scrollHorizontally,
      {capture: true, passive: true});
    }else{
      window.removeEventListener('mousewheel', this.scrollHorizontally, {capture: true, passive: true})
    }

    return(
      <div className="App">
        <Header mobile={!this.state.animation} platform={this.state.platform}/>
        <main id="content">
            { this.state.animation ? <StartAnimation /> : <MStartAnimation /> }
            { this.state.animation ? <MidAnimation /> : <MMidAnimation /> }
            { this.state.animation ? <EndAnimation /> : null }
            <Start />
            <About />
            <Service />
            { !this.state.animation && <Fragment><div id="service-add-0"></div><div id="service-add-1"></div></Fragment> }
            <Cases />
            { !this.state.animation && <Fragment><div id="cases-add-0"></div><div id="cases-add-1"></div></Fragment> }
            <Contacts {...this.props} isMobile={!this.state.animation}/>
            <Route path="/posts" render={ props => <Modal {...props}/> } />
        </main>
        <Partners/>
      </div>
    );
  }
}

export default withRouter(App);
