import React, {Component} from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component{

  componentDidMount(){

    //gradient with property

    document.documentElement.style.setProperty('--scroll_depth_px', '0px');
    let descriptionContainer = document.getElementById('description-hide');

    document.body.addEventListener('scroll', () => {
      let scrollX = document.body.scrollLeft;

      document.documentElement.style.setProperty('--scroll_depth_px', `${scrollX}px`);

      if( scrollX > 100 && !descriptionContainer.style.width){
        descriptionContainer.style.width = `0px`;
      }else if(scrollX < 100 && descriptionContainer.style.width){
        descriptionContainer.style = null;
      }
    },{
      capture: true,
      passive: true
    });
  }

  state = {
    burger_active: false,
    color_from: 0,
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
        <Link to="/" onClick={(e)=>this.Anchor(e)} data-link="start" className="logo" id="logo-container"></Link>
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
            <li className="nav-item"><Link to="/" onClick={(e)=>this.Anchor(e)} data-link="about-anchor">мы</Link></li>
            <li className="nav-item"><Link to="/" onClick={(e)=>this.Anchor(e)} data-link="service">сервисы</Link></li>
            <li className="nav-item"><Link to="/" onClick={(e)=>this.Anchor(e)} data-link="cases">кейсы</Link></li>
            <li className="nav-item"><Link to="/" onClick={(e)=>this.Anchor(e)} data-link="contacts">контакты</Link></li>
          </ul>
        </nav>
        <div className="social">
          <a href="https://www.instagram.com/plan.agency/?hl=ru" target="_blank" className="social-item"></a>
          <a href="https://www.facebook.com/plan.agency/" target="_blank" className="social-item"></a>
        </div>
      </header>
    );
  }
}
