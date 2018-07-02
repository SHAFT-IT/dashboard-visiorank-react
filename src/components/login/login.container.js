import React, { Component } from 'react';
import { Login } from './login.component';

export default class LoginContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {isShowingText: true};
    }
    render() {        
        return (
            <Login/>
        )
    }
  }

 
  

  