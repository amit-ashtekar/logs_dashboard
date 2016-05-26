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
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="index.html">Business Casual</a>
            </div>

            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav navbar-right">
                <li><Link  to="/">Home</Link></li>
                <li><Link  to="/itemcontainer">Dashboard</Link></li>
              </ul>
            </div>
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
