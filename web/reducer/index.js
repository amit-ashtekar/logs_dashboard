

import {combineReducers} from 'redux';
import {routerStateReducer} from 'redux-router';
import {login} from 'common/reducers/loginlogout';
import {Items,AddedItemsCount,GetCartAddedItems} from 'common/reducers/items'

export default combineReducers({
 login,
 Items,
 AddedItemsCount,
 GetCartAddedItems,
 router:routerStateReducer
})


