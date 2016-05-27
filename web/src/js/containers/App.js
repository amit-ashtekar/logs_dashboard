import React from 'react';
import {Navbar, NavBrand, Nav, NavItem} from 'react-bootstrap';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {logoutAndRedirect} from 'common/actions';

export default class CoreLayout extends React.Component {

  render () {
    const {dispatch} = this.props;

    return (
      <div>
        <nav className="navbar navbar-default" role="navigation">
          <div className="container-fluid">
            <ul className="nav navbar-nav pull-right">
              <li><Link  to="/">Home</Link></li>
              <li><Link  to="/dashboard">Dashboard</Link></li>
            </ul>
          </div>
        </nav>
        <div className="container log">
          <div className='row'>
            {this.props.children}
          </div>
        </div>
        <footer className="footer">
          <div className="container">
            <p className="text-muted">
              &copy; 2016 SYNERZIP, all rights reserved.
            </p>
          </div>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated   : state.login.isAuthenticated,
  statusText         : state.login.message,
  addeditemsCount:state.AddedItemsCount.length
});

export default connect(mapStateToProps)(CoreLayout);
