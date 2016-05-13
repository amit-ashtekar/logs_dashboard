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
   ActionSheetIOS,
   Switch,
   ActivityIndicatorIOS
 } = React;

 var styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: 'white',
     justifyContent: 'center',
   },
   buttonsContainer: {
     flex: 1,
     backgroundColor: 'white',
     flexDirection: 'row',
     justifyContent: 'center',
     padding: 5,
   },
   textContainer: {
     flex: 1,
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
   loadingText: {
     fontSize: 14,
     color: 'gray'
   },
   title: {
     fontSize: 14,
     color: '#0d0d0d'
   },
   liveText: {
     fontSize: 18,
     color: '#0d0d0d',
     textAlign: 'center',
     padding: 4,
     marginLeft: 10
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
  },
button: {
  height: 30,
  marginLeft: 5,
  backgroundColor: '#F8CA1E',
  borderColor: 'gray',
  borderWidth: 1,
  borderRadius: 8,
  justifyContent: 'center'
},
buttonText: {
  fontSize: 17,
  textAlign: 'center',
  margin: 10,
  color: 'black'
}

 });

 var BUTTONS = [
  'Start Date',
  'End Date',
  'Cancel',
];
var CANCEL_INDEX = 2;

class SearchLogs extends Component {

constructor(props) {
  super(props);
  this.state = {
    dataSource: new ListView.DataSource({
      // rowHasChanged: (row1, row2) => row1 !== row2,
      rowHasChanged: function (row1, row2) {
           console.log(row1, 'row2', row2);
           return row1 !== row2;
        },
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    }),
    loading: false,
    resultArray:[],
    isSearching: false,
    searchString : "",
    isLiveLogs : false,
    getLogEvents : {},
    eventSwitchIsOn: false,
    isPagingNext: false,
    isPagingPrev: false,
    localLogEventsConfig: {}
  }
 }

 componentWillMount (){
    this.props.itemactions.getItems(urlobj.getItems,undefined, logEventsConfig,this.successcb);
    // var _getLogEvents = {}
    //  this.props.itemactions.getLiveLogs(urlobj.getLiveLogs,_getLogEvents,this.successcb);
    //  this.setState({ isLiveLogs: true });
    this.setState({ loading: true });
    //  this.props.itemactions.getFilteredLogs(urlobj.getFilterLogEvents,undefined, filterLogParams,this.successcb);
 }
 componentDidMount() {
  //  this.setState({searchString : "TRACE PerformanceMonitorInterceptor"})
  //  console.log("searchString = " + this.state.searchString);
 }

 componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps");
    if(this.state.isPagingNext === true) { // paging Next, Prev
      if(nextProps.items[0].events.length) { // if dtata is there, update tokens and reload list
        this.setState({
          isPagingNext: false,
          localLogEventsConfig: {
            'nextForwardToken':nextProps.items[0].nextForwardToken,
            'nextBackwardToken': nextProps.items[0].nextBackwardToken
          },
          dataSource: this.state.dataSource.cloneWithRows(nextProps.items[0].events)
        });
      } else {
        this.setState({
          isPagingNext: false,
        });
      }
    }
    else if(this.state.isLiveLogs === true) { // live logs
      var index = nextProps.items.length > 0 ? nextProps.items.length -1 : 0
      let result = nextProps.items[index].events
      // modify code to append live data and unscribe live logs
      if (nextProps.items[index].events.length > 0 ) {
        index = nextProps.items.length > 0 ? nextProps.items.length -1 : 0
      }
      this.setState({
        resultArray: this.state.resultArray.concat(result),
        dataSource: this.state.dataSource.cloneWithRows(this.state.resultArray),
        loading: false
      });
    } else if(this.state.isSearching === true) { // search logs
     this.setState({
       isSearching: false,
       dataSource: this.state.dataSource.cloneWithRows(nextProps.items[0].events),
       loading: false
     });
   } else { // default logs
    this.setState({
      localLogEventsConfig: {
        'nextForwardToken':nextProps.items[0].nextForwardToken,
        'nextBackwardToken': nextProps.items[0].nextBackwardToken
      },
        dataSource: this.state.dataSource.cloneWithRows(nextProps.items[0].events),
        loading: false,
      });
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

  epochToJsDate(incomingUTCepoch){
      var date = new Date(0); // The 0 there is the key, which sets the date to the epoch
      date.setUTCSeconds(incomingUTCepoch / 1000);
      return date.toLocaleString() //date.toGMTString()
   }

   onFilter() {
     console.log('Filter');
     this.showActionSheet();
   }

   showActionSheet() {
       ActionSheetIOS.showActionSheetWithOptions({
         options: BUTTONS,
         cancelButtonIndex: CANCEL_INDEX,
       },
       (buttonIndex) => {
         this.setState({ clicked: BUTTONS[buttonIndex] });
       });
     }

     onNextPressed() {
      console.log('**Next**');
      console.log(this.state.localLogEventsConfig);
      this.setState({
        isPagingNext: true,
        // dataSource: this.state.dataSource.cloneWithRows([])
      });
      this.props.itemactions.getItems(urlobj.getItems,'Next', this.state.localLogEventsConfig, this.successcb);
     }

     onPrevPressed() {
       console.log('**Prev**');
       console.log(this.state.localLogEventsConfig);
       this.setState({
         isPagingNext: true,
         //dataSource: this.state.dataSource.cloneWithRows(['1'])
       });
       this.props.itemactions.getItems(urlobj.getItems,'Prev', this.state.localLogEventsConfig, this.successcb);
     }

     showLiveLogs(value) {
       console.log('***Live Log***');
       console.log(value);
       if (value === true) {
         this.subscribeLiveLogs();
          this.setState({eventSwitchIsOn: true})
       } else {
         this.unsubscribeLiveLogs();
          this.setState({eventSwitchIsOn: false})
       }


     }

     subscribeLiveLogs() {
       console.log('LiveLog subscribe...');
       //  this.setState({
      //   // loading: true,
      //    dataSource: this.state.dataSource.cloneWithRows([])
      //  });
       console.log('dataSource::-');
       console.log(this.state.dataSource);
       var _getLogEvents = {}
        this.props.itemactions.getLiveLogs(urlobj.getLiveLogs,_getLogEvents,this.successcb);
        this.setState({ isLiveLogs: true });
     }

     unsubscribeLiveLogs() {
       console.log('LiveLogHandler unsubscribe...');
       console.log(this.props.LiveLogHandler.LiveLogHandler);
       console.log('LiveLogHandler unsubscribe...2');
       console.log(this.props.LiveLogHandler);
       this.setState({ isLiveLogs: false });
       this.props.LiveLogHandler.LiveLogHandler.unsubscribe();
     }

 renderSectionHeader(sectionData, sectionID) {
   console.log('In header...');
     return (
       <View style={styles.container}>
       <View style={styles.buttonsContainer}>
       <TouchableHighlight style={styles.button}
       underlayColor='#F5FCFF'
       onPress={this.onFilter.bind(this)}>
       <Text style={styles.buttonText}>Filter</Text>
       </TouchableHighlight>
       <TouchableHighlight style={styles.button}
       underlayColor='#F5FCFF'
       onPress={this.onPrevPressed.bind(this)}>
       <Text style={styles.buttonText}>Prev</Text>
       </TouchableHighlight>
       <TouchableHighlight style={styles.button}
       underlayColor='#F5FCFF'
       onPress={this.onNextPressed.bind(this)}>
       <Text style={styles.buttonText}>Next</Text>
       </TouchableHighlight>
       <Text style={styles.liveText}>Live</Text>
       <Switch
            onValueChange={this.showLiveLogs.bind(this)}
            value={this.state.eventSwitchIsOn}
             />
       </View>
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
        </View>
      );
}

renderFooter() {
   if (this.state.loading) {
   return (
     <View style={styles.loadingFooterContainer}>
       <ActivityIndicatorIOS
         animating={true}
         size={'small'} />
        <Text style={styles.loadingText}> Loading... </Text>
     </View>);
   } else {
     return null;
   }
 }

 renderRow(rowData, sectionID, rowID) {
   //{ timestamp: 1462275978058, message: 'Exception in thread "ActiveMQ InactivityMonitor Worker" ', ingestionTime: 1462275983749 }
   var time = this.epochToJsDate(rowData.timestamp)
   var message = rowData.message
   var ingestionTime  = this.epochToJsDate(rowData.ingestionTime)
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
     enableEmptySections= {true}
     />
   );
 }
}

const mapStateToProps = (state) => ({
    items: state.Items,
    LiveLogHandler:state.liveLogHandler,
});

const mapDispatchToProps = (dispatch) => ({
    itemactions : bindActionCreators(itemActionCreators, dispatch),
})

export default connect(mapStateToProps,mapDispatchToProps)(SearchLogs);
