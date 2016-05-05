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
  Navigator,
  Alert
} from 'react-native';

import GroupsComponent from './GroupsComponent'

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


export default class LoginView extends Component { 

  rowPressed() {
   
      this.props.navigator.push ({
        title: 'GroupsComponent',
        component: GroupsComponent
      });
  }
 
  render() {
    return (
      <View style={styles.container}>
      <TextInput style={styles.textEditInputs}
        placeholder='User name'
        />
        <TextInput style={styles.textEditInputs}
          placeholder='Password'
          />
        <TouchableHighlight style={styles.button}
        underlayColor='#99d9f4'
        onPress={() => this.rowPressed()}
        >
        
        <Text style={styles.buttonText}>Login</Text>
        </TouchableHighlight>
      </View>
    );
  }
}


