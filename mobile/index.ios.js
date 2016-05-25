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
   NavigatorIOS
 } from 'react-native';

import Login from './iOSJs/Login'
import {Provider} from 'react-redux'
import configureStore from './common/configureStore';

const store = configureStore();

var MOCKED_DATA =  ['Group 1', 'Group 2', 'Group 3', 'Group 4'];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

class mobile extends Component {

  constructor(props) {
      super(props);
      console.log('in constructor');

     }

  onLogin() {
    console.log('in onLogin');
    // call web method here
    // getGroups()
    login('admin', 'password')
  }

  render() {
    return (
      <Provider store= {store}>
      <React.NavigatorIOS
       style={styles.container}
       initialRoute={{
         title: 'Logs Dashboard',
         component: Login,
         passProps: {listings: MOCKED_DATA},
         backButtonTitle: 'Logout'
       }}/>
       </Provider>
    );
  }
}

AppRegistry.registerComponent('mobile', () => mobile);
