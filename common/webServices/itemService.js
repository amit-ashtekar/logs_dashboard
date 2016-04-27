/**
 * Created by amita on 3/18/2016.
 */
import {receiveProducts,receiveProductsFail,getAddedCartItem,receiveLogsLive,receiveLiveLogHandler} from '../actions/itemActions';
import {logEventsConfig} from '../awsConfig/config.js'
import Rx from "rxjs";

export function getItems(paginationAction){
   // return fetchItems(receiveProducts,receiveProductsFail)
    return function (dispatch) {
       var getLogEventsStorObj= JSON.parse( localStorage.getItem("getLogEvents"));

        if(getLogEventsStorObj && paginationAction==="Next" ){
            logEventsConfig.nextToken=getLogEventsStorObj.nextForwardToken;
        }
        else if(getLogEventsStorObj && paginationAction==="Prev"){
            logEventsConfig.nextToken=getLogEventsStorObj.nextBackwardToken;
        }
        let config={
            method: 'GET',
            headers: {  'Content-Type': 'application/json', 'Accept': 'application/json','authorization':'151561vdfvdbdbdb1561fdbdf','Logeventsparam':JSON.stringify(logEventsConfig) }
        };

        return fetch('http://localhost:3001/getLogEvents/',config)
                .then(res=> res.json())
        .then(resJson=> {
            console.log("getLogEvents: ",resJson)
        var getLogEvents={};
        getLogEvents.nextForwardToken=resJson.nextForwardToken;
        getLogEvents. nextBackwardToken=resJson. nextBackwardToken;
        localStorage.setItem("getLogEvents",JSON.stringify(getLogEvents));
        //if(!itemArr) {
        dispatch(receiveProducts(resJson))
        //}
        //else{
        //  dispatch(receiveProducts(itemArr,resJson))
        //}



    }).catch(err=>{
        debugger;

    dispatch(receiveProductsFail(err));

})

}
}



export function getLiveLogs(){
    // return fetchItems(receiveProducts,receiveProductsFail)
    return function (dispatch) {
        var getLogEventsStorObj= JSON.parse( localStorage.getItem("liveLogEvents"));

        if(getLogEventsStorObj ){
            logEventsConfig.nextToken=getLogEventsStorObj.nextForwardToken;
        }

        var config={
            method: 'GET',
            headers: {  'Content-Type': 'application/json', 'Accept': 'application/json','authorization':'151561vdfvdbdbdb1561fdbdf','Logeventsparam':JSON.stringify(logEventsConfig) }
        };
        var service = Rx.Observable.defer(function () {
            return  fetch('http://localhost:3001/getLogEvents/',config) .then(res=> res.json())
        });
        var fetchInterval = Rx.Observable.empty().delay(3000);

        var subscription = service
            .concat(fetchInterval)
            .repeat()
            .subscribe(
            function (resJson) {
                successcb(resJson)
            },
            function (err) {
               errorcb(err);
            },
            function () {
                console.log('LiveLogError-Completed');
            });

        function successcb(resJson){
            if(resJson) {

                console.log("getLogEvents: ", resJson)
                var getLogEvents = {};
                getLogEvents.nextForwardToken = resJson.nextForwardToken;
                getLogEvents.nextBackwardToken = resJson.nextBackwardToken;
                localStorage.setItem("liveLogEvents", JSON.stringify(getLogEvents));
                dispatch(receiveLogsLive(resJson));
                dispatch(receiveLiveLogHandler(subscription));

            }
        }
        function errorcb(err){
            console.log('LiveLogError:', err);
            dispatch(receiveProductsFail(err));
        }



    }
}
