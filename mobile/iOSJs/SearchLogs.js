/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
 'user strict'

var React = require('react-native')
import {PropTypes } from 'react';
import {getStreams} from 'common/webServices/dropdownList'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as itemActionCreators from 'common/webServices/itemService';
import {logEventsConfig, filterLogParams} from 'common/AWSConfig/config.js';
import {urlobj} from 'common/apiurls';


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
     fontSize: 14,
     color: '#0d0d0d'
   },
   log: {
     fontSize: 12,
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

class SearchLogs extends Component {

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

 componentWillMount (){
     this.props.itemactions.getItems(urlobj.getItems,undefined, logEventsConfig,this.successcb);
    //  this.props.itemactions.getFilteredLogs(urlobj.getFilterLogEvents,undefined, filterLogParams,this.successcb);
 }

 componentWillReceiveProps(nextProps) {
   console.log("componentWillReceiveProps");
   console.log('log count start')
  console.log(nextProps.items[0].events);
   console.log('log count end ')
   this.setState({
     dataSource: this.state.dataSource.cloneWithRows(nextProps.items[0].events)
   });
 }

 successcb(resJson){
   console.log('in success block');
  //  console.log(resJson);

    //  var getLogEvents={};
    //  getLogEvents.nextForwardToken=resJson.nextForwardToken;
    //  getLogEvents. nextBackwardToken=resJson. nextBackwardToken;
    //  localStorage.setItem("getLogEvents",JSON.stringify(getLogEvents));
 }

 rowPressed(guid) {
   console.log('row pressed' + {guid});
   console.log('in rowPressed');
   this.props.itemactions.getItems(urlobj.getItems,undefined, logEventsConfig,this.successcb);
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

 renderRow(rowData, sectionID, rowID) {
   console.log('rowData');
   console.log(rowData);
   //{ timestamp: 1462275978058, message: 'Exception in thread "ActiveMQ InactivityMonitor Worker" ', ingestionTime: 1462275983749 }
  //  var logText = 'timestamp: ' + rowData.timestamp + ', message: ' + rowData.message + ', ingestionTime: '  + rowData.ingestionTime
   var time = rowData.timestamp
   var message = rowData.message
   var ingestionTime  = rowData.ingestionTime

   return (
 <TouchableHighlight onPress={() => this.rowPressed(rowData)}
     underlayColor='#dddddd'>
   <View>
     <View style={styles.rowContainer}>
       <View  style={styles.textContainer}>
         <Text style={styles.title}>timestamp:
            <Text style={styles.log}>{time}</Text>
            <Text style={styles.title}>, message: </Text>
            <Text style={styles.log}>{message}</Text>
            <Text style={styles.title}>, ingestionTime: </Text>
            <Text style={styles.log}>{ingestionTime}</Text>
         </Text>
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

const mapStateToProps = (state) => ({
    items: state.Items
});

const mapDispatchToProps = (dispatch) => ({
    itemactions : bindActionCreators(itemActionCreators, dispatch),
})

export default connect(mapStateToProps,mapDispatchToProps)(SearchLogs);
