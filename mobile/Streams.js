/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 'user strict'

 var React = require('react-native')
 var SearchLogs = require('./SearchLogs')

 var {
   StyleSheet,
   Image,
   ListView,
   View,
   TextInput,
   TouchableHighlight,
   ListView,
   Text,
   Component
 } = React;

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


class Streams extends Component {

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

  componentDidMount() {
    this.fetchData();
  }
  fetchData() {
    MOCKED_DATA =  ['Mocked Stream 1', 'Stream 2', 'Stream 3', 'Stream 4'];
    // Fetch real data here and update data source
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(MOCKED_DATA)
    });
  }


  rowPressed(guid) {
    console.log('row pressed' + {guid});
    this.props.navigator.push ({
      title: 'Search',
      component: SearchLogs
    });
  }

  // componentDidMount() {
  //     // this.fetchData();
  //   }
  //
  //   fetchData() {
  //   fetch(REQUEST_URL)
  //     .then((response) => response.json())
  //     .then((responseData) => {
  //       this.setState({
  //         movies: responseData.movies,
  //       });
  //     })
  //     .done();
  // }

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

module.exports = Streams;
