'use strict';

import React, {
  BackAndroid,
  Component
} from 'react-native';

class BaseComponent extends Component {
  componentDidMount() {
    this.androidBackHandler = this.onBackPressed.bind(this);
    BackAndroid.addEventListener('hardwareBackPress', this.androidBackHandler);
  }

  /*
  Pops out the current active component
  */
  onBackPressed() {
    this.props.navigator.pop();
    return true;
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.androidBackHandler);
  }
}
module.exports = BaseComponent;
