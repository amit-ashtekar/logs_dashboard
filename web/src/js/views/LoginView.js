import React from 'react/addons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from 'common/actions';
import * as loginactionCreators from 'common/webServices';
import {Button, NavBrand, Nav, NavItem} from 'react-bootstrap';
import { pushState } from 'redux-router';


export class LoginView extends React.Component {

  constructor(props) {
    debugger;
    super(props);
    const redirectRoute = this.props.location.query.next || '/login';
    this.state = {
      email: '',
      password: '',
      redirectTo: redirectRoute
    };
  }
  componentWillReceiveProps(nextProps){
    debugger;
    var prp=nextProps;
  }
     navigateTo(routeName){

    }
    successCB(resJson,dispatch$){
        debugger;
        localStorage.setItem("access_token",resJson.access_token);
      //  LoginView.navigateTo('itemcontainer')
       // return function(dispatch) {

            dispatch$(pushState(null, "/itemcontainer"));
       // }()


    }

  handleClick(e) {
      e.preventDefault();
    const username = this.refs.username.value
    const password = this.refs.password.value
      this.props.loginactions.login(username,password,this.successCB);
  }

  render () {
          const inputStyle={
            'margin-bottom': '6%'
          }
    const inputtopStyle={
      'margin-top': '4%'
    }
    return (
        <div>
        <div className="col-xs-6 col-md-offset-3">
            <div className="box">
        <input type='text' ref='username' className="form-control" style={inputtopStyle}   placeholder='Username'/>
    <input type='text' ref='password' className="form-control" style={inputStyle}  placeholder='Password'/>
    <Button className="btn-block"  onClick={(e)=>this.handleClick(e)}  > Login
    </Button>

    { this.props.statusText && !this.props.isAuthenticated ?
<div className='alert alert-info'>Invalid Credentials</div>
 :''
}
</div>
</div>
    </div>
    );
  }
}



const mapStateToProps = (state) => ({
  isAuthenticating   : state.login.isAuthenticating,
  isAuthenticated    : state.login.isAuthenticated,
  statusText         : state.login.message
});

const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators(actionCreators, dispatch),
  loginactions : bindActionCreators(loginactionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
