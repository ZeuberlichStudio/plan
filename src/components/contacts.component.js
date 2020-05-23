import React, { Component } from 'react';
import { Route, Link} from 'react-router-dom';
import { YMaps, Map, Placemark } from 'react-yandex-maps';

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
      <div className="form-container">
        <h3 className="comfortaa-35 dark">Планы решают всё</h3>

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
              this.props.content === 'user-agreement' ?
              <p>
                1. Общие положения
                Настоящая политика обработки персональных данных составлена в соответствии с требованиями Федерального закона от 27.07.2006. №152-ФЗ «О персональных данных» и определяет порядок обработки персональных данных и меры по обеспечению безопасности персональных данных ООО(далее – Оператор).
                Оператор ставит своей важнейшей целью и условием осуществления своей деятельности соблюдение прав и свобод человека и гражданина при обработке его персональных данных, в том числе защиты прав на неприкосновенность частной жизни, личную и семейную тайну.
                Настоящая политика Оператора в отношении обработки персональных данных (далее – Политика) применяется ко всей информации, которую Оператор может получить о посетителях веб-сайта https://planagency.ru.<br/><br/>
                2. Основные понятия, используемые в Политике
                Автоматизированная обработка персональных данных – обработка персональных данных с помощью средств вычислительной техники;
                Блокирование персональных данных – временное прекращение обработки персональных данных (за исключением случаев, если обработка необходима для уточнения персональных данных);
                Веб-сайт – совокупность графических и информационных материалов, а также программ для ЭВМ и баз данных, обеспечивающих их доступность в сети интернет по сетевому адресу https://planagency.ru;
                Информационная система персональных данных — совокупность содержащихся в базах данных персональных данных, и обеспечивающих их обработку информационных технологий и технических средств;
                Обезличивание персональных данных — действия, в результате которых невозможно определить без использования дополнительной информации принадлежность персональных данных конкретному Пользователю или иному субъекту персональных данных;
                Обработка персональных данных – любое действие (операция) или совокупность действий (операций), совершаемых с использованием средств автоматизации или без использования таких средств с персональными данными, включая сбор, запись, систематизацию, накопление, хранение, уточнение (обновление, изменение), извлечение, использование, передачу (распространение, предоставление, доступ), обезличивание, блокирование, удаление, уничтожение персональных данных;
                Оператор – государственный орган, муниципальный орган, юридическое или физическое лицо, самостоятельно или совместно с другими лицами организующие и (или) осуществляющие обработку персональных данных, а также определяющие цели обработки персональных данных, состав персональных данных, подлежащих обработке, действия (операции), совершаемые с персональными данными;
                Персональные данные – любая информация, относящаяся прямо или косвенно к определенному или определяемому Пользователю веб-сайта https://planagency.ru;
                Пользователь – любой посетитель веб-сайта https://planagency.ru;
                Предоставление персональных данных – действия, направленные на раскрытие персональных данных определенному лицу или определенному кругу лиц;
                Распространение персональных данных – любые действия, направленные на раскрытие персональных данных неопределенному кругу лиц (передача персональных данных) или на ознакомление с персональными данными неограниченного круга лиц, в том числе обнародование персональных данных в средствах массовой информации, размещение в информационно-телекоммуникационных сетях или предоставление доступа к персональным данным каким-либо иным способом;
                Трансграничная передача персональных данных – передача персональных данных на территорию иностранного государства органу власти иностранного государства, иностранному физическому или иностранному юридическому лицу;
                Уничтожение персональных данных – любые действия, в результате которых персональные данные уничтожаются безвозвратно с невозможностью дальнейшего восстановления содержания персональных данных в информационной системе персональных данных и (или) результате которых уничтожаются материальные носители персональных данных.<br/><br/>
                3. Оператор может обрабатывать следующие персональные данные Пользователя
                Фамилия, имя, отчество;
                Электронный адрес;
                Номера телефонов;
                Также на сайте происходит сбор и обработка обезличенных данных о посетителях (в т.ч. файлов «cookie») с помощью сервисов интернет-статистики (Яндекс Метрика и Гугл Аналитика и других).
                Вышеперечисленные данные далее по тексту Политики объединены общим понятием Персональные данные.<br/><br/>
                4. Цели обработки персональных данных
                Цель обработки персональных данных Пользователя — информирование Пользователя посредством отправки электронных писем.
                Также Оператор имеет право направлять Пользователю уведомления о новых продуктах и услугах, специальных предложениях и различных событиях. Пользователь всегда может отказаться от получения информационных сообщений, направив Оператору письмо на адрес электронной почты welcome@planagency.ru с пометкой «Отказ от уведомлениях о новых продуктах и услугах и специальных предложениях».
                Обезличенные данные Пользователей, собираемые с помощью сервисов интернет-статистики, служат для сбора информации о действиях Пользователей на сайте, улучшения качества сайта и его содержания.<br/><br/>
                5. Правовые основания обработки персональных данных
                Оператор обрабатывает персональные данные Пользователя только в случае их заполнения и/или отправки Пользователем самостоятельно через специальные формы, расположенные на сайте https://planagency.ru. Заполняя соответствующие формы и/или отправляя свои персональные данные Оператору, Пользователь выражает свое согласие с данной Политикой.
                Оператор обрабатывает обезличенные данные о Пользователе в случае, если это разрешено в настройках браузера Пользователя (включено сохранение файлов «cookie» и использование технологии JavaScript).<br/><br/>
                6. Порядок сбора, хранения, передачи и других видов обработки персональных данных
                Безопасность персональных данных, которые обрабатываются Оператором, обеспечивается путем реализации правовых, организационных и технических мер, необходимых для выполнения в полном объеме требований действующего законодательства в области защиты персональных данных.
                Оператор обеспечивает сохранность персональных данных и принимает все возможные меры, исключающие доступ к персональным данным неуполномоченных лиц.
                Персональные данные Пользователя никогда, ни при каких условиях не будут переданы третьим лицам, за исключением случаев, связанных с исполнением действующего законодательства.
                В случае выявления неточностей в персональных данных, Пользователь может актуализировать их самостоятельно, путем направления Оператору уведомление на адрес электронной почты Оператора welcome@planagency.ru с пометкой «Актуализация персональных данных».
                Срок обработки персональных данных является неограниченным. Пользователь может в любой момент отозвать свое согласие на обработку персональных данных, направив Оператору уведомление посредством электронной почты на электронный адрес Оператора welcome@planagency.ru с пометкой «Отзыв согласия на обработку персональных данных».<br/><br/>
                7. Трансграничная передача персональных данных
                Оператор до начала осуществления трансграничной передачи персональных данных обязан убедиться в том, что иностранным государством, на территорию которого предполагается осуществлять передачу персональных данных, обеспечивается надежная защита прав субъектов персональных данных.
                Трансграничная передача персональных данных на территории иностранных государств, не отвечающих вышеуказанным требованиям, может осуществляться только в случае наличия согласия в письменной форме субъекта персональных данных на трансграничную передачу его персональных данных и/или исполнения договора, стороной которого является субъект персональных данных.<br/><br/>
                8. Заключительные положения
                Пользователь может получить любые разъяснения по интересующим вопросам, касающимся обработки его персональных данных, обратившись к Оператору с помощью электронной почты  welcome@planagency.ru
                В данном документе будут отражены любые изменения политики обработки персональных данных Оператором. Политика действует бессрочно до замены ее новой версией.
                Актуальная версия Политики в свободном доступе расположена в сети Интернет по адресу https://planagency.ru/user-agreement.
              </p> :
              <p>
                Пожалуйста, заполните все необходимые поля формы и примите
                <Link to="/user-agreement"> пользовательское соглашение.</Link>
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

  mapStylePC = {
    width: '50.648vh',
    height: '18.519vh',
    marginTop: '1.852vh',
    borderRadius: '1.852vh',
    overflow: 'hidden'
  };

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
              <a href="https://goo.gl/maps/Juh3oQYPMoaFw6Yr6" target="_blank">125080 Москва,<br/> Волоколамское ш, д1, стр.1, офис 709А</a>
            </li>
          </ul>
          <div className="map">
            <YMaps>
              <Map
                style={ this.mapStylePC }
                defaultState={{ center: [55.806525, 37.504681], zoom: 15 }}
              >
                <Placemark geometry={[55.806525, 37.504681]} />
              </Map>
            </YMaps>
          </div>
          <Form history={ this.props.history }/>
          <div className="phone-buttons">
            <a href="Tel: +7-903-161-55-33"></a>
            <a href="https://goo.gl/maps/Juh3oQYPMoaFw6Yr6"></a>
          </div>
      </section>
    )
  }
}
