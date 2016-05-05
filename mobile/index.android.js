/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import AppNavigator from './androidcomponents/AppNavigator'

class mobile extends Component {
  render() {
    
     return ( < AppNavigator / > );
  
  }
}


AppRegistry.registerComponent('mobile', () => mobile);
