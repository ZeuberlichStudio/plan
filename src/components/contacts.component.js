import React, { Component } from 'react';
import isEmail from 'validator/lib/isEmail';
import isMobilePhone from 'validator/lib/isEmail';
import { Route, Link} from 'react-router-dom';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import mapIcon from '../mapIcon.svg';

class Form extends Component{

  state = {
    name: '',
    brand: '',
    mail: '',
    phone: '',
    comment: '',
    agreement: '',
    error: null
  }

  handleChange = e => {
    const {name, value} = e.currentTarget;

    if ( name === 'phone') {
      (/^[0-9-–+ ())]*$/.test(value) || !value) && this.setState({ [name]: value });
    }
    else {
      
    this.setState({ [name]: value });
    }
  };

  submitForm = e => {
    e.preventDefault();

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

      if ( !isEmail(mail) ) return this.setState({error: 'invalid email'});

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
      this.setState({error: 'empty fields'});
    }
  };

  renderError(value, fieldName) {
    const {error} = this.state;

    if ( !value && error === 'empty fields' ) return 'Поле обязательно для заполнения';
    else if ( fieldName === 'mail' && error === 'invalid email' ) return 'Неверный формат эл.адреса';
    else if ( fieldName === 'phone' && error === 'invalid phone' ) return 'Неверный формат номера';
  }

  render() {

    const {
      name,
      brand,
      mail,
      phone,
      comment,
      agreement,
      error
    } = this.state;

    return(
      <div className="form-container">
        <h3 className="comfortaa-35 dark">Планы решают всё</h3>

        <form id="form">
          <div className="field-container">
            <span className="error">{ this.renderError(name, 'name') }</span>
            <input onChange={ this.handleChange } type="text" name="name" placeholder="Имя" value={ name }
            className="comfortaa-20 dark"/>
          </div>
          <div className="field-container">
            <span className="error">{ this.renderError(brand, 'brand') }</span>
            <input onChange={ this.handleChange } type="text" name="brand" placeholder="Компания / бренд"  value={ brand }
            className="comfortaa-20 dark"/>
          </div>
          <div className="field-container">
            <span className="error">{ this.renderError(mail, 'mail') }</span>
            <input onChange={ this.handleChange } type="email" name="mail" placeholder="E-mail"  value={ mail }
            className="comfortaa-20 dark"/>
          </div>
          <div className="field-container">
            <span className="error">{ this.renderError(phone, 'phone') }</span>
            <input onChange={ this.handleChange } type="tel" name="phone" placeholder="Телефон"  value={ phone }
            className="comfortaa-20 dark"/>
          </div>
          <textarea onChange={ this.handleChange } name="comment" placeholder="Ваши планы" value={ comment }
           className="comfortaa-20 dark"></textarea>
          <label className="agreement proxima-16 dark">
            <input name="agreement" onChange={ this.handleChange } type="checkbox"/>
            <span className="checkmark"></span>
            <span>
              Я соглашаюсь с <br/>
              <Link to="/user-agreement" className="white"> политикой конфиденциальности</Link><br/>
              и на обработку персональных данных
              <span className="error">{ !agreement && error === 'empty fields' && '*' }</span>
            </span>
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

  componentDidMount() {
    let noticeContent = document.getElementsByClassName('notice--content')[0];
    let scrollbarRail = document.getElementById('notice-scrollbar-rail');
    let scrollbarThumb = document.getElementById('notice-scrollbar-thumb');
    let noticeContentHeight =
     noticeContent.offsetHeight;
    let textHeight =
     noticeContent.scrollHeight;

     if( textHeight > noticeContentHeight ){
       scrollbarRail.style.display = 'block';
       scrollbarThumb.style.height = `${scrollbarRail.offsetHeight * (noticeContentHeight/textHeight)}px`;
     }

    window.addEventListener('mousewheel', e => {
      noticeContent.scrollTo(0, noticeContent.scrollTop + e.deltaY);
      scrollbarThumb.style.top = `${(scrollbarRail.offsetHeight - scrollbarThumb.offsetHeight ) * (noticeContent.scrollTop/(textHeight - noticeContentHeight))}px`;
    },
    {
      capture: true,
      passive: true
    });

    window.addEventListener('resize', () => {
      window.dispatchEvent(new Event('mousewheel'));

      noticeContentHeight =
       noticeContent.offsetHeight;
      textHeight =
       noticeContent.scrollHeight;

      if( textHeight > noticeContentHeight ){
        scrollbarRail.style.display = 'block';
        scrollbarThumb.style.height = `${scrollbarRail.offsetHeight * (noticeContentHeight/textHeight)}px`;
      }
    });
  }

  render() {
    return(
      <div id="notice">
        <div className="notice--content-wrapper">
          <div className="notice--header">
            <h2 className="vw-comfortaa-35 m-comfortaa-14">{ this.props.content === 'user-agreement' ? 'Политика конфиденциальности' : 'Внимание' }</h2>
            <Link to="/" id="notice--close"></Link>
          </div>
          <div className="notice--content vw-comfortaa-20 m-comfortaa-14 white">
            {
              this.props.content === 'user-agreement' &&
              <p>
                <b style={{textAlign: "center"}}>
                  Политика конфиденциальности ООО «Коммуникационное агентство ПЛАН»
                  в отношении обработки персональных данных
                </b>
                <br/><br/>
                1.	Общие положения:
                <br/>
                <br/>
                Настоящая политика обработки персональных данных составлена в соответствии с требованиями Федерального закона от 27.07.2006. №152-ФЗ «О персональных данных» и определяет порядок обработки персональных данных и меры по обеспечению безопасности персональных данных ООО «Коммуникационное агентство ПЛАН», ИНН 7735161705, расположенное по адресу: 125080 , город Москва, Волоколамское шоссе, 1, строение 1, этаж 7, помещение 709А (далее – Оператор).
                <br/>
                <br/>
                1.1.	Оператор ставит своей важнейшей целью и условием осуществления своей деятельности соблюдение прав и свобод человека и гражданина при обработке его персональных данных, в том числе защиты прав на неприкосновенность частной жизни, личную и семейную тайну.
                <br/>
                <br/>
                1.2.	Настоящая политика Оператора в отношении обработки персональных данных (далее – Политика) применяется ко всей информации, которую Оператор может получить о посетителях сайта planagency.ru.

                <br/>
                <br/>
                2.	Основные понятия, используемые в Политике:
                <br/>
                <br/>
                2.1.	Автоматизированная обработка персональных данных – обработка персональных данных с помощью средств вычислительной техники. 
                <br/>
                <br/>
                2.2.	Блокирование персональных данных – временное прекращение обработки персональных данных (за исключением случаев, если обработка необходима для уточнения персональных данных). 
                <br/>
                <br/>
                2.3.	Сайт – совокупность текстов, графических элементов, дизайна, изображений, программного кода, фото- и видеоматериалов и иных результатов интеллектуальной деятельности, содержащихся в сети интернет под доменным именем planagency.ru. 
                <br/>
                <br/>
                2.4.	Информационная система персональных данных — совокупность содержащихся в базах данных персональных данных и обеспечивающих их обработку информационных технологий и технических средств. 
                <br/>
                <br/>
                2.5.	Обезличивание персональных данных — действия, в результате которых невозможно определить без использования дополнительной информации принадлежность персональных данных конкретному Пользователю или иному субъекту персональных данных. 
                <br/>
                <br/>
                2.6.	Обработка персональных данных – любое действие (операция) или совокупность действий (операций) с персональными данными, совершаемых с использованием средств автоматизации или без использования таких средств,  включая сбор, запись, систематизацию, накопление, хранение, уточнение (обновление, изменение), извлечение, использование, передачу (распространение, предоставление, доступ), обезличивание, блокирование, удаление, уничтожение персональных данных. 
                <br/>
                <br/>
                2.7.	Оператор – государственный орган, муниципальный орган, юридическое или физическое лицо, самостоятельно или совместно с другими лицами организующие и (или) осуществляющие обработку персональных данных, а также определяющие цели обработки персональных данных, состав персональных данных, подлежащих обработке, действия (операции), совершаемые с персональными данными. 
                <br/>
                <br/>
                2.8.	Персональные данные – любая информация, относящаяся прямо или косвенно к определенному или определяемому Пользователю сайта planagency.ru. 
                <br/>
                <br/>
                2.9.	Пользователь – любое лицо, осуществившее вход на сайт planagency.ru и принявшее условия настоящего Соглашения.
                <br/>
                <br/>
                2.10.	Предоставление персональных данных – действия, направленные на раскрытие персональных данных определенному лицу или определенному кругу лиц. 
                <br/>
                <br/>
                2.11.	Распространение персональных данных – любые действия, направленные на раскрытие персональных данных неопределенному кругу лиц (передача персональных данных) или на ознакомление с персональными данными неограниченного круга лиц, в том числе обнародование персональных данных в средствах массовой информации, размещение в информационно-телекоммуникационных сетях или предоставление доступа к персональным данным каким-либо иным способом. 
                <br/>
                <br/>
                2.12.	Уничтожение персональных данных – любые действия, в результате которых персональные данные уничтожаются безвозвратно с невозможностью дальнейшего восстановления содержания персональных данных в информационной системе персональных данных и (или) результате которых уничтожаются материальные носители персональных данных.

                <br/>
                <br/>
                3.	Правовые основания обработки персональных данных:                       
                <br/>
                <br/>
                3.1.	Оператор обрабатывает персональные данные Пользователя только в случае их заполнения и/или отправки Пользователем самостоятельно через специальные формы, расположенные на сайте planagency.ru. Заполняя соответствующие формы и/или отправляя свои персональные данные Оператору, Пользователь выражает свое согласие с данной Политикой.
                <br/>
                <br/>
                3.2.	Оператор обрабатывает обезличенные данные о Пользователе в случае, если это разрешено в настройках браузера Пользователя (включено сохранение файлов «cookie» и использование технологии JavaScript).
                <br/>
                <br/>
                3.3.	Объем и категории обрабатываемых персональных данных:
                <br/>
                <br/>
                •	фамилия, имя, отчество 
                <br/>
                <br/>
                •	компания и бренд
                <br/>
                <br/>
                •	электронный адрес 
                <br/>
                <br/>
                •	номер телефона. 
                <br/>
                <br/>
                3.4.	Также на сайте происходит сбор и обработка обезличенных данных о посетителях (в т.ч. файлов «cookie») с помощью сервисов интернет-статистики (Яндекс Метрика и Гугл Аналитика и других). 
                <br/>
                <br/>
                3.5.	Вышеперечисленные данные далее по тексту Политики объединены общим понятием Персональные данные.

                <br/>
                <br/>
                4.	Цели обработки персональных данных:
                <br/>
                <br/>
                4.1.	Цель обработки персональных данных Пользователя — направление Пользователю уведомлений и информации, связанных с использованием сайта, оказанием услуг, а также обработка запросов и заявок пользователя; Осуществление звонков по запросу обратного звонка.
                <br/>
                <br/>
                4.2.	Также Оператор имеет право направлять Пользователю уведомления о новых продуктах и услугах, специальных предложениях и различных событиях. Пользователь всегда может отказаться от получения информационных сообщений, направив Оператору письмо на адрес электронной почты subscribe@planagency.ru с пометкой «Отказ от уведомлениях о новых продуктах и услугах и специальных предложениях».
                <br/>
                <br/>
                4.3.	Обезличенные данные Пользователей, собираемые с помощью сервисов интернет-статистики, служат для сбора информации о действиях Пользователей на сайте, улучшения качества сайта и его содержания.

                <br/>
                <br/>
                5.	Порядок  и условия обработки персональных данных:
                <br/>
                <br/>
                5.1.	Обработка персональных данных начинается с момента получения согласия пользователя на обработку персональных данных (регистрации пользователя на сайте, отправка сообщения через форму обратной связи на Сайте) и осуществляется до достижения соответствующей цели обработки персональных данных или до момента отзыва согласия
                <br/>
                <br/>
                5.2.	Оператор обеспечивает сохранность персональных данных и принимает все возможные меры, исключающие доступ к персональным данным неуполномоченных лиц.
                <br/>
                <br/>
                5.3.	Персональные данные Пользователя никогда, ни при каких условиях не будут переданы третьим лицам, за исключением случаев, связанных с исполнением действующего законодательства.
                <br/>
                <br/>
                5.4.	В случае выявления неточностей в персональных данных, Пользователь может актуализировать их самостоятельно, путем направления Оператору уведомление на адрес электронной почты Оператора subscribe@planagency.ru с пометкой «Актуализация персональных данных».
                <br/>
                <br/>
                5.5.	Срок обработки персональных данных является неограниченным. Пользователь может в любой момент отозвать свое согласие на обработку персональных данных, направив Оператору уведомление посредством электронной почты на электронный адрес Оператора subscribe@planagency.ru с пометкой «Отзыв согласия на обработку персональных данных».

                <br/>
                <br/>
                6.	Заключительные положения:
                <br/>
                <br/>
                6.1.	Пользователь может получить любые разъяснения по интересующим вопросам, касающимся обработки его персональных данных, обратившись к Оператору с помощью электронной почты subscribe@planagency.ru.
                <br/>
                <br/>
                6.2.	В данном документе будут отражены любые изменения политики обработки персональных данных Оператором. Политика действует бессрочно до замены ее новой версией.
                <br/>
                <br/>
                6.3.	Актуальная версия Политики в свободном доступе расположена в сети Интернет по адресу&nbsp;
                <a href="https://planagency.ru/user-agreement"><u>planagency.ru/user-agreement</u></a>.
              </p>
            }
          </div>
          <div id="notice-scrollbar-rail">
            <div id="notice-scrollbar-thumb"></div>
          </div>
        </div>
      </div>
    )
  }
}

export default class Contacts extends Component{

  componentDidMount() {
    if( this.props.location.pathname === "/make-a-call" ) this.makeCall()
  }

  makeCall() {
    document.getElementById("call-button").click();
  }

  mapStylePC = {
    width: '50.648vh',
    height: '18.519vh',
    marginTop: '1.852vh',
    borderRadius: '1.852vh',
    overflow: 'hidden'
  };

  mapIconOptions = {
    iconLayout: "default#image",
    iconImageHref: mapIcon,
  }

  mapIconProps = {
    hintContent: "Plan",
  }

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
              +7 (495) 147-47-75
            </li>
            <li>
              <span className="label">Электронная почта:</span>
              <a href="mailto:welcome@planagency.ru">welcome@planagency.ru</a>
            </li>
            <li>
              <span className="label">Адрес:</span>
              <a href="https://yandex.ru/maps/213/moscow/?ll=37.504681%2C55.806525&mode=search&oid=216252246573&ol=biz&z=18" target="_blank">125080 Москва,<br/> Волоколамское ш, д1, стр.1, офис 709А</a>
            </li>
          </ul>
          <div className="map">
            <YMaps>
              <Map
                style={ this.mapStylePC }
                defaultState={{ center: [55.806525, 37.504681], zoom: 16 }}
              >
                <Placemark geometry={[55.806525, 37.504681]} properties={this.mapIconProps} options={this.mapIconOptions} modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}/>
              </Map>
            </YMaps>
          </div>
          <Form history={ this.props.history }/>
          <div className="phone-buttons">
            <a id="call-button" href="Tel: +7-495-147-47-75"></a>
            <a href="https://yandex.ru/maps/213/moscow/?ll=37.504681%2C55.806525&mode=search&oid=216252246573&ol=biz&z=18"></a>
          </div>

          <span id="copyright">
              <span>© коммуникационное агентство ПЛАН, 2020</span>
              <span>Использование материалов сайта допустимо только с разрешения правообладателя.</span>
          </span>
      </section>
    )
  }
}
