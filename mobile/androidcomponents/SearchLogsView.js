/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */


import {PropTypes } from 'react';
import {getStreams} from 'common/webServices/dropdownList'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as itemActionCreators from 'common/webServices/itemService';
import {logEventsConfig, filterLogParams} from 'common/AWSConfig/config.js';
import {urlobj} from 'common/apiurls';
import { Button, Card } from 'react-native-material-design';
import moment from 'moment';


 import React, {
   StyleSheet,
   Image,
   ListView,
   View,
   TextInput,
   TouchableHighlight,  
   ProgressBarAndroid,
   Text,
   Component,  
   Switch, 
   TouchableWithoutFeedback,
   DatePickerAndroid,
  Alert
} from 'react-native';

 
class SearchLogsView extends Component {

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
    resultArray:[],
    isLiveLogs : false,
    getLogEvents : {},
    eventSwitchIsOn: false,
    //Filter initializations
    filterPattern: '',
    startTime:'',
    endTime:'',
    value:'0',
    simpleText: 'pick a date',
  }
 }

 componentWillMount (){
    /*this.props.itemactions.getItems(urlobj.getItems,undefined, logEventsConfig,this.successcb);
    this.setState({ loading: true });*/
    this.loadDefaultLogs();
    //  this.props.itemactions.getFilteredLogs(urlobj.getFilterLogEvents,undefined, filterLogParams,this.successcb);
 }

 loadDefaultLogs(){
   this.props.itemactions.getItems(urlobj.getItems,undefined, logEventsConfig,this.successcb);
    this.setState({ loading: true });
 }
 componentDidMount() {
  //  this.setState({searchString : "TRACE PerformanceMonitorInterceptor"})
  //  console.log("searchString = " + this.state.searchString);
 }

 componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps");

    if(this.state.isLiveLogs === true) {      
      console.log("live logs....");
      var index = nextProps.items.length > 0 ? nextProps.items.length -1 : 0
      console.log(nextProps.items[index].events);
      let result = nextProps.items[index].events      
      if (nextProps.items[index].events.length > 0 ) {        
        index = nextProps.items.length > 0 ? nextProps.items.length -1 : 0        
      }       
      this.setState({
        resultArray: this.state.resultArray.concat(result),
        dataSource: this.state.dataSource.cloneWithRows(this.state.resultArray),
        loading: false
      });
      
    } else if(this.state.isSearching === true) {
      console.log("isSearching....")
      console.log(nextProps.items[0].events);
    
     this.setState({
       isSearching: false,
       searchString:'',
       dataSource: this.state.dataSource.cloneWithRows(nextProps.items[0].events),
       loading: false
     });
    
   } else {
     console.log("default log loading....")
     console.log(nextProps.items[0].events);

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.items[0].events),
        loading: false,
        startTime:'',
        endTime:''

      });
 }
}

 successcb(resJson){
   console.log('in success block'); 
 }

 rowPressed(guid) {
   console.log('row pressed' + {guid});
 }

 onSearchTextChangedEvent(event) {
   this.setState({ searchString: event.nativeEvent.text });
   console.log(this.state.searchString);
  }


  epochToJsDate(incomingUTCepoch){
      var date = new Date(0); // The 0 there is the key, which sets the date to the epoch
      date.setUTCSeconds(incomingUTCepoch / 1000);
      return date.toLocaleString() //date.toGMTString()
   }

 /*renderSectionHeader(sectionData, sectionID) {
     return (
       
      );
}*/

