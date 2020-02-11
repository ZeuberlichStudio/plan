import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Categories extends Component{

  state = {
    cats: []
  }

  componentDidMount(){
    axios({
      method: 'get',
      url: 'https://zeuberlich.com/api/cats',
      auth: {
        username: 'nayar',
        password: 'mydumbpassword'
      }
    })
      .then( res => { const cats = res.data; this.setState({ cats }); } )
      .catch( err => this.setState({ cats: err }) );
  }

  render(){
    return(
      <div className="cases--categories-container">
        <div className="cases--description">
          <h2 className="comfortaa-35 m-comfortaa-30">Наш опыт:</h2>
          <p className="proxima-20 m-proxima-14 dark">
            За большими словами стоят
            большие дела. Выберете любой
            из интересующих кейсов:
          </p>
        </div>

        { this.state.cats.map( (cat, index) =>

          <div className={ "cases--category cases--category-" + ++index }>
            <i style={{ WebkitMaskImage: 'url(' + cat.icon + ')' }}></i>
            <h2 className="comfortaa-35 m-proxima-14 dark">
              <Link to={ 'posts/cat=' + cat._id }>{cat.name}</Link>
            </h2>
            <span className="total-posts m-comfortaa-14 white">{cat.posts} проектов</span>
            <ul className="proxima-20">
              { cat.subcats.map( subcat =>
                <li className="dark">
                  <span className="white">{ subcat.posts_count }</span>
                  <span>{subcat.name}</span>
                </li>
              )}
            </ul>
          </div>
         ) }
      </div>
    )
  }
}


export default class Cases extends Component{

  state = {
    clients: []
  }

  componentDidMount(){
    axios({
      method: 'get',
      url: 'https://zeuberlich.com/api/clients',
      auth: {
        username: 'nayar',
        password: 'mydumbpassword'
      }
    })
      .then( res => { const clients = res.data; this.setState({ clients }); } )
      .catch( err => this.setState({ clients: err }) );
  }

  render (){
    return(
      <section id="cases">
      { this.state.clients.length > 0 ?
        <Categories />:null}
      { this.state.clients.length > 0 ?  <div className="cases--clients-container">
          { this.state.clients.map( client =>
            <div className="cases--client">
              <h2 className="comfortaa-35 m-comfortaa-14 dark">
              { client.has_posts ?
                <Link to={ 'posts/client=' + client._id } className="white">{ client.name }</Link>
               : client.name }
              </h2>
              { client.cats.map( cat => <i style={{ WebkitMaskImage: 'url(' + cat.icon + ')' }}></i> ) }
            </div>
          ) }
        </div>:null}

      </section>

    );
  }
}
