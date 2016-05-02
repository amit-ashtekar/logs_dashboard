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

 // var Login = require('./Login')
import Login from './Login'
import {Provider} from 'react-redux'
import configureStore from './configureStore';

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
         passProps: {listings: MOCKED_DATA}
       }}/>
       </Provider>
      // <View style={styles.container}>
      // <TouchableHighlight style={styles.button}
      // underlayColor='#99d9f4'
      // onPress={this.onLogin.bind(this)}>
      // <Text style={styles.buttonText}>Call web method</Text>
      // </TouchableHighlight>
      // <Text style={styles.welcome}>
      //     Welcome to React Native!
      //   </Text>
      //   <Text style={styles.instructions}>
      //     To get started, edit index.ios.js
      //   </Text>
      //   <Text style={styles.instructions}>
      //     Press Cmd+R to reload,{'\n'}
      //     Cmd+D or shake for dev menu
      //   </Text>
      // </View>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
//   button: {
//     height: 31,
//     marginTop: 10,
//     backgroundColor: 'gray',
//     borderColor: '#48BBEC',
//     borderWidth: 1,
//     borderRadius: 8,
//     marginBottom: 10,
//     justifyContent: 'center'
//   },
//   buttonText: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   }
// });

AppRegistry.registerComponent('mobile', () => mobile);
