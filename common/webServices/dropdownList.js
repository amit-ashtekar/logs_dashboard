/**
 * Created by amita on 4/25/2016.
 */

import {getGroupList,groupListSuccess,groupListFail,selectedGroup} from '../actions/dropdown.js';

export function getGroups(){
    // return fetchItems(receiveProducts,receiveProductsFail)
    return function (dispatch) {

        let config={
            method: 'GET',
            headers: {  'Content-Type': 'application/json', 'Accept': 'application/json','authorization':'151561vdfvdbdbdb1561fdbdf' }
        };
        dispatch(getGroupList());
        return fetch('http://localhost:3001/getGroups/',config)
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