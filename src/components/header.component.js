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

    document.getElementById('content').addEventListener('scroll', e => {
      let scrollX = document.getElementById('content').scrollLeft;
      const isMobile = this.props.mobile;

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

  openBurger = () => {
    let burger_active = this.state.burger_active ? false : true;
    this.setState({ burger_active });
  }

  navClickHandler = (e, time, horizontal = true) => {
    e.preventDefault();
    const contentContainer = document.getElementById('content');
    const isMobile = this.props.mobile;
    const isAppleDevice = [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod',
      'MacIntel'
    ].includes(this.props.platform);
    const anchor = document.getElementById(e.currentTarget.dataset.anchor);
    const scrollLength = horizontal ? anchor.getBoundingClientRect().left : anchor.getBoundingClientRect().top;
    const anchorPosition = horizontal ? anchor.offsetLeft : anchor.offsetTop;
    const direction = scrollLength > 0 ? 1 : 0;

    if (isMobile && !isAppleDevice) contentContainer.style.scrollSnapType = "none";
    const interval = setInterval(intervalCallback, 10);

    function intervalCallback() {
      const windowPosition = isMobile ? document.getElementById('content').scrollLeft : document.body.scrollLeft;
      const nextPosition = windowPosition + scrollLength/60/time;

      if(
        direction && nextPosition < anchorPosition ||
        !direction && nextPosition > anchorPosition
      ){

        if (isMobile) {
          contentContainer.scrollTo( nextPosition, 0 );
        }else{
          document.body.scrollTo(nextPosition, 0);
        }
          
      }else{
        
        if (isMobile) {
          contentContainer.scrollTo( nextPosition, 0 );
        }else{
          document.body.scrollTo(nextPosition, 0);
        }

        clearInterval(interval);
        if (isMobile && !isAppleDevice) contentContainer.style.scrollSnapType = null;
      }
    }
  }

  render (){
    return(
      <header id="header" className={ "color-" + this.state.color_from }>
        <Link to="/" onClick={ e => this.navClickHandler(e, 0.75) } data-anchor="start" className="logo" id="logo-container"></Link>
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
            <li className="nav-item"><Link to="/" onClick={ e => this.navClickHandler(e, 0.75) } data-anchor="about-anchor">мы</Link></li>
            <li className="nav-item"><Link to="/" onClick={ e => this.navClickHandler(e, 0.75) } data-anchor="service">сервисы</Link></li>
            <li className="nav-item">
              <Link to="/" onClick={ e => this.navClickHandler(e, 0.75) } data-anchor="special-projects">cпецпроекты</Link>
            </li>
            <li className="nav-item"><Link to="/" onClick={ e => this.navClickHandler(e, 0.75) } data-anchor="cases">кейсы</Link></li>
            <li className="nav-item"><Link to="/" onClick={ e => this.navClickHandler(e, 0.75) } data-anchor="contacts">контакты</Link></li>
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
