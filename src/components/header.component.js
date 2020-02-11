import React, {Component} from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component{

  state = {
    burger_active: false,
    color_from: 0,
  }

  componentDidMount(){

    if (window.innerWidth > 785){
      let text = document.getElementById('description-hide');
      let text_initial_width = text.offsetWidth;
      document.body.addEventListener('scroll', () => {
        let scroll_depth = document.body.scrollLeft;
        text.style.width = scroll_depth > text_initial_width ? 0 : text_initial_width - scroll_depth + 'px';
      }, {
        capture: true,
        passive: true
      });
    }

    /*scroll css variavle*/
    let scroll_depth_px = 0;
    document.body.addEventListener('scroll', () => {
      scroll_depth_px = document.body.scrollLeft;
      document.documentElement.style.setProperty('--scroll_depth_px', `${scroll_depth_px}px`);
    }, {
      capture: true,
      passive: true
    })

  }

  Anchor = (e) => {

    let link = e.currentTarget.dataset.link;
    let goTo = document.getElementById(link).offsetLeft;

    let id = setInterval(frame, 0.5);
    let position = document.body.scrollLeft;
    let i = 0;
    let step;

    function frame() {
      if( position === goTo ){
        clearInterval(id);
      }else{
        i += 1.5;
        step = (1 * i);
        if( position < goTo ){
           position += step
           position = position > goTo ? goTo : position
         }
        else{
          position -= step
          position = position < goTo ? goTo : position
        }

        document.body.scrollTo(position, 0);
      }
    }
  }



  openBurger = () => {
    let burger_active = this.state.burger_active ? false : true;
    this.setState({ burger_active });
  }

  render (){
    return(
      <header id="header" className={ "color-" + this.state.color_from }>
        <Link to="/" onClick={(e)=>this.Anchor(e)} data-link="start" className="logo"></Link>
        <div id="description-hide" className="description-wrapper">
          <span className="description">
            Коммуникационное агентство
            со стратегическим фокусом
          </span>
        </div>

        <nav className={ this.state.burger_active ? 'burger-active' : null }>
          <div onClick={ () => this.openBurger() } className="hamburger-button">
          </div>
          <ul className="nav-links">
            <li className="nav-item"><Link to="/" onClick={(e)=>this.Anchor(e)} data-link="about">мы</Link></li>
            <li className="nav-item"><Link to="/" onClick={(e)=>this.Anchor(e)} data-link="service">сервисы</Link></li>
            <li className="nav-item"><Link to="/" onClick={(e)=>this.Anchor(e)} data-link="cases">кейсы</Link></li>
            <li className="nav-item"><Link to="/" onClick={(e)=>this.Anchor(e)} data-link="contacts">контакты</Link></li>
          </ul>
        </nav>
        <div className="social">
          <a href="https://www.instagram.com/plan.agency/?hl=ru" className="social-item"></a>
          <a href="https://www.facebook.com/plan.agency/" className="social-item"></a>
        </div>
      </header>
    );
  }
}
