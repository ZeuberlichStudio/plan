import React, { Component } from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

class Form extends Component{

  state = {
    name: '',
    brand: '',
    mail: '',
    phone: '',
    comment: '',
    agreement: ''
  }

  handleChange = e => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  };

  submitForm = e => {

    /*notices*/

    let allFieldsReq = 'Пожалуйста, заполните все неободимые поля формы.';
    let agreementReq = 'Пожалуйста, подтвердите согласие на обработку персональных данных.';

    /*state variables*/

    const {
      name,
      brand,
      mail,
      phone,
      comment,
      agreement
    } = this.state;

    /*if filled*/

    if( name && brand && mail && phone && agreement ){

      let xhr = new XMLHttpRequest();

      xhr.open('get', 'https://mail.planagency.ru/index.php?' +
      '&name=' + name +
      '&brand=' + brand +
      '&email=' + mail +
      '&phone=' + phone +
      '&comment=' + comment, true
      );
      xhr.send();

      xhr.onload = () => {
        let button = document.getElementsByTagName('button')[0];

        button.style.opacity = 0;
        setTimeout( () => {
          button.innerHTML = 'Отправлено';
          button.style.opacity = 1;
          button.style.pointerEvents = 'none';
        }, 250 );

      }
    }else{
      this.props.history.push('/notice');
    }

    e.preventDefault();
  };

  render() {

    const {
      name,
      brand,
      mail,
      phone,
      comment
    } = this.state;

    return(
      <div className="form-container" onClick={ this.handleClick }>
        <form id="form">
          <input onChange={ this.handleChange } type="text" name="name" placeholder="Имя" value={ name }
           className="comfortaa-20 dark"/>
          <input onChange={ this.handleChange } type="text" name="brand" placeholder="Компания / бренд"  value={ brand }
           className="comfortaa-20 dark"/>
          <input onChange={ this.handleChange } type="email" name="mail" placeholder="E-mail"  value={ mail }
           className="comfortaa-20 dark"/>
          <input onChange={ this.handleChange } type="tel" name="phone" placeholder="Телефон"  value={ phone }
           className="comfortaa-20 dark"/>
          <textarea onChange={ this.handleChange } name="comment" placeholder="Ваши планы" value={ comment }
           className="comfortaa-20 dark"></textarea>
          <label className="agreement proxima-16 dark">
            <input name="agreement" onChange={ this.handleChange } type="checkbox"/>
            <span className="checkmark"></span>
            Я согласен(а) на обработку
            <Link to="/user-agreement" className="white"> персональных данных</Link>
          </label>
          <button onClick={ this.submitForm } className="comfortaa-20 dark">
            Отправить
          </button>
        </form>
      </div>
    )
  }
}

class NoticeBox extends Component{

  state = {
    userAgreement: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?'
  }

  render() {
    return(
      <div id="notice">
        <div className="notice--content-wrapper">
          <div className="notice--header">
            <Link to="/" id="notice--close"></Link>
          </div>
          <div className="notice--content comfortaa-20 white">
            {
              this.props.content === 'user-agreement' ?
              <p>{ this.state.userAgreement }</p> :
              <p>
                Пожалуйста, заполните все необходимые поля формы и примите
                <Link to="/user-agreement"> пользовательское соглашение.</Link>
              </p>
            }
          </div>
        </div>
      </div>
    )
  }
}

export default class Contacts extends Component{
  render() {
    return(
      <section id="contacts">
          <Route path="/user-agreement" render={ () => <NoticeBox content="user-agreement"/> }/>
          <Route path="/notice" render={ () => <NoticeBox content="notice"/> }/>
          <div className="plan"></div>
          <div className="social">
            <a href="https://wa.me/79031615533"></a>
            <a href="mailto: welcome@planagency.ru"></a>
            <a href="instagram://user?username=plan.agency"></a>
            <a href="https://www.facebook.com/plan.agency/"></a>
          </div>
          <h2 className="comfortaa-75 m-comfortaa-30">Навстречу новым планам</h2>
          <ul className="proxima-20 m-proxima-14 white">
            <li>
              <span className="label m-proxima-12">Рабочий:</span>
              +7 (903) 161-55-33
            </li>
            <li>
              <span className="label">Электронная почта:</span>
              <a href="mailto:welcome@planagency.ru">welcome@planagency.ru</a>
            </li>
            <li>
              <span className="label">Адрес:</span>
              <a href="https://goo.gl/maps/NnNHAyLZcasDvhN6A">125080 Москва, Волоколамское ш, д1, стр.1, офис 709А</a>
            </li>
          </ul>
          <a href="https://goo.gl/maps/NN8KLspNzZGGttBj6"><img alt="map" src="/images/map.png" className="map"/></a>
          <h3 className="comfortaa-35 dark">Планы решают всё</h3>
          <Form history={ this.props.history }/>
          <div className="phone-buttons">
            <a href="Tel: +7-903-161-55-33"></a>
            <a href="https://goo.gl/maps/NnNHAyLZcasDvhN6A"></a>
          </div>
      </section>
    )
  }
}
