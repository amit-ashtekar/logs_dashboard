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
  ListView,
  component,
  Alert
} from 'react-native';

import LoginView from './LoginView'

// import SearchLogs from './SearchLogs';

import {PropTypes } from 'react';
import {getStreams} from 'common/webServices/dropdownList'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as groupWebActionCreators from 'common/webServices/dropdownList';
import * as groupActionCreators from 'common/actions/dropdown';
import {urlobj} from 'common/apiurls';

 var styles = StyleSheet.create({
   textContainer: {
     flex: 1
   },
   separator: {
     height: 1,
     backgroundColor: '#dddddd'
   },
   title: {
     fontSize: 18,
     color: '#656565'
   },
   rowContainer: {
     flexDirection: 'row',
     padding: 10
   }
 });


 // var MOCKED_DATA =  ['Stream 1', 'Stream 2', 'Stream 3', 'Stream 4'];


class StreamsView extends Component {

constructor(props) {
  super(props)

  this.state={
    dataSource: new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1.guid !== row2.guid,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    })
  };
    loaded: false;
    price: 'fix';
  }


  componentWillMount (){
    // this.props.streamwebactions.getGroups(urlobj.getGroups);
    this.props.streamwebactions.getStreams(urlobj.getStreams);

      console.log('this.props: ');
      console.log(this.props);
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps==>');
    console.log(nextProps.streams);
  this.setState({
    dataSource: this.state.dataSource.cloneWithRows(nextProps.streams)
  });
  }


  rowPressed(guid) {
    console.log('row pressed' + {guid});
    /*this.props.navigator.push ({
      title: 'Search',
      component: SearchLogs
    });*/
  }


  renderRow(rowData, sectionID, rowID) {
    return (
  <TouchableHighlight onPress={() => this.rowPressed(rowData.guid)}
      underlayColor='#dddddd'>
    <View>
      <View style={styles.rowContainer}>
        <View  style={styles.textContainer}>
          <Text style={styles.title}>{rowData}</Text>
        </View>
      </View>
      <View style={styles.separator}/>
    </View>
  </TouchableHighlight>
  );
}
  render() {
    return (
      <ListView
      dataSource={this.state.dataSource}
      renderRow={this.renderRow.bind(this)}/>
    );
  }
}

const mapStateToProps = (state) => ({
    streams:state.streams.streams

});
const mapDispatchToProps = (dispatch) => ({
    // streamactions : bindActionCreators(groupActionCreators, dispatch),
    streamwebactions : bindActionCreators(groupWebActionCreators, dispatch),
});

export default connect(mapStateToProps,mapDispatchToProps)(StreamsView);