search(){
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

  showLiveLogs(value) {
       console.log('***Live Log***');
       console.log(value);
       if (value === true) {
         this.subscribeLiveLogs();
       } else {
         this.unsubscribeLiveLogs();
       }
       return this.setState({eventSwitchIsOn: value})
     }

     subscribeLiveLogs() {
       console.log('LiveLog subscribe...');      
       var _getLogEvents = {}
       //this.setState({ isLiveLogs: true });

        this.setState({
            loading: true,
            dataSource: this.state.dataSource.cloneWithRows([]),            
            isLiveLogs: true,
          });
       this.props.itemactions.getLiveLogs(urlobj.getLiveLogs,_getLogEvents,this.successcb);
        
     }

     unsubscribeLiveLogs() {
      //this.setState({ isLiveLogs: false });
      this.setState({
            loading: true,
            dataSource: this.state.dataSource.cloneWithRows([]),            
            isLiveLogs: false,
          });     
       console.log('LiveLogHandler unsubscribe...');
       console.log(this.props.LiveLogHandler.LiveLogHandler);
      
       this.props.LiveLogHandler.LiveLogHandler.unsubscribe();
       this.loadDefaultLogs();
     }
    onFilter() {
     /*console.log('Filter');

     this.setState({filterPattern: "Space"});
     filterLogParams.filterPattern = "success";

     this.setState({
            loading: true,
            dataSource: this.state.dataSource.cloneWithRows([]),
            isSearching : true,
          });
          //filterLogParams.filterPattern = this.state.searchString;
          this.props.itemactions.getFilteredLogs(urlobj.getFilterLogEvents,undefined, filterLogParams,this.successcb);
          */
          //this.search();
    
   }

    onHandleStartDateChange(value){   
      if(this.state.isLiveLogs===true){
        this.showLiveLogs(false) 
      }
      console.log("onHandleStartDateChange()",value)
      this.setState({
            loading: true,
            dataSource: this.state.dataSource.cloneWithRows([]),            
          });
          
          if(value ==='start'){  
            filterLogParams.startTime =this.state.startTime;
           // filterLogParams.endTime='';
              filterLogParams.endTime = null;
            
          }else{
            filterLogParams.endTime =this.state.endTime;
            //filterLogParams.startTime='';
            filterLogParams.startTime = null;
          }
           
            console.log("Bipin -startTime :", this.state.startTime);
            console.log("Bipin -endTime :", this.state.endTime)
           // console.log("Bipin -filterLogParams-startTime :", filterLogParams.startTime);
            console.log("filterLogParams:",filterLogParams);
            this.props.itemactions.getFilteredLogs(urlobj.getFilterLogEvents,undefined, filterLogParams,this.successcb);
        
    }



    onNextPressed() {
       console.log('**Next**');
     }

     onPrevPressed() {
       console.log('**Prev**');
     }
  async showPicker(stateKey, options) {
   console.log('BIPIN',stateKey);
    try {
      var newState = {};
      const {action, year, month, day} = await DatePickerAndroid.open(options);
      if (action === DatePickerAndroid.dismissedAction) {
        newState[stateKey + 'Text'] = 'dismissed';
      } else {
        //var date = new Date(year,month,day);
        /*var d = new Date();
        var milliseconds = d.getMilliseconds();
        var seconds=d.getSeconds();
        var minutes=d.getMinutes();
        var hours=d.getHours();*/
        //var date = new Date(year, month, day, hours, minutes, seconds, milliseconds); 
        var date = new Date(year, month, day); 
        // console.warn(`Error in example get date : `, date.getTime());
         //console.warn(`Error in example get timeInMiliSeconds : `, milliseconds);
        // console.warn(`Error in example get timeInMiliSeconds : `, d.getMinutes());
      
        //newState[stateKey + 'Text'] = date.toLocaleDateString();
        //var stringTemp=moment(new Date(year, month, day)).format('MM/DD/YYYY');
        var dateTime = date.getTime(); 
        //console.warn(`Error in example get timeInMiliSeconds : `, stringTemp);
        
        //newState[stateKey + 'Date'] = date;
       if(stateKey==='start'){
            this.setState({startTime:dateTime});
            this.onHandleStartDateChange('start');
        }else{
            this.setState({endTime:dateTime});
            this.onHandleStartDateChange('end');

        }
      }
      //var stringTemp=moment(new Date(year, month, day)).format('MM/DD/YYYY')
      //var stringTemp='';
      //var stringTemp=stringTemp.concat(date.getMonth()).concat(date.getDate()).concat(date.getFullYear());
      //console.warn(`Error in bpn '${stateKey}': `, this.state.startTime);
    } catch ({code, message}) {
      console.warn(`Error in example '${stateKey}': `, message);
    }
  }
renderFooter() {
   if (this.state.loading) {
   return (
     <View style={styles.loadingFooterContainer}>
       <ProgressBarAndroid
         animating={true}
         size={'small'} />
        <Text style={styles.loadingText}> Loading </Text>
     </View>
     );
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
   <View style={styles.container}>
    <View style={styles.toolbar}>
                <TouchableHighlight                
                onPress={this.onCancel.bind(this)}
                underlayColor='#dddddd'>                
                  <Text style={styles.toolbarButton}>Back</Text>
                </TouchableHighlight>
                  <Text style={styles.toolbarTitle}>Logs</Text> 
                  <Text style={styles.liveText}>Live</Text>
                  <Switch onValueChange={this.showLiveLogs.bind(this)}
                    value={this.state.eventSwitchIsOn}

                  />
     
                                       
    </View>
     <View style={styles.sectionContainer}>

         <TouchableHighlight 
          style={styles.button}
        onPress={this.showPicker.bind(this, 'start', {date: this.state.simpleDate})}> 
        <Text style={styles.buttonText}>Filter By Start Date</Text> 
        </TouchableHighlight>

        <TouchableHighlight 
          style={styles.button}
        onPress={this.showPicker.bind(this, 'end', {date: this.state.simpleDate})}> 
        <Text style={styles.buttonText}>Filter By End Date</Text> 
        </TouchableHighlight>
        
        <TouchableHighlight style={styles.button}
        underlayColor='#F5FCFF'
        onPress={this.onPrevPressed.bind(this)}>
        <Text style={styles.buttonText}>Previous</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.button}
        underlayColor='#F5FCFF'
        onPress={this.onNextPressed.bind(this)}>
        <Text style={styles.buttonText}>Next</Text>
        </TouchableHighlight>

       
       
       
      </View>
          <View style={styles.sectionContainer}>
          <TextInput style={styles.searchInput}
            placeholder='Search'            
            onChange={this.onSearchTextChangedEvent.bind(this)}
            keyboardType = 'default'
            keyboardAppearance = 'dark'
            clearButtonMode = 'always'                       
            onSubmitEditing={this.search.bind(this)}            
          />
          </View>

    <ListView
     dataSource={this.state.dataSource}
     renderRow={this.renderRow.bind(this)}
     //renderSectionHeader={this.renderSectionHeader.bind(this)}
     renderFooter={this.renderFooter.bind(this)}
     />
     </View>
  
   );
 }
  onCancel(){
    this.props.navigator.pop();
  }
}

