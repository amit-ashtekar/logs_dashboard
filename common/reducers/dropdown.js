/**
 * Created by amita on 4/25/2016.
 */

import {groupObj,streamObj} from '../constants/dropdownConstants.js'
const {  GET_GROUPS_LIST,
    GET_GROUPS_LIST_SUCCESS,
    GET_GROUPS_LIST_FAIL,
    GET_SELECTED_GROUP}=groupObj;

const InitialState={
    groups:[],
    group:""
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