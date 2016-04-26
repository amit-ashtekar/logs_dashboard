/**
 * Created by amita on 4/25/2016.
 */

import {groupObj,streamObj} from '../constants/dropdownConstants.js'
const {  GET_GROUPS_LIST,
    GET_GROUPS_LIST_SUCCESS,
    GET_GROUPS_LIST_FAIL,
    GET_SELECTED_GROUP}=groupObj;

const {    GET_STREAMS_LIST,
    GET_STREAMS_LIST_SUCCESS,
    GET_STREAMS_LIST_FAIL,
    GET_SELECTED_STREAM}=streamObj;

const InitialState={
    groups:[],
    group:""
}

const InitialStateStream={
    streams:[],
    stream:""

}
export function groups(state = InitialState.groups, action) {
    switch (action.type) {
        case GET_GROUPS_LIST:
            return Object.assign({},state,{
                message: "Fetching groups List"
            })
        case GET_GROUPS_LIST_SUCCESS:
           return Object.assign({},state,{
                groups: action.payload.groups
            })
        case GET_SELECTED_GROUP:
           return Object.assign({},state,{
                group: action.payload.group
            })
        case GET_GROUPS_LIST_FAIL:
            return Object.assign({},state,{
                group: action.payload.message
            })
        default:

            return Object.assign({},state)
    }
}

export function streams(state = InitialStateStream.streams, action) {
    switch (action.type) {
        case GET_STREAMS_LIST:
            return Object.assign({},state,{
                message: "Fetching streams List"
            })
        case GET_STREAMS_LIST_SUCCESS:
            return Object.assign({},state,{
                streams: action.payload.streams
            })
        case GET_SELECTED_STREAM:
            return Object.assign({},state,{
                stream: action.payload.stream
            })
        case GET_STREAMS_LIST_FAIL:
            return Object.assign({},state,{
                message: action.payload.message
            })
        default:

            return Object.assign({},state)
    }
}

export function stream(state = InitialStateStream.stream, action) {
    switch (action.type) {

        case GET_SELECTED_STREAM:
            return Object.assign({},state,{
                stream: action.payload.stream
            })

        default:

            return Object.assign({},state)
    }
}

