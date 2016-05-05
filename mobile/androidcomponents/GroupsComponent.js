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

import StreamsView from './StreamsView'

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
   },
   sectionContainer: {
     flexDirection: 'row',
     padding: 5,
     backgroundColor: '#dfdfdf',
   }
 });


 var MOCKED_DATA =  ['Group 1', 'Group 2', 'Group 3', 'Group 4'];


export default class Groups extends Component {

constructor(props) {
  super(props)

     this.state = {      
       dataSource: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1.guid !== row2.guid,
          sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        })
     };
    loaded: false;
    price: 'fix';
  }


  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    
    MOCKED_DATA =  ['MOCKED Group 1', 'MOCKED Group 2', 'Group 3', 'Group 4', 'Group 5'];
    // Fetch real data here and update data source
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(MOCKED_DATA)
    });
  }

  rowPressed(guid) {
    console.log('row pressed' + {guid});
    console.log('in rowPressed');
      this.props.navigator.push ({
        title: 'Streams',
        component: StreamsView
      });
  }

  renderSectionHeader(sectionData, sectionID) {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.title}>Sample Section added for study</Text>
    </View>
  );
}

renderFooter() {
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.title}>Sample Footer </Text>
              </View>);
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
      renderRow={this.renderRow.bind(this)}
      // renderSectionHeader={this.renderSectionHeader}
      // renderFooter={this.renderFooter} style={styles.listView}
      />
    );
  }
}

