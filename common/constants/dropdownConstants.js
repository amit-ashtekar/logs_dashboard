/**
 * Created by amita on 4/25/2016.
 */


import {createConstants} from '../util';
export const groupObj=  createConstants(
    'GET_GROUPS_LIST',
    'GET_GROUPS_LIST_SUCCESS',
    'GET_GROUPS_LIST_FAIL',
    'GET_SELECTED_GROUP'
)

export const streamObj=  createConstants(
    'GET_STREAMS_LIST',
    'GET_STREAMS_LIST_SUCCESS',
    'GET_STREAMS_LIST_FAIL',
    'GET_SELECTED_STREAM'
)
