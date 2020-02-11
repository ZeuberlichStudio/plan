import React, { Component } from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

class Posts extends Component{

  componentDidMount() {
    let postsContainer = document.getElementsByClassName('lightbox-posts')[0];
    let scrollbarRail = document.getElementById('scrollbar-rail');
    let scrollbarThumb = document.getElementById('scrollbar-thumb');
    let postsContainerHeight =
     postsContainer.offsetHeight;
    let contentHeight =
     postsContainer.scrollHeight;

    if( contentHeight > postsContainerHeight ){
      scrollbarRail.style.display = 'block';
      scrollbarThumb.style.height = `${scrollbarRail.offsetHeight * (postsContainerHeight/contentHeight)}px`;
    }

    window.addEventListener('mousewheel', e => {
      postsContainer.scrollTo(0, postsContainer.scrollTop + e.deltaY);
      scrollbarThumb.style.top = `${scrollbarRail.offsetHeight * (postsContainer.scrollTop/contentHeight)}px`;
    });
  }

  render(){
    return(
      <div className="lightbox-posts">
        { this.props.mapPosts( post =>
            <div className="post">
              <div className="post--text">
                {
                   this.props.location.pathname.includes('cat') ?
                   post.client.map( client =>
                     <span className="post--client  comfortaa-35 m-comfortaa-14">{ client.name }</span> ) :
                     null
                }
                <span className="post--date comfortaa-31 m-proxima-12"><span>{post.year}</span> {post.month}</span>
                <h2 className="post--title comfortaa-35 m-comfortaa-14">{post.title}</h2>
                {
                  post.img.includes('youtube') ?
                  <embed width="100%" className="post--m-video" src={ post.img } frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></embed> :
                  <img className="post--m-img" src={ post.img }/>
                }
                <p className="post--content proxima-20 m-proxima-14 white">
                  { ReactHtmlParser(post.content) }
                </p>
                <h3 className="post--results comfortaa-31 m-comfortaa-14 dark">Итоги:</h3>
                <ul className="post--results proxima-20 m-proxima-12 dark">{post.additions.map( addition =>
                  <li><span className="comfortaa-31 m-comfortaa-14">{addition[0]}</span>{addition[1]}</li>
                )}</ul>
              </div>
              {
                post.img.includes('youtube') ?
                <embed width="100%" className="post--video" src={ post.img } frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></embed> :
                <img className="post--img" src={ post.img }/>
              }
            </div>
        )}
      </div>
    )
  }
}

class Lightbox extends Component{

  state = {
    posts: [],
    client: '',
    cat: '',
    slogan: '',
    headerImg: ''
  }

  count = [0,0,0];

  request_params = window.location.pathname.split("posts")[1];

  componentDidMount(){
    axios({
      method: 'get',
      url: `https://zeuberlich.com/api/posts${this.request_params}`,
      auth: {
        username: 'nayar',
        password: 'mydumbpassword'
      }
    })
      .then(res => {
        const posts = res.data;

        let title;
        for( let i = 0; i < posts[0].client.length; i++ ){
          title = '/client=' + posts[0].client[i]._id === this.request_params ? posts[0].client[i].name : null;

          if( title ) this.setState({ title });
        }

        this.setState({ cat: posts[0].cat[0].name })

        let slogan;
        for( let i = 0; i < posts[0].client.length; i++ ){
          slogan = '/client=' + posts[0].client[i]._id === this.request_params ? posts[0].client[i].slogan : null;

          if( slogan ) this.setState({ slogan });
        }

        this.setState({ headerImg: posts[0].client.img });
        this.setState({ posts });
       })
      .catch(err => this.setState({ posts: err }));
  };

  mapPosts = (property) => this.state.posts.map(property);

  counter = () => {

      this.mapPosts( post => {
        for (let i = 0; i < post.cat.length; i++){

          let catName = post.cat[i].name;

          if( catName === 'Аналитика' ) this.count[0]++
          else if ( catName === 'Стратегия' ) this.count[1]++
          else if ( catName === 'Коммуникация' ) this.count[2]++

        }
      });
  };

  render(){

    if (this.state.posts.length > 0) this.counter();

    return(
      <div id="lightbox">
        <style>
          {"body{overflow: hidden;}"}
        </style>
        { this.state.posts.length > 0 ?
        <section id="posts">
          <div className="lightbox-header">
            <h2 className="comfortaa-35 m-comfortaa-14">{ this.props.location.pathname.includes('client') ? this.state.title : this.state.cat }</h2>
            {
              this.state.slogan ?
              <h3 className="proxima-20 white">{ this.state.slogan }</h3> :
              null
            }
            <Route path="/posts/client:id" render={ () =>
              <ul className="lightbox-header--count">
                <li className="proxima-16 dark"><span className="comfortaa-35">{ this.count[0] }</span>Аналитических проектов</li>
                <li className="proxima-16 dark"><span className="comfortaa-35">{ this.count[1] }</span>Выстроенных стратегий</li>
                <li className="proxima-16 dark"><span className="comfortaa-35">{ this.count[2] }</span>Успешных коммуникаций</li>
              </ul>
            }/>
            <Link to="/" id="lightbox-close"></Link>
          </div>

          <Posts location = {this.props.location} mapPosts={ (property) => this.mapPosts(property) }/>

          <div id="scrollbar-rail">
            <div id="scrollbar-thumb"></div>
          </div>
        </section>
         : null }
      </div>
    )
  }
}

export default withRouter(Lightbox);
