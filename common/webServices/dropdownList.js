/**
 * Created by amita on 4/25/2016.
 */

import {getGroupList,groupListSuccess,groupListFail,selectedGroup,getStreamList,streamListSuccess,streamListFail,selectedStream} from '../actions/dropdown.js';

export function getGroups(url){
    // return fetchItems(receiveProducts,receiveProductsFail)
    return function (dispatch) {

        let config={
            method: 'GET',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json'}
        };
        dispatch(getGroupList());
        return fetch(url,config)
                .then(res=> res.json())
        .then(resJson=> {
            console.log("getGroups: ",resJson)

        dispatch(groupListSuccess(resJson))

    }).catch(err=>{
        debugger;

    dispatch(groupListFail(err));

})

}
}

export function getStreams(url){
    // return fetchItems(receiveProducts,receiveProductsFail)
    return function (dispatch) {

        let config={
            method: 'GET',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json'}
        };
        dispatch(getStreamList());
        return fetch(url,config)
                .then(res=> res.json())
        .then(resJson=> {
            console.log("getStreams: ",resJson)

        dispatch(streamListSuccess(resJson))

    }).catch(err=>{

    dispatch(streamListFail(err));

})

}
}
