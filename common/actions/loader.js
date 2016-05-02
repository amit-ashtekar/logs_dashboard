/**
 * Created by amita on 5/1/2016.
 */

import {loaderObj} from '../constants/loaderConstants.js'

const { START_LOADER,
    STOP_LOADER}=loaderObj;



export function startLoader(){
    return {
        type:START_LOADER,
        isStart:true

    }
}

export function stopLoader(){
    return {
        type:STOP_LOADER,
        isStart:false

    }
}