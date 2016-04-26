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

 var Groups = require('./Groups')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  textEditInputs: {
    height: 31,
    marginRight: 15,
    marginLeft: 15,
    marginTop: 10,
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    color: '#48BBEC',
    },
  button: {
    height: 31,
    marginTop: 10,
    backgroundColor: 'gray',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});

class Login extends Component {

  constructor(props) {
      super(props);
      console.log('in constructor');

     }

  onLogin() {
    console.log('in onLogin');
      this.props.navigator.push ({
        title: 'Groups',
        component: Groups
      });
  }

  render() {
    return (
      <View style={styles.container}>
      <TextInput style={styles.textEditInputs}
        placeholder='User name'/>
        <TextInput style={styles.textEditInputs}
          placeholder='Password'/>
        <TouchableHighlight style={styles.button}
        underlayColor='#99d9f4'
        onPress={this.onLogin.bind(this)}>
        <Text style={styles.buttonText}>Login</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

module.exports = Login;
