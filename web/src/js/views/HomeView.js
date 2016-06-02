import React from 'react';
import {Link} from 'react-router';
import slide1 from '../../img/slide1.jpg';

export default class HomeView extends React.Component {

  render () {
    return (
      <div>
        <div className="row">
          <div className="box">
            <div className="col-lg-12 text-center">
              <div id="home-scroller" className="carousel slide">
                <ol className="carousel-indicators hidden-xs">
                  <li data-target="#home-scroller" data-slide-to="0" className="active"></li>
                </ol>
                <div className="carousel-inner">
                  <div className="item active">
                    <img className="img-responsive img-full" src={slide1} alt=""/>
                  </div>
                </div>
                <h2 className="brand-before">
                  <small>Welcome to</small>
                </h2>
                <h1 className="brand-name">Logs Dashboard</h1>
                <hr className="tagline-divider"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
