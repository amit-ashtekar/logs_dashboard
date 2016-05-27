import React from 'react';
import {Route, IndexRoute} from 'react-router';
import {App,ItemContainer} from '../containers';
import {HomeView, LoginView,CheckoutSummary,Item,ModalItem} from '../views';


export default(
  <Route path='/' component={App}>
    <IndexRoute component={HomeView}/>
    <Route path="login" component={LoginView}/>
    <Route path="dashboard" component={ItemContainer}/>
  </Route>
);
