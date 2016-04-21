/**
 * Created by amita on 3/18/2016.
 */
import {receiveProducts,receiveProductsFail,getAddedCartItem} from '../actions/itemActions';

export function getItems(){
    return fetchItems(receiveProducts,receiveProductsFail)
}

 function fetchItems(successDispach,errorDispatch,itemArr){
    return function (dispatch) {
        let config={
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json'}
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
