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
} from 'react-native';

var Login = require('./Login')

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

var MOCKED_DATA =  ['Group 1', 'Group 2', 'Group 3', 'Group 4'];
class LogsDashBoard extends Component {

  render() {
    return (
      <React.NavigatorIOS
       style={styles.container}
       initialRoute={{
         title: 'Home',
         component: Login,
         passProps: {listings: MOCKED_DATA}
       }}/>
    );
  }
}

AppRegistry.registerComponent('LogsDashBoard', () => LogsDashBoard);
