/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 'user strict'

 var React = require('react-native')

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


 var MOCKED_DATA =  ['Group 1', 'Group 2', 'Group 3', 'Group 4'];


class Groups extends Component {

constructor(props) {
  super(props)

  var dataSource  = new ListView.DataSource(
       { rowHasChanged: (r1, r2) => r1.guid !== r2.guid });
     this.state = {
       dataSource: dataSource.cloneWithRows(MOCKED_DATA)
       //dataSource: dataSource.cloneWithRows(this.props.listings)
     };
    loaded: false;
    price: 'fix';
  }
  rowPressed(guid) {
    console.log('row pressed' + {guid});
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

module.exports = Groups;
