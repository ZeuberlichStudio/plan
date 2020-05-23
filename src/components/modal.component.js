import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Route, Link, withRouter } from 'react-router-dom';

import ClientHeader from './modal/client-header';
import CatHeader from './modal/cat-header';
import Post from './modal/post';

const Modal = ({location}, props) => {

  const [posts, setPosts] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  function fetchPosts() {
    const url = "https://plan.z-test.online/api" + location.pathname;
    axios({
      url: url,
      method: 'get',
      mode: 'cors',
      auth: {
        username: 'nayar',
        password: 'mydumbpassword'
      }
    }).
    then( res => setPosts(res.data) ).
    catch( err => console.log(err) );
  };

  return(
    <div id="modal-wrapper">
      <section id="modal" className="modal">
        {
          posts ?
          <Fragment>
            <Route path="/posts/client=:client" render={ () => <ClientHeader posts={posts}/> } />
            <Route path="/posts/cat=:cat" render={ () => <CatHeader posts={posts}/> } />
            <div className="modal_posts">
              { posts.map(
                  post =>
                  <Post
                    showClients={ location.pathname.includes('client') ? false : true } 
                    {...post}
                  />
                )
              }
            </div>
          </Fragment>
          :null
        }
      </section>
    </div>
  )
}

export default Modal;
