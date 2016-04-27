/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
 'user strict'

var React = require('react-native')
var Streams = require('./Streams')

 var {
   StyleSheet,
   Image,
   ListView,
   View,
   TextInput,
   TouchableHighlight,
   ListView,
   Text,
   Component,
   ActivityIndicatorIOS
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
   },
   sectionContainer: {
     flexDirection: 'row',
     padding: 5,
     backgroundColor: '#C9C9C9',
   },
   searchInput: {
    //  flexDirection: 'row',
     height: 31,
     flex: 1,
     marginRight: 5,
     marginLeft: 5,
     fontSize: 15,
     borderWidth: 1,
     borderColor: '#b4b4b4',
     borderRadius: 6,
    backgroundColor: '#ffffff',
   }

 });

// var MOCKED_DATA =  ['Log 1', 'Log 2', 'Log 3', 'Log 4'];


class SearchLogs extends Component {

constructor(props) {
 super(props)

 // var dataSource  = new ListView.DataSource(
 //      { rowHasChanged: (r1, r2) => r1.guid !== r2.guid,
 //        sectionHeaderHasChanged: (s1, s2) => s1 !== s2
 //      });
      this.state = {
       // dataSource: _dataSource.cloneWithRows(MOCKED_DATA)
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
   var MOCKED_DATA =  ['Log 1', 'Log 2', 'Log 3', 'Log 4'];
   // Fetch real data here and update data source
   this.setState({
     dataSource: this.state.dataSource.cloneWithRows(MOCKED_DATA)
   });
 }

 rowPressed(guid) {
   console.log('row pressed' + {guid});
   console.log('in rowPressed');
    //  this.props.navigator.push ({
    //    title: 'Streams',
    //    component: Streams
    //  });
 }

 renderSectionHeader(sectionData, sectionID) {
 return (
   <View style={styles.sectionContainer}>
     <TextInput style={styles.searchInput}
      placeholder='Search'/>
   </View>
 );
}

renderFooter() {
   return (
     <View style={styles.sectionContainer}>
       <Text style={styles.title}>Sample Footer </Text>
       <ActivityIndicatorIOS
         animating={true}
         size={'large'} />
     </View>);
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
     renderRow={this.renderRow.bind(this)}
     renderSectionHeader={this.renderSectionHeader}
     // renderFooter={this.renderFooter}
     />
   );
 }
}

module.exports = SearchLogs;

  // render__() {
  //   return (
  //     <View style={styles.container}>
  //     <TextInput style={styles.textEditInputs}
  //       placeholder='User name'/>
  //       <TextInput style={styles.textEditInputs}
  //         placeholder='Password'/>
  //       <TouchableHighlight style={styles.button}
  //       underlayColor='#99d9f4'
  //       <Text style={styles.buttonText}>Search</Text>
  //       </TouchableHighlight>
  //     </View>
  //   );
  // }
