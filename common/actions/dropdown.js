/**
 * Created by amita on 4/25/2016.
 */

import {groupObj,streamObj} from '../constants/dropdownConstants.js'

const {  GET_GROUPS_LIST,
    GET_GROUPS_LIST_SUCCESS,
    GET_GROUPS_LIST_FAIL,
    GET_SELECTED_GROUP}=groupObj;

const { GET_STREAMS_LIST,
    GET_STREAMS_LIST_SUCCESS,
    GET_STREAMS_LIST_FAIL,
    GET_SELECTED_STREAM} = streamObj;

export function getGroupList(){
    return {
        type:GET_GROUPS_LIST

    }
}
export function groupListSuccess(groups){
    return {
        type:GET_GROUPS_LIST_SUCCESS,
        payload:{
            groups:groups
        }

    }
}

export function groupListFail(msg){
    return {
        type:GET_GROUPS_LIST_FAIL,
        payload:{
            message:msg
        }

    }
}

export function selectedGroup(group){
    return {
        type:GET_SELECTED_GROUP,
        payload:{
            group:group
        }

    }
}



export function getStreamList(){
    return {
        type:GET_STREAMS_LIST

    }
}
export function streamListSuccess(streams){
    return {
        type:GET_STREAMS_LIST_SUCCESS,
        payload:{
            streams:streams
        }

    }
}

export function streamListFail(msg){
    return {
        type:GET_STREAMS_LIST_FAIL,
        payload:{
            message:msg
        }

    }
}

export function selectedStream(stream){
    return {
        type:GET_SELECTED_STREAM,
        payload:{
            stream:stream
        }

    }
}