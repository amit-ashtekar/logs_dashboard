

import {combineReducers} from 'redux';
// import {routerStateReducer} from 'redux-router';
import {login} from 'common/reducers/loginlogout';
import {Items,AddedItemsCount,GetCartAddedItems} from 'common/reducers/items'
import {groups} from 'common/reducers/dropdown.js'

export default combineReducers({
 login,
 Items,
 AddedItemsCount,
 GetCartAddedItems,
 groups
 // router:routerStateReducer
})