const mapStateToProps = (state) => ({
    items: state.Items,
    LiveLogHandler:state.liveLogHandler,
});

const mapDispatchToProps = (dispatch) => ({
    itemactions : bindActionCreators(itemActionCreators, dispatch),
})

export default connect(mapStateToProps,mapDispatchToProps)(SearchLogsView);

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
   textContainer: {
     flex: 1
   },
   loadingFooterContainer: {
     flex: 1,
     backgroundColor: '#dddddd',
     flexDirection: 'row',     
     justifyContent: 'center',
     padding:10,
   },
   separator: {
     height: 1,
     //  backgroundColor: '#dddddd'
     backgroundColor: '#fefefe'
   },
   loadingText: {
     fontSize: 14,
     color: 'gray',
     textAlign:'center'
     

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
     padding:5,
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
  toolbar:{
        backgroundColor:'#EEB211',
        paddingTop:30,
        paddingBottom:10,
        flexDirection:'row'    //Step 1
    },
    toolbarButton:{
        width: 50,        //Step 2
        
        marginLeft:5,
        textAlign:'center',
        fontSize:20
    },
    toolbarTitle:{        
        fontSize:25,
        textAlign:'center',
        fontWeight:'bold',
        flex:1                //Step 3
    },
    button: {
           
      height: 40,
      marginTop: 10,
      margin:5,
      backgroundColor: '#EEB211',
      borderColor: '#EEB211',
      borderWidth: 1,
      borderRadius: 8,
      marginBottom: 10,
      justifyContent: 'center'
  },
    buttonText: {
      fontSize: 18,
      textAlign: 'center',
      margin: 10,
      color: 'white'
  },

 });

