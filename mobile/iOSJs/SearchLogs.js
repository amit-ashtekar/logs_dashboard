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
   loadingFooterContainer: {
     flex: 1,
     backgroundColor: 'white',
     flexDirection: 'row',
     justifyContent: 'center',
     padding: 5,
   },
   separator: {
     height: 1,
     //  backgroundColor: '#dddddd'
     backgroundColor: '#fefefe'
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
  },
  rowStyle: {
     backgroundColor: '#CABEAD',
  },
  evenRowStyle: {
     backgroundColor: '#F0E197',
  }

 });

class SearchLogs extends Component {

constructor(props) {
  super(props);
  this.state = {
    dataSource: new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1.guid !== row2.guid,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    }),
    loading: false,
    isSearching: false,
    searchString : "",
  }
 }

 componentWillMount (){
    this.props.itemactions.getItems(urlobj.getItems,undefined, logEventsConfig,this.successcb);
    this.setState({ loading: true });
    //  this.props.itemactions.getFilteredLogs(urlobj.getFilterLogEvents,undefined, filterLogParams,this.successcb);
 }
 componentDidMount() {
  //  this.setState({searchString : "TRACE PerformanceMonitorInterceptor"})
  //  console.log("searchString = " + this.state.searchString);
 }

 componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps");
    console.log(nextProps.items);
   if(this.state.isSearching === true) {
    //  console.log("isSearching....")
     this.setState({ isSearching: false });
     this.setState({
       dataSource: this.state.dataSource.cloneWithRows(nextProps.items[0].events)
     });
     this.setState({ loading: false });
   } else {
    //  console.log("default log loading....")
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.items[0].events)
      });
      this.setState({ loading: false });
   }
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
 }

 onSearchTextChangedEvent(event) {
   this.setState({ searchString: event.nativeEvent.text });
  //  console.log(this.state.searchString);
  }

  onkeyPressEvent(event) {
    if(event.nativeEvent.key === "Enter"){
          console.log("search query = " + this.state.searchString);
          this.setState({
            loading: true,
            dataSource: this.state.dataSource.cloneWithRows([]),
            isSearching : true,
          });
          filterLogParams.filterPattern = this.state.searchString;
          this.props.itemactions.getFilteredLogs(urlobj.getFilterLogEvents,undefined, filterLogParams,this.successcb);
          // this.setState({isSearching : true})
          // console.log("isSearching = " + this.state.isSearching);
    }
   }

 renderSectionHeader(sectionData, sectionID) {
     return (
       <View style={styles.sectionContainer}>
          <TextInput style={styles.searchInput}
            placeholder='Search'
            value = {this.state.searchString}
            onChange={this.onSearchTextChangedEvent.bind(this)}
            keyboardType = 'default'
            keyboardAppearance = 'dark'
            clearButtonMode = 'while-editing'
            enablesReturnKeyAutomatically = {true}
            returnKeyType = 'search'
            onKeyPress = {this.onkeyPressEvent.bind(this)}
          />
        </View>
      );
}

renderFooter() {
   if (this.state.loading) {
   return (
     <View style={styles.loadingFooterContainer}>
       <Text style={styles.title}>Loading </Text>
       <ActivityIndicatorIOS
         animating={true}
         size={'large'} />
     </View>);
   } else {
     return null;
   }
 }

 renderRow(rowData, sectionID, rowID) {
   //{ timestamp: 1462275978058, message: 'Exception in thread "ActiveMQ InactivityMonitor Worker" ', ingestionTime: 1462275983749 }
   var time = rowData.timestamp
   var message = rowData.message
   var ingestionTime  = rowData.ingestionTime
   let rowStyle = rowID % 2 === 0 ?  styles.rowStyle : styles.evenRowStyle
   return (
 <TouchableHighlight onPress={() => this.rowPressed(rowData)}
     underlayColor='#dddddd' style={rowStyle}>
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
     renderSectionHeader={this.renderSectionHeader.bind(this)}
     renderFooter={this.renderFooter.bind(this)}
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
