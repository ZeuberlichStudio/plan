import React, { Component } from 'react';

export default class About extends Component{

  render (){
    return(
      <section id="about">
        <div id="about-anchor"></div>
        <h2 className="about--header m-comfortaa-30 about--fade-in">Находим решение</h2>
        <p className="about--p-1 comfortaa-20 m-comfortaa-14 white about--fade-in">
        Агентство PLAN основано в 2014 году.<br/>
        Команда экспертов с опытом более 15 лет в маркетинге и рекламе
        разрабатывает стратегические решения по развитию бизнеса и реализует комплекс коммуникационных решений.
        </p>
      </section>
    )
  }
}
