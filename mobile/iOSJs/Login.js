/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  NavigatorIOS,
  Alert
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
//import {getGroups} from 'common/webServices/dropdownList';
import {login} from 'common/webServices/login';
import * as actionCreators from 'common/actions';
import * as loginactionCreators from 'common/webServices';

 // var Groups = require('./Groups')
import Groups from './Groups'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  textEditInputs: {
    height: 40,
    marginRight: 15,
    marginLeft: 15,
    marginTop: 10,
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    },
  button: {
    height: 40,
    marginTop: 10,
    backgroundColor: 'gray',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'black'
  }
});

var pused = false
class Login extends Component {

  constructor(props) {
      super(props);
      console.log('in constructor');
     }

  componentWillReceiveProps(nextProps) {
    if(nextProps.isAuthenticating === true) {
      //  console.log("isAuthenticating...");
    } else if(nextProps.isAuthenticated === true) {
      console.log("message " + nextProps.message);
      console.log('isAuthenticated ' + nextProps.isAuthenticated);
      console.log('isAuthenticating ' + nextProps.isAuthenticating);
      if (pused == false) {
        pused = true
        this.props.navigator.push ({
          title: 'Groups',
          component: Groups
        });
      }
    }
    else if(nextProps.isAuthenticated === false ) {
      console.log("nextProps fails");
      // Show alert for failuer
      return (
        Alert.alert(
          'Alert Title',
          'Login failed, please try with valid credentials.',
          [
            {text: 'OK', onPress: () => console.log('OK Pressed!')},
          ]
        )
      );
    }
  }

  successCB(resJson){
    console.log(" in successCB");
    console.log(resJson);
  }
  onLogin() {
    console.log('in onLogin');
      pused = false
      this.props.loginactions.login('username','password', this.successCB);
      //this.props.loginactions.login('username','password');
  }


  render() {
    return (
      <View style={styles.container}>
      <TextInput style={styles.textEditInputs}
        placeholder='User name'
        value = 'a'/>
        <TextInput style={styles.textEditInputs}
          placeholder='Password'
          value = 'a'/>
        <TouchableHighlight style={styles.button}
        underlayColor='#99d9f4'
        onPress={this.onLogin.bind(this)}>
        <Text style={styles.buttonText}>Login</Text>
        </TouchableHighlight>
      </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
