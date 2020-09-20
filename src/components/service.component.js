import React, { Component } from 'react';
import Switch from './switch.component';

class ServiceText1 extends Component{
  render (){
    return (
      <ul className="service--changeable comfortaa-20 m-comfortaa-14 white">
        <li>Аудит рыночной силы бренда</li>
        <li>Оценка коммуникационной стратегии</li>
        <li>Мониторинг коммуникаций</li>
        <li className="proxima-16-it m-proxima-14-it dark">
        А также запуск и кураторство
        количественных и качественных
        маркетинговых исследований
        </li>
      </ul>
    );
  }
}

class TeamText1 extends Component{
  render (){
    return (
      <ul className="service--changeable comfortaa-20 m-comfortaa-14 white">
        <li>Маркетинг-аналитик</li>
        <li>Аналитик СМИ и соцмедиа</li>
        <li>Финансовый аналитик</li>
      </ul>
    );
  }
}

class ServiceText2 extends Component{
  render (){
    return (
      <ul className="service--changeable comfortaa-20 m-comfortaa-14 white">
        <li>Маркетинговая стратегия</li>
        <li>Брендинг</li>
        <li>Стратегия коммуникаций</li>
        <li className="proxima-16-it m-proxima-14-it dark">
          А также стратегический консалтинг
        </li>
      </ul>
    );
  }
}

class TeamText2 extends Component{
  render (){
    return (
      <ul className="service--changeable comfortaa-20 m-comfortaa-14 white">
        <li>Стратег</li>
        <li>Копирайтер</li>
        <li>Арт-директор</li>
        <li>Контент-менеджер</li>
      </ul>
    );
  }
}

class ServiceText3 extends Component{
  render (){
    return (
      <ul className="service--changeable comfortaa-20 m-comfortaa-14 white">
        <li>PR и мероприятия</li>
        <li>
        Соцмедиа: ведение сообществ и
        продвижение через лидеров мнений
        </li>
        <li>Спецпроекты с PR потенциалом</li>
        <li className="proxima-16-it m-proxima-14-it dark">
        А также видео/web производство
        </li>
      </ul>
    );
  }
}

class TeamText3 extends Component{
  render (){
    return (
      <ul className="service--changeable comfortaa-20 m-comfortaa-14 white">
        <li>PR-специалист</li>
        <li>Соцмедиа-специалист</li>
        <li>Продюссер спецпроектов</li>
      </ul>
    );
  }
}

class TeamNotice extends Component{
  render() {
    return(
      <span className="service--text-team notice proxima-20 white">
        Под каждую задачу мы формируем команду специалистов<br/> и, при необходимости, привлекаем внешних экспертов, лучших в своей области
      </span>
    )
  }
}

class ServiceNotice extends Component{
  render() {
    return(
      <span className="service--text-service notice proxima-20 white">
        Под каждую задачу мы формируем комплексный план решения<br/> и, при необходимости, рекомендуем внешних партнеров, лучших в своей области
      </span>
    )
  }
}

export default class Service extends Component{

  state = {
    switch: 0,
  };

  Change(){

    let blocksService = document.getElementsByClassName('service--text-service');
    console.log(blocksService);
    let blocksTeam = document.getElementsByClassName('service--text-team');

    let fade = (blocks ,opacity, animation) => {
      for( let i = 0; i < blocks.length; i++ ){
        blocks[i].style.opacity = opacity;
        blocks[i].style.animationName = animation;
      }
    }

    if (!this.state.switch){

      fade( blocksService, 1, 'fadeOut');

      setTimeout( () => {
        this.setState({switch: 1});
        fade( blocksTeam, 0, 'fadeIn');
      } , 500);

    }else{
      fade( blocksTeam, 1, 'fadeOut');

      setTimeout( () => {
        this.setState({switch: 0});
        fade( blocksService, 0, 'fadeIn');
      } , 500);
    }
  };

  render (){

    return(
      <section id="service">
        <div className="controls-container">
          <h2 className={ this.state.switch ? '' : 'selected' }>Сервисы</h2>
          <Switch onClick={ () => this.Change() } />
          <h2 className={ this.state.switch ? 'selected' : '' }>Команда</h2>
        </div>

        <div className={`service--text ${this.state.switch ? 'service--text-1  service--text-team' : 'service--text-1 service--text-service'}`}>
          <h2 className="comfortaa-35 m-comfortaa-30">Исследуем</h2>
          { this.state.switch ? <TeamText1/> : <ServiceText1/> }
        </div>

        <div className={`service--text ${this.state.switch ? 'service--text-2  service--text-team' : 'service--text-2 service--text-service'}`}>
          <h2 className="comfortaa-35 m-comfortaa-30">Стратегируем</h2>
          { this.state.switch ? <TeamText2/> : <ServiceText2/> }
        </div>

        <div className={`service--text ${this.state.switch ? 'service--text-3  service--text-team' : 'service--text-3 service--text-service'}`}>
          <h2 className="comfortaa-35 m-comfortaa-30">Коммуницируем</h2>
          { this.state.switch ? <TeamText3/> : <ServiceText3/> }
        </div>
        { this.state.switch ? <TeamNotice/> : <ServiceNotice/> }
      </section>
    )
  }
}
