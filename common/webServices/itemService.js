/**
 * Created by amita on 3/18/2016.
 */
import {receiveProducts,receiveProductsFail,getAddedCartItem} from '../actions/itemActions';
import {logEventsConfig} from '../awsConfig/config.js'

export function getItems(){
   // return fetchItems(receiveProducts,receiveProductsFail)
    return function (dispatch) {
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

 function fetchItems(successDispach,errorDispatch,itemArr){
    return function (dispatch) {
        let config={
            method: 'GET',
            headers: {  'Content-Type': 'application/json', 'Accept': 'application/json','authorization':'151561vdfvdbdbdb1561fdbdf','Logeventsparam':JSON.stringify(logEventsConfig) }
        };

        return fetch('http://localhost:3001/getItems/',config)
                .then(res=> res.json())
        .then(resJson=> {
            console.log("getItems: ",resJson)
        if(!itemArr) {
            dispatch(successDispach(resJson))
        }
        else{
            dispatch(successDispach(itemArr,resJson))
        }



    }).catch(err=>{
        debugger;
     if(errorDispatch) {
         dispatch(errorDispatch(err));
     }
})

}
}
export function ModalItems(itemArr){

    return fetchItems(getAddedCartItem,undefined,itemArr)
}

export function getLogEvents(){

}
