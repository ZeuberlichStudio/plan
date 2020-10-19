import React, { Component } from 'react';

export default class Switch extends Component {
  render (){
    return(
      <label className="switch">
        <input onClick={ () => this.props.onClick() } type="checkbox" />
        <span className="switch-button"></span>
      </label>
    )
  }
}
