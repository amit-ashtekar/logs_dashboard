/**
 * Created by amita on 5/1/2016.
 */

import {loaderObj} from '../constants/loaderConstants.js'
const { START_LOADER,
    STOP_LOADER}=loaderObj;



const InitialState={
    loaded:true

}


export function loader(state = InitialState, action) {
    switch (action.type) {
        case START_LOADER:

            return Object.assign({},state,{
                loaded: false
            })
        case STOP_LOADER:
        case 'RECEIVE_FILTERED_LOGS':
            case 'RECEIVE_PRODUCTS':
            return Object.assign({},state,{
                loaded: true
            })

        default:

            return Object.assign({},state)
    }
}