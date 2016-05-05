'use strict';
import React, {
  AppRegistry,
  Component,
  Navigator,
} from 'react-native';

import LoginView from './LoginView'


export default class AppNavigator extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{component: LoginView}}
        renderScene={this.renderScene.bind(this)}
        configureScene={(route) => {
          if (route.sceneConfig) {
            return route.sceneConfig;
          }
          return Navigator.SceneConfigs.FloatFromRight;
        }}/>
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
