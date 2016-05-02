/**
 * Created by amita on 3/18/2016.
 */
import {receiveProducts,receiveProductsFail,getAddedCartItem,receiveLogsLive,receiveLiveLogHandler,receiveFilteredLogs} from '../actions/itemActions';
import {logEventsConfig} from '../AWSConfig/config.js'
import Rx from "rxjs";

export function getItems(url,paginationAction,getLogEventsStorObj,successcb){

    return function (dispatch) {

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

        return fetch(url,config)
                .then(res=> res.json())
        .then(resJson=> {
            console.log("getLogEvents: ",resJson);
        dispatch(receiveProducts(resJson))
                successcb(resJson);

    }).catch(err=>{
        debugger;

    dispatch(receiveProductsFail(err));

})

}
}


export function getLiveLogs(url,getLogEventsStorObj,successcb,errorcb){

    return function (dispatch) {

        if(getLogEventsStorObj ){
            logEventsConfig.nextToken=getLogEventsStorObj.nextForwardToken;
        }
console.log("logEventsConfig.nextToken",logEventsConfig.nextToken);
        var config={
            method: 'GET',
            headers: {  'Content-Type': 'application/json', 'Accept': 'application/json','authorization':'151561vdfvdbdbdb1561fdbdf','Logeventsparam':JSON.stringify(logEventsConfig) }
        };
        var service = Rx.Observable.defer(function () {
            return  fetch(url,config) .then(
                    res=> res.json()
            )
        });
        var fetchInterval = Rx.Observable.empty().delay(3000);



        var subscription = service
            .concat(fetchInterval)
            .repeat()
            .do(function(item) {
console.log("config.headers before:",config.headers );
             //   logEventsConfig.nextToken = item.nextForwardToken;
                var jobj=JSON.parse(config.headers.Logeventsparam) ;
                jobj.nextToken=item.nextForwardToken;
                config.headers.Logeventsparam=JSON.stringify(jobj);
                console.log("config.headers after:",config.headers );

            })
            .subscribe(
            function (resJson) {
                if(successcb)
                    dispatch(receiveLogsLive(resJson));
                dispatch(receiveLiveLogHandler(subscription));
                successcb(resJson)
            },
            function (err) {
                if(errorcb)
                    dispatch(receiveProductsFail(err));
               errorcb(err);
            },
            function () {
                console.log('LiveLogError-Completed');
            });
    }
}

export function getFilteredLogs(url,paginationAction,filteredLogObj,successcb){

    return function (dispatch) {


        let config={
            method: 'GET',
            headers: {  'Content-Type': 'application/json', 'Accept': 'application/json','authorization':'151561vdfvdbdbdb1561fdbdf','filterLogEventsParams':JSON.stringify(filteredLogObj) }
        };

        return fetch(url,config)
            .then(res=> res.json())
            .then(resJson=> {
                console.log("getLogEvents: ",resJson);
                dispatch(receiveFilteredLogs(resJson))
                successcb(resJson);

            }).catch(err=>{
                debugger;

                dispatch(receiveProductsFail(err));

            })

    }
}
