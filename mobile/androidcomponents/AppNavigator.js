'use strict';
import React, {
  AppRegistry,
  Component,
  Navigator,
} from 'react-native';

import LoginView from './LoginView'
import {Provider} from 'react-redux'
import configureStore from '../common/configureStore';
const store = configureStore();
var MOCKED_DATA =  ['Group 1', 'Group 2', 'Group 3', 'Group 4'];

export default class AppNavigator extends Component {
  render() {
    return (
      <Provider store= {store}>
      <Navigator
        initialRoute={{component: LoginView,passProps: {listings: MOCKED_DATA}}}
        renderScene={this.renderScene.bind(this)}
        configureScene={(route) => {
          if (route.sceneConfig) {
            return route.sceneConfig;
          }
          return Navigator.SceneConfigs.FloatFromRight;
        }}/>
        </Provider>
    );
    
 }
 renderScene(route, navigator) {
    var Component = route.component
    return (
      <Component
        navigator={navigator}
        route={route} {...route.passProps} />
    );
 }
}
